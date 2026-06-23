'use client'

import dynamic from 'next/dynamic'

const AcScrollytelling = dynamic(() => import('./AcScrollytelling'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '100vh',
        background: '#050d1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <span
        style={{
          fontFamily: 'monospace',
          color: '#06b6d4',
          fontSize: '0.875rem',
          letterSpacing: '0.1em',
        }}
      >
        Carregando experiência 3D...
      </span>
    </div>
  ),
})

export default function AcScrollytellingWrapper() {
  return <AcScrollytelling />
}
