import { useState } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { AnimatePresence } from 'framer-motion'
import { Loader2, Plus, RotateCcw, Sparkles, Trash2 } from 'lucide-react'
import Button from './ui/Button'
import Reveal from './ui/Reveal'
import SectionHeading from './ui/SectionHeading'
import SuccessModal from './SuccessModal'

const fieldBase =
  'w-full rounded-xl border bg-white px-4 py-2.75 text-sm text-heading placeholder:text-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary'

export default function InvoiceForm() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)
  const [showModal, setShowModal] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
  } = useForm({
    mode: 'onBlur',
    defaultValues: {
      customerName: '',
      customerEmail: '',
      companyName: '',
      companyEmail: '',
      template: 'professional',
      items: [{ productName: '', quantity: 1, unitPrice: '' }],
      tax: 0,
      discount: 0,
      notes: '',
    },
  })

  const { fields, append, remove } = useFieldArray({ control, name: 'items' })

  const items = watch('items')
  const tax = Number(watch('tax')) || 0
  const discount = Number(watch('discount')) || 0

  const subtotal = (items || []).reduce(
    (sum, item) => sum + (Number(item.quantity) || 0) * (Number(item.unitPrice) || 0),
    0
  )
  const taxAmount = subtotal * (tax / 100)
  const total = Math.max(subtotal + taxAmount - discount, 0)

  const onSubmit = async (data) => {
    const payload = {
      customer: data.customerName,
      email: data.customerEmail,
      company: data.companyName,
      companyEmail: data.companyEmail,
      template: data.template,
      items: data.items.map((item) => ({
        product: item.productName,
        quantity: Number(item.quantity),
        price: Number(item.unitPrice),
      })),
      tax: data.tax,
      discount: data.discount,
      notes: data.notes,
    }

    setLoading(true)
    try {
      const response = await fetch('https://n8n.srv1208284.hstgr.cloud/webhook/generate-invoice', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await response.json()
      setResult(data)
      setSubmitted(true)
      reset()
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    reset()
    setSubmitted(false)
    setResult(null)
  }

  const handleGenerateAnother = () => {
    setShowModal(false)
    reset()
  }

  return (
    <section id="generator" className="py-24 sm:py-32 bg-section">
      <div className="max-w-7xl mx-auto px-6">
        <SectionHeading
          eyebrow="Invoice generator"
          title="Build your invoice"
          description="Fill in the details below and generate your invoice."
        />

        <div className="mt-14 max-w-3xl mx-auto">
          <Reveal direction="up">
            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="bg-white rounded-3xl border border-border shadow-elevation-3 p-6 sm:p-9"
            >
              <FormSection title="Client details">
                <Field label="Customer name" error={errors.customerName}>
                  <input
                    className={fieldBase}
                    placeholder="Jordan Blake"
                    {...register('customerName', { required: 'Customer name is required' })}
                  />
                </Field>
                <Field label="Customer email" error={errors.customerEmail}>
                  <input
                    type="email"
                    className={fieldBase}
                    placeholder="jordan@company.com"
                    {...register('customerEmail', {
                      required: 'Customer email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                    })}
                  />
                </Field>
              </FormSection>

              <FormSection title="Your company">
                <Field label="Company name" error={errors.companyName}>
                  <input
                    className={fieldBase}
                    placeholder="Invoicify Studio"
                    {...register('companyName', { required: 'Company name is required' })}
                  />
                </Field>
                <Field label="Company email" error={errors.companyEmail}>
                  <input
                    type="email"
                    className={fieldBase}
                    placeholder="hello@invoicify.app"
                    {...register('companyEmail', {
                      required: 'Company email is required',
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
                    })}
                  />
                </Field>
              </FormSection>

              <FormSection title="Template">
                <Field label="Select template" error={errors.template}>
                  <select
                    className={fieldBase}
                    {...register('template', { required: 'Template is required' })}
                  >
                    <option value="minimal">Minimal</option>
                    <option value="business">Business</option>
                    <option value="professional">Professional</option>
                    {/* <option value="classic">Classic</option>
                    <option value="creative">Creative</option> */}
                  </select>
                </Field>
              </FormSection>

              <FormSection title="Line items">
                {fields.map((field, index) => (
                  <div
                    key={field.id}
                    className="sm:col-span-2 bg-section rounded-xl p-4 border border-border"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-semibold text-paragraph">Item {index + 1}</span>
                      {fields.length > 1 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="text-red-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <Field label="Product / service name" error={errors.items?.[index]?.productName} full>
                        <input
                          className={fieldBase}
                          placeholder="Brand identity design"
                          {...register(`items.${index}.productName`, { required: 'Product name is required' })}
                        />
                      </Field>
                      <Field label="Quantity" error={errors.items?.[index]?.quantity}>
                        <input
                          type="number"
                          step="1"
                          className={fieldBase}
                          {...register(`items.${index}.quantity`, {
                            required: 'Quantity is required',
                            valueAsNumber: true,
                            validate: (v) => v > 0 || 'Quantity must be positive',
                          })}
                        />
                      </Field>
                      <Field label="Unit price ($)" error={errors.items?.[index]?.unitPrice}>
                        <input
                          type="number"
                          step="0.01"
                          className={fieldBase}
                          placeholder="0.00"
                          {...register(`items.${index}.unitPrice`, {
                            required: 'Unit price is required',
                            valueAsNumber: true,
                            validate: (v) => v > 0 || 'Unit price must be positive',
                          })}
                        />
                      </Field>
                    </div>
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <button
                    type="button"
                    onClick={() => append({ productName: '', quantity: 1, unitPrice: '' })}
                    className="w-full rounded-xl border-2 border-dashed border-border bg-white/50 px-4 py-3 text-sm font-medium text-paragraph hover:text-primary hover:border-primary/40 transition-colors"
                  >
                    <Plus size={18} className="inline mr-1.5 align-text-bottom" /> Add another item
                  </button>
                </div>

                <Field label="Tax (%)" error={errors.tax}>
                  <input
                    type="number"
                    step="0.01"
                    className={fieldBase}
                    {...register('tax', {
                      valueAsNumber: true,
                      validate: (v) => v >= 0 || 'Tax cannot be negative',
                    })}
                  />
                </Field>
                <Field label="Discount ($)" error={errors.discount}>
                  <input
                    type="number"
                    step="0.01"
                    className={fieldBase}
                    {...register('discount', {
                      valueAsNumber: true,
                      validate: (v) =>
                        (v >= 0 && v <= subtotal) ||
                        (v > subtotal ? 'Discount cannot exceed subtotal' : 'Discount cannot be negative'),
                    })}
                  />
                </Field>
              </FormSection>

              <FormSection title="Notes" last>
                <Field label="Notes (optional)" full>
                  <textarea
                    rows={3}
                    className={`${fieldBase} resize-none`}
                    placeholder="Thanks for the business — payment due within 14 days."
                    {...register('notes')}
                  />
                </Field>
              </FormSection>

              <div className="flex flex-col-reverse sm:flex-row gap-3 mt-8 pt-6 border-t border-border">
                <Button
                  type="button"
                  variant="secondary"
                  size="lg"
                  icon={RotateCcw}
                  iconPosition="left"
                  onClick={handleReset}
                  className="sm:w-auto"
                >
                  Reset form
                </Button>
                <Button
                  type="submit"
                  size="lg"
                  disabled={loading}
                  className="flex-1 justify-center"
                  icon={loading ? undefined : Sparkles}
                >
                  {loading ? (
                    <>
                      <Loader2 size={18} className="animate-spin" /> Generating...
                    </>
                  ) : (
                    'Generate Invoice'
                  )}
                </Button>
              </div>
            </form>
          </Reveal>

          {loading && (
            <div className="flex items-center justify-center py-16 mt-8">
              <Loader2 size={28} className="animate-spin text-primary" />
            </div>
          )}

          {submitted && !loading && (
            <Reveal direction="up" delay={0.1}>
              <div className="bg-white rounded-3xl border border-border shadow-elevation-4 p-8 text-center mt-8">
                <p className="text-lg font-semibold text-heading mb-2">
                  Your invoice is ready!
                </p>
                <p className="text-sm text-paragraph mb-6">
                  Click the button below to view it.
                </p>
                <button
                  onClick={() => window.open(result?.pdfUrl, '_blank')}
                  className="w-full rounded-xl bg-primary text-white px-4 py-2.75 text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  View Invoice
                </button>
              </div>
            </Reveal>
          )}
        </div>
      </div>

      <AnimatePresence>
        {showModal && (
          <SuccessModal
            result={result}
            onClose={() => setShowModal(false)}
            onGenerateAnother={handleGenerateAnother}
          />
        )}
      </AnimatePresence>
    </section>
  )
}

function FormSection({ title, children, last = false }) {
  return (
    <div className={last ? '' : 'mb-8'}>
      <h4 className="text-xs font-bold uppercase tracking-wide text-paragraph mb-4">{title}</h4>
      <div className="grid sm:grid-cols-2 gap-5">{children}</div>
    </div>
  )
}

function Field({ label, children, error, full = false }) {
  return (
    <label className={`flex flex-col gap-1.5 ${full ? 'sm:col-span-2' : ''}`}>
      <span className="text-sm font-medium text-heading">{label}</span>
      {children}
      {error && <span className="text-xs font-medium text-red-500">{error.message}</span>}
    </label>
  )
}

