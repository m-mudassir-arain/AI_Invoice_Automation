import { motion } from 'framer-motion'

const directions = {
  up: { y: 28, x: 0 },
  left: { y: 0, x: 28 },
  right: { y: 0, x: -28 },
  none: { y: 0, x: 0 },
}

export default function Reveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className = '',
  scale = false,
}) {
  const offset = directions[direction]
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, ...offset, scale: scale ? 0.94 : 1 }}
      whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  )
}
