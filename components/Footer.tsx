"use client";

export default function Footer() {
  return (
    <footer
      className="py-14 px-4"
      style={{ background: "#080808", borderTop: "1px solid var(--border)" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span
                style={{
                  fontFamily:
                    "var(--font-display, 'Barlow Condensed', sans-serif)",
                  fontWeight: 800,
                  fontSize: "1.6rem",
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                  lineHeight: 1,
                }}
              >
                NP
              </span>
              <span
                style={{
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                Climatização
              </span>
            </div>
            <p
              style={{
                fontSize: "0.85rem",
                lineHeight: 1.7,
                color: "var(--text-muted)",
                marginBottom: "1.25rem",
                maxWidth: "280px",
              }}
            >
              Especialistas em instalação, manutenção e projetos de ar
              condicionado em São Paulo há mais de 15 anos.
            </p>
            <div className="flex gap-2">
              {[
                {
                  href: "https://instagram.com",
                  label: "Instagram",
                  path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z",
                },
                {
                  href: "https://facebook.com",
                  label: "Facebook",
                  path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
                },
                {
                  href: "https://linkedin.com",
                  label: "LinkedIn",
                  path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
                },
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  style={{
                    width: 34,
                    height: 34,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    background: "var(--surface-2)",
                    border: "1px solid var(--border)",
                    transition: "border-color 0.2s, background 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "rgba(255,255,255,0.15)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.borderColor =
                      "var(--border)";
                  }}
                >
                  <svg width="15" height="15" fill="var(--text-muted)" viewBox="0 0 24 24" aria-hidden>
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}
            >
              Links Rápidos
            </h4>
            <ul className="space-y-2">
              {[
                { href: "#inicio", label: "Home" },
                { href: "#servicos", label: "Serviços" },
                { href: "#obras", label: "Nossas Obras" },
                { href: "#diferenciais", label: "Quem Somos" },
                { href: "#contato", label: "Solicitar Orçamento" },
              ].map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-muted)",
                      textDecoration: "none",
                      transition: "color 0.2s",
                    }}
                    onMouseEnter={(e) =>
                      ((e.target as HTMLElement).style.color = "var(--text)")
                    }
                    onMouseLeave={(e) =>
                      ((e.target as HTMLElement).style.color =
                        "var(--text-muted)")
                    }
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4
              style={{
                fontSize: "0.72rem",
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--text-muted)",
                marginBottom: "1rem",
              }}
            >
              Contato
            </h4>
            <ul className="space-y-3">
              {[
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  ),
                  content: (
                    <span>
                      R. Demétrio Ribeiro, 572 — Cidade Mãe do Céu
                      <br />
                      São Paulo - SP, 03332-000
                    </span>
                  ),
                },
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 11.5a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 8.63a16 16 0 006.29 6.29l1.95-1.95a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                    </svg>
                  ),
                  content: (
                    <a
                      href="tel:+551123891033"
                      style={{ color: "var(--text-muted)", textDecoration: "none" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "var(--text)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color =
                          "var(--text-muted)")
                      }
                    >
                      (11) 2389-1033
                    </a>
                  ),
                },
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  content: (
                    <a
                      href="mailto:sac@npclimatizacao.com.br"
                      style={{ color: "var(--text-muted)", textDecoration: "none" }}
                      onMouseEnter={(e) =>
                        ((e.target as HTMLElement).style.color = "var(--text)")
                      }
                      onMouseLeave={(e) =>
                        ((e.target as HTMLElement).style.color =
                          "var(--text-muted)")
                      }
                    >
                      sac@npclimatizacao.com.br
                    </a>
                  ),
                },
                {
                  icon: (
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  ),
                  content: <span>Seg–Sex: 8h15 às 18h</span>,
                },
              ].map((item, i) => (
                <li
                  key={i}
                  className="flex gap-2.5 items-start"
                  style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}
                >
                  <span className="flex-shrink-0 mt-0.5">{item.icon}</span>
                  {item.content}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="pt-6 text-center"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p style={{ fontSize: "0.72rem", color: "var(--text-muted)", opacity: 0.5 }}>
            © 2026 NP Climatização. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
