import React from "react";
import { Link } from "react-router-dom";
import "../style/landingPage.css";
import { ContactSection } from "../components/contact";

function LandingPage() {
  return (
    <div className="landing-container">
      <header className="header">
        <h1 className="logo">ContabFile</h1>
        <Link to="/login" className="btn btn-primary">
          Área do Cliente / Contador
        </Link>
      </header>

      <section className="hero">
        <h2 className="hero-title">Contabilidade sem Complicação</h2>
        <p className="hero-text">
          Facilitamos o envio, organização e acesso a documentos contábeis com
          agilidade e segurança. Atendimento personalizado para empresas de todos os portes.
        </p>
        <Link to="/login" className="btn btn-secondary">
          Acessar Plataforma
        </Link>
      </section>

      <section className="about">
        <h3 className="section-title">Quem é Danilo?</h3>
        <p className="about-text">
          Danilo é contador especializado em soluções digitais para pequenas e médias
          empresas. Com mais de 10 anos de experiência, oferece um atendimento próximo,
          transparente e focado em resultados.
        </p>
      </section>

      <section className="services">
        <h3 className="section-title">Nossos Serviços</h3>
        <div className="services-grid">
          <div className="service-card">
            <h4 className="service-title">Contabilidade Digital</h4>
            <p className="service-text">
              Plataforma online para envio, recebimento e organização de documentos contábeis.
            </p>
          </div>
          <div className="service-card">
            <h4 className="service-title">Folha de Pagamento</h4>
            <p className="service-text">
              Gestão completa de colaboradores, holerites e obrigações trabalhistas mensais.
            </p>
          </div>
          <div className="service-card">
            <h4 className="service-title">Planejamento Tributário</h4>
            <p className="service-text">
              Análise estratégica para reduzir carga tributária de forma legal e eficiente.
            </p>
          </div>
        </div>
      </section>

      <section className="cta">
        <h3 className="cta-title">Pronto para facilitar sua contabilidade?</h3>
        <p className="cta-text">
          Acesse agora nossa plataforma e descubra como a ContabFile pode ajudar seu negócio.
        </p>
        <Link to="/login" className="btn btn-secondary">
          Entrar na Plataforma
        </Link>
      </section>

      {/* Nova seção Contato */}
      <ContactSection />

      <footer className="footer">
        © {new Date().getFullYear()} ContabFile. Todos os direitos reservados.
      </footer>
    </div>
  );
}

export default LandingPage;
