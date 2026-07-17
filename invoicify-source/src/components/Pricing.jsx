import { Check, Sparkles } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import Button from './ui/Button'

const plans = [
  {
    name: 'Starter',
    price: '$0',
    period: 'forever',
    description: 'For freelancers sending the occasional invoice.',
    features: ['5 invoices / month', 'PDF export', 'Email delivery', 'Basic templates'],
    cta: 'Start for free',
    variant: 'secondary',
  },
  {
    name: 'Professional',
    price: '$19',
    period: '/ month',
    description: 'For growing teams billing every week.',
    features: [
      'Unlimited invoices',
      'AI-assisted generation',
      'Cloud storage sync',
      'Custom branding',
      'Priority support',
    ],
    cta: 'Get Started',
    variant: 'primary',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: 'talk to us',
    description: 'For finance teams with advanced needs.',
    features: ['Everything in Professional', 'Multi-seat workspace', 'SSO & audit logs', 'Dedicated onboarding'],
    cta: 'Contact sales',
    variant: 'secondary',
  },
]

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing that scales with you"
          description="Start free. Upgrade when your invoicing outgrows a spreadsheet."
        />

        <div className="mt-16 grid lg:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} scale={plan.highlighted}>
              <div
                className={`relative h-full rounded-3xl p-8 border transition-all duration-300 ${
                  plan.highlighted
                    ? 'bg-gradient-to-b from-primary to-blue-700 text-white border-transparent shadow-elevation-4 lg:-translate-y-3'
                    : 'bg-white border-border shadow-elevation-1 hover:shadow-elevation-3'
                }`}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 bg-white text-primary text-xs font-bold px-3 py-1.5 rounded-full shadow-elevation-2">
                    <Sparkles size={12} /> Most popular
                  </span>
                )}

                <h3 className={`text-lg font-bold ${plan.highlighted ? 'text-white' : 'text-heading'}`}>
                  {plan.name}
                </h3>
                <p className={`mt-1.5 text-sm ${plan.highlighted ? 'text-blue-100' : 'text-paragraph'}`}>
                  {plan.description}
                </p>

                <div className="mt-6 flex items-baseline gap-1.5">
                  <span className={`text-4xl font-extrabold ${plan.highlighted ? 'text-white' : 'text-heading'}`}>
                    {plan.price}
                  </span>
                  <span className={`text-sm ${plan.highlighted ? 'text-blue-100' : 'text-paragraph'}`}>
                    {plan.period}
                  </span>
                </div>

                <ul className="mt-7 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check
                        size={17}
                        className={plan.highlighted ? 'text-accent mt-0.5 shrink-0' : 'text-success mt-0.5 shrink-0'}
                      />
                      <span className={plan.highlighted ? 'text-blue-50' : 'text-paragraph'}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <a href="#generator" className="block mt-8">
                  <Button
                    size="lg"
                    variant={plan.highlighted ? 'success' : plan.variant}
                    className={`w-full justify-center ${
                      plan.highlighted ? '!bg-white !text-primary !shadow-none hover:!bg-blue-50' : ''
                    }`}
                  >
                    {plan.cta}
                  </Button>
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
