"use client";

import { motion } from "framer-motion";

const LogoDaikinWhite = () => (
  <svg viewBox="0 0 200 70" width="130" height="46" xmlns="http://www.w3.org/2000/svg" aria-label="Daikin">
    <polygon points="18,12 38,52 8,52" fill="var(--text)" />
    <text x="48" y="50" fontFamily="Arial Black, Impact, sans-serif" fontSize="34" fontWeight="900" fill="var(--text)" fontStyle="italic">DAIKIN</text>
  </svg>
);

const LogoLG = () => (
  <svg viewBox="0 0 180 70" width="110" height="44" xmlns="http://www.w3.org/2000/svg" aria-label="LG">
    <circle cx="35" cy="35" r="32" fill="#c0003c" />
    <text x="22" y="46" fontFamily="Arial Black, sans-serif" fontSize="26" fontWeight="900" fill="white">LG</text>
    <circle cx="24" cy="24" r="5" fill="none" stroke="white" strokeWidth="2" />
    <text x="90" y="48" fontFamily="Arial Black, sans-serif" fontSize="34" fontWeight="900" fill="var(--text)">LG</text>
  </svg>
);

const LogoSamsung = () => (
  <svg viewBox="0 0 260 70" width="170" height="46" xmlns="http://www.w3.org/2000/svg" aria-label="Samsung">
    <text x="10" y="50" fontFamily="Arial Black, Impact, sans-serif" fontSize="38" fontWeight="900" fill="var(--text-muted)" letterSpacing="2">SAMSUNG</text>
  </svg>
);

const LogoFujitsu = () => (
  <svg viewBox="0 0 220 90" width="130" height="59" xmlns="http://www.w3.org/2000/svg" aria-label="Fujitsu">
    <path d="M110,8 C110,8 100,2 104,14 C108,26 118,20 114,10 C112,5 108,5 110,8 Z M104,14 C100,26 90,20 94,10 C98,0 108,0 110,8" fill="none" stroke="var(--accent)" strokeWidth="3.5" />
    <ellipse cx="110" cy="8" rx="7" ry="5" fill="none" stroke="var(--accent)" strokeWidth="3.5" />
    <text x="10" y="78" fontFamily="Georgia, Times New Roman, serif" fontSize="38" fontWeight="700" fill="var(--text-muted)" letterSpacing="1">FUJITSU</text>
  </svg>
);

const LogoCarrier = () => (
  <svg viewBox="0 0 220 80" width="140" height="52" xmlns="http://www.w3.org/2000/svg" aria-label="Carrier">
    <ellipse cx="110" cy="40" rx="108" ry="38" fill="#1d4ed8" />
    <ellipse cx="110" cy="40" rx="100" ry="31" fill="none" stroke="white" strokeWidth="1.5" />
    <text x="110" y="52" fontFamily="Palatino, Georgia, serif" fontSize="34" fontWeight="700" fill="white" textAnchor="middle" fontStyle="italic">Carrier</text>
  </svg>
);

const LogoElgin = () => (
  <svg viewBox="0 0 190 70" width="120" height="46" xmlns="http://www.w3.org/2000/svg" aria-label="Elgin">
    <path d="M18,20 A20,20 0 0,1 38,10" fill="none" stroke="var(--accent)" strokeWidth="7" strokeLinecap="round" />
    <text x="42" y="54" fontFamily="Arial Rounded MT Bold, Arial, sans-serif" fontSize="40" fontWeight="700" fill="var(--text-muted)">elgin</text>
  </svg>
);

const LogoMidea = () => (
  <svg viewBox="0 0 220 80" width="130" height="52" xmlns="http://www.w3.org/2000/svg" aria-label="Midea">
    <path d="M30,70 A50,50 0 1,1 80,20" fill="none" stroke="var(--accent)" strokeWidth="6" strokeLinecap="round" />
    <text x="70" y="65" fontFamily="Arial Rounded MT Bold, Arial, sans-serif" fontSize="40" fontWeight="700" fill="var(--text-muted)">Midea</text>
  </svg>
);

const brandGroups = [
  {
    label: "Alta performance residencial e comercial",
    brands: [
      { name: "LG", Logo: LogoLG },
      { name: "Samsung", Logo: LogoSamsung },
    ],
  },
  {
    label: "Padrão VRF premium",
    brands: [
      { name: "Carrier", Logo: LogoCarrier },
      { name: "Fujitsu", Logo: LogoFujitsu },
    ],
  },
  {
    label: "Custo-eficiente para projetos de escala",
    brands: [
      { name: "Elgin", Logo: LogoElgin },
      { name: "Midea", Logo: LogoMidea },
    ],
  },
];

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.07 },
  }),
};

export default function BrandsAuthority() {
  return (
    <section id="marcas" style={{ background: "var(--bg)" }} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-14 text-center">
          <span className="section-eyebrow">Fabricantes Parceiros</span>
          <h2 className="section-heading mt-3 mb-4">
            Marcas com as quais trabalhamos
          </h2>
          <p className="section-subtext">
            Domínio técnico de cada linha — da instalação ao comissionamento.
          </p>
        </div>

        {/* Daikin featured */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-80px" }}
          className="rounded-2xl mb-12 overflow-hidden"
          style={{
            background: "var(--surface)",
            border: "1px solid rgba(126,200,216,0.15)",
          }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 p-8 md:p-10">
            <div className="flex-shrink-0 flex items-center justify-center" style={{ minWidth: 160 }}>
              <LogoDaikinWhite />
            </div>
            <div className="hidden md:block self-stretch w-px" style={{ background: "var(--border)" }} />
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-3 mb-3">
                <span
                  style={{
                    fontSize: "0.65rem",
                    fontWeight: 600,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.75rem",
                    borderRadius: 999,
                    background: "var(--accent-dim)",
                    color: "var(--accent)",
                    border: "1px solid rgba(126,200,216,0.2)",
                  }}
                >
                  Credenciado Oficial
                </span>
                <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                  Todas as linhas residenciais e comerciais
                </span>
              </div>
              <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--text-muted)" }}>
                A Daikin credencia tecnicamente seus parceiros por linha de produto — splits
                residenciais, sistemas VRF e equipamentos comerciais são certificações distintas.
                A NP Climatização mantém certificação ativa em todas as linhas que instala.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Brand groups */}
        <div className="space-y-10">
          {brandGroups.map((group, gi) => (
            <div key={group.label}>
              <p
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "var(--text-muted)",
                  fontFamily: "monospace",
                  paddingBottom: "0.75rem",
                  marginBottom: "1rem",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                {group.label}
              </p>
              <div className="grid grid-cols-2 gap-4">
                {group.brands.map((brand, bi) => (
                  <motion.div
                    key={brand.name}
                    custom={gi * 2 + bi}
                    initial="hidden"
                    whileInView="visible"
                    variants={fadeInUp}
                    viewport={{ once: true, margin: "-60px" }}
                    className="flex flex-col items-center justify-center py-7 px-6 rounded-xl transition-all duration-300"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        "rgba(126,200,216,0.18)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.borderColor =
                        "var(--border)";
                    }}
                  >
                    <brand.Logo />
                    <span
                      style={{
                        marginTop: "0.75rem",
                        fontSize: "0.6rem",
                        fontWeight: 500,
                        letterSpacing: "0.16em",
                        textTransform: "uppercase",
                        color: "var(--text-muted)",
                        fontFamily: "monospace",
                        opacity: 0.5,
                      }}
                    >
                      {brand.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p
          className="text-center mt-12"
          style={{ fontSize: "0.72rem", color: "var(--text-muted)", opacity: 0.4 }}
        >
          Instalações realizadas de acordo com os manuais técnicos de cada fabricante.
        </p>
      </div>
    </section>
  );
}
