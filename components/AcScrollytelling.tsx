'use client'

import { useRef, useEffect, useState, useMemo, MutableRefObject } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

gsap.registerPlugin(ScrollTrigger)

/* ─── Utility ─── */
function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

/* ─── Camera curves — computed once at module load ─── */
const CAMERA_POSITIONS = [
  new THREE.Vector3(0, 2.8, 9.0),
  new THREE.Vector3(1.0, 2.5, 7.5),
  new THREE.Vector3(0, 2.5, 5.0),
  new THREE.Vector3(0, 2.8, 3.2),
  new THREE.Vector3(0.3, 2.95, 1.8),
  new THREE.Vector3(0, 2.82, 0.6),
  new THREE.Vector3(0, 2.75, 0.1),
  new THREE.Vector3(0, 2.70, -0.1),
  new THREE.Vector3(0.5, 3.2, 0.4),
  new THREE.Vector3(1.2, 3.5, 1.2),
  new THREE.Vector3(0.8, 2.9, 0.8),
  new THREE.Vector3(0.5, 2.5, 0.2),
  new THREE.Vector3(2.5, 2.0, -0.3),
  new THREE.Vector3(4.5, 1.8, -0.5),
  new THREE.Vector3(6.5, 1.6, 0.5),
  new THREE.Vector3(8.5, 1.5, 1.8),
  new THREE.Vector3(9.5, 1.8, 0.8),
  new THREE.Vector3(8.0, 1.4, 1.5),
  new THREE.Vector3(7.5, 1.6, 0.8),
  new THREE.Vector3(7.0, 2.0, 2.5),
]

const CAMERA_LOOKAT = [
  new THREE.Vector3(0, 2.7, -1.5),
  new THREE.Vector3(0, 2.75, -1.0),
  new THREE.Vector3(0, 2.85, -0.8),
  new THREE.Vector3(0, 2.88, -0.6),
  new THREE.Vector3(0, 2.82, -0.5),
  new THREE.Vector3(0, 2.82, -0.3),
  new THREE.Vector3(0, 2.78, -0.1),
  new THREE.Vector3(0, 2.75, -0.2),
  new THREE.Vector3(0, 2.80, 0.0),
  new THREE.Vector3(0, 2.80, 0.0),
  new THREE.Vector3(0, 2.80, -0.1),
  new THREE.Vector3(2.5, 2.0, -0.5),
  new THREE.Vector3(4.0, 1.8, -0.5),
  new THREE.Vector3(6.0, 1.5, -0.5),
  new THREE.Vector3(7.0, 1.2, -0.5),
  new THREE.Vector3(8.0, 1.0, -0.5),
  new THREE.Vector3(8.0, 1.0, -0.4),
  new THREE.Vector3(8.0, 1.1, -0.4),
  new THREE.Vector3(8.0, 1.2, -0.3),
  new THREE.Vector3(8.0, 1.2, -0.3),
]

const CAMERA_CURVE = new THREE.CatmullRomCurve3(CAMERA_POSITIONS, false, 'catmullrom', 0.5)
const LOOKAT_CURVE = new THREE.CatmullRomCurve3(CAMERA_LOOKAT, false, 'catmullrom', 0.5)

const PIPE_PATH = new THREE.CatmullRomCurve3([
  new THREE.Vector3(0.35, 3.10, -1.0),
  new THREE.Vector3(0.35, 3.10, -0.5),
  new THREE.Vector3(0.35, 2.85, 0.2),
  new THREE.Vector3(0.35, 1.8, 0.2),
  new THREE.Vector3(0.35, 1.5, 0.2),
  new THREE.Vector3(2.0, 1.5, 0.2),
  new THREE.Vector3(4.5, 1.5, 0.2),
  new THREE.Vector3(6.2, 1.5, 0.2),
  new THREE.Vector3(7.0, 1.5, 0.2),
  new THREE.Vector3(7.8, 1.2, -0.3),
  new THREE.Vector3(8.0, 1.0, -0.4),
])

/* ─── Act content ─── */
const ACTS = [
  {
    range: [0.0, 0.14] as [number, number],
    title: 'Ambiente Climatizado',
    subtitle: 'Um sistema completo em harmonia',
    bullets: [
      'Climatização uniforme em todo o ambiente',
      'Design moderno integrado ao teto',
      'Silencioso e eficiente',
    ],
    color: '#06b6d4',
    icon: '🏠',
  },
  {
    range: [0.14, 0.30] as [number, number],
    title: 'Evaporadora Cassete',
    subtitle: 'O coração do ambiente',
    bullets: [
      'Distribui ar em 4 direções simultaneamente',
      'Filtro de ar de alta eficiência',
      'Operação silenciosa abaixo de 35 dB',
    ],
    color: '#06b6d4',
    icon: '❄️',
  },
  {
    range: [0.30, 0.44] as [number, number],
    title: 'Componentes Internos',
    subtitle: 'Tecnologia de precisão',
    bullets: [
      'Ventilador centrífugo de alta performance',
      'Serpentina de troca térmica em cobre',
      'Bandeja de condensação com dreno',
    ],
    color: '#38bdf8',
    icon: '⚙️',
  },
  {
    range: [0.62, 0.72] as [number, number],
    title: 'Tubulação de Cobre',
    subtitle: 'O circuito do refrigerante',
    bullets: [
      'Cobre classe A de alta pureza',
      'Isolamento térmico especial',
      'Conduz gás refrigerante entre as unidades',
    ],
    color: '#f59e0b',
    icon: '🔧',
  },
  {
    range: [0.72, 0.86] as [number, number],
    title: 'Condensadora',
    subtitle: 'Potência que você não vê',
    bullets: [
      'Expele o calor captado para o exterior',
      'Compressor inverter de alta eficiência',
      'Opera mesmo em temperaturas extremas',
    ],
    color: '#22c55e',
    icon: '🏭',
  },
  {
    range: [0.86, 1.0] as [number, number],
    title: 'Ciclo Completo',
    subtitle: 'Perfeição técnica instalada',
    bullets: [
      'Sistema certificado pela NP Climatização',
      'Mais de 1.000 instalações realizadas',
      'Garantia e suporte técnico especializado',
    ],
    color: '#22c55e',
    icon: '✅',
    cta: true,
  },
]

/* ═══════════════════════════════════════════
   LIGHTS
═══════════════════════════════════════════ */
function Lights() {
  return (
    <>
      <ambientLight intensity={0.15} color="#1a3a5c" />
      <directionalLight position={[5, 8, 3]} intensity={0.8} color="#c8e4ff" castShadow />
      <pointLight position={[0, 3.1, -1]} intensity={1.2} color="#06b6d4" distance={6} decay={2} />
      <pointLight position={[6.8, 2.0, 0.5]} intensity={0.4} color="#4a9eff" distance={4} decay={2} />
      <pointLight position={[8.0, 1.5, 0.5]} intensity={0.7} color="#22c55e" distance={5} decay={2} />
      <pointLight position={[-2, 1.5, 2]} intensity={0.2} color="#1a3a5c" distance={5} decay={2} />
    </>
  )
}

/* ═══════════════════════════════════════════
   ROOM
═══════════════════════════════════════════ */
function Room() {
  const wallMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0a1e32', roughness: 0.92, metalness: 0.0 }), [])
  const floorMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#06111f', roughness: 0.85 }), [])
  const ceilMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0c1e30', roughness: 0.92 }), [])
  const sofaMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0f2540', roughness: 0.9 }), [])
  const tvMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#050e1a', emissive: '#162436', emissiveIntensity: 0.4, roughness: 0.3, metalness: 0.6 }), [])
  const plantPotMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#3a1508', roughness: 0.9 }), [])
  const plantMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0d2a10', roughness: 0.95 }), [])
  const tableMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0a1e32', roughness: 0.1, metalness: 0.7 }), [])
  const windowMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#0e4a7c', emissive: '#1060aa', emissiveIntensity: 0.8, transparent: true, opacity: 0.85 }), [])

  return (
    <group>
      {/* Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow material={floorMat}>
        <planeGeometry args={[16, 22]} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 3.2, 0]} material={ceilMat}>
        <planeGeometry args={[16, 22]} />
      </mesh>

      {/* Back wall */}
      <mesh position={[0, 1.6, -9]} material={wallMat}>
        <planeGeometry args={[16, 3.2]} />
      </mesh>

      {/* Front wall (behind camera — mostly invisible) */}
      <mesh position={[0, 1.6, 9]} rotation={[0, Math.PI, 0]} material={wallMat}>
        <planeGeometry args={[16, 3.2]} />
      </mesh>

      {/* Left wall */}
      <mesh position={[-8, 1.6, 0]} rotation={[0, Math.PI / 2, 0]} material={wallMat}>
        <planeGeometry args={[22, 3.2]} />
      </mesh>

      {/* Right wall */}
      <mesh position={[8, 1.6, 0]} rotation={[0, -Math.PI / 2, 0]} material={wallMat}>
        <planeGeometry args={[22, 3.2]} />
      </mesh>

      {/* Window on right wall */}
      <mesh position={[7.95, 1.8, 3]} rotation={[0, -Math.PI / 2, 0]} material={windowMat}>
        <planeGeometry args={[2.4, 1.6]} />
      </mesh>

      {/* Sofa seat */}
      <mesh position={[-2.5, 0.35, -6.5]} castShadow material={sofaMat}>
        <boxGeometry args={[3.5, 0.5, 1.2]} />
      </mesh>
      {/* Sofa back */}
      <mesh position={[-2.5, 0.85, -7.0]} material={sofaMat}>
        <boxGeometry args={[3.5, 0.8, 0.2]} />
      </mesh>
      {/* Sofa armrest L */}
      <mesh position={[-4.1, 0.65, -6.5]} material={sofaMat}>
        <boxGeometry args={[0.2, 0.6, 1.2]} />
      </mesh>
      {/* Sofa armrest R */}
      <mesh position={[-0.9, 0.65, -6.5]} material={sofaMat}>
        <boxGeometry args={[0.2, 0.6, 1.2]} />
      </mesh>

      {/* TV */}
      <mesh position={[2.5, 1.6, -8.9]} material={tvMat}>
        <boxGeometry args={[2.2, 1.3, 0.06]} />
      </mesh>

      {/* Plant pot */}
      <mesh position={[-6.5, 0.18, -7.5]} material={plantPotMat}>
        <cylinderGeometry args={[0.14, 0.17, 0.36, 10]} />
      </mesh>
      {/* Plant canopy */}
      <mesh position={[-6.5, 0.72, -7.5]} material={plantMat}>
        <sphereGeometry args={[0.35, 10, 10]} />
      </mesh>

      {/* Coffee table */}
      <mesh position={[-2.5, 0.42, -5.2]} material={tableMat}>
        <boxGeometry args={[1.6, 0.05, 0.9]} />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   CASSETTE UNIT
═══════════════════════════════════════════ */
function CassetteUnit() {
  const ledRef = useRef<THREE.Mesh>(null!)

  const housingMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#d8ecf8', metalness: 0.45, roughness: 0.25,
    emissive: '#06b6d4', emissiveIntensity: 0.04,
  }), [])
  const grilleMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#c0dff0', metalness: 0.3, roughness: 0.4,
  }), [])
  const ledMat = useMemo(() => new THREE.MeshBasicMaterial({ color: '#06b6d4' }), [])

  useFrame(({ clock }) => {
    if (ledRef.current) {
      const mat = ledRef.current.material as THREE.MeshBasicMaterial
      mat.color.setHSL(0.52, 1, 0.5 + Math.sin(clock.elapsedTime * 2) * 0.1)
    }
  })

  return (
    <group position={[0, 3.18, -1]}>
      {/* Main housing */}
      <mesh material={housingMat} castShadow>
        <boxGeometry args={[0.92, 0.1, 0.92]} />
      </mesh>

      {/* 4 grille panels (N/S/E/W) */}
      {[
        [0, -0.038, 0.38, -Math.PI / 2 + 0.22, 0, 0],
        [0, -0.038, -0.38, Math.PI / 2 - 0.22, 0, 0],
        [0.38, -0.038, 0, -Math.PI / 2 + 0.22, Math.PI / 2, 0],
        [-0.38, -0.038, 0, -Math.PI / 2 + 0.22, -Math.PI / 2, 0],
      ].map(([x, y, z, rx, ry, rz], i) => (
        <mesh key={i} position={[x as number, y as number, z as number]} rotation={[rx as number, ry as number, rz as number]} material={grilleMat}>
          <planeGeometry args={[0.22, 0.22]} />
        </mesh>
      ))}

      {/* LED indicator ring */}
      <mesh ref={ledRef} position={[0.32, -0.055, 0.32]} material={ledMat}>
        <torusGeometry args={[0.05, 0.005, 8, 32]} />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   CASSETTE INTERNALS (explode animation)
═══════════════════════════════════════════ */
function CassetteInternals({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!)
  const fanRef = useRef<THREE.Group>(null!)
  const finsRef = useRef<THREE.Group>(null!)
  const filterRef = useRef<THREE.Mesh>(null!)
  const drainRef = useRef<THREE.Mesh>(null!)
  const pcbRef = useRef<THREE.Mesh>(null!)

  const fanMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#a0c8e0', metalness: 0.6, roughness: 0.3, transparent: true }), [])
  const finMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#b8d8f0', metalness: 0.8, roughness: 0.2, transparent: true }), [])
  const filterMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#8ab0cc', roughness: 0.7, transparent: true, wireframe: false }), [])
  const drainMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#d8e8f0', roughness: 0.6, transparent: true }), [])
  const pcbMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a3a20', roughness: 0.5, transparent: true, emissive: '#0a2010', emissiveIntensity: 0.3 }), [])

  const blades = useMemo(() => Array.from({ length: 8 }, (_, i) => {
    const angle = (i / 8) * Math.PI * 2
    return { x: Math.cos(angle) * 0.22, z: Math.sin(angle) * 0.22, angle }
  }), [])

  const fins = useMemo(() => Array.from({ length: 18 }, (_, i) => i * 0.025 - 0.22), [])

  useFrame(({ clock }) => {
    if (!groupRef.current) return
    const p = progressRef.current
    const inView = p > 0.28 && p < 0.67
    const alpha = smoothstep(0.28, 0.34, p) * (1 - smoothstep(0.62, 0.67, p))
    const explode = smoothstep(0.45, 0.52, p) * (1 - smoothstep(0.56, 0.62, p))

    groupRef.current.visible = inView

    if (fanRef.current) {
      fanRef.current.position.y = explode * 0.55
      fanRef.current.rotation.y = clock.elapsedTime * 3
      const mats = [fanMat]
      mats.forEach(m => { m.opacity = alpha })
    }
    if (finsRef.current) {
      finsRef.current.position.z = explode * 0.55
      finMat.opacity = alpha
    }
    if (filterRef.current) {
      filterRef.current.position.y = -0.04 - explode * 0.38
      filterMat.opacity = alpha
    }
    if (drainRef.current) {
      drainRef.current.position.y = -0.07 - explode * 0.45
      drainMat.opacity = alpha
    }
    if (pcbRef.current) {
      pcbRef.current.position.z = -explode * 0.42
      pcbMat.opacity = alpha
    }
    fanMat.opacity = alpha
    finMat.opacity = alpha
  })

  const explodeForHtml = progressRef.current > 0 ? smoothstep(0.45, 0.52, progressRef.current) * (1 - smoothstep(0.56, 0.62, progressRef.current)) : 0

  return (
    <group ref={groupRef} position={[0, 3.18, -1]}>
      {/* Fan rotor + blades */}
      <group ref={fanRef}>
        <mesh material={fanMat}>
          <torusGeometry args={[0.30, 0.035, 10, 36]} />
        </mesh>
        {blades.map((b, i) => (
          <mesh key={i} position={[b.x, 0, b.z]} rotation={[0, -b.angle + Math.PI / 2, 0.3]} material={fanMat}>
            <boxGeometry args={[0.05, 0.012, 0.16]} />
          </mesh>
        ))}
        <Html position={[0, 0.75, 0]} center distanceFactor={4}>
          <motion.div
            animate={{ opacity: explodeForHtml, y: explodeForHtml * -5 }}
            style={{ pointerEvents: 'none', textAlign: 'center', whiteSpace: 'nowrap' }}
          >
            <div style={{ background: 'rgba(5,13,26,0.85)', border: '1px solid rgba(6,182,212,0.4)', borderRadius: 8, padding: '4px 10px', color: '#06b6d4', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.08em' }}>
              Ventilador Centrífugo
            </div>
          </motion.div>
        </Html>
      </group>

      {/* Aluminum fins */}
      <group ref={finsRef} position={[0, -0.01, 0]}>
        {fins.map((z, i) => (
          <mesh key={i} position={[0, 0, z]} material={finMat}>
            <boxGeometry args={[0.62, 0.004, 0.04]} />
          </mesh>
        ))}
        <Html position={[0.45, 0, 0.75]} center distanceFactor={4}>
          <motion.div
            animate={{ opacity: explodeForHtml }}
            style={{ pointerEvents: 'none', whiteSpace: 'nowrap' }}
          >
            <div style={{ background: 'rgba(5,13,26,0.85)', border: '1px solid rgba(56,189,248,0.4)', borderRadius: 8, padding: '4px 10px', color: '#38bdf8', fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.08em' }}>
              Serpentina de Cobre
            </div>
          </motion.div>
        </Html>
      </group>

      {/* Filter */}
      <mesh ref={filterRef} position={[0, -0.04, 0]} material={filterMat}>
        <planeGeometry args={[0.78, 0.78]} />
      </mesh>

      {/* Drain pan */}
      <mesh ref={drainRef} position={[0, -0.07, 0]} material={drainMat}>
        <boxGeometry args={[0.84, 0.03, 0.84]} />
      </mesh>

      {/* PCB */}
      <mesh ref={pcbRef} position={[0.18, 0.04, 0]} material={pcbMat}>
        <boxGeometry args={[0.36, 0.012, 0.28]} />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   COPPER PIPE ROUTE
═══════════════════════════════════════════ */
function CopperPipeRoute({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const pipe1Ref = useRef<THREE.Mesh>(null!)
  const pipe2Ref = useRef<THREE.Mesh>(null!)

  const pipeMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#b87333', metalness: 1.0, roughness: 0.18,
    emissive: '#8a5020', emissiveIntensity: 0.12, transparent: true,
  }), [])
  const pipe2Mat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#c48040', metalness: 1.0, roughness: 0.2,
    emissive: '#8a5020', emissiveIntensity: 0.08, transparent: true,
  }), [])

  const geo1 = useMemo(() => new THREE.TubeGeometry(PIPE_PATH, 100, 0.024, 10, false), [])
  const geo2 = useMemo(() => {
    const offset = PIPE_PATH.points.map(p => new THREE.Vector3(p.x, p.y + 0.055, p.z))
    const curve2 = new THREE.CatmullRomCurve3(offset)
    return new THREE.TubeGeometry(curve2, 100, 0.018, 10, false)
  }, [])

  useFrame(() => {
    const p = progressRef.current
    const alpha = smoothstep(0.55, 0.62, p) * (1 - smoothstep(0.82, 0.88, p))
    pipeMat.opacity = alpha
    pipe2Mat.opacity = alpha
  })

  return (
    <group>
      <mesh ref={pipe1Ref} geometry={geo1} material={pipeMat} />
      <mesh ref={pipe2Ref} geometry={geo2} material={pipe2Mat} />
    </group>
  )
}

/* ═══════════════════════════════════════════
   CONDENSADORA
═══════════════════════════════════════════ */
function Condensadora({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null!)
  const fanBladeRefs = useRef<THREE.Mesh[]>([])
  const spinRef = useRef(0)

  const housingMat = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#0c1f30', metalness: 0.5, roughness: 0.55,
    emissive: '#06b6d4', emissiveIntensity: 0,
    transparent: true,
  }), [])
  const louverMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a3a50', metalness: 0.7, roughness: 0.4, transparent: true }), [])
  const grillMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a3850', metalness: 0.6, roughness: 0.5, transparent: true, wireframe: false }), [])
  const fanMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2a5070', metalness: 0.5, roughness: 0.4, transparent: true }), [])
  const compMat = useMemo(() => new THREE.MeshStandardMaterial({ color: '#1a2a3a', metalness: 0.7, roughness: 0.4, transparent: true }), [])

  const louvers = useMemo(() => Array.from({ length: 24 }, (_, i) => i * 0.058 - 0.66), [])

  useFrame(({ clock }) => {
    const p = progressRef.current
    const alpha = smoothstep(0.65, 0.72, p)

    if (groupRef.current) groupRef.current.visible = p > 0.60

    housingMat.opacity = alpha
    housingMat.emissiveIntensity = smoothstep(0.70, 0.76, p) * 0.1
    louverMat.opacity = alpha
    grillMat.opacity = alpha
    fanMat.opacity = alpha
    compMat.opacity = alpha

    if (p > 0.72) {
      spinRef.current += 0.04
      fanBladeRefs.current.forEach((b, i) => {
        if (b) b.rotation.z = spinRef.current + (i / 5) * Math.PI * 2
      })
    }
  })

  return (
    <group ref={groupRef} position={[8.0, 0.675, -0.5]}>
      {/* Main housing */}
      <mesh material={housingMat}>
        <boxGeometry args={[1.1, 1.35, 0.62]} />
      </mesh>

      {/* Louver fins — sides */}
      {louvers.map((y, i) => (
        <mesh key={i} position={[0, y, 0]} material={louverMat}>
          <boxGeometry args={[0.92, 0.03, 0.65]} />
        </mesh>
      ))}

      {/* Fan grill face */}
      <mesh position={[0, 0.3, 0.32]} material={grillMat}>
        <circleGeometry args={[0.38, 32]} />
      </mesh>

      {/* Fan blades */}
      {Array.from({ length: 5 }, (_, i) => {
        const angle = (i / 5) * Math.PI * 2
        return (
          <mesh
            key={i}
            ref={el => { if (el) fanBladeRefs.current[i] = el }}
            position={[Math.cos(angle) * 0.22, 0.3 + Math.sin(angle) * 0.22, 0.34]}
            rotation={[0, 0, angle]}
            material={fanMat}
          >
            <boxGeometry args={[0.28, 0.04, 0.07]} />
          </mesh>
        )
      })}

      {/* Compressor cylinder */}
      <mesh position={[-0.28, -0.45, 0.05]} material={compMat}>
        <cylinderGeometry args={[0.14, 0.14, 0.22, 14]} />
      </mesh>
      <mesh position={[-0.28, -0.33, 0.05]} material={compMat}>
        <sphereGeometry args={[0.14, 14, 8]} />
      </mesh>

      {/* Service valve ports */}
      <mesh position={[0.45, -0.5, -0.15]} material={compMat} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 0.07, 8]} />
      </mesh>
      <mesh position={[0.45, -0.42, -0.15]} material={compMat} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.07, 8]} />
      </mesh>
    </group>
  )
}

/* ═══════════════════════════════════════════
   COLD AIR PARTICLES
═══════════════════════════════════════════ */
function ColdAirParticles({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const COUNT = 200
  const geoRef = useRef<THREE.BufferGeometry>(null!)
  const matRef = useRef<THREE.PointsMaterial>(null!)

  const positions = useMemo(() => {
    const arr = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 0.7
      arr[i * 3 + 1] = 3.18 - Math.random() * 0.8
      arr[i * 3 + 2] = -1 + (Math.random() - 0.5) * 0.7
    }
    return arr
  }, [])

  const velocities = useMemo(() => {
    const v = new Float32Array(COUNT * 3)
    for (let i = 0; i < COUNT; i++) {
      v[i * 3] = (Math.random() - 0.5) * 0.008
      v[i * 3 + 1] = -0.004 - Math.random() * 0.006
      v[i * 3 + 2] = (Math.random() - 0.5) * 0.008
    }
    return v
  }, [])

  const posArr = useMemo(() => positions.slice(), [positions])

  useFrame(() => {
    const p = progressRef.current
    const alpha = smoothstep(0.12, 0.20, p) * (1 - smoothstep(0.50, 0.55, p))

    if (matRef.current) matRef.current.opacity = alpha * 0.7

    if (!geoRef.current || alpha < 0.01) return

    const attr = geoRef.current.attributes.position
    const arr = attr.array as Float32Array

    for (let i = 0; i < COUNT; i++) {
      arr[i * 3] += velocities[i * 3]
      arr[i * 3 + 1] += velocities[i * 3 + 1]
      arr[i * 3 + 2] += velocities[i * 3 + 2]

      if (arr[i * 3 + 1] < 2.0) {
        arr[i * 3] = (Math.random() - 0.5) * 0.65
        arr[i * 3 + 1] = 3.15
        arr[i * 3 + 2] = -1 + (Math.random() - 0.5) * 0.65
      }
    }
    attr.needsUpdate = true
  })

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[posArr, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.018}
        color="#a0e8ff"
        transparent
        opacity={0}
        sizeAttenuation
      />
    </points>
  )
}

/* ═══════════════════════════════════════════
   POST FX
═══════════════════════════════════════════ */
function PostFX() {
  return (
    <EffectComposer>
      <Bloom
        intensity={1.6}
        luminanceThreshold={0.55}
        luminanceSmoothing={0.3}
        mipmapBlur
      />
    </EffectComposer>
  )
}

/* ═══════════════════════════════════════════
   CAMERA RIG — reads curves each frame
═══════════════════════════════════════════ */
function CameraRig({ progressRef }: { progressRef: MutableRefObject<number> }) {
  const { camera } = useThree()
  const targetPos = useMemo(() => new THREE.Vector3(), [])
  const targetLook = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    const p = Math.max(0, Math.min(1, progressRef.current))
    CAMERA_CURVE.getPoint(p, targetPos)
    LOOKAT_CURVE.getPoint(p, targetLook)
    camera.position.lerp(targetPos, 0.08)
    camera.lookAt(targetLook)
  })

  return null
}

/* ═══════════════════════════════════════════
   TEXT OVERLAY
═══════════════════════════════════════════ */
function ActPanel({ act, progress }: { act: typeof ACTS[0]; progress: number }) {
  const [lo, hi] = act.range
  const isActive = progress >= lo && progress <= hi
  const fadeIn = smoothstep(lo, lo + 0.03, progress)
  const fadeOut = 1 - smoothstep(hi - 0.03, hi, progress)
  const opacity = Math.min(fadeIn, fadeOut)

  return (
    <motion.div
      animate={{ opacity, y: isActive ? 0 : 12 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      style={{
        position: 'absolute',
        pointerEvents: isActive ? 'auto' : 'none',
        opacity,
        bottom: '12%',
        left: '5%',
        maxWidth: 380,
        background: 'rgba(5,13,26,0.78)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: `1px solid ${act.color}33`,
        borderRadius: 16,
        padding: '28px 32px',
      }}
    >
      <div style={{ color: act.color, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', marginBottom: 8 }}>
        {act.icon} {act.range[0] === 0 ? '01' : Math.round(act.range[0] * 10).toString().padStart(2, '0')} / 06
      </div>
      <h3 style={{ color: '#e8f4ff', fontSize: 22, fontWeight: 700, margin: '0 0 6px', lineHeight: 1.2 }}>
        {act.title}
      </h3>
      <p style={{ color: '#8ab8d8', fontSize: 13, margin: '0 0 14px', lineHeight: 1.5 }}>
        {act.subtitle}
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {act.bullets.map((b, i) => (
          <li key={i} style={{ color: '#a8c8e0', fontSize: 12, lineHeight: 1.6, display: 'flex', alignItems: 'flex-start', gap: 8, marginBottom: 4 }}>
            <span style={{ color: act.color, marginTop: 2 }}>▸</span>
            {b}
          </li>
        ))}
      </ul>
      {act.cta && (
        <a
          href="https://wa.me/5511999999999"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-block', marginTop: 18,
            background: 'linear-gradient(135deg, #06b6d4, #0284a8)',
            color: '#fff', borderRadius: 8, padding: '10px 22px',
            fontSize: 13, fontWeight: 600, textDecoration: 'none',
            letterSpacing: '0.05em',
          }}
        >
          Solicitar Orçamento →
        </a>
      )}
    </motion.div>
  )
}

function ProgressBar({ progress }: { progress: number }) {
  return (
    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'rgba(255,255,255,0.06)' }}>
      <div style={{ height: '100%', width: `${progress * 100}%`, background: 'linear-gradient(90deg, #06b6d4, #22c55e)', transition: 'width 0.1s linear' }} />
    </div>
  )
}

function ScrollHint({ progress }: { progress: number }) {
  const visible = progress < 0.04
  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      style={{
        position: 'absolute', bottom: '6%', left: '50%', transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
        pointerEvents: 'none',
      }}
    >
      <span style={{ color: '#4a8aaa', fontSize: 11, letterSpacing: '0.15em', fontFamily: 'monospace' }}>ROLE PARA EXPLORAR</span>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
        style={{ color: '#06b6d4', fontSize: 18 }}
      >
        ↓
      </motion.div>
    </motion.div>
  )
}

function StepDots({ progress }: { progress: number }) {
  const steps = ACTS.map(a => (a.range[0] + a.range[1]) / 2)
  return (
    <div style={{ position: 'absolute', right: '3%', top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 12, pointerEvents: 'none' }}>
      {steps.map((s, i) => {
        const active = Math.abs(progress - s) < 0.12
        return (
          <div key={i} style={{
            width: active ? 10 : 6, height: active ? 10 : 6, borderRadius: '50%',
            background: active ? '#06b6d4' : 'rgba(6,182,212,0.3)',
            transition: 'all 0.3s ease', boxShadow: active ? '0 0 8px #06b6d4' : 'none',
          }} />
        )
      })}
    </div>
  )
}

function TextOverlayLayer({ progress }: { progress: number }) {
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      {ACTS.map((act, i) => (
        <ActPanel key={i} act={act} progress={progress} />
      ))}
      <ProgressBar progress={progress} />
      <ScrollHint progress={progress} />
      <StepDots progress={progress} />

      {/* Brand mark */}
      <div style={{
        position: 'absolute', top: 24, right: 24,
        color: 'rgba(6,182,212,0.5)', fontFamily: 'monospace',
        fontSize: 10, letterSpacing: '0.2em',
      }}>
        NP CLIMATIZAÇÃO
      </div>

      {/* Section title */}
      <div style={{
        position: 'absolute', top: 24, left: '5%',
        color: 'rgba(168,200,224,0.6)', fontFamily: 'monospace',
        fontSize: 10, letterSpacing: '0.15em',
      }}>
        COMO FUNCIONA O SISTEMA
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════
   MOBILE FALLBACK
═══════════════════════════════════════════ */
const MOBILE_CARDS = ACTS.map(a => ({ ...a }))

function AcScrollytellingMobile() {
  const [active, setActive] = useState(0)

  return (
    <section style={{ background: '#050d1a', padding: '60px 0' }}>
      <div style={{ textAlign: 'center', marginBottom: 40, padding: '0 24px' }}>
        <div style={{ color: '#06b6d4', fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.2em', marginBottom: 10 }}>
          COMO FUNCIONA
        </div>
        <h2 style={{ color: '#e8f4ff', fontSize: 26, fontWeight: 700, margin: 0 }}>
          Entenda o Sistema Completo
        </h2>
      </div>

      <div style={{ padding: '0 24px', maxWidth: 480, margin: '0 auto' }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
            style={{
              background: 'rgba(10,30,50,0.8)',
              border: `1px solid ${MOBILE_CARDS[active].color}33`,
              borderRadius: 16,
              padding: '32px 24px',
              marginBottom: 24,
            }}
          >
            <div style={{ fontSize: 40, marginBottom: 16 }}>{MOBILE_CARDS[active].icon}</div>
            <div style={{ color: MOBILE_CARDS[active].color, fontFamily: 'monospace', fontSize: 11, letterSpacing: '0.15em', marginBottom: 10 }}>
              {String(active + 1).padStart(2, '0')} / {MOBILE_CARDS.length}
            </div>
            <h3 style={{ color: '#e8f4ff', fontSize: 22, fontWeight: 700, margin: '0 0 8px' }}>
              {MOBILE_CARDS[active].title}
            </h3>
            <p style={{ color: '#8ab8d8', fontSize: 14, margin: '0 0 16px' }}>
              {MOBILE_CARDS[active].subtitle}
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {MOBILE_CARDS[active].bullets.map((b, i) => (
                <li key={i} style={{ color: '#a8c8e0', fontSize: 13, lineHeight: 1.7, display: 'flex', gap: 8, marginBottom: 4 }}>
                  <span style={{ color: MOBILE_CARDS[active].color }}>▸</span>
                  {b}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <button
            onClick={() => setActive(a => Math.max(0, a - 1))}
            disabled={active === 0}
            style={{
              background: active === 0 ? 'rgba(6,182,212,0.1)' : 'rgba(6,182,212,0.2)',
              border: '1px solid rgba(6,182,212,0.3)', borderRadius: 8,
              color: '#06b6d4', padding: '10px 20px', cursor: active === 0 ? 'default' : 'pointer',
              fontSize: 13, opacity: active === 0 ? 0.4 : 1,
            }}
          >
            ← Anterior
          </button>

          <div style={{ display: 'flex', gap: 8 }}>
            {MOBILE_CARDS.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                style={{
                  width: 8, height: 8, borderRadius: '50%', border: 'none', cursor: 'pointer',
                  background: i === active ? '#06b6d4' : 'rgba(6,182,212,0.3)',
                  padding: 0,
                }}
              />
            ))}
          </div>

          <button
            onClick={() => setActive(a => Math.min(MOBILE_CARDS.length - 1, a + 1))}
            disabled={active === MOBILE_CARDS.length - 1}
            style={{
              background: active === MOBILE_CARDS.length - 1 ? 'rgba(6,182,212,0.1)' : 'rgba(6,182,212,0.2)',
              border: '1px solid rgba(6,182,212,0.3)', borderRadius: 8,
              color: '#06b6d4', padding: '10px 20px', cursor: active === MOBILE_CARDS.length - 1 ? 'default' : 'pointer',
              fontSize: 13, opacity: active === MOBILE_CARDS.length - 1 ? 0.4 : 1,
            }}
          >
            Próximo →
          </button>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════
   MAIN EXPORT
═══════════════════════════════════════════ */
export default function AcScrollytelling() {
  const sectionRef = useRef<HTMLDivElement>(null!)
  const progressRef = useRef(0)
  const [displayProgress, setDisplayProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (isMobile) return

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.8,
        onUpdate: (self) => {
          progressRef.current = self.progress
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  useEffect(() => {
    if (isMobile) return
    let raf: number
    const loop = () => {
      setDisplayProgress(progressRef.current)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [isMobile])

  if (isMobile) return <AcScrollytellingMobile />

  return (
    <div
      ref={sectionRef}
      style={{ position: 'relative', height: '700vh', background: '#050d1a' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
        }}
      >
        <Canvas
          style={{ position: 'absolute', inset: 0 }}
          camera={{ position: [0, 2.8, 9], fov: 55, near: 0.01, far: 80 }}
          shadows
          gl={{ antialias: true, alpha: false }}
        >
          <color attach="background" args={['#050d1a']} />
          <fogExp2 attach="fog" args={['#050d1a', 0.022]} />

          <Lights />
          <Room />
          <CassetteUnit />
          <CassetteInternals progressRef={progressRef} />
          <CopperPipeRoute progressRef={progressRef} />
          <Condensadora progressRef={progressRef} />
          <ColdAirParticles progressRef={progressRef} />
          <PostFX />
          <CameraRig progressRef={progressRef} />
        </Canvas>

        <TextOverlayLayer progress={displayProgress} />
      </div>
    </div>
  )
}
