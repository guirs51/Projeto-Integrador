import React from "react";
import { Swiper, SwiperSlide } from "swiper/react"; // ✅ trocado o import correto
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "./Testimonials.css";

export default function Testimonials() {
  const testimonials = [
    {
      text: `"Mudanças são necessárias. Reciclagem não é só no meio ambiente, mas também no ambiente do nosso ser.."`,
      name: "Daniel Carvalho de Oliveira.",
      role: "",
      stars: 5,
    },
    {
      text: `"A verdadeira riqueza de uma nação não é medida pela quantidade de dinheiro em seus cofres, mas pela saúde de sua população e a qualidade de seu meio ambiente."`,
      name: ".",
      role: "Mahatma Gandhi",
      stars: 5,
    },
    {
      text: `"Amar é: Reciclar quando muitos descartariam."`,
      name: "Anderson Alves.",
      role: "",
      stars: 4,
    },
  ];

  return (
    <section className="testimonials">
      <Swiper
        modules={[Autoplay, Pagination]} // ✅ letras maiúsculas corretas
        spaceBetween={30}
        slidesPerView={1} // ✅ nome da prop corrigido
        autoplay={{ delay: 6000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {testimonials.map((t, index) => (
          <SwiperSlide key={index}>
            <div className="testimonial-card">
            
              <p className="text">{t.text}</p>
              <h4>{t.name}</h4>
              <span>{t.role}</span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
