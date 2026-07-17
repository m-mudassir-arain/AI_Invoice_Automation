import { useRef } from 'react'

/**
 * Returns a ref + pointer handlers that apply a subtle 3D tilt
 * toward the cursor, for spatial/depth UI treatments.
 */
export function useTilt({ max = 10, scale = 1.02 } = {}) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    const rotateY = x * max * 2
    const rotateX = -y * max * 2
    el.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)'
  }

  return { ref, onMouseMove, onMouseLeave }
}
