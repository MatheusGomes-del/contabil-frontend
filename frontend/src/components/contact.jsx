import { FaEnvelope, FaPhone, FaInstagram, FaFacebookF } from "react-icons/fa";
import "../style/contactSection.css";

export function ContactSection() {
  return (
    <section id="contact" className="contact-section">
      <h2 className="contact-title">Entre em Contato</h2>
      <p className="contact-description">
        Estamos à disposição para esclarecer dúvidas e apresentar soluções
        personalizadas para o seu negócio.
      </p>

      <div className="contact-details">
        <a href="mailto:danilocontabeis18@gmail.com" className="contact-link">
          <FaEnvelope size={20} />
          danilocontabeis18@gmail.com
        </a>

        <a href="tel:+83988748533" className="contact-link">
          <FaPhone size={20} />
          (83) 98874-8533
        </a>
      </div>

      <div className="contact-socials">
        <a
          href="https://www.instagram.com/contabfile"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="social-icon instagram"
        >
          <FaInstagram />
        </a>
        <a
          href="https://www.facebook.com/contabfile"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Facebook"
          className="social-icon facebook"
        >
          <FaFacebookF />
        </a>
      </div>
    </section>
  );
}