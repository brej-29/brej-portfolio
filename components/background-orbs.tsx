"use client"

export function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      {/* Purple orb - top right */}
      <div
        className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full opacity-20 blur-3xl animate-pulse"
        style={{
          background: "radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)",
          animationDuration: "8s",
        }}
      />

      {/* Cyan orb - bottom left */}
      <div
        className="absolute -bottom-1/4 -left-1/4 w-[700px] h-[700px] rounded-full opacity-20 blur-3xl animate-pulse"
        style={{
          background: "radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)",
          animationDuration: "10s",
          animationDelay: "2s",
        }}
      />

      {/* Purple orb - center moving */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full opacity-15 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--neon-purple) 0%, transparent 70%)",
          animation: "float 15s ease-in-out infinite",
        }}
      />

      {/* Cyan orb - moving diagonal */}
      <div
        className="absolute top-1/4 right-1/3 w-[400px] h-[400px] rounded-full opacity-10 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--neon-cyan) 0%, transparent 70%)",
          animation: "float-reverse 12s ease-in-out infinite",
        }}
      />

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translate(-50%, -50%) translateY(0px) translateX(0px);
          }
          50% {
            transform: translate(-50%, -50%) translateY(-30px) translateX(30px);
          }
        }
        
        @keyframes float-reverse {
          0%, 100% {
            transform: translateY(0px) translateX(0px);
          }
          50% {
            transform: translateY(30px) translateX(-30px);
          }
        }
      `}</style>
    </div>
  )
}
