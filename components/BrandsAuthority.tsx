'use client'

import { motion } from 'framer-motion'

/* ─── Inline SVG logos (adapted for dark navy background) ─── */

const LogoDaikinWhite = () => (
  <svg viewBox="0 0 200 70" width="140" height="49" xmlns="http://www.w3.org/2000/svg" aria-label="Daikin">
    <polygon points="18,12 38,52 8,52" fill="#ffffff" />
    <text x="48" y="50" fontFamily="Arial Black, Impact, sans-serif" fontSize="34" fontWeight="900" fill="#ffffff" fontStyle="italic">DAIKIN</text>
  </svg>
)

const LogoLG = () => (
  <svg viewBox="0 0 180 70" width="120" height="47" xmlns="http://www.w3.org/2000/svg" aria-label="LG">
    <circle cx="35" cy="35" r="32" fill="#c0003c" />
    <text x="22" y="46" fontFamily="Arial Black, sans-serif" fontSize="26" fontWeight="900" fill="white">LG</text>
    <circle cx="24" cy="24" r="5" fill="none" stroke="white" strokeWidth="2" />
    <text x="90" y="48" fontFamily="Arial Black, sans-serif" fontSize="34" fontWeight="900" fill="#e2e8f0">LG</text>
  </svg>
)

const LogoSamsung = () => (
  <svg viewBox="0 0 260 70" width="180" height="49" xmlns="http://www.w3.org/2000/svg" aria-label="Samsung">
    <text x="10" y="50" fontFamily="Arial Black, Impact, sans-serif" fontSize="38" fontWeight="900" fill="#93c5fd" letterSpacing="2">SAMSUNG</text>
  </svg>
)

const LogoFujitsu = () => (
  <svg viewBox="0 0 220 90" width="140" height="63" xmlns="http://www.w3.org/2000/svg" aria-label="Fujitsu">
    <path d="M110,8 C110,8 100,2 104,14 C108,26 118,20 114,10 C112,5 108,5 110,8 Z M104,14 C100,26 90,20 94,10 C98,0 108,0 110,8" fill="none" stroke="#f87171" strokeWidth="3.5" />
    <ellipse cx="110" cy="8" rx="7" ry="5" fill="none" stroke="#f87171" strokeWidth="3.5" />
    <text x="10" y="78" fontFamily="Georgia, Times New Roman, serif" fontSize="38" fontWeight="700" fill="#e2e8f0" letterSpacing="1">FUJITSU</text>
  </svg>
)

const LogoCarrier = () => (
  <svg viewBox="0 0 220 80" width="150" height="55" xmlns="http://www.w3.org/2000/svg" aria-label="Carrier">
    <ellipse cx="110" cy="40" rx="108" ry="38" fill="#2563eb" />
    <ellipse cx="110" cy="40" rx="100" ry="31" fill="none" stroke="white" strokeWidth="2" />
    <text x="110" y="52" fontFamily="Palatino, Georgia, serif" fontSize="34" fontWeight="700" fill="white" textAnchor="middle" fontStyle="italic">Carrier</text>
  </svg>
)

const LogoElgin = () => (
  <svg viewBox="0 0 190 70" width="130" height="49" xmlns="http://www.w3.org/2000/svg" aria-label="Elgin">
    <path d="M18,20 A20,20 0 0,1 38,10" fill="none" stroke="#22d3ee" strokeWidth="7" strokeLinecap="round" />
    <text x="42" y="54" fontFamily="Arial Rounded MT Bold, Arial, sans-serif" fontSize="40" fontWeight="700" fill="#22d3ee">elgin</text>
  </svg>
)

const LogoMidea = () => (
  <svg viewBox="0 0 220 80" width="140" height="55" xmlns="http://www.w3.org/2000/svg" aria-label="Midea">
    <path d="M30,70 A50,50 0 1,1 80,20" fill="none" stroke="#22d3ee" strokeWidth="6" strokeLinecap="round" />
    <text x="70" y="65" fontFamily="Arial Rounded MT Bold, Arial, sans-serif" fontSize="40" fontWeight="700" fill="#22d3ee">Midea</text>
  </svg>
)

/* ─── Brand groups ─── */
const brandGroups = [
  {
    label: 'Alta performance residencial e comercial',
    brands: [
      { name: 'LG', Logo: LogoLG },
      { name: 'Samsung', Logo: LogoSamsung },
    ],
  },
  {
    label: 'Padrão VRF premium',
    brands: [
      { name: 'Carrier', Logo: LogoCarrier },
      { name: 'Fujitsu', Logo: LogoFujitsu },
    ],
  },
  {
    label: 'Custo-eficiente para projetos de escala',
    brands: [
      { name: 'Elgin', Logo: LogoElgin },
      { name: 'Midea', Logo: LogoMidea },
    ],
  },
]

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07 },
  }),
}

export default function BrandsAuthority() {
  return (
    <section
      id="marcas"
      style={{ background: '#0a1929' }}
      className="py-20 px-4"
    >
      <div className="max-w-6xl mx-auto">

        {/* ─── Section header ─── */}
        <div className="mb-14 text-center">
          <p
            className="text-xs font-semibold uppercase tracking-widest mb-3"
            style={{ color: '#22d3ee', fontFamily: 'monospace' }}
          >
            Fabricantes Parceiros
          </p>
          <h2
            className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
            style={{ color: '#f0f9ff' }}
          >
            Marcas e fabricantes com os quais trabalhamos
          </h2>
          <p
            className="text-base max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#7fb3d3' }}
          >
            Trabalhamos com os principais fabricantes do mercado, com domínio
            técnico de cada linha — da instalação ao comissionamento.
          </p>
        </div>

        {/* ─── Daikin featured card ─── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: '-80px' }}
          className="rounded-2xl mb-12 overflow-hidden"
          style={{
            background: '#0f2a45',
            border: '1px solid rgba(34,211,238,0.18)',
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center justify-center"
              style={{ minWidth: 180 }}
            >
              <LogoDaikinWhite />
            </div>

            {/* Divider */}
            <div
              className="hidden md:block self-stretch w-px"
              style={{ background: 'rgba(34,211,238,0.15)' }}
            />

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                  style={{
                    background: 'rgba(34,211,238,0.12)',
                    color: '#22d3ee',
                    border: '1px solid rgba(34,211,238,0.25)',
                  }}
                >
                  Credenciado Oficial
                </span>
                <span
                  className="text-xs font-medium"
                  style={{ color: '#7fb3d3' }}
                >
                  Todas as linhas residenciais e comerciais
                </span>
              </div>
              <p
                className="text-sm leading-relaxed"
                style={{ color: '#94bfda' }}
              >
                A Daikin credencia tecnicamente seus parceiros por linha de produto —
                splits residenciais, sistemas VRF e equipamentos comerciais são
                certificações distintas, cada uma com exigências próprias de
                treinamento e execução. A NP Climatização mantém certificação ativa
                em todas as linhas que instala, renovada via treinamentos
                obrigatórios com o fabricante.
              </p>
            </div>
          </div>
        </motion.div>

        {/* ─── Brand groups grid ─── */}
        <div className="space-y-10">
          {brandGroups.map((group, gi) => (
            <div key={group.label}>
              {/* Group label */}
              <p
                className="text-xs uppercase tracking-widest mb-5 pb-3"
                style={{
                  color: 'rgba(127,179,211,0.5)',
                  borderBottom: '1px solid rgba(34,211,238,0.08)',
                  fontFamily: 'monospace',
                }}
              >
                {group.label}
              </p>

              {/* Brand cells */}
              <div className="grid grid-cols-2 md:grid-cols-2 gap-4">
                {group.brands.map((brand, bi) => (
                  <motion.div
                    key={brand.name}
                    custom={gi * 2 + bi}
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeInUp}
                    viewport={{ once: true, margin: '-60px' }}
                    className="flex flex-col items-center justify-center py-7 px-6 rounded-xl transition-colors duration-300"
                    style={{
                      background: '#0c2036',
                      border: '1px solid rgba(34,211,238,0.08)',
                    }}
                    onMouseEnter={e => {
                      ;(e.currentTarget as HTMLDivElement).style.background = '#112840'
                      ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(34,211,238,0.2)'
                    }}
                    onMouseLeave={e => {
                      ;(e.currentTarget as HTMLDivElement).style.background = '#0c2036'
                      ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(34,211,238,0.08)'
                    }}
                  >
                    <brand.Logo />
                    <span
                      className="mt-3 text-xs font-medium uppercase tracking-widest"
                      style={{ color: 'rgba(127,179,211,0.4)' }}
                    >
                      {brand.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ─── Bottom note ─── */}
        <p
          className="text-center text-xs mt-12"
          style={{ color: 'rgba(127,179,211,0.35)' }}
        >
          Instalações realizadas de acordo com os manuais técnicos de cada fabricante.
        </p>
      </div>
    </section>
  )
}
