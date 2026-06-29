"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const PIN_MULTIPLE = 5;
const CARD_START_SCALE = 0.62;
const CARD_IMMERSE_SCALE = 1.7;

type HeroCassetteProps = {
  assembledSrc?: string;
  explodedSrc?: string;
  titleTop?: string;
  titleBottom?: string;
};

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return reduced;
}

export default function HeroCassette({
  assembledSrc = "/images/cassete-montado.jpg",
  explodedSrc = "/images/cassete-explodido.jpg",
  titleTop = "NP",
  titleBottom = "CLIMATIZAÇÃO",
}: HeroCassetteProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const img1Ref = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLDivElement>(null);
  const titleTopRef = useRef<HTMLDivElement>(null);
  const titleBottomRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;

    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Initial state
      gsap.set(cardRef.current, { scale: CARD_START_SCALE, transformOrigin: "50% 50%" });
      gsap.set(img2Ref.current, { opacity: 0 });
      gsap.set(ctaRef.current, { opacity: 0, pointerEvents: "none" });

      ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.2,
        onUpdate: (self) => {
          const p = self.progress;

          // Card scale
          let scale: number;
          if (p < 0.15) {
            scale = gsap.utils.mapRange(0, 0.15, CARD_START_SCALE, 1, p);
          } else if (p < 0.50) {
            scale = gsap.utils.mapRange(0.15, 0.5, 1, CARD_IMMERSE_SCALE, p);
          } else if (p < 0.65) {
            scale = CARD_IMMERSE_SCALE;
          } else if (p < 0.85) {
            scale = gsap.utils.mapRange(0.65, 0.85, CARD_IMMERSE_SCALE, 1.0, p);
          } else {
            scale = 1.0;
          }
          gsap.set(cardRef.current, { scale });

          // Titles slide + fade
          const titleOut = p < 0.15
            ? 0
            : p < 0.35
            ? gsap.utils.mapRange(0.15, 0.35, 0, 1, p)
            : p < 0.85
            ? 1
            : gsap.utils.mapRange(0.85, 1.0, 1, 0, p);

          gsap.set(titleTopRef.current, {
            xPercent: -80 * titleOut,
            opacity: 1 - titleOut * 0.9,
          });
          gsap.set(titleBottomRef.current, {
            xPercent: 80 * titleOut,
            opacity: 1 - titleOut * 0.9,
          });

          // Crossfade: assembled → exploded → assembled
          const explodedOp =
            p < 0.5
              ? 0
              : p < 0.65
              ? gsap.utils.mapRange(0.5, 0.65, 0, 1, p)
              : p < 0.85
              ? 1
              : gsap.utils.mapRange(0.85, 1.0, 1, 0, p);
          gsap.set(img2Ref.current, { opacity: explodedOp });

          // Scroll hint fades out early
          const hintOp = p < 0.05 ? 1 : Math.max(0, gsap.utils.mapRange(0.05, 0.15, 1, 0, p));
          gsap.set(scrollHintRef.current, { opacity: hintOp });

          // CTA appears at the end
          const ctaOp = p < 0.88 ? 0 : gsap.utils.mapRange(0.88, 1.0, 0, 1, p);
          gsap.set(ctaRef.current, {
            opacity: ctaOp,
            pointerEvents: ctaOp > 0.5 ? "auto" : "none",
          });
        },
      });

      // Entry animation for titles
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(titleTopRef.current, { opacity: 0, x: -60, duration: 1.1, ease: "expo.out" });
      tl.from(titleBottomRef.current, { opacity: 0, x: 60, duration: 1.1, ease: "expo.out" }, 0.15);
      tl.from(cardRef.current, { opacity: 0, duration: 1.2, ease: "power2.out" }, 0.1);
    }, sectionRef);

    return () => ctx.revert();
  }, [reduced]);

  const tallHeight = `${PIN_MULTIPLE * 100}vh`;

  return (
    <section
      ref={sectionRef}
      id="inicio"
      style={{ height: tallHeight, position: "relative" }}
      aria-label="Hero NP Climatização"
    >
      {/* Sticky viewport */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "var(--bg)",
        }}
      >
        {/* Subtle radial glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at 50% 40%, rgba(126,200,216,0.06) 0%, transparent 65%)",
            pointerEvents: "none",
          }}
        />

        {/* Title: NP — top left */}
        <div
          ref={titleTopRef}
          aria-hidden
          style={{
            position: "absolute",
            top: "clamp(2rem, 8vh, 5rem)",
            left: "clamp(1.5rem, 5vw, 4rem)",
            fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)",
            fontWeight: 800,
            fontSize: "clamp(7rem, 16vw, 20rem)",
            lineHeight: 0.85,
            letterSpacing: "-0.04em",
            color: "var(--text)",
            userSelect: "none",
            zIndex: 10,
          }}
        >
          {titleTop}
        </div>

        {/* Title: CLIMATIZAÇÃO — bottom right */}
        <div
          ref={titleBottomRef}
          aria-hidden
          style={{
            position: "absolute",
            bottom: "clamp(2rem, 8vh, 5rem)",
            right: "clamp(1.5rem, 5vw, 4rem)",
            fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)",
            fontWeight: 700,
            fontSize: "clamp(2rem, 5.5vw, 6rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            color: "var(--text)",
            textAlign: "right",
            userSelect: "none",
            zIndex: 10,
          }}
        >
          {titleBottom}
        </div>

        {/* Cassette card */}
        <div
          ref={cardRef}
          style={{
            position: "relative",
            width: "min(560px, 85vw)",
            aspectRatio: "1 / 1",
            borderRadius: 20,
            overflow: "hidden",
            border: "1px solid rgba(255,255,255,0.09)",
            boxShadow:
              "0 40px 120px rgba(0,0,0,0.85), 0 0 0 1px rgba(255,255,255,0.04)",
            background: "#1a1a1a",
            willChange: "transform",
            zIndex: 5,
          }}
        >
          {/* Image 1: assembled */}
          <div
            ref={img1Ref}
            style={{ position: "absolute", inset: 0 }}
          >
            <Image
              src={assembledSrc}
              alt="Cassete de ar condicionado 4 vias — vista instalada"
              fill
              className="object-cover"
              priority
              sizes="(max-width: 768px) 85vw, 560px"
            />
          </div>

          {/* Image 2: exploded — starts hidden */}
          <div
            ref={img2Ref}
            style={{ position: "absolute", inset: 0, opacity: 0 }}
          >
            <Image
              src={explodedSrc}
              alt="Cassete de ar condicionado 4 vias — vista explodida"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 85vw, 560px"
            />
          </div>

          {/* Vignette overlay */}
          <div
            aria-hidden
            style={{
              position: "absolute",
              inset: 0,
              boxShadow: "inset 0 0 80px rgba(0,0,0,0.4)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        </div>

        {/* CTA overlay — appears at end of scroll */}
        <div
          ref={ctaRef}
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: "1rem",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-display, 'Barlow Condensed', sans-serif)",
              fontSize: "clamp(1.2rem, 2.5vw, 1.8rem)",
              fontWeight: 700,
              color: "var(--text)",
              letterSpacing: "-0.01em",
              textAlign: "center",
              marginBottom: "0.5rem",
            }}
          >
            Climatização de alto padrão.<br />
            <span style={{ color: "var(--accent)", fontWeight: 600, fontSize: "0.85em" }}>
              Instalação, manutenção e projetos em São Paulo.
            </span>
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
            <a href="#contato" className="btn-wa">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Solicitar Orçamento
            </a>
            <a href="#servicos" className="btn-outline">
              Nossos Serviços
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          aria-hidden
          style={{
            position: "absolute",
            bottom: "2rem",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.4rem",
            zIndex: 10,
          }}
        >
          <span
            style={{
              fontSize: "0.6rem",
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--text-muted)",
              fontFamily: "monospace",
            }}
          >
            scroll
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </section>
  );
}
