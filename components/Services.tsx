const services = [
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="#06b6d4" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
        <rect x="9" y="3" width="6" height="4" rx="1" />
        <path d="M9 12h6M9 16h4" />
      </svg>
    ),
    title: 'Visita Técnica Gratuita',
    description:
      'Avaliamos seu espaço sem custo e indicamos a melhor solução para sua necessidade.',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="#06b6d4" strokeWidth="1.8" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="10" rx="2" />
        <path d="M7 7V5a1 1 0 011-1h8a1 1 0 011 1v2M12 17v2M8 21h8" />
      </svg>
    ),
    title: 'Instalação Split / VRF / Cassete',
    description:
      'Instalação profissional de todos os tipos de ar condicionado com técnicos certificados.',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="#06b6d4" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
    title: 'Manutenção Preventiva',
    description:
      'Contratos de manutenção para garantir o funcionamento ideal e prolongar a vida útil do equipamento.',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="#06b6d4" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    title: 'Projetos Corporativos',
    description:
      'Desenvolvemos projetos completos de climatização para escritórios, lojas e empreendimentos.',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="#06b6d4" strokeWidth="1.8" viewBox="0 0 24 24">
        <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
      </svg>
    ),
    title: 'Infraestrutura Completa',
    description:
      'Execução de toda a infraestrutura elétrica e de refrigeração necessária para a instalação.',
  },
  {
    icon: (
      <svg width="32" height="32" fill="none" stroke="#06b6d4" strokeWidth="1.8" viewBox="0 0 24 24">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
        <line x1="3" y1="6" x2="21" y2="6" />
        <path d="M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    title: 'Venda de Equipamentos',
    description:
      'Fornecemos equipamentos das melhores marcas com condições exclusivas para nossos clientes.',
  },
]

export default function Services() {
  return (
    <section id="servicos" className="py-20 px-4" style={{ background: '#f8fafc' }}>
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#06b6d4' }}>
          O que fazemos
        </p>
        <h2 className="section-title">Nossos Serviços</h2>
        <p className="section-subtitle">
          Soluções completas em climatização para sua empresa ou residência
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service) => (
            <div key={service.title} className="card-service">
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-lg font-bold mb-2" style={{ color: '#1a3a5c' }}>
                {service.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
