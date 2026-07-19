import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, PlayCircle, Sparkles, TrendingUp, Cloud, FileCheck2, CheckCircle2 } from 'lucide-react'
import Button from './ui/Button'

export default function Hero() {
  const stageRef = useRef(null)

  const handleMove = (e) => {
    const stage = stageRef.current
    if (!stage) return
    const rect = stage.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    stage.style.setProperty('--px', x.toFixed(3))
    stage.style.setProperty('--py', y.toFixed(3))
  }

  const handleLeave = () => {
    const stage = stageRef.current
    if (!stage) return
    stage.style.setProperty('--px', 0)
    stage.style.setProperty('--py', 0)
  }

  return (
    <section
      id="home"
      className="relative overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32"
    >
      {/* Subtle ambient gradient background */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background:
            'radial-gradient(60% 50% at 78% 12%, rgba(96,165,250,0.16) 0%, rgba(96,165,250,0) 60%), radial-gradient(45% 40% at 8% 90%, rgba(37,99,235,0.08) 0%, rgba(37,99,235,0) 60%)',
        }}
      />
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left: copy */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 text-xs font-semibold text-primary mb-6"
          >
            <Sparkles size={14} /> AI-powered invoicing, done in seconds
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl sm:text-5xl lg:text-[3.4rem] font-extrabold tracking-tight leading-[1.08] text-heading text-balance"
          >
            Generate professional{' '}
            <span className="relative inline-block">
              <span className="relative z-10">AI invoices</span>
              <span className="absolute left-0 right-0 bottom-1.5 h-3 bg-accent/40 -z-0 rounded" />
            </span>{' '}
            in seconds
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 text-lg text-paragraph max-w-lg leading-relaxed"
          >
            Generate beautiful invoices instantly with automated PDF generation, cloud storage, and email delivery — built for teams who bill fast and look sharp doing it.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#generator">
              <Button size="lg" icon={ArrowRight}>
                Generate Invoice
              </Button>
            </a>
            <a href="#how-it-works">
              <Button size="lg" variant="secondary" icon={PlayCircle} iconPosition="left">
                View Demo
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-10 flex items-center gap-6 text-sm text-paragraph"
          >
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-success" /> No credit card required
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 size={16} className="text-success" /> Free starter plan
            </div>
          </motion.div>
        </div>

        {/* Right: spatial floating stack */}
        <div
          ref={stageRef}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          className="spatial-stage relative h-[420px] sm:h-[480px] lg:h-[520px]"
        >
          {/* Ambient floating orbs for depth */}
          <div className="absolute -top-10 -right-6 w-40 h-40 rounded-full bg-accent/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-56 h-56 rounded-full bg-primary/10 blur-3xl" />

          {/* Analytics badge - back layer */}
          <FloatCard
            className="absolute top-6 left-2 sm:left-6 w-36 sm:w-44"
            depth={40}
            floatDelay={0}
          >
            <div className="glass rounded-2xl p-4 shadow-elevation-3">
              <div className="flex items-center gap-2 text-xs font-semibold text-paragraph mb-3">
                <TrendingUp size={14} className="text-primary" /> Revenue
              </div>
              <div className="flex items-end gap-1.5 h-14">
                {[40, 65, 45, 80, 60, 95].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-primary/70 to-accent"
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
          </FloatCard>

          {/* Cloud storage badge - mid layer */}
          <FloatCard
            className="absolute bottom-12 sm:bottom-16 left-0 sm:left-4 w-36 sm:w-40"
            depth={70}
            floatDelay={0.6}
          >
            <div className="glass rounded-2xl p-4 shadow-elevation-3 flex items-center gap-3">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-blue-50 text-primary shrink-0">
                <Cloud size={18} />
              </span>
              <div>
                <p className="text-xs font-semibold text-heading">Synced to Drive</p>
                <p className="text-[11px] text-paragraph">Just now</p>
              </div>
            </div>
          </FloatCard>

          {/* Main invoice card - front/center layer */}
          <FloatCard
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[320px]"
            depth={120}
            floatDelay={0.3}
            main
          >
            <div className="bg-white rounded-2xl shadow-elevation-4 border border-border overflow-hidden">
              <div className="bg-gradient-to-br from-primary to-secondary px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-blue-100 font-medium tracking-wide">INVOICE</p>
                  <p className="text-white font-bold text-sm">#INV-2026-0842</p>
                </div>
                <span className="text-white/90 text-xs font-semibold bg-white/15 rounded-full px-2.5 py-1">
                  Paid
                </span>
              </div>
              <div className="p-5 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-paragraph">Design retainer</span>
                  <span className="font-semibold text-heading">$1,200.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-paragraph">Brand assets</span>
                  <span className="font-semibold text-heading">$480.00</span>
                </div>
                <div className="h-px bg-border my-1" />
                <div className="flex justify-between text-sm">
                  <span className="font-semibold text-heading">Total due</span>
                  <span className="font-extrabold text-primary text-base">$1,680.00</span>
                </div>
              </div>
            </div>
          </FloatCard>

          {/* PDF export badge - front-right layer */}
          <FloatCard
            className="absolute bottom-2 right-0 sm:right-4 w-32 sm:w-36"
            depth={150}
            floatDelay={0.9}
          >
            <div className="glass rounded-2xl p-3.5 shadow-elevation-4 flex items-center gap-2.5">
              <span className="grid place-items-center w-9 h-9 rounded-xl bg-emerald-50 text-success shrink-0">
                <FileCheck2 size={18} />
              </span>
              <div>
                <p className="text-xs font-semibold text-heading">PDF Ready</p>
                <p className="text-[11px] text-paragraph">2.1 MB</p>
              </div>
            </div>
          </FloatCard>
        </div>
      </div>
    </section>
  )
}

function FloatCard({ children, className = '', depth = 60, floatDelay = 0, main = false }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 5, delay: floatDelay, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div
          className="spatial-layer"
          style={{
            transform: `translateZ(${main ? 0 : -depth}px) rotateX(calc(var(--py, 0) * -8deg)) rotateY(calc(var(--px, 0) * 8deg)) translate(calc(var(--px, 0) * ${depth * 0.25}px), calc(var(--py, 0) * ${depth * 0.25}px))`,
          }}
        >
          {children}
        </div>
      </motion.div>
    </motion.div>
  )
}
