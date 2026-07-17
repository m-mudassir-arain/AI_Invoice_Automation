import { motion } from 'framer-motion'

const variants = {
  primary:
    'bg-primary text-white shadow-[0_8px_20px_rgba(37,99,235,0.28)] hover:bg-blue-700',
  secondary:
    'bg-white text-heading border border-border hover:border-primary/40 hover:bg-section',
  ghost: 'text-heading hover:bg-section',
  success: 'bg-success text-white shadow-[0_8px_20px_rgba(16,185,129,0.28)] hover:bg-emerald-600',
}

const sizes = {
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  ...props
}) {
  return (
    <motion.button
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-colors duration-200 disabled:opacity-60 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={18} strokeWidth={2.25} />}
      {children}
      {Icon && iconPosition === 'right' && <Icon size={18} strokeWidth={2.25} />}
    </motion.button>
  )
}
