import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const faqs = [
  {
    q: 'How does invoice generation work?',
    a: 'Fill in your client and line-item details in the form, then click Generate. Your invoice is formatted, calculated, and rendered as a PDF in seconds.',
  },
  {
    q: 'Can I download PDFs?',
    a: 'Yes — every invoice you generate comes with a Download PDF button, giving you a print-ready file instantly.',
  },
  {
    q: 'Can I store invoices online?',
    a: 'Every generated invoice is automatically saved to your connected cloud storage, so you can find it later from any device.',
  },
  {
    q: 'Is my data secure?',
    a: 'All invoice data is encrypted in transit and at rest, and we never share or sell client information.',
  },
]

export default function FAQ() {
  const [open, setOpen] = useState(0)

  return (
    <section className="py-24 sm:py-32 bg-section">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading eyebrow="FAQ" title="Questions, answered" />

        <div className="mt-12 flex flex-col gap-3">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <Reveal key={item.q} delay={i * 0.06}>
                <div className="bg-white border border-border rounded-2xl overflow-hidden">
                  <button
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="text-sm sm:text-base font-semibold text-heading">{item.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="shrink-0 w-8 h-8 rounded-full bg-blue-50 text-primary grid place-items-center"
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-5 text-sm text-paragraph leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
