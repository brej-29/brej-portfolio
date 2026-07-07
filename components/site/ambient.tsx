/** Fixed ambient layer: two slow-drifting glows behind all content. */
export function Ambient() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <div
        className="ambient-a absolute -top-48 left-[8%] h-[520px] w-[720px] rounded-full blur-[130px]"
        style={{ background: "color-mix(in oklch, var(--accent) 11%, transparent)" }}
      />
      <div
        className="ambient-b absolute right-[-12%] top-[38%] h-[420px] w-[620px] rounded-full blur-[130px]"
        style={{ background: "color-mix(in oklch, var(--accent-3) 9%, transparent)" }}
      />
      <div
        className="ambient-a absolute bottom-[-10%] left-[30%] h-[380px] w-[560px] rounded-full blur-[140px]"
        style={{ background: "color-mix(in oklch, var(--accent-2) 8%, transparent)" }}
      />
    </div>
  )
}
