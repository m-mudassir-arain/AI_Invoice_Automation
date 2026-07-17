import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Mail, MapPin, Phone, Send, CheckCircle2 } from 'lucide-react'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import Button from './ui/Button'

const fieldBase =
  'w-full rounded-xl border bg-white px-4 py-2.75 text-sm text-heading placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary'

export default function Contact() {
  const [sent, setSent] = useState(false)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = async () => {
    await new Promise((r) => setTimeout(r, 800))
    setSent(true)
    reset()
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Have a question? Reach out"
          description="We usually reply within one business day."
        />

        <div className="mt-14 grid lg:grid-cols-[1.3fr_1fr] gap-8">
          <Reveal direction="right">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white rounded-3xl border border-border shadow-elevation-2 p-7 sm:p-9"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-heading">Name</span>
                  <input className={fieldBase} placeholder="Your name" {...register('name', { required: true })} />
                  {errors.name && <span className="text-xs text-red-500">Name is required</span>}
                </label>
                <label className="flex flex-col gap-1.5">
                  <span className="text-sm font-medium text-heading">Email</span>
                  <input
                    type="email"
                    className={fieldBase}
                    placeholder="you@company.com"
                    {...register('email', { required: true })}
                  />
                  {errors.email && <span className="text-xs text-red-500">Email is required</span>}
                </label>
              </div>
              <label className="flex flex-col gap-1.5 mt-5">
                <span className="text-sm font-medium text-heading">Message</span>
                <textarea
                  rows={5}
                  className={`${fieldBase} resize-none`}
                  placeholder="How can we help?"
                  {...register('message', { required: true })}
                />
                {errors.message && <span className="text-xs text-red-500">Message is required</span>}
              </label>

              <div className="mt-6 flex items-center gap-4">
                <Button type="submit" size="lg" icon={Send}>
                  Send message
                </Button>
                {sent && (
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-success">
                    <CheckCircle2 size={16} /> Message sent
                  </span>
                )}
              </div>
            </form>
          </Reveal>

          <Reveal direction="left" delay={0.1}>
            <div className="bg-section rounded-3xl border border-border p-7 sm:p-9 h-full flex flex-col gap-6">
              <ContactRow icon={MapPin} title="Office">
                221B Baker Street, London, UK
              </ContactRow>
              <ContactRow icon={Mail} title="Email">
                hello@invoicify.app
              </ContactRow>
              <ContactRow icon={Phone} title="Phone">
                +44 20 7946 0958
              </ContactRow>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function ContactRow({ icon: Icon, title, children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-11 h-11 rounded-xl bg-white border border-border grid place-items-center shrink-0 text-primary shadow-elevation-1">
        <Icon size={18} />
      </div>
      <div>
        <p className="text-sm font-semibold text-heading">{title}</p>
        <p className="text-sm text-paragraph mt-0.5">{children}</p>
      </div>
    </div>
  )
}
