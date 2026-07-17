import { Star } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const reviews = [
  {
    name: 'Amelia Cross',
    company: 'Fernhill Studio',
    review:
      'We went from spending an afternoon on billing to closing it out before lunch. The PDFs look better than what our old software produced.',
    rating: 5,
    initials: 'AC',
  },
  {
    name: 'Daniel Osei',
    company: 'Northwind Consulting',
    review:
      'The cloud sync alone paid for itself — no more digging through email threads to find an old invoice for a client.',
    rating: 5,
    initials: 'DO',
  },
  {
    name: 'Priya Nathan',
    company: 'Ledgerly',
    review:
      'Our clients started commenting on how professional our invoices look. Small thing, but it changed how people see us.',
    rating: 4,
    initials: 'PN',
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 sm:py-32 bg-section">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Testimonials"
          title="Teams that switched and stayed"
          description="A handful of the people who trust Invoicify with their billing."
        />

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {reviews.map((review, i) => (
            <Reveal key={review.name} delay={i * 0.1}>
              <div className="h-full bg-white rounded-2xl border border-border p-7 shadow-elevation-1 hover:shadow-elevation-3 transition-shadow duration-300">
                <div className="flex gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={16}
                      className={idx < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-200'}
                    />
                  ))}
                </div>
                <p className="text-sm text-heading leading-relaxed mb-6">"{review.review}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 text-primary font-bold text-sm grid place-items-center">
                    {review.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-heading">{review.name}</p>
                    <p className="text-xs text-paragraph">{review.company}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
