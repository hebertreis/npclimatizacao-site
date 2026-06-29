"use client";

const services = [
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="var(--accent)" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
    title: "Visita Técnica Gratuita",
    description:
      "Avaliamos seu espaço sem custo e indicamos a melhor solução de climatização para sua necessidade.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="var(--accent)" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <path d="M7 7V5a1 1 0 011-1h8a1 1 0 011 1v2M12 17v2M8 21h8" />
      </svg>
    ),
    title: "Instalação Split / VRF / Cassete",
    description:
      "Instalação profissional de todos os tipos de ar condicionado com técnicos certificados e garantia.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="var(--accent)" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: "Manutenção Preventiva",
    description:
      "Contratos de manutenção programada para garantir o funcionamento ideal e prolongar a vida útil dos equipamentos.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="var(--accent)" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: "Manutenção Corretiva",
    description:
      "Diagnóstico e reparo de falhas em equipamentos de ar condicionado de qualquer marca e modelo.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="var(--accent)" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: "Projetos Corporativos",
    description:
      "Desenvolvemos projetos completos de climatização para escritórios, lojas, clínicas e empreendimentos.",
  },
  {
    icon: (
      <svg width="28" height="28" fill="none" stroke="var(--accent)" strokeWidth="1.5" viewBox="0 0 24 24" aria-hidden>
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: "Infraestrutura Completa",
    description:
      "Execução de toda a infraestrutura elétrica e de refrigeração necessária para a instalação.",
  },
];

export default function Services() {
  return (
    <section id="servicos" className="py-24 px-4" style={{ background: "var(--bg)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-eyebrow">O que fazemos</span>
          <h2 className="section-heading mt-3 mb-4">Nossos Serviços</h2>
          <p className="section-subtext">
            Soluções completas em climatização para sua residência ou empresa
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service) => (
            <div
              key={service.title}
              className="group p-6 rounded-xl transition-all duration-300"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(126,200,216,0.2)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.borderColor =
                  "var(--border)";
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
              }}
            >
              <div className="mb-4">{service.icon}</div>
              <h3
                style={{
                  fontFamily:
                    "var(--font-display, 'Barlow Condensed', sans-serif)",
                  fontWeight: 700,
                  fontSize: "1.15rem",
                  letterSpacing: "-0.01em",
                  color: "var(--text)",
                  marginBottom: "0.5rem",
                }}
              >
                {service.title}
              </h3>
              <p
                style={{
                  fontSize: "0.875rem",
                  lineHeight: "1.65",
                  color: "var(--text-muted)",
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <a href="#contato" className="btn-primary inline-block px-8 py-3">
            Solicitar Orçamento Gratuito
          </a>
        </div>
      </div>
    </section>
  );
}
