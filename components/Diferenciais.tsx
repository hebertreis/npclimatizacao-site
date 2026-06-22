const items = [
  {
    icon: '🎓',
    title: 'Técnicos Certificados',
    desc: 'Todos os nossos profissionais são treinados e certificados diretamente pelos fabricantes.',
  },
  {
    icon: '⚡',
    title: 'Resposta em até 2h',
    desc: 'Atendemos sua solicitação de orçamento ou emergência em até 2 horas úteis.',
  },
  {
    icon: '🛡️',
    title: 'Garantia Estendida',
    desc: 'Oferecemos garantia em todos os serviços e equipamentos instalados pela nossa equipe.',
  },
  {
    icon: '📍',
    title: 'Atende SP e Grande SP',
    desc: 'Cobertura completa na capital paulista e toda a região metropolitana.',
  },
  {
    icon: '🏆',
    title: '15+ Anos de Mercado',
    desc: 'Mais de uma década de experiência em projetos residenciais, comerciais e corporativos.',
  },
  {
    icon: '🤝',
    title: 'Parceria com Fabricantes',
    desc: 'Credenciados pelas principais marcas: Daikin, LG, Samsung, Fujitsu e mais.',
  },
]

export default function Diferenciais() {
  return (
    <section
      id="diferenciais"
      className="py-20 px-4"
      style={{ background: '#f0f7ff' }}
    >
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#06b6d4' }}>
          Por que nos escolher
        </p>
        <h2 className="section-title">Diferenciais NP Climatização</h2>
        <p className="section-subtitle">
          Profissionalismo, qualidade e comprometimento em cada projeto
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((item) => (
            <div
              key={item.title}
              className="flex gap-4 p-5 rounded-xl bg-white"
              style={{ border: '1px solid #d0e8f8' }}
            >
              <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
              <div>
                <h3 className="font-bold text-base mb-1" style={{ color: '#1a3a5c' }}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <a href="#contato" className="btn-primary inline-block px-8 py-3">
            Solicitar Orçamento Gratuito
          </a>
        </div>
      </div>
    </section>
  )
}
