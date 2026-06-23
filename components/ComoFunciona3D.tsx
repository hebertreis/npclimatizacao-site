'use client'

import { useRef, useEffect, useState, MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'

gsap.registerPlugin(ScrollTrigger)

/* ─────────────────────────────────────────
   STEP CONTENT
───────────────────────────────────────── */
const STEPS = [
  {
    tag: '01 / 05',
    title: 'Sala Climatizada',
    desc: 'Visão completa de um ambiente com sistema de ar condicionado cassete 4 vias instalado no forro do teto.',
    color: '#06b6d4',
  },
  {
    tag: '02 / 05',
    title: 'Cassete 4 Vias',
    desc: 'Instalado no teto, o cassete distribui o ar em 4 direções simultaneamente — climatização uniforme em todo o ambiente.',
    color: '#06b6d4',
  },
  {
    tag: '03 / 05',
    title: 'Vista Interna',
    desc: 'Ventilador centrífugo e serpentina de troca térmica — os componentes que transformam calor em conforto.',
    color: '#f59e0b',
  },
  {
    tag: '04 / 05',
    title: 'Tubulação de Cobre',
    desc: 'Tubos de cobre classe A conduzem o gás refrigerante da unidade interna até a condensadora externa.',
    color: '#f59e0b',
  },
  {
    tag: '05 / 05',
    title: 'Condensadora Externa',
    desc: 'A unidade externa expele o calor captado para o ambiente, completando o ciclo de refrigeração.',
    color: '#22c55e',
  },
]

/* ─────────────────────────────────────────
   CAMERA PROXY — GSAP animates this object,
   R3F useFrame reads it every frame
───────────────────────────────────────── */
type CamProxy = {
  px: number; py: number; pz: number  // position
  tx: number; ty: number; tz: number  // lookAt target
  explode: number                      // 0=assembled, 1=exploded
  step: number                         // 0-4 (float for interpolation)
}

/* ─────────────────────────────────────────
   SCENE GEOMETRY COMPONENTS
───────────────────────────────────────── */

function Room() {
  const wallMat = new THREE.MeshStandardMaterial({ color: '#0a1e32', roughness: 0.9 })
  const floorMat = new THREE.MeshStandardMaterial({ color: '#071520', roughness: 0.8 })
  const ceilMat = new THREE.MeshStandardMaterial({ color: '#0d2236', roughness: 0.9 })

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[12, 16]} />
        <primitive object={floorMat} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3, 0]}>
        <planeGeometry args={[12, 16]} />
        <primitive object={ceilMat} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 1.5, -7]}>
        <planeGeometry args={[12, 3]} />
        <primitive object={wallMat} />
      </mesh>

      {/* Left wall */}
      <mesh rotation={[0, Math.PI / 2, 0]} position={[-6, 1.5, -1]}>
        <planeGeometry args={[16, 3]} />
        <primitive object={wallMat} />
      </mesh>

      {/* Right wall */}
      <mesh rotation={[0, -Math.PI / 2, 0]} position={[6, 1.5, -1]}>
        <planeGeometry args={[16, 3]} />
        <primitive object={wallMat} />
      </mesh>

      {/* Floor grid lines for depth perception */}
      <gridHelper args={[12, 12, '#0e3050', '#0a2038']} position={[0, 0.01, -1]} />

      {/* Furniture silhouette — sofa */}
      <mesh position={[0, 0.35, -5.5]} castShadow>
        <boxGeometry args={[3.5, 0.7, 1]} />
        <meshStandardMaterial color="#0c2a3e" roughness={0.95} />
      </mesh>
      <mesh position={[0, 0.8, -6]} castShadow>
        <boxGeometry args={[3.5, 0.6, 0.2]} />
        <meshStandardMaterial color="#0c2a3e" roughness={0.95} />
      </mesh>

      {/* Coffee table */}
      <mesh position={[0, 0.22, -3.8]}>
        <boxGeometry args={[1.4, 0.06, 0.8]} />
        <meshStandardMaterial color="#071520" roughness={0.7} metalness={0.3} />
      </mesh>

      {/* Ambient light bloom on floor */}
      <mesh position={[0, 0.005, -1]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial color="#051018" transparent opacity={0.6} />
      </mesh>
    </group>
  )
}

function CassetteAC({ explode }: { explode: number }) {
  const cassetteY = 2.85
  const spread = explode * 0.35

  return (
    <group position={[0, cassetteY, -1]}>
      {/* Main cassette body */}
      <mesh castShadow>
        <boxGeometry args={[0.85, 0.12, 0.85]} />
        <meshStandardMaterial
          color="#d0e8f8"
          roughness={0.3}
          metalness={0.5}
          emissive={new THREE.Color(0x06b6d4)}
          emissiveIntensity={0.04 + explode * 0.12}
        />
      </mesh>

      {/* Grill pattern (4 vents) */}
      {[[-1, 0], [1, 0], [0, -1], [0, 1]].map(([dx, dz], i) => (
        <mesh key={i} position={[dx * 0.28, -0.07, dz * 0.28]}>
          <boxGeometry args={[0.22, 0.02, 0.22]} />
          <meshStandardMaterial color="#a0c8e0" roughness={0.4} metalness={0.6} />
        </mesh>
      ))}

      {/* Center panel */}
      <mesh position={[0, -0.07, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.4} />
      </mesh>

      {/* ── Exploded internal parts ── */}

      {/* Fan (torus) — moves up */}
      <mesh position={[0, 0.08 + spread, 0]}>
        <torusGeometry args={[0.28, 0.04, 12, 32]} />
        <meshStandardMaterial
          color="#e0f2ff"
          roughness={0.3}
          metalness={0.6}
          emissive="#06b6d4"
          emissiveIntensity={explode * 0.3}
          transparent
          opacity={0.3 + explode * 0.7}
        />
      </mesh>

      {/* Fan blades — appear on explode */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.2,
              0.08 + spread,
              Math.sin(angle) * 0.2,
            ]}
            rotation={[0, angle, Math.PI / 2 - 0.4]}
          >
            <boxGeometry args={[0.05, 0.01, 0.14]} />
            <meshStandardMaterial
              color="#c8e8ff"
              transparent
              opacity={explode * 0.9}
              emissive="#06b6d4"
              emissiveIntensity={explode * 0.2}
            />
          </mesh>
        )
      })}

      {/* Coil (serpentina) — moves sideways */}
      <mesh position={[spread * 0.6, 0, spread * 0.6]}>
        <torusGeometry args={[0.22, 0.025, 8, 24]} />
        <meshStandardMaterial
          color="#f59e0b"
          roughness={0.5}
          metalness={0.8}
          emissive="#f59e0b"
          emissiveIntensity={explode * 0.4}
          transparent
          opacity={0.2 + explode * 0.8}
        />
      </mesh>

      {/* PCB board — moves back */}
      <mesh position={[0, 0.07, -spread * 0.4]}>
        <boxGeometry args={[0.4, 0.01, 0.3]} />
        <meshStandardMaterial
          color="#1a3a2a"
          roughness={0.7}
          emissive="#22c55e"
          emissiveIntensity={explode * 0.3}
          transparent
          opacity={0.2 + explode * 0.8}
        />
      </mesh>
    </group>
  )
}

function CopperPipes({ visible }: { visible: boolean }) {
  const opacity = visible ? 1 : 0.15
  const mat = (
    <meshStandardMaterial
      color="#c87941"
      roughness={0.4}
      metalness={0.8}
      emissive="#f59e0b"
      emissiveIntensity={visible ? 0.15 : 0}
      transparent
      opacity={opacity}
    />
  )

  return (
    <group>
      {/* Pipe from cassette down to wall */}
      <mesh position={[0.35, 2.1, -0.8]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.025, 0.025, 0.6, 12]} />
        {mat}
      </mesh>
      <mesh position={[0.35, 1.8, -0.8]}>
        <cylinderGeometry args={[0.025, 0.025, 0.6, 12]} />
        {mat}
      </mesh>

      {/* Horizontal along wall to outside */}
      <mesh position={[2, 1.5, -0.8]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 3.5, 12]} />
        {mat}
      </mesh>
      <mesh position={[2, 1.4, -0.8]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 3.5, 12]} />
        {mat}
      </mesh>

      {/* Through wall to outside (pierce right wall at x=6) */}
      <mesh position={[4.5, 1.5, -0.8]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 2, 12]} />
        {mat}
      </mesh>

      {/* Outside to condensadora */}
      <mesh position={[6.5, 1.3, -0.8]} rotation={[0, Math.PI / 2, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.5, 12]} />
        {mat}
      </mesh>
    </group>
  )
}

function Condensadora({ active }: { active: boolean }) {
  return (
    <group position={[8, 0.65, -0.8]}>
      {/* Main body */}
      <mesh castShadow>
        <boxGeometry args={[1.0, 1.3, 0.55]} />
        <meshStandardMaterial
          color="#0c1f30"
          roughness={0.6}
          metalness={0.4}
          emissive="#06b6d4"
          emissiveIntensity={active ? 0.06 : 0}
        />
      </mesh>

      {/* Fan grille (front face) */}
      <mesh position={[0, 0.1, 0.3]}>
        <cylinderGeometry args={[0.35, 0.35, 0.04, 32]} />
        <meshStandardMaterial
          color="#1a3a5c"
          roughness={0.5}
          emissive="#06b6d4"
          emissiveIntensity={active ? 0.2 : 0.03}
        />
      </mesh>

      {/* Fan blades */}
      {Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.cos(a) * 0.2, 0.1 + Math.sin(a) * 0.2, 0.32]} rotation={[0, 0, a]}>
            <boxGeometry args={[0.28, 0.04, 0.02]} />
            <meshStandardMaterial color="#2a5a8a" metalness={0.6} />
          </mesh>
        )
      })}

      {/* Bottom feet */}
      {[[-0.35, -0.35], [0.35, -0.35], [-0.35, 0.35], [0.35, 0.35]].map(([fx, fz], i) => (
        <mesh key={i} position={[fx, -0.7, fz]}>
          <boxGeometry args={[0.1, 0.06, 0.1]} />
          <meshStandardMaterial color="#1a3a5c" />
        </mesh>
      ))}

      {/* Heat haze indicator */}
      {active && (
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color="#ef4444" transparent opacity={0.15} />
        </mesh>
      )}
    </group>
  )
}

/* ─────────────────────────────────────────
   CAMERA CONTROLLER — lives inside Canvas
───────────────────────────────────────── */
function CameraController({ proxy }: { proxy: MutableRefObject<CamProxy> }) {
  const { camera } = useThree()
  const lerpFactor = 0.07

  const currentPos = useRef(new THREE.Vector3(0, 2.5, 7.5))
  const currentTarget = useRef(new THREE.Vector3(0, 1.5, 0))

  useFrame(() => {
    const p = proxy.current
    currentPos.current.lerp(new THREE.Vector3(p.px, p.py, p.pz), lerpFactor)
    currentTarget.current.lerp(new THREE.Vector3(p.tx, p.ty, p.tz), lerpFactor)

    camera.position.copy(currentPos.current)
    camera.lookAt(currentTarget.current)
  })

  return null
}

/* ─────────────────────────────────────────
   SCENE — all 3D objects + lights
───────────────────────────────────────── */
function Scene({ proxy }: { proxy: MutableRefObject<CamProxy> }) {
  const explodeRef = useRef(0)
  const stepRef = useRef(0)

  useFrame(() => {
    explodeRef.current = proxy.current.explode
    stepRef.current = proxy.current.step
  })

  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} color="#2a4a6a" />
      <directionalLight position={[4, 6, 4]} intensity={0.8} color="#c8e8ff" castShadow />
      <pointLight position={[0, 2.8, -2]} intensity={0.6} color="#06b6d4" distance={6} />
      <pointLight position={[8, 1.5, -0.8]} intensity={0.8} color="#22c55e" distance={5} />
      <fogExp2 args={['#020810', 0.04]} />

      {/* Scene objects */}
      <Room />
      <CassetteACWrapper proxy={proxy} />
      <CopperPipesWrapper proxy={proxy} />
      <Condensadora active={proxy.current.step > 3.5} />

      {/* Camera */}
      <CameraController proxy={proxy} />
    </>
  )
}

/* Wrappers that subscribe to proxy for re-renders */
function CassetteACWrapper({ proxy }: { proxy: MutableRefObject<CamProxy> }) {
  const [explode, setExplode] = useState(0)
  useFrame(() => {
    const e = proxy.current.explode
    if (Math.abs(e - explode) > 0.005) setExplode(e)
  })
  return <CassetteAC explode={explode} />
}

function CopperPipesWrapper({ proxy }: { proxy: MutableRefObject<CamProxy> }) {
  const [step, setStep] = useState(0)
  useFrame(() => {
    const s = proxy.current.step
    if (Math.abs(s - step) > 0.1) setStep(s)
  })
  return <CopperPipes visible={step >= 2.5} />
}

/* ─────────────────────────────────────────
   HTML OVERLAY — step text on top of canvas
───────────────────────────────────────── */
function StepOverlay({ step, progress }: { step: number; progress: number }) {
  const s = STEPS[Math.min(step, STEPS.length - 1)]
  const color = s.color

  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10 }}>

      {/* NP Climatização logo — top left */}
      <div style={{ position: 'absolute', top: 24, left: 28, display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          padding: '4px 10px',
          borderRadius: 6,
          background: '#06b6d4',
          fontWeight: 800,
          color: '#fff',
          fontSize: '1.1rem',
          letterSpacing: '-0.02em',
        }}>
          NP
        </div>
        <div style={{ color: '#fff', fontWeight: 600, fontSize: '0.9rem', opacity: 0.9 }}>Climatização</div>
        <div style={{
          marginLeft: 4,
          padding: '2px 8px',
          borderRadius: 4,
          background: 'rgba(6,182,212,0.15)',
          border: '1px solid rgba(6,182,212,0.3)',
          color: '#06b6d4',
          fontSize: '0.65rem',
          fontFamily: 'monospace',
          letterSpacing: '0.1em',
        }}>
          COMO FUNCIONA
        </div>
      </div>

      {/* Progress bar — top */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: '#0a1f35',
      }}>
        <motion.div
          style={{
            height: '100%',
            background: color,
            transformOrigin: 'left',
            scaleX: progress,
            transition: 'background 0.5s',
          }}
        />
      </div>

      {/* Step counter — top right */}
      <div style={{
        position: 'absolute', top: 22, right: 28,
        fontFamily: 'monospace', fontSize: '0.75rem',
        color, opacity: 0.8, letterSpacing: '0.12em',
        transition: 'color 0.5s',
      }}>
        {s.tag}
      </div>

      {/* Step content — bottom left */}
      <div style={{ position: 'absolute', bottom: 48, left: 36, maxWidth: 420 }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
          >
            {/* Tag */}
            <div style={{
              fontSize: '0.62rem', fontFamily: 'monospace',
              color, letterSpacing: '0.18em', marginBottom: 8,
              transition: 'color 0.5s',
            }}>
              {s.tag}
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: 'clamp(1.8rem, 3vw, 2.6rem)',
              fontWeight: 800,
              color: '#fff',
              lineHeight: 1.1,
              marginBottom: 10,
            }}>
              {s.title}
            </h3>

            {/* Accent line */}
            <div style={{
              width: 40, height: 3, borderRadius: 2,
              background: color,
              marginBottom: 14,
              transition: 'background 0.5s',
            }} />

            {/* Description */}
            <p style={{
              fontSize: '0.88rem',
              lineHeight: 1.7,
              color: '#8ab8d8',
              maxWidth: 380,
            }}>
              {s.desc}
            </p>

            {/* CTA on last step */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ marginTop: 24, display: 'flex', gap: 12, pointerEvents: 'auto' }}
              >
                <a
                  href="#contato"
                  style={{
                    padding: '12px 24px', borderRadius: 8,
                    background: '#06b6d4', color: '#fff',
                    fontWeight: 700, fontSize: '0.88rem',
                    textDecoration: 'none',
                  }}
                >
                  Solicitar Orçamento
                </a>
                <a
                  href="https://wa.me/551123891033"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    padding: '12px 20px', borderRadius: 8,
                    border: '1.5px solid #22c55e',
                    color: '#22c55e', fontWeight: 600,
                    fontSize: '0.88rem', textDecoration: 'none',
                  }}
                >
                  WhatsApp
                </a>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Vertical step pills — right side */}
      <div style={{
        position: 'absolute', right: 28, top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center',
      }}>
        {STEPS.map((st, i) => (
          <div
            key={i}
            style={{
              width: 4,
              height: i === step ? 28 : 10,
              borderRadius: 3,
              background: i <= step ? st.color : '#1a3a5c',
              transition: 'all 0.35s ease',
              opacity: i === step ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      {/* Scroll hint — first step */}
      {step === 0 && (
        <motion.div
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute', bottom: 24, left: '50%',
            transform: 'translateX(-50%)',
            color: '#2a5a7a', fontSize: '0.7rem',
            fontFamily: 'monospace', letterSpacing: '0.1em',
            textAlign: 'center',
          }}
        >
          ↓ role para explorar
        </motion.div>
      )}
    </div>
  )
}

/* ─────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────── */
export default function ComoFunciona3D() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [progress, setProgress] = useState(0)

  // Shared mutable proxy between GSAP (outside Canvas) and R3F (inside Canvas)
  const camProxy = useRef<CamProxy>({
    px: 0, py: 2.5, pz: 7.5,
    tx: 0, ty: 1.5, tz: 0,
    explode: 0,
    step: 0,
  })

  useEffect(() => {
    if (!sectionRef.current) return

    /*
     * Camera journey timeline:
     *
     *  t=0   Room overview   pos(0, 2.5, 7.5)  → target(0, 1.5, 0)
     *  t=1   Approach AC     pos(0, 2.9, 2.0)  → target(0, 2.85, 0)
     *  t=2   Close-up        pos(0, 2.5, 0.3)  → target(0, 2.85, 0)   explode→1
     *  t=3   Exploded view   pos(1.8, 3.6, 1)  → target(0, 2.85, 0)   explode→0
     *  t=4   Follow pipes    pos(2.5, 2, -0.2) → target(5, 1.5, -1)
     *  t=5   Condensadora    pos(9, 1.6, 1.2)  → target(8, 1, -0.8)
     */
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: (self) => {
          setProgress(self.progress)
          const s = Math.min(Math.floor(self.progress * 5), 4)
          setCurrentStep(s)
          camProxy.current.step = self.progress * 4
        },
      },
    })

    // Step 0 → 1: fly toward cassette
    tl.to(camProxy.current, {
      px: 0, py: 2.9, pz: 2.0,
      tx: 0, ty: 2.85, tz: 0,
      ease: 'power2.inOut',
      duration: 1,
    })

    // Step 1 → 2: move right in front of cassette
    tl.to(camProxy.current, {
      px: 0, py: 2.5, pz: 0.3,
      tx: 0, ty: 2.85, tz: -0.2,
      ease: 'power2.inOut',
      duration: 1,
    })

    // Step 2: trigger exploded view
    tl.to(camProxy.current, {
      explode: 1,
      px: 1.8, py: 3.6, pz: 1.0,
      tx: 0, ty: 2.7, tz: 0,
      ease: 'power2.out',
      duration: 1,
    })

    // Step 3: reassemble, pull back, follow pipes
    tl.to(camProxy.current, {
      explode: 0,
      px: 2.5, py: 2.0, pz: -0.2,
      tx: 5, ty: 1.5, tz: -1,
      ease: 'power2.inOut',
      duration: 1,
    })

    // Step 4: arrive at condensadora
    tl.to(camProxy.current, {
      px: 9.0, py: 1.6, pz: 1.2,
      tx: 8.0, ty: 1.0, tz: -0.8,
      ease: 'power2.inOut',
      duration: 1,
    })

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill())
    }
  }, [])

  return (
    <section
      id="como-funciona"
      ref={sectionRef}
      style={{ position: 'relative', height: '600vh', background: '#020810' }}
    >
      {/* Sticky viewport — 100vh */}
      <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>

        {/* R3F Canvas */}
        <Canvas
          style={{ position: 'absolute', inset: 0 }}
          camera={{ fov: 60, near: 0.1, far: 200, position: [0, 2.5, 7.5] }}
          shadows
          gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            toneMappingExposure: 0.8,
          }}
        >
          <color attach="background" args={['#020810']} />
          <Scene proxy={camProxy} />
        </Canvas>

        {/* HTML overlay */}
        <StepOverlay step={currentStep} progress={progress} />
      </div>
    </section>
  )
}
