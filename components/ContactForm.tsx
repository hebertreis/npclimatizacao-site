'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  nome: string
  whatsapp: string
  servico: string
  mensagem?: string
}

export default function ContactForm() {
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    try {
      await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      setSent(true)
      reset()
    } catch {
      alert('Erro ao enviar. Tente pelo WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="contato"
      className="py-20 px-4"
      style={{ background: '#0e2a42' }}
    >
      <div className="max-w-3xl mx-auto">
        <p className="text-center text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#06b6d4' }}>
          Orçamento
        </p>
        <h2 className="text-3xl font-bold text-white text-center mb-2">
          Solicite seu Orçamento Gratuito
        </h2>
        <p className="text-center text-blue-300 mb-8">
          Resposta em até 2 horas úteis — sem compromisso
        </p>

        {sent ? (
          <div
            className="text-center py-12 rounded-2xl"
            style={{ background: '#1a3a5c', border: '1px solid rgba(6,182,212,0.4)' }}
          >
            <div className="flex justify-center mb-4">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              Mensagem enviada com sucesso!
            </h3>
            <p className="text-blue-300 text-sm">
              Nossa equipe entrará em contato em até 2 horas.
            </p>
            <button
              onClick={() => setSent(false)}
              className="mt-6 btn-primary px-6 py-2 text-sm"
            >
              Enviar outro
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl p-8 flex flex-col gap-4"
            style={{ background: '#1a3a5c', border: '1px solid rgba(6,182,212,0.2)' }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-blue-200 block mb-1">
                  Seu nome *
                </label>
                <input
                  {...register('nome', { required: 'Nome obrigatório' })}
                  placeholder="Ex: João Silva"
                  className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none focus:ring-2"
                  style={{
                    background: '#0e2a42',
                    border: '1px solid rgba(6,182,212,0.3)',
                    '--tw-ring-color': '#06b6d4',
                  } as React.CSSProperties}
                />
                {errors.nome && (
                  <p className="text-red-400 text-xs mt-1">{errors.nome.message}</p>
                )}
              </div>

              <div>
                <label className="text-xs font-semibold text-blue-200 block mb-1">
                  WhatsApp *
                </label>
                <input
                  {...register('whatsapp', { required: 'WhatsApp obrigatório' })}
                  placeholder="(11) 99999-9999"
                  className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none focus:ring-2"
                  style={{
                    background: '#0e2a42',
                    border: '1px solid rgba(6,182,212,0.3)',
                    '--tw-ring-color': '#06b6d4',
                  } as React.CSSProperties}
                />
                {errors.whatsapp && (
                  <p className="text-red-400 text-xs mt-1">{errors.whatsapp.message}</p>
                )}
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-blue-200 block mb-1">
                Tipo de serviço *
              </label>
              <select
                {...register('servico', { required: 'Selecione um serviço' })}
                className="w-full px-4 py-3 rounded-lg text-sm outline-none focus:ring-2"
                style={{
                  background: '#0e2a42',
                  border: '1px solid rgba(6,182,212,0.3)',
                  color: '#7ab8d8',
                  '--tw-ring-color': '#06b6d4',
                } as React.CSSProperties}
              >
                <option value="">Selecione...</option>
                <option value="instalacao">Instalação de Ar Condicionado</option>
                <option value="manutencao">Manutenção Preventiva/Corretiva</option>
                <option value="projeto">Projeto Corporativo</option>
                <option value="visita">Visita Técnica</option>
                <option value="venda">Compra de Equipamento</option>
                <option value="outro">Outro</option>
              </select>
              {errors.servico && (
                <p className="text-red-400 text-xs mt-1">{errors.servico.message}</p>
              )}
            </div>

            <div>
              <label className="text-xs font-semibold text-blue-200 block mb-1">
                Mensagem (opcional)
              </label>
              <textarea
                {...register('mensagem')}
                placeholder="Descreva brevemente sua necessidade..."
                rows={3}
                className="w-full px-4 py-3 rounded-lg text-white text-sm outline-none focus:ring-2 resize-none"
                style={{
                  background: '#0e2a42',
                  border: '1px solid rgba(6,182,212,0.3)',
                  '--tw-ring-color': '#06b6d4',
                } as React.CSSProperties}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4 text-base font-bold disabled:opacity-60"
            >
              {loading ? 'Enviando...' : 'Quero meu Orçamento Gratuito'}
            </button>

            <p className="text-center text-xs text-blue-400 flex items-center justify-center gap-1.5">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Seus dados estão seguros. Não enviamos spam.
            </p>
          </form>
        )}
      </div>
    </section>
  )
}
