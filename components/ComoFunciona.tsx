'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const steps = [
  {
    num: '01',
    title: 'Visão Geral do Sistema',
    desc: 'Um sistema de ar condicionado é composto por duas unidades principais conectadas por tubulação de cobre especializada. A condensadora fica do lado externo e expele o calor captado do ambiente. A evaporadora fica dentro e distribui o ar refrigerado.',
    highlight: 'overview',
  },
  {
    num: '02',
    title: 'Unidade Condensadora',
    desc: 'Instalada do lado de fora, a condensadora abriga o compressor e o condensador. O compressor pressuriza o gás refrigerante, que libera o calor absorvido do interior para o ambiente externo através do ventilador e das aletas de troca térmica.',
    highlight: 'condensadora',
  },
  {
    num: '03',
    title: 'Tubulação de Cobre',
    desc: 'Duas linhas de tubo de cobre (líquido e vapor) conectam as unidades. Uma terceira linha conduz o dreno de condensação para fora. O cabeamento elétrico e o cabo de comunicação completam o conjunto, todos passando protegidos por eletroduto.',
    highlight: 'pipes',
  },
  {
    num: '04',
    title: 'Unidade Evaporadora',
    desc: 'A evaporadora pode ser Split Hi-Wall (parede, mais comum em residências), Cassete 4 vias (teto, ideal para ambientes amplos e comerciais) ou Split Duto (embutido em forro, invisível). A escolha depende do ambiente e do projeto arquitetônico.',
    highlight: 'evaporadora',
  },
  {
    num: '05',
    title: 'Ambiente Climatizado',
    desc: 'Com tudo instalado corretamente, o sistema mantém o ambiente entre 18°C e 25°C com eficiência energética máxima. Nossa equipe realiza a carga de gás, comissionamento e testes de performance antes da entrega. Garantia em todos os serviços.',
    highlight: 'result',
  },
]

/* ─── SVG Illustration ─── */
function AcIllustration({ highlight }: { highlight: string }) {
  const showCondensadora = highlight === 'condensadora' || highlight === 'overview' || highlight === 'pipes' || highlight === 'result'
  const showPipes = highlight === 'pipes' || highlight === 'evaporadora' || highlight === 'result'
  const showSplitHiwall = highlight !== 'evaporadora'
  const showCassete = highlight === 'evaporadora'
  const showAirflow = highlight === 'result'
  const highlightCond = highlight === 'condensadora'
  const highlightPipes = highlight === 'pipes'
  const highlightEvap = highlight === 'evaporadora'

  return (
    <svg viewBox="0 0 500 400" className="w-full max-w-lg" aria-hidden="true">
      {/* Sky background */}
      <rect x="0" y="0" width="500" height="400" fill="#071929" />

      {/* Ground */}
      <rect x="0" y="320" width="500" height="80" fill="#0a2235" />

      {/* House exterior wall */}
      <rect x="50" y="120" width="280" height="200" fill="#0d2b44" stroke="#1a4060" strokeWidth="1" />

      {/* Roof */}
      <polygon points="30,120 190,40 390,120" fill="#0a1f33" stroke="#1a4060" strokeWidth="1" />

      {/* Interior room */}
      <rect x="60" y="130" width="260" height="180" fill="#071929" stroke="#1a4060" strokeWidth="0.5" />

      {/* Window */}
      <rect x="270" y="150" width="40" height="50" fill="#0e3a5c" stroke="#2a6090" strokeWidth="1" />
      <line x1="290" y1="150" x2="290" y2="200" stroke="#2a6090" strokeWidth="0.5" />
      <line x1="270" y1="175" x2="310" y2="175" stroke="#2a6090" strokeWidth="0.5" />

      {/* Ceiling line */}
      <line x1="60" y1="140" x2="320" y2="140" stroke="#1a4060" strokeWidth="1" />

      {/* Floor line */}
      <line x1="60" y1="310" x2="320" y2="310" stroke="#1a4060" strokeWidth="1" />

      {/* Split Hi-Wall evaporadora */}
      {showSplitHiwall && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <rect
            x="80" y="148" width="120" height="28"
            rx="4"
            fill={highlightEvap ? '#1a4060' : '#0e3a5c'}
            stroke={highlightEvap ? '#8b5cf6' : '#06b6d4'}
            strokeWidth={highlightEvap ? 2 : 1.5}
          />
          <text x="140" y="167" textAnchor="middle" fill="#a5d8ff" fontSize="10" fontFamily="sans-serif">
            Split Hi-Wall
          </text>
          {showAirflow && (
            <>
              <motion.line x1="90" y1="180" x2="90" y2="210" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, repeat: Infinity, repeatType: 'loop' }} />
              <motion.line x1="110" y1="180" x2="110" y2="220" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.2, repeat: Infinity, repeatType: 'loop' }} />
              <motion.line x1="130" y1="180" x2="130" y2="215" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.4, repeat: Infinity, repeatType: 'loop' }} />
              <motion.line x1="150" y1="180" x2="150" y2="210" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.6, repeat: Infinity, repeatType: 'loop' }} />
              <motion.line x1="170" y1="180" x2="170" y2="220" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4,3"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1, delay: 0.8, repeat: Infinity, repeatType: 'loop' }} />
            </>
          )}
        </motion.g>
      )}

      {/* Cassete 4 vias (teto) */}
      {showCassete && (
        <motion.g initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring', stiffness: 120 }}>
          <rect x="140" y="142" width="80" height="20" rx="3" fill="#1a1060" stroke="#8b5cf6" strokeWidth="2" />
          <text x="180" y="156" textAnchor="middle" fill="#d0bfff" fontSize="9" fontFamily="sans-serif">Cassete 4 vias</text>
          <line x1="160" y1="162" x2="145" y2="175" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3,2" />
          <line x1="180" y1="162" x2="180" y2="178" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3,2" />
          <line x1="200" y1="162" x2="215" y2="175" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3,2" />
          <line x1="180" y1="142" x2="180" y2="132" stroke="#8b5cf6" strokeWidth="1.5" strokeDasharray="3,2" />
        </motion.g>
      )}

      {/* Copper pipes */}
      {showPipes && (
        <motion.g>
          <motion.path
            d="M 200 160 L 330 160 L 330 200 L 370 200"
            fill="none"
            stroke={highlightPipes ? '#f59e0b' : '#c47c1e'}
            strokeWidth={highlightPipes ? 3 : 2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 200 170 L 330 170 L 330 212 L 370 212"
            fill="none"
            stroke={highlightPipes ? '#f59e0b' : '#c47c1e'}
            strokeWidth={highlightPipes ? 3 : 2}
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeInOut' }}
          />
          {highlightPipes && (
            <motion.text
              x="295" y="152" fill="#f59e0b" fontSize="9" fontFamily="sans-serif"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
            >
              tubo cobre
            </motion.text>
          )}
        </motion.g>
      )}

      {/* Condensadora (external unit) */}
      {showCondensadora && (
        <motion.g
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <rect
            x="370" y="185" width="90" height="70"
            rx="4"
            fill={highlightCond ? '#1a2040' : '#0e2a42'}
            stroke={highlightCond ? '#f59e0b' : '#2a6090'}
            strokeWidth={highlightCond ? 2.5 : 1.5}
          />
          {/* Fan grille lines */}
          <circle cx="415" cy="220" r="22" fill="none" stroke={highlightCond ? '#f59e0b' : '#2a6090'} strokeWidth="1" />
          <circle cx="415" cy="220" r="14" fill="none" stroke={highlightCond ? '#f59e0b' : '#2a6090'} strokeWidth="1" />
          <circle cx="415" cy="220" r="4" fill={highlightCond ? '#f59e0b' : '#2a6090'} />
          <line x1="415" y1="198" x2="415" y2="242" stroke={highlightCond ? '#f59e0b' : '#2a6090'} strokeWidth="0.8" />
          <line x1="393" y1="220" x2="437" y2="220" stroke={highlightCond ? '#f59e0b' : '#2a6090'} strokeWidth="0.8" />
          <text x="415" y="266" textAnchor="middle" fill={highlightCond ? '#fcd34d' : '#5a8ab0'} fontSize="9" fontFamily="sans-serif">
            Condensadora
          </text>
          {highlightCond && (
            <>
              <motion.text x="462" y="200" fill="#ef4444" fontSize="10" fontFamily="sans-serif"
                initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                calor
              </motion.text>
              <motion.path d="M 462 208 Q 475 200 488 208 Q 475 216 462 208" fill="#ef4444" opacity="0.6"
                initial={{ opacity: 0 }} animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }} />
            </>
          )}
        </motion.g>
      )}

      {/* Thermometer / result state */}
      {showAirflow && (
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 150, delay: 0.3 }}
        >
          <rect x="215" y="255" width="70" height="34" rx="8" fill="#0e2a42" stroke="#06b6d4" strokeWidth="1.5" />
          <text x="250" y="278" textAnchor="middle" fill="#06b6d4" fontSize="16" fontWeight="bold" fontFamily="sans-serif">
            22°C
          </text>
        </motion.g>
      )}

      {/* Step label on illustration */}
      <rect x="50" y="330" width="120" height="20" rx="3" fill="#1a3a5c" />
      <text x="110" y="344" textAnchor="middle" fill="#06b6d4" fontSize="10" fontFamily="sans-serif">
        {steps.findIndex(s => s.highlight === highlight) + 1} / 5
      </text>
    </svg>
  )
}

/* ─── Main Component ─── */
export default function ComoFunciona() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [mobileStep, setMobileStep] = useState(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const activeStep = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], [0, 1, 2, 3, 4, 4])

  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    const unsubscribe = activeStep.on('change', (v) => {
      setCurrentStep(Math.min(Math.round(v), steps.length - 1))
    })
    return unsubscribe
  }, [activeStep])

  const step = isMobile ? steps[mobileStep] : steps[currentStep]

  if (isMobile) {
    return (
      <section id="como-funciona" style={{ background: '#071929' }} className="py-20 px-4">
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#06b6d4' }}>
            Tecnologia
          </p>
          <h2 className="text-3xl font-bold text-white text-center mb-2">Como Funciona</h2>
          <p className="text-center mb-8" style={{ color: '#5a8ab0' }}>
            Entenda o processo completo de climatização
          </p>

          {/* Mobile step buttons */}
          <div className="flex justify-center gap-2 mb-8 flex-wrap">
            {steps.map((s, i) => (
              <button
                key={i}
                onClick={() => setMobileStep(i)}
                className="w-9 h-9 rounded-full text-sm font-bold transition-all"
                style={{
                  background: i === mobileStep ? '#06b6d4' : '#1a3a5c',
                  color: i === mobileStep ? '#fff' : '#5a8ab0',
                  border: i === mobileStep ? 'none' : '1px solid #1a3a5c',
                }}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mobileStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center gap-6"
            >
              <AcIllustration highlight={step.highlight} />
              <div className="text-center">
                <span className="text-5xl font-bold" style={{ color: '#06b6d4', opacity: 0.3 }}>{step.num}</span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#8ab8d8' }}>{step.desc}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-3 mt-8">
            {mobileStep > 0 && (
              <button
                onClick={() => setMobileStep(mobileStep - 1)}
                className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ background: '#1a3a5c', color: '#06b6d4', border: '1px solid #06b6d4' }}
              >
                Anterior
              </button>
            )}
            {mobileStep < steps.length - 1 ? (
              <button
                onClick={() => setMobileStep(mobileStep + 1)}
                className="px-5 py-2 rounded-lg text-sm font-medium transition-all"
                style={{ background: '#06b6d4', color: '#fff' }}
              >
                Próximo
              </button>
            ) : (
              <a
                href="#contato"
                className="px-5 py-2 rounded-lg text-sm font-bold transition-all"
                style={{ background: '#06b6d4', color: '#fff' }}
              >
                Solicitar Orçamento
              </a>
            )}
          </div>
        </div>
      </section>
    )
  }

  /* Desktop scrollytelling */
  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      style={{ height: '500vh', background: '#071929' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Header */}
        <div className="text-center pt-10 pb-4 px-4">
          <p className="text-sm font-semibold uppercase tracking-widest mb-1" style={{ color: '#06b6d4' }}>
            Tecnologia
          </p>
          <h2 className="text-3xl font-bold text-white">Como Funciona</h2>
        </div>

        {/* Split layout */}
        <div className="flex flex-1 overflow-hidden relative px-6 pb-6 gap-6">
          {/* Left: SVG illustration (55%) */}
          <div
            className="flex items-center justify-center rounded-2xl overflow-hidden"
            style={{ flex: '0 0 55%', background: '#0a1f35', border: '1px solid #1a3a5c' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={step.highlight}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="w-full h-full flex items-center justify-center p-8"
              >
                <AcIllustration highlight={step.highlight} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: text panel (45%) */}
          <div
            className="flex flex-col justify-center relative"
            style={{ flex: '0 0 calc(45% - 1.5rem - 28px)', paddingRight: '28px' }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
              >
                <span
                  className="text-7xl font-black leading-none select-none"
                  style={{ color: '#06b6d4', opacity: 0.18 }}
                >
                  {step.num}
                </span>
                <h3 className="text-2xl font-bold text-white mt-1 mb-4 leading-tight">
                  {step.title}
                </h3>
                <p className="leading-relaxed text-sm" style={{ color: '#8ab8d8' }}>
                  {step.desc}
                </p>
                {currentStep === steps.length - 1 && (
                  <motion.a
                    href="#contato"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="inline-block mt-8 px-7 py-3 rounded-lg font-bold text-sm transition-all hover:opacity-90"
                    style={{ background: '#06b6d4', color: '#fff' }}
                  >
                    Solicitar Orçamento Gratuito
                  </motion.a>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Scroll hint on first step */}
            {currentStep === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute bottom-0 text-xs"
                style={{ color: '#3a6a8a' }}
              >
                Role para baixo para continuar
              </motion.p>
            )}
          </div>

          {/* Progress dots */}
          <div
            className="absolute right-0 top-1/2 flex flex-col gap-3"
            style={{ transform: 'translateY(-50%)' }}
          >
            {steps.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width: i === currentStep ? 10 : 8,
                  height: i === currentStep ? 10 : 8,
                  background: i === currentStep ? '#06b6d4' : '#1a3a5c',
                  border: i < currentStep ? '1px solid #06b6d4' : '1px solid #2a5a7a',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
