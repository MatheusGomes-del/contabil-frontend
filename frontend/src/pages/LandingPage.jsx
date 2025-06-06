import React from "react";
import { Link } from "react-router-dom";
import "../style/landingPage.css";
import { ContactSection } from "../components/contact";
import serviceImagemOpenBusiness from '../assets/legal_homem_notebook.avif'
import escrituracaoFiscalImg from '../assets/escrituracao-fiscal.jpeg'
import planejamentoTributarioImg from '../assets/Planejamento-tributario-em-2022.webp'
import departamentoPessoal from '../assets/departamento-pessoal.png'

function LandingPage() {
  return (
    <div className="landing-container">

      <header className="header">
        <div className="logo">ContabFile</div>
        <nav className="nav">
          <a href="#home" className="nav-link">Home</a>
          <a href="#services" className="nav-link">Serviços</a>
          <a href="#contact" className="nav-link">Contatos</a>
          <Link to="/login" className="nav-link btn-login">Área do Cliente</Link>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <h1 className="hero-title">Contabilidade Especializada em Abertura de Empresa</h1>
          <p className="hero-text">
            Já Ajudamos Mais de 1.500 Empreendedores a Começar Seus Negócios
            Simplifique a Burocracia e Tenha Sua Empresa Regularizada com Rapidez e Segurança
          </p>
          <a
                  href="https://api.whatsapp.com/send?phone=55839988748533&text=Olá!%20Gostaria%20de%20mais%20informações."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
              >
                ACESSORIA CONTÁBIL
              </a>
        </section>

        <section id="services" className="services-open-business">
          <img
              src={ serviceImagemOpenBusiness }
              alt="Abertura de Empresa"
              className="service-image"
          />
          <article className="service-card">
            <h2>ABERTURA DE EMPRESA</h2>
            <p>Oferecemos assessoria completa para a abertura da sua empresa, desde a definição do tipo societário até a obtenção de registros e licenças. Nosso serviço inclui:</p>
            <ul>
              <li>Análise e escolha do regime tributário mais adequado</li>
              <li>Elaboração e registro do contrato social</li>
              <li>Inscrição no CNPJ</li>
              <li>Registro na Junta Comercial</li>
              <li>Alvará de funcionamento</li>
              <li>Licenças específicas, conforme o ramo de atividade</li>
              <li>Enquadramento no Simples Nacional (quando aplicável)</li>
            </ul>
            <p>Atuamos com agilidade, segurança jurídica e orientação personalizada para que você inicie sua atividade empresarial com tranquilidade e total conformidade legal.</p>
            <a
                  href="https://api.whatsapp.com/send?phone=55839988748533&text=Olá!%20Gostaria%20de%20mais%20informações."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
              >
                QUERO ABRIR MINHA EMPRESA
              </a>
          </article>
          </section>

          <section id="services" className="services-escrituracao-fiscal">
            <img
                src={ escrituracaoFiscalImg }
                alt="Escrituracao Fiscal"
                className="service-image"
            />
            <article className="service-card">
              <h2>ESCRITURAÇÃO FISCAL</h2>
              <p>Oferecemos um serviço completo e preciso de escrituração fiscal, assegurando o cumprimento das obrigações acessórias e o correto recolhimento dos tributos, conforme a legislação vigente.</p>
              <ul>
                <li>Apuração de impostos (federais, estaduais e municipais)</li>
                <li>Emissão e controle de guias de recolhimento</li>
                <li>Escrituração e envio de obrigações acessórias (SPED Fiscal, EFD-Contribuições, entre outras)</li>
                <li>Análise e classificação de documentos fiscais</li>
                <li>Suporte em fiscalizações e auditorias</li>
                <li>Acompanhamento de mudanças na legislação tributária</li>
              </ul>
              <p>Garantimos segurança, compliance e eficiência fiscal para sua empresa, minimizando riscos e aproveitando oportunidades legais de economia tributária.</p>
              <a
                  href="https://api.whatsapp.com/send?phone=55839988748533&text=Olá!%20Gostaria%20de%20mais%20informações."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
              >
               QUERO MINHA ESCRITURA FISCAL
              </a>
            </article>
          </section>
          
          <section id="services" className="services-planejamento-tributario">
              <img
                    src={ planejamentoTributarioImg }
                    alt="Escrituracao Fiscal"
                    className="service-image"
              />
              <article className="service-card">
                <h2>PLANEJAMENTO TRIBUTÁRIO</h2>
                <p>Oferecemos soluções inteligentes e personalizadas em planejamento tributário, com o objetivo de reduzir legalmente a carga tributária da sua empresa e otimizar os resultados financeiros. Nosso trabalho é baseado em uma análise profunda da estrutura, atividades e regime fiscal da organização. O serviço inclui:</p>
                <ul>
                  <li>Estudo e escolha do regime tributário mais vantajoso (Simples Nacional, Lucro Presumido )</li>
                  <li>Reestruturação societária e operacional, quando aplicável</li>
                  <li>Identificação de oportunidades de economia fiscal dentro da legislação vigente</li>
                  <li>Revisão de tributos pagos e apuração de possíveis créditos fiscais</li>
                  <li>Acompanhamento de alterações na legislação tributária</li>
                  <li>Elaboração de relatórios com simulações e impactos financeiros</li>
                </ul>
                <p>Nosso foco é garantir segurança jurídica e eficiência fiscal, ajudando sua empresa a crescer de forma sustentável e com menor impacto tributário.</p>
                <a
                  href="https://api.whatsapp.com/send?phone=55839988748533&text=Olá!%20Gostaria%20de%20mais%20informações."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
              >
                SOLICITE SEU PLANEJAMENTO TRIBUTÁRIO
              </a>
              </article>
          </section>

        <section id="services" className="services-departamento-pessoal">
            <img
                src={ departamentoPessoal }
                alt="Departamento Pessoal"
                className="service-image"
            />
            <article className="service-card">
              <h3>Departamento pessoal</h3>
              <p>Prestamos serviços completos na gestão do Departamento Pessoal, garantindo o cumprimento da legislação trabalhista, previdenciária e das obrigações acessórias, com foco na segurança jurídica e na organização da rotina de seus colaboradores. Nossos serviços incluem:</p>
              <ul>
                <li>Admissão e demissão de funcionários</li>
                <li>Elaboração de contratos de trabalho</li>
                <li>Cálculo de folha de pagamento, férias, 13º salário e rescisões</li>
                <li>Gestão de encargos sociais (INSS, FGTS, IRRF)</li>
                <li>Transmissão de eventos no eSocial</li>
                <li>Atendimento a fiscalizações e obrigações sindicais</li>
              </ul>
              <p>Oferecemos suporte técnico e estratégico para manter sua empresa regularizada e em dia com as normas trabalhistas, promovendo tranquilidade e eficiência na gestão de pessoas.</p>
              <a
                  href="https://api.whatsapp.com/send?phone=55839988748533&text=Olá!%20Gostaria%20de%20mais%20informações."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary"
              >
                FALE COM UM ESPECIALISTA
              </a>
            </article>
        </section>

        {/* <section id="contact" className="contact">
          <h2 className="section-title">Contatos</h2>
          <p><strong>Telefone:</strong> 83 98874-8533</p>
          <p><strong>Email:</strong> <a href="mailto:danilocontabeis18@gmail.com">danilocontabeis18@gmail.com</a></p>
        </section> */}
        <ContactSection/>
      </main>

      <footer className="footer">
        © {new Date().getFullYear()} ContabFile. Todos os direitos reservados.
      </footer>
      <a
        href="https://api.whatsapp.com/send?phone=839988748533&text=Olá!%20Gostaria%20de%20mais%20informações."
        className="whatsapp-float"
        target="_blank"
        rel="noopener noreferrer"
      >
        <i className="fab fa-whatsapp"></i>
      </a>

    </div>
  );
}

export default LandingPage;
