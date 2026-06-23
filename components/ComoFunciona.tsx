'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

const STEP_COLORS = ['#06b6d4', '#f59e0b', '#f59e0b', '#8b5cf6', '#22c55e']

const STEPS = [
  {
    num: '01',
    tag: 'VISÃO GERAL',
    title: 'Visão Geral\ndo Sistema',
    desc: 'Um sistema de ar condicionado é composto por duas unidades principais conectadas por tubulação de cobre especializada. A condensadora fica do lado externo e expele o calor. A evaporadora fica dentro do ambiente e distribui o ar refrigerado com precisão.',
    metrics: [
      { value: '60.000', label: 'BTU máximo' },
      { value: 'A+++', label: 'Eficiência' },
      { value: '2h', label: 'Instalação' },
    ],
    highlight: 'overview',
  },
  {
    num: '02',
    tag: 'UNIDADE EXTERNA',
    title: 'Condensadora\nExterna',
    desc: 'Instalada do lado de fora, a condensadora abriga o compressor e o condensador. O compressor pressuriza o gás refrigerante, que libera o calor absorvido do interior através do ventilador e das aletas de troca térmica.',
    metrics: [
      { value: '120°C', label: 'Calor expulso' },
      { value: '5 anos', label: 'Garantia' },
      { value: 'IP44', label: 'Proteção' },
    ],
    highlight: 'condensadora',
  },
  {
    num: '03',
    tag: 'TUBULAÇÃO',
    title: 'Tubulação\nde Cobre',
    desc: 'Duas linhas de tubo de cobre — líquido e vapor — conectam as unidades. Uma terceira conduz o dreno de condensação para fora. O cabeamento elétrico e o cabo de comunicação completam o conjunto, todos protegidos por eletroduto.',
    metrics: [
      { value: '22mm', label: 'Diâmetro máx.' },
      { value: 'Classe A', label: 'Cobre' },
      { value: '0 emendas', label: 'Padrão NP' },
    ],
    highlight: 'pipes',
  },
  {
    num: '04',
    tag: 'UNIDADE INTERNA',
    title: 'Evaporadora\nInterna',
    desc: 'A evaporadora pode ser Split Hi-Wall (parede), Cassete 4 vias (teto, ideal para ambientes amplos) ou Split Duto (embutido no forro, invisível). A escolha ideal depende do ambiente e do projeto arquitetônico.',
    metrics: [
      { value: '3', label: 'Tipos' },
      { value: '4 vias', label: 'Cassete' },
      { value: '180°', label: 'Hi-Wall' },
    ],
    highlight: 'evaporadora',
  },
  {
    num: '05',
    tag: 'RESULTADO',
    title: 'Ambiente\nClimatizado',
    desc: 'Com tudo instalado, o sistema mantém o ambiente entre 18°C e 25°C com eficiência energética máxima. Nossa equipe realiza a carga de gás, comissionamento e testes de performance antes da entrega com garantia total.',
    metrics: [
      { value: '22°C', label: 'Temp. ideal' },
      { value: '-40%', label: 'Conta de luz' },
      { value: '100%', label: 'Satisfação' },
    ],
    highlight: 'result',
  },
]

/* ─── SVG Illustration ─── */
function HudLabel({
  x, y, label, value, color, align = 'right',
}: {
  x: number; y: number; label: string; value: string; color: string; align?: 'left' | 'right'
}) {
  const w = 118
  const ox = align === 'right' ? x : x - w
  return (
    <g>
      <rect x={ox} y={y - 18} width={w} height={44} rx={6} fill="rgba(5,13,26,0.94)" stroke={color} strokeWidth={0.8} />
      <text x={ox + 10} y={y - 3} fill={color} fontSize={7} fontFamily="monospace" opacity={0.8}>{label}</text>
      <text x={ox + 10} y={y + 18} fill={color} fontSize={17} fontFamily="monospace" fontWeight="bold">{value}</text>
    </g>
  )
}

function AcIllustration({ highlight, color }: { highlight: string; color: string }) {
  const glowFilter = `drop-shadow(0 0 10px ${color}) drop-shadow(0 0 22px ${color}55)`
  const isCond = highlight === 'condensadora'
  const isPipes = highlight === 'pipes'
  const isEvap = highlight === 'evaporadora'
  const isResult = highlight === 'result'
  const showCassete = isEvap
  const showSplit = !isEvap

  return (
    <svg viewBox="0 0 520 400" className="w-full max-w-[520px]" aria-hidden="true">
      <defs>
        <filter id="glow-active">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="bg-grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#071929" />
          <stop offset="100%" stopColor="#050d1a" />
        </linearGradient>
        <linearGradient id="floor-grad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#0a2235" />
          <stop offset="100%" stopColor="#071929" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width={520} height={400} fill="url(#bg-grad)" />

      {/* Grid dots */}
      {Array.from({ length: 6 }, (_, r) =>
        Array.from({ length: 9 }, (_, c) => (
          <circle key={`${r}-${c}`} cx={40 + c * 56} cy={40 + r * 58} r={1} fill="#1a3a5c" opacity={0.5} />
        ))
      )}

      {/* Isometric house - top face */}
      <polygon points="160,90 300,50 440,90 300,130" fill="#0a2035" stroke="#1a4060" strokeWidth={1} />
      {/* Front face */}
      <polygon points="160,90 160,290 300,330 300,130" fill="#071929" stroke="#1a3a5c" strokeWidth={1} />
      {/* Side face */}
      <polygon points="300,130 300,330 440,290 440,90" fill="#060e1c" stroke="#0d2035" strokeWidth={1} />

      {/* Interior room lines */}
      <line x1="160" y1="165" x2="300" y2="205" stroke="#0e2a42" strokeWidth={0.8} strokeDasharray="4,3" />
      <line x1="300" y1="205" x2="440" y2="165" stroke="#0e2a42" strokeWidth={0.8} strokeDasharray="4,3" />
      <line x1="300" y1="205" x2="300" y2="330" stroke="#0e2a42" strokeWidth={0.8} strokeDasharray="4,3" />

      {/* Floor */}
      <polygon points="160,290 300,330 440,290 440,310 300,350 160,310" fill="url(#floor-grad)" stroke="#1a3a5c" strokeWidth={0.5} />

      {/* Window */}
      <rect x="370" y="155" width="44" height="38" rx={2} fill="#0e3a5c" stroke="#2a6090" strokeWidth={1} />
      <line x1="392" y1="155" x2="392" y2="193" stroke="#2a6090" strokeWidth={0.5} />
      <line x1="370" y1="174" x2="414" y2="174" stroke="#2a6090" strokeWidth={0.5} />

      {/* ── Split Hi-Wall evaporadora ── */}
      {showSplit && (
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          style={{ filter: isEvap ? 'none' : undefined }}
        >
          <rect
            x={175} y={162} width={112} height={26} rx={5}
            fill={isResult ? '#0a2035' : '#0e3a5c'}
            stroke={isResult ? color : '#1a4060'}
            strokeWidth={isResult ? 1.5 : 1}
            style={{ filter: isResult ? glowFilter : 'none' }}
          />
          <text x={231} y={179} textAnchor="middle" fill={isResult ? color : '#5a8ab0'} fontSize={9} fontFamily="sans-serif">
            Split Hi-Wall
          </text>

          {/* Airflow arrows */}
          {isResult && (
            <>
              {[185, 205, 225, 245, 265, 285].map((x, i) => (
                <motion.line
                  key={x}
                  x1={x} y1={190} x2={x} y2={230}
                  stroke={color}
                  strokeWidth={1.2}
                  strokeDasharray="4,3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 0.8, delay: i * 0.1, repeat: Infinity, repeatType: 'loop' }}
                />
              ))}
            </>
          )}
        </motion.g>
      )}

      {/* ── Cassete 4 vias ── */}
      {showCassete && (
        <motion.g
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 140, damping: 18 }}
        >
          <rect x={238} y={155} width={72} height={18} rx={3} fill="#1a1060" stroke={color} strokeWidth={1.8}
            style={{ filter: glowFilter }} />
          <text x={274} y={168} textAnchor="middle" fill={color} fontSize={8} fontFamily="sans-serif">Cassete 4v</text>
          {[[-1, 1], [0, 1], [1, 1], [0, -1]].map(([dx, dy], i) => (
            <motion.line
              key={i}
              x1={274 + dx * 12} y1={173 + 0} x2={274 + dx * 22} y2={173 + dy * 20}
              stroke={color} strokeWidth={1.2} strokeDasharray="3,2"
              initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1, repeat: Infinity, repeatDelay: 1 }}
            />
          ))}
        </motion.g>
      )}

      {/* ── Copper pipes ── */}
      {(isPipes || isResult) && (
        <motion.g>
          <motion.path
            d="M 287 175 L 360 175 L 360 220 L 430 220"
            fill="none"
            stroke={isPipes ? '#f59e0b' : '#c47c1e'}
            strokeWidth={isPipes ? 2.5 : 2}
            strokeLinecap="round"
            style={{ filter: isPipes ? `drop-shadow(0 0 6px #f59e0b)` : 'none' }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, ease: 'easeInOut' }}
          />
          <motion.path
            d="M 287 183 L 360 183 L 360 230 L 430 230"
            fill="none"
            stroke={isPipes ? '#f59e0b' : '#c47c1e'}
            strokeWidth={isPipes ? 2.5 : 2}
            strokeLinecap="round"
            style={{ filter: isPipes ? `drop-shadow(0 0 6px #f59e0b)` : 'none' }}
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: 'easeInOut' }}
          />
          {isPipes && (
            <motion.text
              x={310} y={167}
              fill="#f59e0b" fontSize={9} fontFamily="monospace"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
            >
              tubo cobre ▶
            </motion.text>
          )}
        </motion.g>
      )}

      {/* ── Condensadora ── */}
      <motion.g
        animate={{
          opacity: 1,
          x: 0,
        }}
        initial={{ opacity: 0, x: 20 }}
        transition={{ duration: 0.5 }}
      >
        <rect
          x={430} y={205} width={76} height={60} rx={4}
          fill={isCond ? '#0e1a3a' : '#0e2a42'}
          stroke={isCond ? color : '#2a6090'}
          strokeWidth={isCond ? 2 : 1.2}
          style={{ filter: isCond ? glowFilter : 'none' }}
        />
        {/* Fan circles */}
        <circle cx={468} cy={235} r={20} fill="none" stroke={isCond ? color : '#2a6090'} strokeWidth={isCond ? 1.5 : 0.8} />
        <circle cx={468} cy={235} r={12} fill="none" stroke={isCond ? color : '#2a6090'} strokeWidth={isCond ? 1 : 0.6} />
        <circle cx={468} cy={235} r={3} fill={isCond ? color : '#2a6090'} />
        <line x1={468} y1={215} x2={468} y2={255} stroke={isCond ? color : '#2a6090'} strokeWidth={0.8} />
        <line x1={448} y1={235} x2={488} y2={235} stroke={isCond ? color : '#2a6090'} strokeWidth={0.8} />
        <text x={468} y={277} textAnchor="middle" fill={isCond ? color : '#3a6a8a'} fontSize={8} fontFamily="sans-serif">
          Condensadora
        </text>

        {/* Heat release arrows */}
        {isCond && (
          <>
            {[0, 1, 2].map((i) => (
              <motion.path
                key={i}
                d={`M ${490 + i * 8} ${215 + i * 5} Q ${498 + i * 8} ${205 + i * 5} ${506 + i * 8} ${215 + i * 5}`}
                fill="none" stroke="#ef4444" strokeWidth={1.5}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: [0, 0.8, 0], y: [8, 0, -8] }}
                transition={{ duration: 1.2, delay: i * 0.2, repeat: Infinity }}
              />
            ))}
          </>
        )}
      </motion.g>

      {/* ── Thermometer result ── */}
      {isResult && (
        <motion.g
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 160, delay: 0.4 }}
        >
          <rect x={210} y={260} width={80} height={38} rx={8} fill="#0e2a42" stroke={color} strokeWidth={1.5}
            style={{ filter: glowFilter }} />
          <text x={250} y={285} textAnchor="middle" fill={color} fontSize={18} fontFamily="monospace" fontWeight="bold">
            22°C
          </text>
        </motion.g>
      )}

      {/* ── HUD overlays ── */}
      <AnimatePresence>
        {highlight === 'overview' && (
          <motion.g key="hud-overview"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <line x1={287} y1={175} x2={310} y2={310} stroke={color} strokeWidth={0.6} strokeDasharray="3,4" opacity={0.6} />
            <HudLabel x={310} y={320} label="EVAPORADORA" value="ON" color={color} align="left" />
            <line x1={468} y1={235} x2={500} y2={360} stroke="#22c55e" strokeWidth={0.6} strokeDasharray="3,4" opacity={0.6} />
            <HudLabel x={500} y={370} label="SISTEMA" value="OK" color="#22c55e" align="left" />
          </motion.g>
        )}
        {highlight === 'condensadora' && (
          <motion.g key="hud-cond"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <line x1={430} y1={220} x2={370} y2={350} stroke={color} strokeWidth={0.6} strokeDasharray="3,4" opacity={0.6} />
            <HudLabel x={370} y={360} label="PRESSAO" value="18 BAR" color={color} align="right" />
            <line x1={468} y1={205} x2={400} y2={140} stroke="#ef4444" strokeWidth={0.6} strokeDasharray="3,4" opacity={0.6} />
            <HudLabel x={400} y={130} label="CALOR EXPULSO" value="120°C" color="#ef4444" align="right" />
          </motion.g>
        )}
        {highlight === 'pipes' && (
          <motion.g key="hud-pipes"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}>
            <line x1={360} y1={180} x2={300} y2={310} stroke={color} strokeWidth={0.6} strokeDasharray="3,4" opacity={0.6} />
            <HudLabel x={300} y={320} label="COBRE CLASSE A" value="6-22mm" color={color} align="right" />
          </motion.g>
        )}
        {highlight === 'evaporadora' && (
          <motion.g key="hud-evap"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <line x1={274} y1={173} x2={200} y2={320} stroke={color} strokeWidth={0.6} strokeDasharray="3,4" opacity={0.6} />
            <HudLabel x={200} y={330} label="4 DIRECOES" value="Cassete" color={color} align="right" />
          </motion.g>
        )}
        {highlight === 'result' && (
          <motion.g key="hud-result"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}>
            <line x1={250} y1={263} x2={130} y2={320} stroke={color} strokeWidth={0.6} strokeDasharray="3,4" opacity={0.6} />
            <HudLabel x={130} y={330} label="AMBIENTE" value="22°C" color={color} align="right" />
            <line x1={250} y1={263} x2={370} y2={340} stroke="#22c55e" strokeWidth={0.6} strokeDasharray="3,4" opacity={0.6} />
            <HudLabel x={370} y={350} label="EFICIENCIA" value="99.4%" color="#22c55e" align="left" />
          </motion.g>
        )}
      </AnimatePresence>
    </svg>
  )
}

/* ─── Word stagger animation ─── */
function AnimatedTitle({ text, color }: { text: string; color: string }) {
  const lines = text.split('\n')
  return (
    <div>
      {lines.map((line, li) => (
        <div key={li}>
          {line.split(' ').map((word, wi) => (
            <motion.span
              key={`${li}-${wi}`}
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (li * 4 + wi) * 0.055, duration: 0.45, ease: 'easeOut' }}
              style={{ display: 'inline-block', marginRight: '0.3em', color: '#fff', fontSize: '2.8rem', fontWeight: 800, lineHeight: 1.1 }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      ))}
    </div>
  )
}

/* ─── Metric card with animated value ─── */
function MetricCard({ value, label, color, delay }: { value: string; label: string; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: 'easeOut' }}
      style={{
        flex: 1,
        padding: '12px 14px',
        background: '#0a1f35',
        borderRadius: 10,
        border: '1px solid #1a3a5c',
        minWidth: 0,
      }}
    >
      <div style={{ fontFamily: 'monospace', fontSize: '1.4rem', fontWeight: 700, color, letterSpacing: '-0.02em' }}>
        {value}
      </div>
      <div style={{ fontSize: '0.72rem', color: '#5a8ab0', marginTop: 2 }}>{label}</div>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export default function ComoFunciona() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [mobileStep, setMobileStep] = useState(0)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 900)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  })

  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => {
      const s = Math.min(Math.floor(v * 5), 4)
      setCurrentStep(s)
    })
    return unsub
  }, [scrollYProgress])

  const step = isMobile ? STEPS[mobileStep] : STEPS[currentStep]
  const color = isMobile ? STEP_COLORS[mobileStep] : STEP_COLORS[currentStep]

  /* ─── Mobile ─── */
  if (isMobile) {
    return (
      <section id="como-funciona" style={{ background: '#050d1a' }} className="py-16 px-4">
        <div className="max-w-xl mx-auto">
          <p className="text-center text-xs font-bold uppercase tracking-widest mb-1" style={{ color }}>
            Tecnologia
          </p>
          <h2 className="text-3xl font-extrabold text-white text-center mb-6">Como Funciona</h2>

          {/* Step pills */}
          <div className="flex justify-center gap-2 mb-8">
            {STEPS.map((s, i) => (
              <button
                key={i}
                onClick={() => setMobileStep(i)}
                className="rounded-full text-xs font-bold transition-all duration-300"
                style={{
                  padding: i === mobileStep ? '6px 18px' : '6px 12px',
                  background: i === mobileStep ? STEP_COLORS[i] : '#0a1f35',
                  color: i === mobileStep ? '#fff' : '#3a6a8a',
                  border: `1px solid ${i === mobileStep ? STEP_COLORS[i] : '#1a3a5c'}`,
                  minWidth: 36,
                }}
              >
                {i === mobileStep ? s.num : String(i + 1)}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={mobileStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="flex flex-col items-center gap-6"
            >
              <div className="w-full rounded-2xl overflow-hidden" style={{ background: '#071929', border: '1px solid #0e2a42' }}>
                <AcIllustration highlight={step.highlight} color={color} />
              </div>

              <div className="w-full">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color }}>{step.tag}</span>
                <AnimatedTitle text={step.title} color={color} />
                <p className="text-sm mt-3 leading-relaxed" style={{ color: '#8ab8d8' }}>{step.desc}</p>
                <div className="flex gap-3 mt-4">
                  {step.metrics.map((m, i) => (
                    <MetricCard key={i} {...m} color={color} delay={0.2 + i * 0.08} />
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-8">
            {mobileStep > 0 ? (
              <button onClick={() => setMobileStep(mobileStep - 1)}
                className="px-5 py-2 rounded-lg text-sm font-medium"
                style={{ background: '#0a1f35', color, border: `1px solid ${color}` }}>
                Anterior
              </button>
            ) : <div />}
            {mobileStep < STEPS.length - 1 ? (
              <button onClick={() => setMobileStep(mobileStep + 1)}
                className="px-5 py-2 rounded-lg text-sm font-bold"
                style={{ background: color, color: '#fff' }}>
                Próximo
              </button>
            ) : (
              <a href="#contato" className="px-5 py-2 rounded-lg text-sm font-bold"
                style={{ background: '#06b6d4', color: '#fff' }}>
                Solicitar Orçamento
              </a>
            )}
          </div>
        </div>
      </section>
    )
  }

  /* ─── Desktop scrollytelling ─── */
  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      style={{ height: '600vh', background: '#050d1a' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

        {/* Top progress bar */}
        <motion.div
          style={{
            scaleX: progressScaleX,
            transformOrigin: 'left',
            height: 3,
            background: color,
            transition: 'background 0.6s ease',
            flexShrink: 0,
          }}
        />

        {/* Step counter top-right */}
        <div style={{
          position: 'absolute',
          top: 10,
          right: 24,
          fontFamily: 'monospace',
          fontSize: '0.75rem',
          color,
          transition: 'color 0.5s',
          letterSpacing: '0.1em',
          zIndex: 10,
        }}>
          {step.num} / 05
        </div>

        {/* Main content area */}
        <div style={{ flex: 1, display: 'flex', gap: 20, padding: '16px 24px 16px', overflow: 'hidden', position: 'relative' }}>

          {/* Left: Illustration (58%) */}
          <div style={{
            flex: '0 0 58%',
            background: '#071929',
            borderRadius: 16,
            border: '1px solid #0e2a42',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            position: 'relative',
          }}>
            {/* Section tag top-left of illustration */}
            <div style={{
              position: 'absolute', top: 14, left: 16,
              fontSize: '0.65rem', fontFamily: 'monospace',
              color, opacity: 0.7, letterSpacing: '0.12em',
              transition: 'color 0.5s',
            }}>
              {step.tag}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={step.highlight}
                initial={{ opacity: 0, x: -18 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 18 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                style={{ width: '100%', padding: '32px 28px 12px' }}
              >
                <AcIllustration highlight={step.highlight} color={color} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right: Text (42%) */}
          <div style={{
            flex: '0 0 calc(42% - 20px - 28px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            paddingRight: 28,
            overflow: 'hidden',
          }}>
            {/* Giant background number */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ type: 'spring', stiffness: 80, damping: 20 }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: 20,
                  transform: 'translateY(-50%)',
                  fontSize: '220px',
                  fontWeight: 900,
                  lineHeight: 1,
                  color,
                  opacity: 0.05,
                  pointerEvents: 'none',
                  fontVariantNumeric: 'tabular-nums',
                  transition: 'color 0.5s',
                  userSelect: 'none',
                }}
              >
                {step.num}
              </motion.div>
            </AnimatePresence>

            {/* Step tag */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`tag-${currentStep}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{
                  fontSize: '0.68rem',
                  fontFamily: 'monospace',
                  letterSpacing: '0.16em',
                  color,
                  marginBottom: 10,
                  transition: 'color 0.5s',
                }}
              >
                {step.tag}   {step.num} — 05
              </motion.div>
            </AnimatePresence>

            {/* Title with stagger */}
            <AnimatePresence mode="wait">
              <motion.div key={`title-${currentStep}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <AnimatedTitle text={step.title} color={color} />
              </motion.div>
            </AnimatePresence>

            {/* Accent underline */}
            <motion.div
              style={{
                width: 44,
                height: 3,
                background: color,
                borderRadius: 2,
                marginTop: 14,
                marginBottom: 16,
                transition: 'background 0.5s',
              }}
            />

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`desc-${currentStep}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.12 }}
                style={{ fontSize: '0.9rem', lineHeight: 1.7, color: '#8ab8d8', marginBottom: 24 }}
              >
                {step.desc}
              </motion.p>
            </AnimatePresence>

            {/* Metrics row */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`metrics-${currentStep}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{ display: 'flex', gap: 10 }}
              >
                {step.metrics.map((m, i) => (
                  <MetricCard key={i} {...m} color={color} delay={0.2 + i * 0.08} />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* CTA on last step */}
            {currentStep === 4 && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  style={{ marginTop: 24, display: 'flex', gap: 12 }}
                >
                  <a
                    href="#contato"
                    style={{
                      display: 'inline-block',
                      padding: '13px 28px',
                      borderRadius: 10,
                      background: '#06b6d4',
                      color: '#fff',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                    }}
                  >
                    Solicitar Orçamento
                  </a>
                  <a
                    href="https://wa.me/551123891033?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20instala%C3%A7%C3%A3o%20de%20ar%20condicionado."
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      padding: '13px 22px',
                      borderRadius: 10,
                      background: 'transparent',
                      color: '#22c55e',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      textDecoration: 'none',
                      border: '1.5px solid #22c55e',
                    }}
                  >
                    WhatsApp
                  </a>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Scroll hint */}
            {currentStep === 0 && (
              <motion.p
                animate={{ opacity: [0, 0.6, 0] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 1.5 }}
                style={{ marginTop: 20, fontSize: '0.72rem', color: '#2a5a7a', fontFamily: 'monospace' }}
              >
                ↓ role para continuar
              </motion.p>
            )}
          </div>

          {/* Progress dots (right edge) */}
          <div style={{
            position: 'absolute',
            right: 0,
            top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            alignItems: 'center',
          }}>
            {STEPS.map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  width: i === currentStep ? 24 : 8,
                  height: 8,
                  background: i === currentStep ? color : i < currentStep ? color + '55' : '#1a3a5c',
                  border: `1px solid ${i <= currentStep ? color : '#2a5a7a'}`,
                }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{ borderRadius: 4, transition: 'background 0.5s, border-color 0.5s' }}
              />
            ))}
          </div>
        </div>

        {/* Bottom step labels */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 0,
          paddingBottom: 14,
          paddingTop: 4,
          flexShrink: 0,
        }}>
          {STEPS.map((s, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 0,
              }}
            >
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 4,
                padding: '0 14px',
              }}>
                <div style={{
                  width: i === currentStep ? 28 : 8,
                  height: 4,
                  borderRadius: 2,
                  background: i <= currentStep ? STEP_COLORS[i] : '#1a3a5c',
                  transition: 'all 0.35s ease',
                }} />
                <span style={{
                  fontSize: '0.6rem',
                  fontFamily: 'monospace',
                  letterSpacing: '0.08em',
                  color: i === currentStep ? STEP_COLORS[i] : '#2a5a7a',
                  transition: 'color 0.35s',
                }}>
                  {s.tag.split(' ')[0]}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{
                  width: 40,
                  height: 1,
                  background: i < currentStep ? STEP_COLORS[i] : '#1a3a5c',
                  transition: 'background 0.35s',
                }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
