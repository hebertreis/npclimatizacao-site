const brands = [
  { name: 'Daikin', primary: true },
  { name: 'LG', primary: true },
  { name: 'Samsung', primary: true },
  { name: 'Fujitsu', primary: true },
  { name: 'Carrier', primary: false },
  { name: 'Panasonic', primary: false },
  { name: 'Hitachi', primary: false },
  { name: 'Midea', primary: false },
  { name: 'Springer', primary: false },
  { name: 'Elgin', primary: false },
  { name: 'Consul', primary: false },
]

export default function Brands() {
  return (
    <section className="py-14 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <p className="text-center text-sm font-semibold uppercase tracking-widest mb-2" style={{ color: '#06b6d4' }}>
          Credenciados por
        </p>
        <h2 className="section-title mb-8">Marcas Parceiras Oficiais</h2>

        {/* Primary brands */}
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {brands
            .filter((b) => b.primary)
            .map((brand) => (
              <div
                key={brand.name}
                className="px-8 py-4 rounded-xl font-bold text-lg"
                style={{
                  border: '2px solid #06b6d4',
                  color: '#1a3a5c',
                  background: '#f0f9ff',
                }}
              >
                {brand.name}
              </div>
            ))}
        </div>

        {/* Secondary brands */}
        <div className="flex flex-wrap justify-center gap-3">
          {brands
            .filter((b) => !b.primary)
            .map((brand) => (
              <div
                key={brand.name}
                className="px-5 py-2 rounded-lg font-medium text-sm"
                style={{
                  border: '1px solid #d0e8f8',
                  color: '#5a7a9a',
                  background: '#f8fafc',
                }}
              >
                {brand.name}
              </div>
            ))}
        </div>
      </div>
    </section>
  )
}
