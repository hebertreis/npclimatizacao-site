"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";

type FormData = {
  nome: string;
  whatsapp: string;
  servico: string;
  metragem?: string;
  mensagem?: string;
};

const WaIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "0.8rem 1rem",
  borderRadius: "0.375rem",
  fontSize: "0.9rem",
  color: "var(--text)",
  background: "var(--bg)",
  border: "1px solid var(--border)",
  outline: "none",
  transition: "border-color 0.2s",
};

const labelStyle: React.CSSProperties = {
  fontSize: "0.72rem",
  fontWeight: 600,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "var(--text-muted)",
  display: "block",
  marginBottom: "0.4rem",
};

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setSent(true);
      reset();
    } catch {
      alert("Erro ao enviar. Tente pelo WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contato" className="py-24 px-4" style={{ background: "var(--bg)" }}>
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <span className="section-eyebrow">Orçamento</span>
          <h2 className="section-heading mt-3 mb-3">Solicite seu Orçamento</h2>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>
            Resposta em até 2 horas úteis — sem compromisso
          </p>
        </div>

        {/* Primary CTA: WhatsApp */}
        <a
          href="https://wa.me/551123891033?text=Gostaria%20de%20agendar%20uma%20visita%20t%C3%A9cnica%20gratuita."
          target="_blank"
          rel="noopener noreferrer"
          className="btn-wa w-full mb-6"
          style={{ justifyContent: "center", fontSize: "0.95rem", padding: "1rem" }}
        >
          <WaIcon />
          Agendar Visita Técnica Gratuita (WhatsApp)
        </a>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
          <span
            style={{
              fontSize: "0.68rem",
              color: "var(--text-muted)",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              whiteSpace: "nowrap",
            }}
          >
            ou envie uma mensagem
          </span>
          <div style={{ flex: 1, height: 1, background: "var(--border)" }} />
        </div>

        {sent ? (
          <div
            className="text-center py-12 rounded-xl"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="flex justify-center mb-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                <polyline points="22 4 12 14.01 9 11.01" />
              </svg>
            </div>
            <h3
              style={{
                fontSize: "1.1rem",
                fontWeight: 700,
                color: "var(--text)",
                marginBottom: "0.5rem",
              }}
            >
              Mensagem enviada!
            </h3>
            <p style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
              Nossa equipe entrará em contato em até 2 horas úteis.
            </p>
            <button
              onClick={() => setSent(false)}
              className="btn-outline mt-6 px-6 py-2"
              style={{ fontSize: "0.85rem" }}
            >
              Enviar outro
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-xl p-7 flex flex-col gap-4"
            style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Seu nome *</label>
                <input
                  {...register("nome", { required: "Nome obrigatório" })}
                  placeholder="Ex: João Silva"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                {errors.nome && (
                  <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    {errors.nome.message}
                  </p>
                )}
              </div>
              <div>
                <label style={labelStyle}>WhatsApp *</label>
                <input
                  {...register("whatsapp", { required: "WhatsApp obrigatório" })}
                  placeholder="(11) 99999-9999"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
                {errors.whatsapp && (
                  <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    {errors.whatsapp.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label style={labelStyle}>Tipo de serviço *</label>
                <select
                  {...register("servico", { required: "Selecione um serviço" })}
                  style={{ ...inputStyle, color: "var(--text-muted)" }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                >
                  <option value="">Selecione...</option>
                  <option value="instalacao">Instalação de Ar Condicionado</option>
                  <option value="preventiva">Manutenção Preventiva</option>
                  <option value="corretiva">Manutenção Corretiva</option>
                  <option value="projeto">Projeto Corporativo</option>
                  <option value="visita">Visita Técnica</option>
                  <option value="outro">Outro</option>
                </select>
                {errors.servico && (
                  <p style={{ color: "#f87171", fontSize: "0.75rem", marginTop: "0.25rem" }}>
                    {errors.servico.message}
                  </p>
                )}
              </div>
              <div>
                <label style={labelStyle}>Metragem / Ambientes</label>
                <input
                  {...register("metragem")}
                  placeholder="Ex: 80m², 3 ambientes"
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                  onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Mensagem (opcional)</label>
              <textarea
                {...register("mensagem")}
                placeholder="Descreva brevemente sua necessidade..."
                rows={3}
                style={{ ...inputStyle, resize: "none" }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
                onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full py-4"
              style={{ fontSize: "0.9rem", opacity: loading ? 0.6 : 1 }}
            >
              {loading ? "Enviando..." : "Enviar Mensagem"}
            </button>

            <p
              className="flex items-center justify-center gap-1.5 text-center"
              style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}
            >
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                <path d="M7 11V7a5 5 0 0110 0v4" />
              </svg>
              Seus dados estão seguros. Não enviamos spam.
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
