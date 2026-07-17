import { motion } from 'framer-motion'
import { ClipboardList, Wand2, DownloadCloud, ArrowRight } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'

const steps = [
  {
    icon: ClipboardList,
    title: 'Fill invoice details',
    description: 'Add your client, line items, and payment terms in a clean, guided form.',
  },
  {
    icon: Wand2,
    title: 'Click generate',
    description: 'AI formats, calculates, and lays out the invoice while you watch it come together.',
  },
  {
    icon: DownloadCloud,
    title: 'Download the PDF',
    description: 'Get a polished PDF instantly, already synced and ready to send.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="How it works"
          title="Three steps from blank page to paid"
          description="No templates to wrangle, no line-item math — just fill, generate, and download."
        />

        <div className="mt-20 grid md:grid-cols-3 gap-10 md:gap-6 relative">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={i * 0.12}>
              <div className="relative flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-2xl bg-white border border-border shadow-elevation-3 grid place-items-center">
                    <step.icon size={28} className="text-primary" strokeWidth={2} />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-white text-xs font-bold grid place-items-center border-2 border-white">
                    {i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-lg font-bold text-heading">{step.title}</h3>
                <p className="mt-2 text-sm text-paragraph leading-relaxed max-w-[220px]">
                  {step.description}
                </p>

                {i < steps.length - 1 && (
                  <motion.div
                    className="hidden md:flex absolute top-10 left-[calc(100%+8px)] -translate-y-1/2 items-center text-accent"
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12, duration: 0.5 }}
                  >
                    <ArrowRight size={22} strokeWidth={2.25} className="animate-pulse" />
                  </motion.div>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
