"use client"

import type React from "react"

import { SiGoogle } from "react-icons/si"
import { FaDiscord } from "react-icons/fa"
import { Github, Instagram, Linkedin } from "lucide-react"
import { useAnimate } from "framer-motion"
import { useTheme } from "next-themes"
import { withBasePath } from "@/lib/basePath"
import { gradients } from "@/lib/themeTokens"

export const ClipPathLinks = () => {
  const { resolvedTheme } = useTheme()
  const theme = resolvedTheme ?? "dark"
  const isDark = theme === "dark"

  const huggingFaceImgSrc = isDark
    ? "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/dark/huggingface.png"
    : "https://registry.npmmirror.com/@lobehub/icons-static-png/latest/files/light/huggingface.png"

  const streamlitImgSrc = isDark
    ? withBasePath("/images/streamlit-mark-dark-mode.png")
    : withBasePath("/images/streamlit-mark-light-mode.png")

  const portfolioImgSrc = withBasePath("/images/avatar-mini.png")

  return (
    <div className="divide-y border divide-border border-border">
      <div className="grid grid-cols-2 divide-x divide-border">
        <LinkBox
          Icon={SiGoogle}
          href="https://mail.google.com/mail/u/0/?fs=1&to=brejesh.bala@gmail.com&tf=cm"
        />
        <LinkBox Icon={Github} href="https://github.com/brej-29" />
      </div>
      <div className="grid grid-cols-4 divide-x divide-border">
        <LinkBox
          href="https://huggingface.co/BrejBala"
          imgSrc={huggingFaceImgSrc}
          className="max-h-10 sm:max-h-16 md:max-h-20 object-contain"
        />
        <LinkBox
          Icon={Linkedin}
          href="https://www.linkedin.com/in/brejesh-balakrishnan-7855051b9/"
        />
        <LinkBox Icon={Instagram} href="https://www.instagram.com/achu_brej/" />
        <LinkBox
          href="https://share.streamlit.io/user/brej-29"
          imgSrc={streamlitImgSrc}
          className="max-h-10 sm:max-h-16 md:max-h-20 object-contain"
        />
      </div>
      <div className="grid grid-cols-3 divide-x divide-border">
        <LinkBox Icon={FaDiscord} href="https://discordapp.com/users/briji_achu" />
        <LinkBox
          href="https://medium.com/@brejesh.bala"
          imgSrc="https://upload.wikimedia.org/wikipedia/commons/e/ec/Medium_logo_Monogram.svg"
          className="max-h-4 sm:max-h-6 md:max-h-8 object-contain dark:invert"
        />
        <LinkBox
          href="https://brej-29.github.io/brej-portfolio/"
          className="h-8 w-auto object-contain"
          imgSrc={portfolioImgSrc}
        />
      </div>
    </div>
  )
}

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)"
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)"
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)"
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)"
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)"

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
}

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
}

interface LinkBoxProps {
  Icon?: React.ComponentType<{ className?: string }>
  href: string
  imgSrc?: string
  className?: string
}

const LinkBox = ({ Icon, href, imgSrc, className }: LinkBoxProps) => {
  const [scope, animate] = useAnimate()
  const placeholderSrc = withBasePath("/placeholder.svg")

  const getNearestSide = (e: React.MouseEvent) => {
    const box = e.currentTarget.getBoundingClientRect()

    const proximityToLeft = {
      proximity: Math.abs(box.left - e.clientX),
      side: "left" as const,
    }
    const proximityToRight = {
      proximity: Math.abs(box.right - e.clientX),
      side: "right" as const,
    }
    const proximityToTop = {
      proximity: Math.abs(box.top - e.clientY),
      side: "top" as const,
    }
    const proximityToBottom = {
      proximity: Math.abs(box.bottom - e.clientY),
      side: "bottom" as const,
    }

    const sortedProximity = [proximityToLeft, proximityToRight, proximityToTop, proximityToBottom].sort(
      (a, b) => a.proximity - b.proximity,
    )

    return sortedProximity[0].side
  }

  const handleMouseEnter = (e: React.MouseEvent) => {
    const side = getNearestSide(e)
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[side],
    })
  }

  const handleMouseLeave = (e: React.MouseEvent) => {
    const side = getNearestSide(e)
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[side],
    })
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="relative grid h-20 w-full place-content-center sm:h-28 md:h-36 text-foreground bg-background"
    >
      {imgSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imgSrc || placeholderSrc}
          alt="custom icon"
          className={className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"}
        />
      ) : Icon ? (
        <Icon className="text-xl sm:text-3xl md:text-4xl" />
      ) : null}

      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP, backgroundImage: gradients.primary }}
        className="absolute inset-0 grid place-content-center text-primary-foreground transition-colors duration-300"
      >
        {imgSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc || placeholderSrc}
            alt="custom icon hover"
            className={className ?? "max-h-10 sm:max-h-16 md:max-h-20 object-contain"}
          />
        ) : Icon ? (
          <Icon className="text-xl sm:text-3xl md:text-4xl" />
        ) : null}
      </div>
    </a>
  )
}
