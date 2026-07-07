"use client"

import { useEffect, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"

/** Vertical masked ticker cycling through short phrases. */
export function Ticker({ items, interval = 2600 }: { items: string[]; interval?: number }) {
  const [index, setIndex] = useState(0)
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    if (items.length < 2) return
    const timer = setInterval(() => setIndex((i) => (i + 1) % items.length), interval)
    return () => clearInterval(timer)
  }, [items.length, interval])

  return (
    <span className="relative inline-flex h-[1.6em] items-center overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={items[index]}
          initial={reducedMotion ? { opacity: 0 } : { y: "105%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reducedMotion ? { opacity: 0 } : { y: "-105%", opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="whitespace-nowrap"
        >
          {items[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
