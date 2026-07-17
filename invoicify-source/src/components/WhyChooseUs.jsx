import { Zap, ShieldCheck, Gem, CloudCog } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const items = [
  { icon: Zap, title: 'Fast', description: 'Invoices generate in under three seconds, every time.' },
  { icon: ShieldCheck, title: 'Secure', description: 'Encrypted end-to-end, with no data ever shared or sold.' },
  { icon: Gem, title: 'Professional', description: 'Every export looks like it came from an in-house design team.' },
  { icon: CloudCog, title: 'Cloud based', description: 'Access, edit, and resend any invoice from any device.' },
]

export default function WhyChooseUs() {
  return (
    <section className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Why Invoicify"
          title="Built for teams who bill often"
          description="The details that make invoicing feel effortless instead of administrative."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.08} scale>
              <div className="h-full rounded-2xl bg-gradient-to-b from-white to-section border border-border p-7 text-center hover:shadow-elevation-3 hover:-translate-y-1 transition-all duration-300">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 text-primary grid place-items-center mb-5">
                  <item.icon size={24} strokeWidth={2} />
                </div>
                <h3 className="text-base font-bold text-heading mb-1.5">{item.title}</h3>
                <p className="text-sm text-paragraph leading-relaxed">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
