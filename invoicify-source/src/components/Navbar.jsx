import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileStack, Menu, X } from 'lucide-react'
import Button from './ui/Button'

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div
          className={`flex items-center justify-between rounded-2xl px-4 sm:px-6 transition-all duration-300 ${
            scrolled
              ? 'glass shadow-elevation-2 py-2.5'
              : 'bg-transparent py-2'
          }`}
          style={scrolled ? { boxShadow: 'var(--shadow-elevation-2)' } : undefined}
        >
          <a href="#home" className="flex items-center gap-2.5 shrink-0">
            <span className="grid place-items-center w-9 h-9 rounded-xl bg-primary text-white shadow-[0_6px_16px_rgba(37,99,235,0.35)]">
              <FileStack size={18} strokeWidth={2.4} />
            </span>
            <span className="text-lg font-extrabold tracking-tight text-heading">Invoicify</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-medium text-paragraph hover:text-heading transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button className="text-sm font-semibold text-heading hover:text-primary transition-colors px-3 py-2">
              Login
            </button>
            <a href="#generator">
              <Button size="md">Get Started</Button>
            </a>
          </div>

          <button
            className="md:hidden p-2 rounded-lg text-heading hover:bg-section"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="md:hidden overflow-hidden"
            >
              <div className="mt-2 glass rounded-2xl p-4 flex flex-col gap-1 shadow-elevation-3">
                {links.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="text-sm font-medium text-heading px-3 py-2.5 rounded-lg hover:bg-section"
                  >
                    {link.label}
                  </a>
                ))}
                <div className="flex items-center gap-2 mt-2 px-1">
                  <button className="flex-1 text-sm font-semibold text-heading border border-border rounded-full py-2.5">
                    Login
                  </button>
                  <a href="#generator" className="flex-1" onClick={() => setOpen(false)}>
                    <Button className="w-full justify-center">Get Started</Button>
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
