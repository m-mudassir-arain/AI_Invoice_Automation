import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, description, align = 'center' }) {
  const alignment = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <Reveal>
      <div className={`flex flex-col gap-4 max-w-2xl ${alignment}`}>
        {eyebrow && (
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide uppercase text-primary bg-blue-50 border border-blue-100 rounded-full px-3 py-1">
            {eyebrow}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-heading text-balance">
          {title}
        </h2>
        {description && (
          <p className="text-paragraph text-base sm:text-lg leading-relaxed text-balance">
            {description}
          </p>
        )}
      </div>
    </Reveal>
  )
}
