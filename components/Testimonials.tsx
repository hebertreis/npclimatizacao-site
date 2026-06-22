const testimonials = [
  {
    name: 'Claudia Lopes & Monike Lafuente',
    company: 'Studio Tan-Gram',
    text: 'Profissionalismo e parceria definem a NP Climatização. Trabalhamos juntos em diversos projetos e sempre ficamos impressionados com a pontualidade e qualidade da execução.',
    stars: 5,
  },
  {
    name: 'Karen Gantus & Viviane Prosofsky',
    company: 'Vikasa Arquitetura',
    text: 'A NP Climatização entregou nosso projeto com profissionalismo, pontualidade e excelência. Recomendamos sem hesitar para qualquer projeto residencial ou corporativo.',
    stars: 5,
  },
  {
    name: 'Ricardo Mendes',
    company: 'Gerente de Facilidades — Empresa Corporativa',
    text: 'Contratamos a NP para o contrato de manutenção de todo nosso parque de ar condicionado. Atendimento impecável e técnicos muito qualificados.',
    stars: 5,
  },
]

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="py-20 px-4" style={{ background: '#f0f7ff' }}>
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#06b6d4' }}>
          Depoimentos
        </p>
        <h2 className="section-title">O que nossos clientes dizem</h2>
        <p className="section-subtitle">
          A satisfação dos nossos clientes é nossa maior conquista
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-xl p-6 shadow-sm flex flex-col"
              style={{ border: '1px solid #d0e8f8' }}
            >
              <Stars count={t.stars} />
              <p className="text-sm text-gray-700 leading-relaxed mt-4 mb-4 flex-1">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="border-t pt-4" style={{ borderColor: '#e0f2fe' }}>
                <p className="font-semibold text-sm" style={{ color: '#1a3a5c' }}>
                  {t.name}
                </p>
                <p className="text-xs text-gray-500">{t.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
