import { Swiper, SwiperSlide } from "swiper/react"
import { Autoplay, Pagination } from "swiper/modules"
import "swiper/swiper-bundle.css"

interface Testimonial {
  text: string
  name: string
  role?: string
  stars: number
}

export default function Testimonials() {
  const testimonials: Testimonial[] = [
    {
      text: "Mudanças são necessárias. Reciclagem não é só no meio ambiente, mas também no ambiente do nosso ser.",
      name: "Daniel Carvalho de Oliveira",
      stars: 5,
    },
    {
      text:
        "A verdadeira riqueza de uma nação não é medida pela quantidade de dinheiro em seus cofres, mas pela saúde de sua população e a qualidade de seu meio ambiente.",
      name: "Mahatma Gandhi",
      stars: 5,
    },
    {
      text: "Amar é: reciclar quando muitos descartariam.",
      name: "Anderson Alves",
      stars: 4,
    },
  ]

  return (
    <section className="w-full max-w-3xl mt-6 text-white">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        className="!pb-8"
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="p-8 rounded-xl">
              <p className="text-xl leading-relaxed mb-5">“{t.text}”</p>

              <div className="flex flex-col gap-1">
                <h4 className="text-lg font-semibold">{t.name}</h4>
                {t.role && (
                  <span className="text-sm text-gray-300">{t.role}</span>
                )}

                <div className="text-green-400">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <span key={i}>★</span>
                  ))}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  )
}
