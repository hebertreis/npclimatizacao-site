const IconCertified = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M6 20v-2a6 6 0 0112 0v2" />
    <path d="M9 11l1.5 1.5L14 9" />
  </svg>
)

const IconSpeed = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
)

const IconShield = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <polyline points="9 12 11 14 15 10" />
  </svg>
)

const IconLocation = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const IconTrophy = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0012 0V2z" />
  </svg>
)

const IconHandshake = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
    <path d="M12 5.36L8.87 8.5a2.13 2.13 0 003.13 2.9l.87-.87" />
    <path d="M12 5.36l3.13 3.14a2.13 2.13 0 01-3.13 2.9l-.87-.87" />
  </svg>
)

const items = [
  {
    Icon: IconCertified,
    title: 'Técnicos Certificados',
    desc: 'Todos os nossos profissionais são treinados e certificados diretamente pelos fabricantes.',
  },
  {
    Icon: IconSpeed,
    title: 'Resposta em até 2h',
    desc: 'Atendemos sua solicitação de orçamento ou emergência em até 2 horas úteis.',
  },
  {
    Icon: IconShield,
    title: 'Garantia Estendida',
    desc: 'Oferecemos garantia em todos os serviços e equipamentos instalados pela nossa equipe.',
  },
  {
    Icon: IconLocation,
    title: 'Atende SP e Grande SP',
    desc: 'Cobertura completa na capital paulista e toda a região metropolitana.',
  },
  {
    Icon: IconTrophy,
    title: '15+ Anos de Mercado',
    desc: 'Mais de uma década de experiência em projetos residenciais, comerciais e corporativos.',
  },
  {
    Icon: IconHandshake,
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
              <span className="flex-shrink-0 mt-0.5"><item.Icon /></span>
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
