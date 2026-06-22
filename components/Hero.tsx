'use client'

export default function Hero() {
  return (
    <section
      id="inicio"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      {/* Video background */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/daikin-hero.mp4" type="video/mp4" />
      </video>

      {/* Dark overlay */}
      <div
        className="absolute inset-0 z-10"
        style={{
          background:
            'linear-gradient(to bottom, rgba(10,21,32,0.65) 0%, rgba(10,21,32,0.52) 55%, rgba(10,21,32,0.80) 100%)',
        }}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4">
        <p className="text-sm font-semibold uppercase tracking-widest mb-4" style={{ color: '#06b6d4' }}>
          Especialistas em Climatização
        </p>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight max-w-3xl mb-5">
          Conforto Térmico com{' '}
          <span style={{ color: '#06b6d4' }}>Excelência</span> e Tecnologia
        </h1>

        <p className="text-lg sm:text-xl text-blue-100 max-w-2xl mb-8 leading-relaxed">
          Instalação, Manutenção e Projetos de Ar Condicionado em São Paulo e
          Grande São Paulo
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a href="#contato" className="btn-primary text-base px-8 py-4">
            Solicitar Orçamento Grátis
          </a>
          <a href="#obras" className="btn-outline text-base px-8 py-4">
            Ver Nossos Projetos
          </a>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 animate-bounce">
          <span className="text-xs text-blue-200 uppercase tracking-widest">scroll</span>
          <svg width="20" height="20" fill="none" stroke="#06b6d4" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  )
}
