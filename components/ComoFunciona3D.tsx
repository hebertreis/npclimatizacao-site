'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TOTAL_FRAMES = 51
const frameSrc = (i: number) =>
  `/frames/como-funciona/ezgif-frame-${String(i + 1).padStart(3, '0')}.jpg`

const STEPS = [
  {
    tag: '01 / 05',
    title: 'Ambiente Climatizado',
    desc: 'Cassete de teto distribui o ar de forma uniforme por toda a sala. Conforto silencioso sem ocupar espaço nas paredes.',
    color: '#06b6d4',
  },
  {
    tag: '02 / 05',
    title: 'Unidade Interna',
    desc: 'Ao ser acionada, a unidade abre as aletas e aciona o ventilador centrífugo. O ar quente entra, o ar frio sai.',
    color: '#06b6d4',
  },
  {
    tag: '03 / 05',
    title: 'Serpentina Evaporadora',
    desc: 'O gás refrigerante percorre as aletas de cobre a baixíssima temperatura, absorvendo o calor do ar que passa.',
    color: '#f59e0b',
  },
  {
    tag: '04 / 05',
    title: 'Motor e Ventilação',
    desc: 'O motor de indução move o ventilador axial em alta rotação, forçando a circulação do ar tratado pelo ambiente.',
    color: '#f59e0b',
  },
  {
    tag: '05 / 05',
    title: 'Condensadora Externa',
    desc: 'A unidade externa expele o calor absorvido para fora. Ciclo de refrigeração completo, eficiente e silencioso.',
    color: '#22c55e',
  },
]

/* Draw an image cover-fit onto the canvas at the given alpha. */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
  alpha: number,
) {
  const ir = img.naturalWidth / img.naturalHeight
  const cr = cw / ch
  let dx: number, dy: number, dw: number, dh: number
  if (ir > cr) {
    dh = ch; dw = ch * ir; dx = (cw - dw) / 2; dy = 0
  } else {
    dw = cw; dh = cw / ir; dx = 0; dy = (ch - dh) / 2
  }
  ctx.globalAlpha = alpha
  ctx.drawImage(img, dx, dy, dw, dh)
  ctx.globalAlpha = 1
}

export default function ComoFunciona3D() {
  const sectionRef    = useRef<HTMLDivElement>(null)
  const canvasRef     = useRef<HTMLCanvasElement>(null)
  const ctxRef        = useRef<CanvasRenderingContext2D | null>(null)
  const framesRef     = useRef<(HTMLImageElement | null)[]>(Array(TOTAL_FRAMES).fill(null))
  const loadedRef     = useRef(0)

  /* Hot-path state — never written to React state */
  const targetRef     = useRef(0)   // target float frame index from scroll
  const visualRef     = useRef(0)   // lerped display index
  const progressRef   = useRef(0)   // 0–1 scroll progress
  const stepRef       = useRef(0)

  /* Direct DOM refs — updated inside RAF, zero React overhead */
  const progressBarRef  = useRef<HTMLDivElement>(null)
  const stepTagTopRef   = useRef<HTMLDivElement>(null)

  /* React state only for content that needs AnimatePresence */
  const [currentStep, setCurrentStep] = useState(0)
  const [loadPct,     setLoadPct]     = useState(0)

  /* ─── Canvas size sync ─────────────────────────────────── */
  useEffect(() => {
    const sync = () => {
      const canvas = canvasRef.current
      if (!canvas) return
      const dpr = window.devicePixelRatio || 1
      canvas.width  = Math.round(canvas.offsetWidth  * dpr)
      canvas.height = Math.round(canvas.offsetHeight * dpr)
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.imageSmoothingEnabled = true
      ctx.imageSmoothingQuality = 'high'
      ctxRef.current = ctx
    }
    sync()
    window.addEventListener('resize', sync)
    return () => window.removeEventListener('resize', sync)
  }, [])

  /* ─── Preload frames ────────────────────────────────────── */
  useEffect(() => {
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image()
      const idx = i
      img.onload = () => {
        framesRef.current[idx] = img
        loadedRef.current += 1
        setLoadPct(Math.round((loadedRef.current / TOTAL_FRAMES) * 100))
        if (idx === 0) {
          const canvas = canvasRef.current
          const ctx    = ctxRef.current
          if (canvas && ctx) drawCover(ctx, img, canvas.width, canvas.height, 1)
        }
      }
      img.src = frameSrc(i)
    }
  }, [])

  /* ─── RAF loop: lerp + crossfade ────────────────────────── */
  useEffect(() => {
    let raf: number

    const loop = () => {
      const target = targetRef.current
      const visual = visualRef.current
      const diff   = target - visual

      /* Fast convergence — feels direct like video, not laggy */
      const next = Math.abs(diff) < 0.02 ? target : visual + diff * 0.22
      visualRef.current = next

      const a   = Math.max(0, Math.min(TOTAL_FRAMES - 1, Math.floor(next)))
      const b   = Math.min(TOTAL_FRAMES - 1, a + 1)
      const frac = next - Math.floor(next)

      const imgA = framesRef.current[a]
      const imgB = framesRef.current[b]
      const canvas = canvasRef.current
      const ctx    = ctxRef.current

      if (canvas && ctx && imgA?.complete && imgA.naturalWidth) {
        drawCover(ctx, imgA, canvas.width, canvas.height, 1)
        if (frac > 0.005 && imgB?.complete && imgB.naturalWidth) {
          drawCover(ctx, imgB, canvas.width, canvas.height, frac)
        }
      }

      /* Direct DOM — no React re-render */
      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${progressRef.current * 100}%`
      }

      raf = requestAnimationFrame(loop)
    }

    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [])

  /* ─── Passive scroll listener ───────────────────────────── */
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect       = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      const scrolled   = Math.max(0, -rect.top)
      const p          = Math.max(0, Math.min(1, scrolled / scrollable))

      targetRef.current   = p * (TOTAL_FRAMES - 1)
      progressRef.current = p

      const newStep = Math.min(Math.floor(p * 5), 4)
      if (newStep !== stepRef.current) {
        stepRef.current = newStep
        setCurrentStep(newStep)
        /* Update top tag color directly */
        if (stepTagTopRef.current) {
          stepTagTopRef.current.style.color = STEPS[newStep].color
          stepTagTopRef.current.textContent  = STEPS[newStep].tag
        }
        /* Update progress bar color */
        if (progressBarRef.current) {
          progressBarRef.current.style.background = STEPS[newStep].color
        }
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const s = STEPS[currentStep]

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      style={{ position: 'relative', height: '300vh', background: '#060d18' }}
    >
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* Frame canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%', display: 'block',
          }}
        />

        {/* Loading veil */}
        {loadPct < 100 && (
          <div style={{
            position: 'absolute', inset: 0, background: '#060d18', zIndex: 20,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 14, pointerEvents: 'none',
            opacity: loadPct > 72 ? (100 - loadPct) / 28 : 1,
            transition: 'opacity 0.5s',
          }}>
            <span style={{
              fontFamily: 'monospace', fontSize: '0.63rem',
              color: '#06b6d4', letterSpacing: '0.24em',
            }}>
              CARREGANDO {loadPct}%
            </span>
            <div style={{ width: 140, height: 2, background: '#0a2a40' }}>
              <div style={{
                height: '100%', width: `${loadPct}%`,
                background: '#06b6d4', transition: 'width 0.2s',
              }} />
            </div>
          </div>
        )}

        {/* UI overlay — pointer-events off by default */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>

          {/* Progress bar — width updated by RAF via ref, color by scroll listener */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, height: 2,
            background: 'rgba(255,255,255,0.05)',
          }}>
            <div
              ref={progressBarRef}
              style={{ height: '100%', width: '0%', background: s.color }}
            />
          </div>

          {/* Step tag — top right, updated directly by scroll listener */}
          <div
            ref={stepTagTopRef}
            style={{
              position: 'absolute', top: 22, right: 28,
              fontFamily: 'monospace', fontSize: '0.65rem',
              color: s.color, letterSpacing: '0.16em', opacity: 0.8,
            }}
          >{s.tag}</div>

          {/* Content panel — bottom left */}
          <div style={{
            position: 'absolute', bottom: 48, left: 32,
            width: 'min(400px, 44vw)',
          }}>
            <div style={{
              background: 'rgba(6, 13, 24, 0.76)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14,
              padding: '28px 32px',
            }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.36, ease: 'easeOut' }}
                >
                  <div style={{
                    fontFamily: 'monospace', fontSize: '0.6rem',
                    color: s.color, letterSpacing: '0.2em', marginBottom: 11,
                  }}>{s.tag}</div>

                  <h3 style={{
                    fontSize: 'clamp(1.7rem, 2.8vw, 2.5rem)',
                    fontWeight: 800, color: '#fff',
                    lineHeight: 1.05, marginBottom: 14,
                    letterSpacing: '-0.03em',
                  }}>{s.title}</h3>

                  <div style={{
                    width: 34, height: 3, borderRadius: 2,
                    background: s.color, marginBottom: 16,
                  }} />

                  <p style={{
                    fontSize: '0.84rem', lineHeight: 1.74,
                    color: '#7aa8c8', margin: 0,
                  }}>{s.desc}</p>

                  {currentStep === 4 && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      style={{
                        marginTop: 22, display: 'flex',
                        gap: 10, pointerEvents: 'auto',
                      }}
                    >
                      <a
                        href="#contato"
                        style={{
                          padding: '10px 22px', borderRadius: 8,
                          background: '#06b6d4', color: '#fff',
                          fontWeight: 700, fontSize: '0.82rem',
                          textDecoration: 'none',
                        }}
                      >Solicitar Orçamento</a>
                      <a
                        href="https://wa.me/551123891033"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          padding: '10px 18px', borderRadius: 8,
                          border: '1.5px solid #22c55e',
                          color: '#22c55e', fontWeight: 600,
                          fontSize: '0.82rem', textDecoration: 'none',
                        }}
                      >WhatsApp</a>
                    </motion.div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Step dots — right */}
          <div style={{
            position: 'absolute', right: 26, top: '50%',
            transform: 'translateY(-50%)',
            display: 'flex', flexDirection: 'column', gap: 8,
          }}>
            {STEPS.map((st, i) => (
              <div key={i} style={{
                width: 4,
                height: i === currentStep ? 28 : 10,
                borderRadius: 3,
                background: i <= currentStep ? st.color : 'rgba(255,255,255,0.1)',
                transition: 'all 0.35s ease',
                opacity: i === currentStep ? 1 : 0.4,
              }} />
            ))}
          </div>

          {/* Scroll hint */}
          {currentStep === 0 && (
            <motion.div
              animate={{ opacity: [0.3, 0.85, 0.3] }}
              transition={{ duration: 2.4, repeat: Infinity }}
              style={{
                position: 'absolute', bottom: 20, left: '50%',
                transform: 'translateX(-50%)',
                color: '#2a5a7a', fontSize: '0.65rem',
                fontFamily: 'monospace', letterSpacing: '0.14em',
              }}
            >↓ role para explorar</motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
