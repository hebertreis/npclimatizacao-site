const testimonials = [
  {
    name: "Claudia Lopes & Monike Lafuente",
    company: "Studio Tan-Gram",
    text: "Profissionalismo e parceria definem a NP Climatização. Trabalhamos juntos em diversos projetos e sempre ficamos impressionados com a pontualidade e qualidade da execução.",
    stars: 5,
  },
  {
    name: "Karen Gantus & Viviane Prosofsky",
    company: "Vikasa Arquitetura",
    text: "A NP Climatização entregou nosso projeto com profissionalismo, pontualidade e excelência. Recomendamos sem hesitar para qualquer projeto residencial ou corporativo.",
    stars: 5,
  },
  {
    name: "Ricardo Mendes",
    company: "Gerente de Facilidades",
    text: "Contratamos a NP para o contrato de manutenção de todo nosso parque de ar condicionado. Atendimento impecável e técnicos muito qualificados.",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b" aria-hidden>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-24 px-4" style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <span className="section-eyebrow">Depoimentos</span>
          <h2 className="section-heading mt-3 mb-4">O que nossos clientes dizem</h2>
          <p className="section-subtext">
            A satisfação dos nossos clientes é nossa maior conquista
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex flex-col p-6 rounded-xl"
              style={{
                background: "var(--surface-2)",
                border: "1px solid var(--border)",
              }}
            >
              <Stars count={t.stars} />
              <p
                className="flex-1 mt-5 mb-5"
                style={{
                  fontSize: "0.9rem",
                  lineHeight: 1.75,
                  color: "var(--text-muted)",
                  fontStyle: "italic",
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
              <div
                className="pt-4"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <p
                  style={{
                    fontWeight: 700,
                    fontSize: "0.875rem",
                    color: "var(--text)",
                  }}
                >
                  {t.name}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--text-muted)",
                    marginTop: "0.2rem",
                  }}
                >
                  {t.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
