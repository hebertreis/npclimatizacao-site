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
    description: 'Instalação de sistema VRF com 6 unidades internas.',
    image: '/images/obras/obra-1.jpeg',
  },
  {
    id: 2,
    category: 'Comercial',
    title: 'Escritório Corporativo',
    location: 'Paulista, SP',
    description: 'Projeto completo de climatização para escritório de 800m².',
    image: '/images/obras/obra-2.jpeg',
  },
  {
    id: 3,
    category: 'Construtoras',
    title: 'Empreendimento Residencial',
    location: 'Grande SP',
    description: '120 unidades instaladas em condomínio de alto padrão.',
    image: '/images/obras/obra-3.jpeg',
  },
  {
    id: 4,
    category: 'Residencial',
    title: 'Casa de Alto Padrão',
    location: 'Moema, SP',
    description: 'Sistema de ductos com controle inteligente por ambiente.',
    image: '/images/obras/obra-4.jpeg',
  },
  {
    id: 5,
    category: 'Comercial',
    title: 'Loja de Varejo',
    location: 'Vila Mariana, SP',
    description: 'Instalação de cassetes para área de vendas de 400m².',
    image: '/images/obras/obra-2.jpeg',
  },
  {
    id: 6,
    category: 'Construtoras',
    title: 'Torre Comercial',
    location: 'Itaim Bibi, SP',
    description: 'Infraestrutura e instalação para 15 andares de escritórios.',
    image: '/images/obras/obra-3.jpeg',
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
