import Reveal from './ui/Reveal'

const companies = ['Northwind', 'Fernhill Studio', 'Basecamp Metrics', 'Arcadia Labs', 'Ledgerly']

export default function TrustedBy() {
  return (
    <section className="py-14 border-y border-border bg-section">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <p className="text-center text-xs font-semibold tracking-widest uppercase text-paragraph mb-8">
            Trusted by finance teams at
          </p>
        </Reveal>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-8 items-center">
          {companies.map((name, i) => (
            <Reveal key={name} delay={i * 0.05}>
              <div className="text-center text-lg font-bold tracking-tight text-gray-400 grayscale opacity-70 hover:opacity-100 transition-opacity select-none">
                {name}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
