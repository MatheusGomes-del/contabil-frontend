import { FaEnvelope, FaPhone, FaInstagram, FaFacebookF } from "react-icons/fa";

export function ContactSection() {
  return (
    <section
      style={{
        backgroundColor: "#f9fafb",
        padding: "4rem 1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          backgroundColor: "#fff",
          padding: "2.5rem 3rem",
          borderRadius: "12px",
          boxShadow:
            "0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)",
          width: "100%",
          maxWidth: "600px",
          margin: "0 auto",
          textAlign: "center",
          boxSizing: "border-box",
        }}
      >
        <h2
          style={{
            fontWeight: "700",
            fontSize: "1.75rem",
            marginBottom: "1rem",
            color: "#111827",
          }}
        >
          Entre em Contato
        </h2>
        <p
          style={{
            fontSize: "1rem",
            color: "#6b7280",
            marginBottom: "2rem",
          }}
        >
          Estamos à disposição para esclarecer dúvidas e apresentar soluções
          personalizadas para o seu negócio.
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
            fontSize: "1rem",
            color: "#374151",
            alignItems: "center",
          }}
        >
          <a
            href="mailto:contato@contabfile.com.br"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1d4ed8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#2563eb")}
          >
            <FaEnvelope size={20} />
            contato@contabfile.com.br
          </a>

          <a
            href="tel:+5511999998888"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              color: "#2563eb",
              textDecoration: "none",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#1d4ed8")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#2563eb")}
          >
            <FaPhone size={20} />
            (11) 99999-8888
          </a>

          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "1.5rem",
              marginTop: "1rem",
            }}
          >
            <a
              href="https://www.instagram.com/contabfile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{
                color: "#6b7280",
                fontSize: "1.25rem",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ec4899")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.facebook.com/contabfile"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              style={{
                color: "#6b7280",
                fontSize: "1.25rem",
                transition: "color 0.3s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#3b82f6")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6b7280")}
            >
              <FaFacebookF />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
