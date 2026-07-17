import { Sparkles, FileDown, HardDrive, Mail, ShieldCheck, Zap } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import { useTilt } from '../hooks/useTilt'

const features = [
  {
    icon: Sparkles,
    title: 'AI Invoice Generation',
    description: 'Describe the job in plain language and let AI structure line items, taxes, and totals for you.',
  },
  {
    icon: FileDown,
    title: 'Professional PDF Export',
    description: 'Every invoice renders as a polished, print-ready PDF with your branding baked in.',
  },
  {
    icon: HardDrive,
    title: 'Cloud Storage',
    description: 'Every invoice is automatically filed and backed up, searchable the moment it is created.',
  },
  {
    icon: Mail,
    title: 'Email Delivery',
    description: 'Send invoices straight to your client\'s inbox with a tracked, branded delivery flow.',
  },
  {
    icon: ShieldCheck,
    title: 'Secure Processing',
    description: 'Bank-grade encryption protects every invoice and client detail, in transit and at rest.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'From form to finished PDF in under three seconds — no waiting on renders.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 sm:py-32 bg-section">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Features"
          title="Everything your invoicing workflow needs"
          description="Purpose-built tools that turn a five-minute chore into a five-second action."
        />

        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delay={(i % 3) * 0.08}>
              <FeatureCard {...feature} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeatureCard({ icon: Icon, title, description }) {
  const { ref, onMouseMove, onMouseLeave } = useTilt({ max: 5, scale: 1.015 })

  return (
    <div
      className="[perspective:1000px] h-full"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        ref={ref}
        className="group h-full rounded-2xl bg-white border border-border p-7 transition-shadow duration-300 hover:shadow-elevation-3"
        style={{ transformStyle: 'preserve-3d', transition: 'transform 0.15s ease-out, box-shadow 0.3s ease' }}
      >
        <div className="w-12 h-12 rounded-xl bg-blue-50 text-primary grid place-items-center mb-5 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
          <Icon size={22} strokeWidth={2.1} />
        </div>
        <h3 className="text-lg font-bold text-heading mb-2">{title}</h3>
        <p className="text-sm text-paragraph leading-relaxed">{description}</p>
      </div>
    </div>
  )
}
