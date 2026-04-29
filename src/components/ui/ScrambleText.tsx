import { useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

type CharsetKey = 'binary' | 'katakana' | 'hex' | 'signal'

const CHARSETS: Record<CharsetKey, string> = {
  binary: '01',
  katakana: 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾐﾑﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ',
  hex: '0123456789ABCDEF',
  signal: '⌁⏃⏚⏧◊◈◉◎●○⬡⬢⎔⎓∿~^|/\\',
}

interface Props {
  text: string
  charset?: CharsetKey | CharsetKey[]
  duration?: number
  startDelay?: number
  className?: string
}

export function ScrambleText({
  text,
  charset = 'binary',
  duration = 950,
  startDelay = 0,
  className = '',
}: Props) {
  const reduce = useReducedMotion()
  const containerRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const charsets = (Array.isArray(charset) ? charset : [charset])
      .map((k) => CHARSETS[k])
      .join('') || '01'

    const chars = [...text]
    container.textContent = ''
    const spans: HTMLSpanElement[] = []
    for (let i = 0; i < chars.length; i++) {
      const s = document.createElement('span')
      s.className = 'iter-1-scramble-char'
      const ch = chars[i] ?? ''
      if (ch === ' ') {
        s.textContent = ' '
      } else if (reduce) {
        s.textContent = ch
      } else {
        s.textContent = charsets[i % charsets.length] ?? ch
      }
      container.appendChild(s)
      spans.push(s)
    }

    if (reduce) return

    const lockTimes = new Float32Array(chars.length)
    for (let i = 0; i < chars.length; i++) {
      const base = (i / Math.max(1, chars.length)) * (duration - 120)
      const jitter = (Math.random() - 0.5) * 90
      lockTimes[i] = startDelay + Math.max(0, base + jitter)
    }
    const total = startDelay + duration

    let raf = 0
    let active = false
    let t0 = 0

    const reset = () => {
      for (let i = 0; i < chars.length; i++) {
        const span = spans[i]
        if (!span) continue
        span.classList.remove('iter-1-landed')
        const ch = chars[i] ?? ''
        if (ch !== ' ') {
          span.textContent = charsets[i % charsets.length] ?? ch
        }
      }
    }

    const tick = (now: number) => {
      if (!t0) t0 = now
      const elapsed = now - t0
      for (let i = 0; i < chars.length; i++) {
        const span = spans[i]
        const ch = chars[i] ?? ''
        if (!span || ch === ' ') continue
        const lock = lockTimes[i] ?? 0
        if (elapsed >= lock) {
          if (!span.classList.contains('iter-1-landed')) {
            span.textContent = ch
            span.classList.add('iter-1-landed')
          }
        } else {
          const idx = (Math.floor(now / 38) + i * 11) % charsets.length
          span.textContent = charsets[idx] ?? ch
        }
      }
      if (elapsed < total) {
        raf = requestAnimationFrame(tick)
      } else {
        for (let i = 0; i < chars.length; i++) {
          const span = spans[i]
          const ch = chars[i] ?? ''
          if (span) span.textContent = ch === ' ' ? ' ' : ch
        }
        active = false
      }
    }

    const start = () => {
      if (active) return
      active = true
      t0 = 0
      reset()
      raf = requestAnimationFrame(tick)
    }

    const onIO: IntersectionObserverCallback = (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          start()
        } else {
          cancelAnimationFrame(raf)
          active = false
          reset()
        }
      }
    }

    const io = new IntersectionObserver(onIO, { threshold: 0.4 })
    io.observe(container)

    return () => {
      io.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [text, charset, duration, startDelay, reduce])

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span ref={containerRef} aria-hidden="true" />
    </span>
  )
}
