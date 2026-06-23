'use client'

import dynamic from 'next/dynamic'

const ComoFunciona3D = dynamic(() => import('./ComoFunciona3D'), {
  ssr: false,
  loading: () => (
    <div
      style={{
        height: '100vh',
        background: '#020810',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#06b6d4',
        fontFamily: 'monospace',
        fontSize: '0.8rem',
        letterSpacing: '0.15em',
      }}
    >
      Carregando experiência 3D...
    </div>
  ),
})

export default function ComoFunciona3DWrapper() {
  return <ComoFunciona3D />
}
