'use client'

import { useRef, useState, useEffect } from 'react'
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from 'framer-motion'
import Image from 'next/image'
import { obras } from '@/data/obras'
import type { ProjectCase } from '@/data/obras'

/* ─── Types ─── */
type Category = 'todos' | 'residencial' | 'comercial' | 'construtora'

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'residencial', label: 'Residencial' },
  { value: 'comercial', label: 'Comercial' },
  { value: 'construtora', label: 'Construtoras' },
]

/* ─── Phase tag labels ─── */
const PHASE_TAGS = ['AMBIENTE', 'DESAFIO + SOLUÇÃO', 'RESULTADO']

/* ─── Whatsapp CTA link ─── */
const WA_LINK =
  'https://wa.me/551123891033?text=Olá%2C%20vim%20pelo%20site%20e%20quero%20um%20orçamento.'

/* ───────────────────────────────────────────────
   DESKTOP SCROLLY
─────────────────────────────────────────────── */
function DesktopScrolly({ filteredObras }: { filteredObras: ProjectCase[] }) {
  const N = filteredObras.length
  const containerRef = useRef<HTMLElement>(null)
  const [obraIdx, setObraIdx] = useState(0)
  const [phase, setPhase] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (N === 0) return
    const rawObraIdx = Math.min(Math.floor(v * N), N - 1)
    const progressWithin = (v * N) % 1
    const rawPhase = Math.min(Math.floor(progressWithin * 3), 2)
    setObraIdx(rawObraIdx)
    setPhase(rawPhase)
  })

  // Progress bar scaleX
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  const jumpToObra = (i: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const absoluteTop = window.scrollY + rect.top
    const sectionH = el.offsetHeight
    const target = absoluteTop + (i / N) * sectionH
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  const currentObra = filteredObras[obraIdx] ?? filteredObras[0]

  if (!currentObra) return null

  return (
    <section
      ref={containerRef}
      id="obras"
      style={{
        height: `${N * 300}vh`,
        background: 'var(--bg)',
        position: 'relative',
      }}
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Top bar ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 32px',
            background: 'rgba(11,11,11,0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(126,200,216,0.08)',
            flexShrink: 0,
          }}
        >
          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 2,
              background: 'var(--accent)',
              scaleX,
              transformOrigin: 'left',
              width: '100%',
            }}
          />

          {/* Eyebrow */}
          <span
            style={{
              fontSize: 11,
              fontFamily: 'monospace',
              letterSpacing: '0.15em',
              color: 'rgba(127,179,211,0.5)',
              textTransform: 'uppercase',
            }}
          >
            Portfólio — NP Climatização
          </span>

          {/* Obra counter */}
          <span
            style={{
              fontSize: 13,
              fontFamily: 'monospace',
              color: 'rgba(127,179,211,0.6)',
            }}
          >
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
              {String(obraIdx + 1).padStart(2, '0')}
            </span>
            {' / '}
            {String(N).padStart(2, '0')}
          </span>
        </div>

        {/* ── Main content ── */}
        <div
          style={{
            flex: 1,
            display: 'flex',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          {/* Image panel */}
          <div style={{ position: 'relative', flex: '0 0 58%', overflow: 'hidden' }}>
            <AnimatePresence mode="sync">
              <motion.div
                key={currentObra.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                style={{ position: 'absolute', inset: 0 }}
              >
                <Image
                  src={currentObra.images.cover}
                  alt={currentObra.images.alt}
                  fill
                  className="object-cover"
                  sizes="58vw"
                  priority={obraIdx === 0}
                />
              </motion.div>
            </AnimatePresence>

            {/* Phase 2 overlay */}
            <AnimatePresence>
              {phase === 2 && (
                <motion.div
                  key="overlay"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to right, rgba(5,13,26,0) 0%, rgba(5,13,26,0.55) 100%)',
                    pointerEvents: 'none',
                  }}
                />
              )}
            </AnimatePresence>

            {/* Location badge */}
            {currentObra.location && (
              <motion.div
                key={currentObra.id + '-loc'}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 }}
                style={{
                  position: 'absolute',
                  bottom: 24,
                  left: 24,
                  background: 'rgba(11,11,11,0.8)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(126,200,216,0.2)',
                  borderRadius: 8,
                  padding: '5px 12px',
                  fontSize: 12,
                  color: 'var(--text-muted)',
                  fontFamily: 'monospace',
                  letterSpacing: '0.05em',
                }}
              >
                {currentObra.location}
              </motion.div>
            )}
          </div>

          {/* Text panel */}
          <div
            style={{
              flex: '0 0 42%',
              background: 'var(--bg)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '0 52px',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ghost number */}
            <span
              style={{
                position: 'absolute',
                top: '50%',
                right: -20,
                transform: 'translateY(-50%)',
                fontSize: 200,
                fontWeight: 900,
                color: 'rgba(126,200,216,0.03)',
                lineHeight: 1,
                userSelect: 'none',
                fontFamily: 'monospace',
                pointerEvents: 'none',
              }}
            >
              {String(obraIdx + 1).padStart(2, '0')}
            </span>

            <AnimatePresence mode="wait">
              {/* Phase 0 — Ambiente */}
              {phase === 0 && (
                <motion.div
                  key={`${currentObra.id}-p0`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                >
                  <PhaseTag label={PHASE_TAGS[0]} />
                  <h2
                    style={{
                      fontSize: 'clamp(28px, 3vw, 44px)',
                      fontWeight: 800,
                      color: 'var(--text)',
                      lineHeight: 1.15,
                      marginBottom: 20,
                      marginTop: 12,
                    }}
                  >
                    {currentObra.title}
                  </h2>
                  <p
                    style={{
                      fontSize: 15,
                      lineHeight: 1.75,
                      color: 'var(--text-muted)',
                      maxWidth: 420,
                    }}
                  >
                    {currentObra.environment}
                  </p>
                  <ScrollHintInline />
                </motion.div>
              )}

              {/* Phase 1 — Desafio + Solução */}
              {phase === 1 && (
                <motion.div
                  key={`${currentObra.id}-p1`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                >
                  <PhaseTag label={PHASE_TAGS[1]} />
                  <div style={{ marginTop: 16, marginBottom: 24 }}>
                    <p
                      style={{
                        fontSize: 10,
                        fontFamily: 'monospace',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        marginBottom: 8,
                      }}
                    >
                      O desafio
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: 'var(--text-muted)',
                        maxWidth: 420,
                      }}
                    >
                      {currentObra.challenge}
                    </p>
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: 10,
                        fontFamily: 'monospace',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        marginBottom: 8,
                      }}
                    >
                      A solução
                    </p>
                    <p
                      style={{
                        fontSize: 14,
                        lineHeight: 1.7,
                        color: 'var(--text-muted)',
                        maxWidth: 420,
                      }}
                    >
                      {currentObra.solution}
                    </p>
                  </div>
                  {currentObra.brand && (
                    <div
                      style={{
                        marginTop: 20,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 8,
                        background: 'rgba(126,200,216,0.06)',
                        border: '1px solid rgba(126,200,216,0.15)',
                        borderRadius: 8,
                        padding: '5px 12px',
                        fontSize: 12,
                        color: 'var(--accent)',
                        fontFamily: 'monospace',
                      }}
                    >
                      Equipamento: {currentObra.brand}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Phase 2 — Resultado */}
              {phase === 2 && (
                <motion.div
                  key={`${currentObra.id}-p2`}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.5 }}
                >
                  <PhaseTag label={PHASE_TAGS[2]} />
                  <p
                    style={{
                      fontSize: 'clamp(16px, 1.5vw, 20px)',
                      lineHeight: 1.65,
                      color: 'var(--text)',
                      maxWidth: 420,
                      marginTop: 16,
                      marginBottom: 28,
                      fontWeight: 500,
                    }}
                  >
                    {currentObra.result}
                  </p>

                  {/* Tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                    {currentObra.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 11,
                          padding: '3px 10px',
                          borderRadius: 4,
                          background: 'rgba(126,200,216,0.07)',
                          color: 'var(--text-muted)',
                          border: '1px solid rgba(126,200,216,0.12)',
                          fontFamily: 'monospace',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      background: 'var(--wa-green)',
                      color: 'var(--bg)',
                      fontWeight: 700,
                      fontSize: 14,
                      padding: '12px 24px',
                      borderRadius: 8,
                      textDecoration: 'none',
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e =>
                      ((e.currentTarget as HTMLAnchorElement).style.background = '#16a34a')
                    }
                    onMouseLeave={e =>
                      ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--wa-green)')
                    }
                  >
                    {currentObra.cta ?? 'Quero um projeto assim'}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Bottom bar: dots + scroll hint ── */}
        <div
          style={{
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            background: 'rgba(11,11,11,0.8)',
            flexShrink: 0,
            borderTop: '1px solid rgba(126,200,216,0.06)',
          }}
        >
          {filteredObras.map((obra, i) => (
            <button
              key={obra.id}
              onClick={() => jumpToObra(i)}
              aria-label={`Ir para ${obra.title}`}
              style={{
                width: i === obraIdx ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === obraIdx ? 'var(--accent)' : 'rgba(126,200,216,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                padding: 0,
              }}
            />
          ))}

          <AnimatePresence>
            {obraIdx === 0 && phase === 0 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.5 }}
                style={{
                  marginLeft: 16,
                  fontSize: 11,
                  color: 'rgba(127,179,211,0.4)',
                  fontFamily: 'monospace',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                scroll para continuar
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

/* ─── Phase tag chip ─── */
function PhaseTag({ label }: { label: string }) {
  return (
    <span
      style={{
        display: 'inline-block',
        fontSize: 10,
        fontFamily: 'monospace',
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        background: 'rgba(126,200,216,0.08)',
        border: '1px solid rgba(126,200,216,0.2)',
        padding: '3px 10px',
        borderRadius: 4,
      }}
    >
      {label}
    </span>
  )
}

/* ─── Scroll hint shown in phase 0 ─── */
function ScrollHintInline() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.2 }}
      style={{
        marginTop: 32,
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        color: 'rgba(127,179,211,0.4)',
        fontSize: 12,
        fontFamily: 'monospace',
        letterSpacing: '0.08em',
      }}
    >
      <svg width="16" height="20" viewBox="0 0 16 20" fill="none">
        <rect x="5" y="1" width="6" height="10" rx="3" stroke="currentColor" strokeWidth="1.4" />
        <motion.line
          x1="8" y1="4" x2="8" y2="7"
          stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"
          animate={{ y: [0, 2, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        />
        <line x1="8" y1="14" x2="8" y2="19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="5" y1="17" x2="8" y2="19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <line x1="11" y1="17" x2="8" y2="19" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
      Role para ver o projeto
    </motion.div>
  )
}

/* ───────────────────────────────────────────────
   MOBILE CARD
─────────────────────────────────────────────── */
function MobileObraCard({ obra }: { obra: ProjectCase }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      style={{
        borderRadius: 16,
        overflow: 'hidden',
        background: 'var(--surface)',
        border: '1px solid rgba(126,200,216,0.1)',
      }}
    >
      {/* Image */}
      <div style={{ position: 'relative', height: 220 }}>
        <Image
          src={obra.images.cover}
          alt={obra.images.alt}
          fill
          className="object-cover"
          sizes="100vw"
        />
        {/* Tags overlay */}
        <div
          style={{
            position: 'absolute',
            bottom: 12,
            left: 12,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 5,
          }}
        >
          {obra.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              style={{
                fontSize: 10,
                padding: '2px 8px',
                borderRadius: 4,
                background: 'rgba(5,13,26,0.85)',
                color: 'var(--accent)',
                border: '1px solid rgba(126,200,216,0.25)',
                fontFamily: 'monospace',
                letterSpacing: '0.05em',
                backdropFilter: 'blur(4px)',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Content */}
      <div style={{ padding: '20px 20px 24px' }}>
        {obra.location && (
          <p
            style={{
              fontSize: 11,
              fontFamily: 'monospace',
              color: 'rgba(127,179,211,0.5)',
              marginBottom: 6,
              letterSpacing: '0.05em',
            }}
          >
            {obra.location}
          </p>
        )}
        <h3
          style={{
            fontSize: 18,
            fontWeight: 700,
            color: 'var(--text)',
            marginBottom: 12,
            lineHeight: 1.3,
          }}
        >
          {obra.title}
        </h3>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.65,
            color: 'var(--text-muted)',
            marginBottom: 16,
          }}
        >
          {obra.environment} {obra.challenge}
        </p>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.65,
            color: 'var(--text-muted)',
            marginBottom: 20,
          }}
        >
          <span style={{ color: 'var(--accent)', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', marginRight: 6 }}>Resultado</span>
          {obra.result}
        </p>
        <a
          href={WA_LINK}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            width: '100%',
            background: 'rgba(6,182,212,0.1)',
            color: 'var(--accent)',
            fontWeight: 600,
            fontSize: 14,
            padding: '12px 0',
            borderRadius: 8,
            textDecoration: 'none',
            border: '1px solid rgba(126,200,216,0.25)',
          }}
        >
          {obra.cta ?? 'Quero um projeto assim'}
        </a>
      </div>
    </motion.div>
  )
}

/* ───────────────────────────────────────────────
   MOBILE LAYOUT
─────────────────────────────────────────────── */
function MobileLayout({
  filteredObras,
  activeCategory,
  setActiveCategory,
  hasCategory,
}: {
  filteredObras: ProjectCase[]
  activeCategory: Category
  setActiveCategory: (c: Category) => void
  hasCategory: (c: Category) => boolean
}) {
  return (
    <section
      id="obras"
      style={{ background: 'var(--bg)', paddingBottom: 64 }}
    >
      {/* Header */}
      <div style={{ padding: '64px 20px 32px', maxWidth: 600, margin: '0 auto' }}>
        <p
          style={{
            fontSize: 11,
            fontFamily: 'monospace',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 10,
          }}
        >
          Portfólio
        </p>
        <h2
          style={{
            fontSize: 28,
            fontWeight: 800,
            color: 'var(--text)',
            lineHeight: 1.2,
            marginBottom: 12,
          }}
        >
          Obras que mostram o padrão da nossa execução
        </h2>
        <p style={{ fontSize: 15, color: 'var(--text-muted)', lineHeight: 1.6 }}>
          Projetos realizados com técnica, rigor e atenção ao acabamento em São
          Paulo e Grande SP.
        </p>
      </div>

      {/* Filter tabs */}
      <div
        style={{
          display: 'flex',
          overflowX: 'auto',
          gap: 8,
          padding: '0 20px 24px',
          scrollbarWidth: 'none',
        }}
      >
        {CATEGORIES.map((cat) => {
          const enabled = hasCategory(cat.value)
          const active = cat.value === activeCategory
          return (
            <button
              key={cat.value}
              onClick={() => enabled && setActiveCategory(cat.value)}
              disabled={!enabled}
              title={!enabled ? 'Em breve' : undefined}
              style={{
                flexShrink: 0,
                fontSize: 13,
                fontWeight: 600,
                padding: '7px 16px',
                borderRadius: 20,
                border: active
                  ? '1px solid #22d3ee'
                  : '1px solid rgba(126,200,216,0.15)',
                background: active ? 'rgba(126,200,216,0.12)' : 'transparent',
                color: active ? 'var(--accent)' : enabled ? 'var(--text-muted)' : 'rgba(127,179,211,0.3)',
                cursor: enabled ? 'pointer' : 'not-allowed',
              }}
            >
              {cat.label}
            </button>
          )
        })}
      </div>

      {/* Cards */}
      <div
        style={{
          maxWidth: 600,
          margin: '0 auto',
          padding: '0 20px',
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {filteredObras.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--text-muted)' }}>
            <p style={{ fontSize: 15 }}>Nenhum projeto desta categoria ainda.</p>
            <p style={{ fontSize: 13, marginTop: 6, color: 'rgba(127,179,211,0.5)' }}>
              Em breve novos projetos.
            </p>
          </div>
        ) : (
          filteredObras.map((obra) => (
            <MobileObraCard key={obra.id} obra={obra} />
          ))
        )}
      </div>
    </section>
  )
}

/* ───────────────────────────────────────────────
   FILTER TABS (desktop)
─────────────────────────────────────────────── */
function DesktopFilterTabs({
  activeCategory,
  setActiveCategory,
  hasCategory,
}: {
  activeCategory: Category
  setActiveCategory: (c: Category) => void
  hasCategory: (c: Category) => boolean
}) {
  return (
    <div style={{ display: 'flex', gap: 6 }}>
      {CATEGORIES.map((cat) => {
        const enabled = hasCategory(cat.value)
        const active = cat.value === activeCategory
        return (
          <button
            key={cat.value}
            onClick={() => enabled && setActiveCategory(cat.value)}
            disabled={!enabled}
            title={!enabled ? 'Em breve' : undefined}
            style={{
              fontSize: 12,
              fontWeight: 600,
              padding: '5px 14px',
              borderRadius: 16,
              border: active
                ? '1px solid #22d3ee'
                : '1px solid rgba(126,200,216,0.12)',
              background: active ? 'rgba(126,200,216,0.1)' : 'transparent',
              color: active ? 'var(--accent)' : enabled ? 'rgba(127,179,211,0.6)' : 'rgba(127,179,211,0.2)',
              cursor: enabled ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s',
            }}
          >
            {cat.label}
          </button>
        )
      })}
    </div>
  )
}

/* ───────────────────────────────────────────────
   ROOT COMPONENT
─────────────────────────────────────────────── */
export default function ObrasScrolly() {
  const [isMobile, setIsMobile] = useState(false)
  const [activeCategory, setActiveCategory] = useState<Category>('todos')

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const hasCategory = (cat: Category) =>
    cat === 'todos' || obras.some((o) => o.category === cat)

  const filteredObras =
    activeCategory === 'todos'
      ? obras
      : obras.filter((o) => o.category === activeCategory)

  if (isMobile) {
    return (
      <MobileLayout
        filteredObras={filteredObras}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        hasCategory={hasCategory}
      />
    )
  }

  return (
    <DesktopScrollyWithHeader
      filteredObras={filteredObras}
      activeCategory={activeCategory}
      setActiveCategory={(cat) => {
        setActiveCategory(cat)
      }}
      hasCategory={hasCategory}
    />
  )
}

/* ─── Desktop: section header above sticky area ─── */
function DesktopScrollyWithHeader({
  filteredObras,
  activeCategory,
  setActiveCategory,
  hasCategory,
}: {
  filteredObras: ProjectCase[]
  activeCategory: Category
  setActiveCategory: (c: Category) => void
  hasCategory: (c: Category) => boolean
}) {
  const N = filteredObras.length
  const containerRef = useRef<HTMLElement>(null)
  const [obraIdx, setObraIdx] = useState(0)
  const [phase, setPhase] = useState(0)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (N === 0) return
    const rawObraIdx = Math.min(Math.floor(v * N), N - 1)
    const progressWithin = (v * N) % 1
    const rawPhase = Math.min(Math.floor(progressWithin * 3), 2)
    setObraIdx(rawObraIdx)
    setPhase(rawPhase)
  })

  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1])

  const jumpToObra = (i: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const absoluteTop = window.scrollY + rect.top
    const sectionH = el.offsetHeight
    const target = absoluteTop + (i / N) * sectionH
    window.scrollTo({ top: target, behavior: 'smooth' })
  }

  // reset scroll when filter changes
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const absoluteTop = window.scrollY + rect.top
    window.scrollTo({ top: absoluteTop, behavior: 'smooth' })
    setObraIdx(0)
    setPhase(0)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeCategory])

  const currentObra = filteredObras[obraIdx] ?? filteredObras[0]

  return (
    <section
      ref={containerRef}
      id="obras"
      style={{
        height: N > 0 ? `${N * 300}vh` : '100vh',
        background: 'var(--bg)',
        position: 'relative',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* ── Top bar ── */}
        <div
          style={{
            position: 'relative',
            zIndex: 20,
            height: 56,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 40px',
            background: 'rgba(11,11,11,0.95)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(126,200,216,0.08)',
            flexShrink: 0,
            gap: 24,
          }}
        >
          {/* Progress bar */}
          <motion.div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              height: 2,
              background: 'var(--accent)',
              scaleX,
              transformOrigin: 'left',
              width: '100%',
            }}
          />

          {/* Left: eyebrow + filter tabs */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <span
              style={{
                fontSize: 11,
                fontFamily: 'monospace',
                letterSpacing: '0.15em',
                color: 'rgba(127,179,211,0.4)',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              Portfólio
            </span>
            <DesktopFilterTabs
              activeCategory={activeCategory}
              setActiveCategory={setActiveCategory}
              hasCategory={hasCategory}
            />
          </div>

          {/* Right: counter */}
          {currentObra && (
            <span
              style={{
                fontSize: 13,
                fontFamily: 'monospace',
                color: 'rgba(127,179,211,0.6)',
                whiteSpace: 'nowrap',
              }}
            >
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>
                {String(obraIdx + 1).padStart(2, '0')}
              </span>
              {' / '}
              {String(N).padStart(2, '0')}
            </span>
          )}
        </div>

        {/* ── Main content ── */}
        {N === 0 || !currentObra ? (
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-muted)',
              flexDirection: 'column',
              gap: 8,
            }}
          >
            <p style={{ fontSize: 16 }}>Nenhum projeto desta categoria ainda.</p>
            <p style={{ fontSize: 13, color: 'rgba(127,179,211,0.4)' }}>Em breve novos projetos.</p>
          </div>
        ) : (
          <div
            style={{
              flex: 1,
              display: 'flex',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* Image panel */}
            <div style={{ position: 'relative', flex: '0 0 58%', overflow: 'hidden' }}>
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentObra.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7 }}
                  style={{ position: 'absolute', inset: 0 }}
                >
                  <Image
                    src={currentObra.images.cover}
                    alt={currentObra.images.alt}
                    fill
                    className="object-cover"
                    sizes="58vw"
                    priority={obraIdx === 0}
                  />
                </motion.div>
              </AnimatePresence>

              {/* Phase 2 overlay */}
              <AnimatePresence>
                {phase === 2 && (
                  <motion.div
                    key="overlay"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(to right, rgba(5,13,26,0) 0%, rgba(5,13,26,0.55) 100%)',
                      pointerEvents: 'none',
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Location badge */}
              {currentObra.location && (
                <motion.div
                  key={currentObra.id + '-loc'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 }}
                  style={{
                    position: 'absolute',
                    bottom: 24,
                    left: 24,
                    background: 'rgba(11,11,11,0.8)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(126,200,216,0.2)',
                    borderRadius: 8,
                    padding: '5px 12px',
                    fontSize: 12,
                    color: 'var(--text-muted)',
                    fontFamily: 'monospace',
                    letterSpacing: '0.05em',
                  }}
                >
                  {currentObra.location}
                </motion.div>
              )}
            </div>

            {/* Text panel */}
            <div
              style={{
                flex: '0 0 42%',
                background: 'var(--bg)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: '0 52px',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Ghost number */}
              <span
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: -20,
                  transform: 'translateY(-50%)',
                  fontSize: 200,
                  fontWeight: 900,
                  color: 'rgba(126,200,216,0.025)',
                  lineHeight: 1,
                  userSelect: 'none',
                  fontFamily: 'monospace',
                  pointerEvents: 'none',
                }}
              >
                {String(obraIdx + 1).padStart(2, '0')}
              </span>

              <AnimatePresence mode="wait">
                {phase === 0 && (
                  <motion.div
                    key={`${currentObra.id}-p0`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PhaseTag label={PHASE_TAGS[0]} />
                    <h2
                      style={{
                        fontSize: 'clamp(28px, 3vw, 44px)',
                        fontWeight: 800,
                        color: 'var(--text)',
                        lineHeight: 1.15,
                        marginBottom: 20,
                        marginTop: 12,
                      }}
                    >
                      {currentObra.title}
                    </h2>
                    <p
                      style={{
                        fontSize: 15,
                        lineHeight: 1.75,
                        color: 'var(--text-muted)',
                        maxWidth: 420,
                      }}
                    >
                      {currentObra.environment}
                    </p>
                    <ScrollHintInline />
                  </motion.div>
                )}

                {phase === 1 && (
                  <motion.div
                    key={`${currentObra.id}-p1`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PhaseTag label={PHASE_TAGS[1]} />
                    <div style={{ marginTop: 16, marginBottom: 24 }}>
                      <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>
                        O desafio
                      </p>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: 420 }}>
                        {currentObra.challenge}
                      </p>
                    </div>
                    <div>
                      <p style={{ fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>
                        A solução
                      </p>
                      <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--text-muted)', maxWidth: 420 }}>
                        {currentObra.solution}
                      </p>
                    </div>
                    {currentObra.brand && (
                      <div
                        style={{
                          marginTop: 20,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 8,
                          background: 'rgba(126,200,216,0.06)',
                          border: '1px solid rgba(126,200,216,0.15)',
                          borderRadius: 8,
                          padding: '5px 12px',
                          fontSize: 12,
                          color: 'var(--accent)',
                          fontFamily: 'monospace',
                        }}
                      >
                        Equipamento: {currentObra.brand}
                      </div>
                    )}
                  </motion.div>
                )}

                {phase === 2 && (
                  <motion.div
                    key={`${currentObra.id}-p2`}
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.5 }}
                  >
                    <PhaseTag label={PHASE_TAGS[2]} />
                    <p
                      style={{
                        fontSize: 'clamp(16px, 1.5vw, 20px)',
                        lineHeight: 1.65,
                        color: 'var(--text)',
                        maxWidth: 420,
                        marginTop: 16,
                        marginBottom: 28,
                        fontWeight: 500,
                      }}
                    >
                      {currentObra.result}
                    </p>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
                      {currentObra.tags.map((tag) => (
                        <span
                          key={tag}
                          style={{
                            fontSize: 11,
                            padding: '3px 10px',
                            borderRadius: 4,
                            background: 'rgba(126,200,216,0.07)',
                            color: 'var(--text-muted)',
                            border: '1px solid rgba(126,200,216,0.12)',
                            fontFamily: 'monospace',
                            letterSpacing: '0.05em',
                          }}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <a
                      href={WA_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 10,
                        background: 'var(--wa-green)',
                        color: 'var(--bg)',
                        fontWeight: 700,
                        fontSize: 14,
                        padding: '12px 24px',
                        borderRadius: 8,
                        textDecoration: 'none',
                        transition: 'background 0.2s',
                      }}
                      onMouseEnter={e =>
                        ((e.currentTarget as HTMLAnchorElement).style.background = '#16a34a')
                      }
                      onMouseLeave={e =>
                        ((e.currentTarget as HTMLAnchorElement).style.background = 'var(--wa-green)')
                      }
                    >
                      {currentObra.cta ?? 'Quero um projeto assim'}
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* ── Bottom bar ── */}
        <div
          style={{
            height: 48,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            background: 'rgba(11,11,11,0.8)',
            flexShrink: 0,
            borderTop: '1px solid rgba(126,200,216,0.06)',
          }}
        >
          {filteredObras.map((obra, i) => (
            <button
              key={obra.id}
              onClick={() => jumpToObra(i)}
              aria-label={`Ir para ${obra.title}`}
              style={{
                width: i === obraIdx ? 24 : 8,
                height: 8,
                borderRadius: 4,
                background: i === obraIdx ? 'var(--accent)' : 'rgba(126,200,216,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s',
                padding: 0,
              }}
            />
          ))}

          <AnimatePresence>
            {obraIdx === 0 && phase === 0 && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 1.5 }}
                style={{
                  marginLeft: 16,
                  fontSize: 11,
                  color: 'rgba(127,179,211,0.4)',
                  fontFamily: 'monospace',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                scroll para continuar
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
