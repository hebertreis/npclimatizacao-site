'use client'

import { useState } from 'react'
import Image from 'next/image'

const categories = ['Todos', 'Residencial', 'Comercial', 'Construtoras']

const projects = [
  {
    id: 1,
    category: 'Residencial',
    title: 'Apartamento Alto Padrão',
    location: 'Tatuapé, SP',
    description: 'Instalação de sistema VRF com 6 unidades internas em apartamento de alto padrão.',
    image: '/images/obras/obra-1.jpeg',
  },
  {
    id: 2,
    category: 'Residencial',
    title: 'Casa Alto Padrão',
    location: 'Alphaville, SP',
    description: 'Climatização de casa moderna com ampla área integrada e teto em madeira.',
    image: '/images/obras/obra-2.jpeg',
  },
  {
    id: 3,
    category: 'Residencial',
    title: 'Apartamento com Sala Integrada',
    location: 'Moema, SP',
    description: 'Sistema de cassete instalado em apartamento com sala de estar integrada à varanda.',
    image: '/images/obras/obra-3.jpeg',
  },
  {
    id: 4,
    category: 'Residencial',
    title: 'Casa de Luxo',
    location: 'Vila Nova Conceição, SP',
    description: 'Projeto completo de climatização em casa de luxo com acabamento clássico e escada.',
    image: '/images/obras/obra-4.jpeg',
  },
  {
    id: 5,
    category: 'Residencial',
    title: 'Cobertura Duplex de Alto Padrão',
    location: 'Itaim Bibi, SP',
    description: 'Instalação de sistema VRF com dutos ocultos em cobertura duplex com amplos ambientes integrados e escada helicoidal.',
    image: '/images/obras/obra-5.jpeg',
  },
]

const IconPin = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" />
  </svg>
)

export default function Portfolio() {
  const [active, setActive] = useState('Todos')

  const filtered =
    active === 'Todos' ? projects : projects.filter((p) => p.category === active)

  return (
    <section id="obras" className="py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#06b6d4' }}>
          Portfólio
        </p>
        <h2 className="section-title">Nossas Obras</h2>
        <p className="section-subtitle">
          Projetos realizados com excelência em toda São Paulo
        </p>

        {/* Filter tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`filter-btn ${active === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="rounded-xl overflow-hidden shadow-sm border"
              style={{ borderColor: '#e0f2fe' }}
            >
              <div className="relative h-48 w-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5">
                <span
                  className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded"
                  style={{ background: '#e0f2fe', color: '#0891b2' }}
                >
                  {project.category}
                </span>
                <h3 className="font-bold text-base mt-2 mb-1" style={{ color: '#1a3a5c' }}>
                  {project.title}
                </h3>
                <p className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <IconPin /> {project.location}
                </p>
                <p className="text-sm text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
