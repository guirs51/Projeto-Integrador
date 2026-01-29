import Testimonials from "../../components/testimonial";
import LogoR from '@/imgs/logo.png'

export default function Home() {
  return (
    <>


      <div>
        <header className="fixed top-0 w-full backdrop-blur bg-black/40 border-b border-white/10 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 border border-white/10">
              <img
                src={LogoR}
                alt="logoRecicle.png"
                className="h-6 w-6 object-contain"
              />

            </div>
            <div className="leading-tight">
              <p className="text-sm font-semibold">Recicle +</p>
            </div>
          </div>
        </header>


        <section className="relative min-h-screen w-full overflow-hidden flex items-center justify-center px-5 text-white">

          {/* Vídeo */}
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover -z-20"
          >
            <source src="/src/videos/florest2.mp4" type="video/mp4" />
          </video>

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60 -z-10" />

          {/* Conteúdo central
           <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-gradient-to-br">
            <h1 className="text-6xl font-bold leading-tight mb-6 max-md:text-4xl">
              Recicle + protegendo a <span className="text-lime-400">natureza</span>, <br />
              garantindo o <span className="text-lime-400">futuro</span>.
            </h1>

            <p className="text-lg text-gray-200 mb-6 max-w-[600px] max-md:text-base">
              Dê o primeiro passo rumo a um amanhã mais verde e sustentável.
            </p>

            <a href="/regis">
              <button className="bg-lime-400 text-black px-8 py-3 rounded-full font-semibold hover:bg-lime-500 transition">
                Começar agora
              </button>
            </a>
          </div> */}


          <div className="max-w-xl text-center md:text-left">

            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold text-white leading-tight">
              Recicle + protegendo a <span className="text-lime-400">natureza</span>, <br />
              garantindo o <span className="text-lime-400">futuro</span>.
            </h1>

            <p className="mt-6 text-gray-300 max-w-md mx-auto md:mx-0 text-sm sm:text-base">
              Dê o primeiro passo rumo a um amanhã mais verde e sustentável.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <a href="/regis">
                <button className="bg-green-900 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold">
                  Cadastre-se já!
                </button>
              </a>

              <a href="#sobre">              <button className="bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg">
                Sobre nós!
              </button></a>

            </div>
          </div>

        </section>


        {/* QUEM SOMOS */}
        <section className="flex items-center justify-between gap-16 px-[10%] py-20 bg-white max-lg:flex-col max-lg:text-center max-lg:px-6 max-lg:py-16">

          {/* Imagem */}
          <div className="flex-1 max-lg:order-[-1]">
            <img
              src="/src/imgs/equipe.png"
              alt="Equipe engajada com sustentabilidade"
              className="w-full rounded-xl object-cover"
            />
          </div>

          {/* Texto */}
          <div className="flex-[1.2] text-neutral-900" id="sobre">
            <h4 className="uppercase text-sm tracking-wider text-green-700 mb-3">
              Quem somos?
            </h4>

            <h2 className="text-4xl font-bold leading-snug mb-6 max-lg:text-3xl">
              Somos uma equipe de desenvolvedores do Senac São Leopoldo
              <br />
              <span className="text-green-700 text-[2.5rem]">
                {" "}
                com objetivo de promover consciência ambiental
              </span>{" "}
              e transformar hábitos
              <br />
              em ações sustentáveis.
            </h2>

            <p className="text-lg leading-relaxed text-neutral-700 max-lg:text-base">
              No <strong>Recicle+</strong>, acreditamos no poder da ação coletiva.
              Por meio da gamificação, buscamos aproximar as pessoas da causa
              ambiental, transformando atitudes simples em impactos reais para o
              planeta. Nossa missão é inspirar uma mudança de comportamento e
              incentivar práticas sustentáveis de forma leve, moderna e engajadora.
            </p>
          </div>
        </section>

        {/* REGISTRO
       <section className="bg-[#2A3218] text-white text-center py-20 px-8">
        <h3 className="text-3xl font-semibold mb-4">
          Junte-se a nós!
        </h3>

        <p className="text-lg mb-6 max-w-[600px] mx-auto">
          Cadastre-se e faça parte dessa jornada em busca ao futuro melhor.
        </p>

        <a href="/regis">
          <button className="bg-[#656d4a] hover:bg-[#414833] transition px-8 py-3 rounded-md font-semibold">
            Ir para o Cadastro
          </button>
        </a>
      </section>
      */}
      </div>


    </>
  );
}
