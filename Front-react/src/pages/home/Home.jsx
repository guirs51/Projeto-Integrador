import { useState } from 'react'
import './Home.css'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import Testimonials from "../../components/Testimonials";


function Home() {
  return (
    <>
      {/* Seção de boas-vindas com imagem de fundo */}
     <section className="hero">
      {/* Vídeo de fundo */}
      <video autoPlay loop muted playsInline className="background-video">
        <source src="./src/videos/florest2.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos em HTML5.
      </video>

      {/* Overlay escura */}
      <div className="dark-overlay"></div>

      {/* Conteúdo principal */}
      <div className="hero-content">
        <h1>
          Recicle +  protegendo a <span>natureza</span>,<br />
          garantindo o <span>futuro</span>.
        </h1>
        <p>
          Dê o primeiro passo rumo a um amanhã mais verde e sustentável.
        </p>
              <Testimonials/>
      </div>

    </section>

{/* Seção “Quem Somos” */}
<section className="apresentacao">
  <div className="imagem">
    <img
      src="./src/img/equipe.png"
      alt="Equipe engajada com sustentabilidade"
    />
  </div>

  <div className="texto">
    <h4>Quem somos?</h4>
    <h2>
      Somos uma equipe de desenvolvedores do Senac São Leopoldo<br />
      <span> com objetivo de promover consciência ambiental</span> e transformar hábitos <br />
      em ações sustentáveis.
    </h2>
    <p>
      No <strong>Recicle+</strong>, acreditamos no poder da ação coletiva.
      Por meio da gamificação, buscamos aproximar as pessoas da causa ambiental,
      transformando atitudes simples em impactos reais para o planeta.
      Nossa missão é inspirar uma mudança de comportamento e incentivar
      práticas sustentáveis de forma leve, moderna e engajadora.
    </p>
  </div>
</section>


      {/* Espaço para registro futuro */}
      <section className="register-part">
        <h3>Junte-se a nós!</h3>
        <p>Cadastre-se e faça parte dessa jornada em busca ao futuro melhor.</p>
        <a href="/regis"><button className="btn-register">Ir para o Cadastro</button></a>
      </section>
    </>
  )
}

export default Home
