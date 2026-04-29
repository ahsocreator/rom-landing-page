import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type Mode = 'default' | 'link' | 'scan'

export function RomCursor() {
  const reduce = useReducedMotion()
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (typeof window === 'undefined') return
    if (!matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let dx = mx
    let dy = my
    let rx = mx
    let ry = my
    let mode: Mode = 'default'
    let raf = 0

    document.body.dataset.romCursor = '1'

    const onMove = (e: PointerEvent) => {
      mx = e.clientX
      my = e.clientY
    }

    const onDown = () => {
      ring.dataset.pressed = '1'
    }
    const onUp = () => {
      delete ring.dataset.pressed
    }

    const evalMode = (target: EventTarget | null): Mode => {
      const el = target as Element | null
      if (!el || !('closest' in el)) return 'default'
      if (el.closest('[data-cursor="scan"]')) return 'scan'
      if (
        el.closest(
          'a, button, [role="button"], [data-cursor="link"]',
        )
      )
        return 'link'
      return 'default'
    }

    const onOver = (e: PointerEvent) => {
      const next = evalMode(e.target)
      if (next !== mode) {
        mode = next
        ring.dataset.mode = mode
        dot.dataset.mode = mode
      }
    }

    const onLeave = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
    }
    const onEnter = () => {
      dot.style.opacity = ''
      ring.style.opacity = ''
    }

    if (reduce) {
      const onMoveStatic = (e: PointerEvent) => {
        const x = e.clientX
        const y = e.clientY
        dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`
      }
      ring.style.display = 'none'
      window.addEventListener('pointermove', onMoveStatic)
      return () => {
        window.removeEventListener('pointermove', onMoveStatic)
        delete document.body.dataset.romCursor
      }
    }

    const tick = () => {
      dx += (mx - dx) * 0.5
      dy += (my - dy) * 0.5
      rx += (mx - rx) * 0.18
      ry += (my - ry) * 0.18
      dot.style.transform = `translate3d(${dx}px, ${dy}px, 0) translate(-50%, -50%)`
      ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerdown', onDown)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointerover', onOver)
    document.documentElement.addEventListener('pointerleave', onLeave)
    document.documentElement.addEventListener('pointerenter', onEnter)
    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointerover', onOver)
      document.documentElement.removeEventListener('pointerleave', onLeave)
      document.documentElement.removeEventListener('pointerenter', onEnter)
      delete document.body.dataset.romCursor
    }
  }, [reduce])

  return (
    <>
      <div ref={ringRef} className="iter-2-cursor-ring" data-mode="default" aria-hidden="true" />
      <div ref={dotRef} className="iter-2-cursor-dot" data-mode="default" aria-hidden="true" />
    </>
  )
}
