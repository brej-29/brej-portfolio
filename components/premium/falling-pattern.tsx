"use client"

import type React from "react"
import { motion, useReducedMotion } from "framer-motion"
import { cn } from "@/lib/utils"
import { useIsMobile } from "@/hooks/use-mobile"

type FallingPatternProps = React.ComponentProps<"div"> & {
  color?: string
  backgroundColor?: string
  duration?: number
  blurIntensity?: string
  density?: number
}

export function FallingPattern({
  color = "#A855F7",
  backgroundColor = "var(--background)",
  duration = 150,
  blurIntensity = "0.8em",
  density = 1,
  className,
}: FallingPatternProps) {
  const prefersReducedMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const effectiveBlur = isMobile ? "0.4em" : blurIntensity

  const generateBackgroundImage = () => {
    const patterns = [
      `radial-gradient(4px 100px at 0px 235px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 235px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 117.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 252px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 252px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 126px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 150px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 150px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 75px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 253px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 253px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 126.5px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 204px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 204px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 102px, ${color} 100%, transparent 150%)`,
      `radial-gradient(4px 100px at 0px 134px, ${color}, transparent)`,
      `radial-gradient(4px 100px at 300px 134px, ${color}, transparent)`,
      `radial-gradient(1.5px 1.5px at 150px 67px, ${color} 100%, transparent 150%)`,
    ]
    return patterns.join(", ")
  }

  const backgroundSizes = [
    "300px 235px",
    "300px 235px",
    "300px 235px",
    "300px 252px",
    "300px 252px",
    "300px 252px",
    "300px 150px",
    "300px 150px",
    "300px 150px",
    "300px 253px",
    "300px 253px",
    "300px 253px",
    "300px 204px",
    "300px 204px",
    "300px 204px",
    "300px 134px",
    "300px 134px",
    "300px 134px",
  ].join(", ")

  const startPositions =
    "0px 220px, 3px 220px, 151.5px 337.5px, 25px 24px, 28px 24px, 176.5px 150px, 50px 16px, 53px 16px, 201.5px 91px, 75px 224px, 78px 224px, 226.5px 230.5px, 100px 19px, 103px 19px, 251.5px 121px, 125px 120px, 128px 120px, 276.5px 187px"
  const endPositions =
    "0px 6800px, 3px 6800px, 151.5px 6917.5px, 25px 13632px, 28px 13632px, 176.5px 13758px, 50px 5416px, 53px 5416px, 201.5px 5491px, 75px 17175px, 78px 17175px, 226.5px 17301.5px, 100px 5119px, 103px 5119px, 251.5px 5221px, 125px 8428px, 128px 8428px, 276.5px 8495px"

  return (
    <div className={cn("relative h-full w-full", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="size-full"
      >
        <motion.div
          className="relative size-full z-0"
          style={{
            backgroundColor,
            backgroundImage: generateBackgroundImage(),
            backgroundSize: backgroundSizes,
            opacity: 1,
          }}
          variants={{
            initial: {
              backgroundPosition: startPositions,
            },
            animate: {
              backgroundPosition: [startPositions, endPositions],
              transition: {
                duration: duration,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              },
            },
          }}
          initial="initial"
          animate={prefersReducedMotion ? "initial" : "animate"}
        />
      </motion.div>
      <div
        className="absolute inset-0 z-1"
        style={{
          backdropFilter: `blur(${effectiveBlur})`,
          backgroundImage: `radial-gradient(circle at 50% 50%, transparent 0, transparent 2px, ${backgroundColor} 5px)`,
          backgroundSize: `${8 * density}px ${8 * density}px`,
        }}
      />
    </div>
  )
}
