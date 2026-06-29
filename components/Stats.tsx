const stats = [
  { value: "15+", label: "Anos de Experiência" },
  { value: "500+", label: "Clientes Atendidos" },
  { value: "1.000+", label: "Projetos Realizados" },
  { value: "12", label: "Marcas Parceiras" },
];

export default function Stats() {
  return (
    <section style={{ background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px" style={{ background: "var(--border)" }}>
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center px-6 py-8"
              style={{ background: "var(--surface)" }}
            >
              <p
                style={{
                  fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)",
                  fontSize: "clamp(2.5rem, 5vw, 3.5rem)",
                  fontWeight: 800,
                  color: "var(--text)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1,
                  marginBottom: "0.35rem",
                }}
              >
                {stat.value}
              </p>
              <p
                style={{
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
