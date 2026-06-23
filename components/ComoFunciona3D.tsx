'use client'

import { useEffect, useRef, useState } from 'react'

const VIDEO_SRC = '/videos/vc_n%C3%A3o_gerou_o_video%20(1).mp4'
const FALLBACK_DURATION = 10
const VIEWPORTS_PER_SECOND = 0.24
const MIN_SCROLL_VIEWPORTS = 2.2

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value))
}

export default function ComoFunciona3D() {
  const sectionRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const durationRef = useRef(FALLBACK_DURATION)
  const targetTimeRef = useRef(0)
  const visibleTimeRef = useRef(0)

  const [isReady, setIsReady] = useState(false)
  const [hasError, setHasError] = useState(false)
  const [isReducedMotion, setIsReducedMotion] = useState(false)
  const [scrollViewports, setScrollViewports] = useState(MIN_SCROLL_VIEWPORTS)

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setIsReducedMotion(media.matches)

    update()
    media.addEventListener('change', update)
    return () => media.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    if (hasError || isReducedMotion) return

    const section = sectionRef.current
    if (!section) return

    const updateScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      const progress = scrollable > 0 ? clamp(-rect.top / scrollable, 0, 1) : 0

      targetTimeRef.current = progress * durationRef.current

      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`
      }
    }

    updateScroll()
    window.addEventListener('scroll', updateScroll, { passive: true })
    window.addEventListener('resize', updateScroll)

    return () => {
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('resize', updateScroll)
    }
  }, [hasError, isReducedMotion])

  useEffect(() => {
    if (hasError || isReducedMotion) return

    let raf = 0

    const scrub = () => {
      const video = videoRef.current

      if (video && video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        const target = targetTimeRef.current
        const visible = visibleTimeRef.current
        const diff = target - visible
        const next = Math.abs(diff) < 0.006 ? target : visible + diff * 0.62

        visibleTimeRef.current = next

        if (Math.abs(video.currentTime - next) > 0.006) {
          try {
            video.currentTime = clamp(next, 0, Math.max(0, durationRef.current - 0.04))
          } catch {
            // Browsers can reject seeks while metadata is still warming up.
          }
        }
      }

      raf = requestAnimationFrame(scrub)
    }

    raf = requestAnimationFrame(scrub)
    return () => cancelAnimationFrame(raf)
  }, [hasError, isReducedMotion])

  if (isReducedMotion || hasError) {
    return (
      <section
        id="como-funciona"
        style={{
          minHeight: '100vh',
          background: '#03070d',
          color: '#fff',
          display: 'grid',
          placeItems: 'center',
          padding: 24,
          textAlign: 'center',
        }}
      >
        <div style={{ maxWidth: 560 }}>
          <p style={{ margin: '0 0 12px', color: '#5ee7ff', font: '700 0.7rem/1 monospace', letterSpacing: '0.18em' }}>
            COMO FUNCIONA
          </p>
          <h2 style={{ margin: '0 0 14px', fontSize: 'clamp(2rem, 7vw, 4.7rem)', lineHeight: 0.96, letterSpacing: 0 }}>
            Video pausado
          </h2>
          <p style={{ margin: 0, color: 'rgba(226,242,250,0.72)', lineHeight: 1.65 }}>
            A experiencia em scroll foi desativada por preferencia de movimento reduzido ou por falha ao carregar o video.
          </p>
        </div>
      </section>
    )
  }

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      style={{
        position: 'relative',
        height: `${scrollViewports * 100}vh`,
        background: '#03070d',
      }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          minHeight: '100svh',
          overflow: 'hidden',
          background: '#03070d',
        }}
      >
        <video
          ref={videoRef}
          muted
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          aria-label="Video controlado pelo scroll na secao Como funciona"
          onLoadedMetadata={(event) => {
            const video = event.currentTarget
            const duration = Number.isFinite(video.duration) ? video.duration : FALLBACK_DURATION

            durationRef.current = duration
            setScrollViewports(Math.max(MIN_SCROLL_VIEWPORTS, duration * VIEWPORTS_PER_SECOND))
            video.pause()
            video.currentTime = 0
            targetTimeRef.current = 0
            visibleTimeRef.current = 0
          }}
          onCanPlay={() => setIsReady(true)}
          onError={() => setHasError(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            opacity: isReady ? 1 : 0,
            transition: 'opacity 420ms ease',
          }}
        >
          <source src={VIDEO_SRC} type="video/mp4" />
        </video>

        {!isReady && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              color: '#5ee7ff',
              font: '700 0.68rem/1 monospace',
              letterSpacing: '0.2em',
            }}
          >
            CARREGANDO VIDEO
          </div>
        )}

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(3,7,13,0.34), rgba(3,7,13,0.03) 34%, rgba(3,7,13,0.32))',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            position: 'absolute',
            left: 'clamp(18px, 4vw, 56px)',
            top: 'clamp(84px, 10vh, 116px)',
            color: '#fff',
            pointerEvents: 'none',
            textShadow: '0 14px 42px rgba(0,0,0,0.5)',
          }}
        >
          <p style={{ margin: '0 0 8px', color: '#5ee7ff', font: '700 0.66rem/1 monospace', letterSpacing: '0.18em' }}>
            COMO FUNCIONA
          </p>
          <h2 style={{ margin: 0, maxWidth: 560, fontSize: 'clamp(2rem, 5.8vw, 5.4rem)', lineHeight: 0.92, letterSpacing: 0 }}>
            Role para ver o sistema em movimento
          </h2>
        </div>

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            height: 3,
            background: 'rgba(255,255,255,0.12)',
          }}
        >
          <div
            ref={progressRef}
            style={{
              width: '100%',
              height: '100%',
              transform: 'scaleX(0)',
              transformOrigin: 'left',
              background: '#5ee7ff',
            }}
          />
        </div>
      </div>
    </section>
  )
}
