const stats = [
  { value: '15+', label: 'Anos de Experiência' },
  { value: '500+', label: 'Clientes Atendidos' },
  { value: '1.000+', label: 'Projetos Realizados' },
  { value: '12', label: 'Marcas Parceiras' },
]

export default function Stats() {
  return (
    <section style={{ background: '#0e2a42' }}>
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center rounded-xl px-4 py-5"
              style={{ background: '#1a3a5c', border: '1px solid rgba(6,182,212,0.3)' }}
            >
              <p
                className="text-3xl font-bold mb-1"
                style={{ color: '#06b6d4' }}
              >
                {stat.value}
              </p>
              <p className="text-sm text-blue-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
