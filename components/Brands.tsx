'use client'

const LogoDaikin = () => (
  <svg viewBox="0 0 200 70" width="160" height="56" xmlns="http://www.w3.org/2000/svg">
    <polygon points="18,12 38,52 8,52" fill="#00a0e9"/>
    <text x="48" y="50" fontFamily="Arial Black, Impact, sans-serif" fontSize="34" fontWeight="900" fill="#00a0e9" fontStyle="italic">DAIKIN</text>
  </svg>
)

const LogoLG = () => (
  <svg viewBox="0 0 180 70" width="150" height="56" xmlns="http://www.w3.org/2000/svg">
    <circle cx="35" cy="35" r="32" fill="#c0003c"/>
    <text x="22" y="46" fontFamily="Arial Black, sans-serif" fontSize="26" fontWeight="900" fill="white">LG</text>
    <circle cx="24" cy="24" r="5" fill="none" stroke="white" strokeWidth="2"/>
    <text x="90" y="48" fontFamily="Arial Black, sans-serif" fontSize="34" fontWeight="900" fill="#7a7a7a">LG</text>
  </svg>
)

const LogoSamsung = () => (
  <svg viewBox="0 0 260 70" width="200" height="56" xmlns="http://www.w3.org/2000/svg">
    <text x="10" y="50" fontFamily="Arial Black, Impact, sans-serif" fontSize="38" fontWeight="900" fill="#1428a0" letterSpacing="2">SAMSUNG</text>
  </svg>
)

const LogoFujitsu = () => (
  <svg viewBox="0 0 220 90" width="150" height="72" xmlns="http://www.w3.org/2000/svg">
    <path d="M110,8 C110,8 100,2 104,14 C108,26 118,20 114,10 C112,5 108,5 110,8 Z M104,14 C100,26 90,20 94,10 C98,0 108,0 110,8" fill="none" stroke="#d00000" strokeWidth="3.5"/>
    <ellipse cx="110" cy="8" rx="7" ry="5" fill="none" stroke="#d00000" strokeWidth="3.5"/>
    <text x="10" y="78" fontFamily="Georgia, Times New Roman, serif" fontSize="38" fontWeight="700" fill="#d00000" letterSpacing="1">FUJITSU</text>
  </svg>
)

const LogoCarrier = () => (
  <svg viewBox="0 0 220 80" width="170" height="64" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="110" cy="40" rx="108" ry="38" fill="#1a1aaa"/>
    <ellipse cx="110" cy="40" rx="100" ry="31" fill="none" stroke="white" strokeWidth="2"/>
    <text x="110" y="52" fontFamily="Palatino, Georgia, serif" fontSize="34" fontWeight="700" fill="white" textAnchor="middle" fontStyle="italic">Carrier</text>
  </svg>
)

const LogoElgin = () => (
  <svg viewBox="0 0 190 70" width="150" height="56" xmlns="http://www.w3.org/2000/svg">
    <path d="M18,20 A20,20 0 0,1 38,10" fill="none" stroke="#00aaee" strokeWidth="7" strokeLinecap="round"/>
    <text x="42" y="54" fontFamily="Arial Rounded MT Bold, Arial, sans-serif" fontSize="40" fontWeight="700" fill="#00aaee">elgin</text>
  </svg>
)

const LogoMidea = () => (
  <svg viewBox="0 0 220 80" width="160" height="64" xmlns="http://www.w3.org/2000/svg">
    <path d="M30,70 A50,50 0 1,1 80,20" fill="none" stroke="#00aaee" strokeWidth="6" strokeLinecap="round"/>
    <text x="70" y="65" fontFamily="Arial Rounded MT Bold, Arial, sans-serif" fontSize="40" fontWeight="700" fill="#00aaee">Midea</text>
  </svg>
)

const brands = [
  { name: 'Daikin', Logo: LogoDaikin },
  { name: 'LG', Logo: LogoLG },
  { name: 'Samsung', Logo: LogoSamsung },
  { name: 'Fujitsu', Logo: LogoFujitsu },
  { name: 'Carrier', Logo: LogoCarrier },
  { name: 'Elgin', Logo: LogoElgin },
  { name: 'Midea', Logo: LogoMidea },
]

export default function Brands() {
  return (
    <section className="py-14 px-4 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#06b6d4' }}>
          Credenciados por
        </p>
        <h2 className="section-title mb-10">Marcas Parceiras Oficiais</h2>
      </div>

      {/* Carousel track */}
      <div className="relative w-full">
        <div className="brands-track flex items-center gap-16">
          {/* First set */}
          {brands.map((brand) => (
            <div
              key={brand.name}
              className="flex-shrink-0 flex items-center justify-center px-6 py-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300"
              style={{ minWidth: '180px', height: '90px', border: '1px solid #e8f4fd' }}
            >
              <brand.Logo />
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {brands.map((brand) => (
            <div
              key={brand.name + '-dup'}
              className="flex-shrink-0 flex items-center justify-center px-6 py-4 rounded-2xl bg-gray-50 hover:bg-blue-50 transition-colors duration-300"
              style={{ minWidth: '180px', height: '90px', border: '1px solid #e8f4fd' }}
            >
              <brand.Logo />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .brands-track {
          animation: scroll-brands 28s linear infinite;
          width: max-content;
        }
        .brands-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-brands {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  )
}
