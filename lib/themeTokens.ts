export const gradients = {
  /**
   * Primary brand gradient used across headings, buttons, and key accents.
   */
  primary: "linear-gradient(to right, var(--neon-purple), var(--neon-cyan))",

  /**
   * Diagonal variant of the primary gradient for cards or backgrounds.
   */
  primaryDiagonal: "linear-gradient(135deg, var(--neon-purple), var(--neon-cyan))",

  /**
   * Soft glow often used behind elements like cards or dividers.
   */
  borderGlow:
    "radial-gradient(circle at 0% 0%, color-mix(in oklch, var(--neon-purple) 70%, transparent), transparent 70%)",
} as const