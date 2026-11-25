// Petit rond pour les boutons (hérite de la couleur du texte)
export function Spinner({ className = 'h-5 w-5' }: { className?: string }) {
  return (
    <span
      role="status"
      aria-label="Chargement"
      className={`inline-block animate-spin rounded-full border-2 border-current border-t-transparent ${className}`}
    />
  );
}

// Loader plein écran : logo qui flotte, anneau vert/doré qui tourne
export default function Loader({ label = 'Chargement…', fullscreen = true }: { label?: string; fullscreen?: boolean }) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={`${fullscreen ? 'fixed inset-0 z-[100]' : 'min-h-[50vh]'} grid place-items-center bg-paper`}
    >
      <div className="flex flex-col items-center gap-6">
        <div className="relative grid h-32 w-32 place-items-center">
          <span className="absolute inset-0 rounded-full border-[3px] border-forest/15" />
          <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-r-sun border-t-forest [animation-duration:1.2s]" />
          <span className="absolute inset-4 animate-ping rounded-full bg-leaf/20 [animation-duration:2s] motion-reduce:animate-none" />
          <img src="/logo.png" alt="" className="relative h-12 w-auto animate-[km-float_2.4s_ease-in-out_infinite] motion-reduce:animate-none" />
        </div>

        <div className="flex flex-col items-center gap-3">
          <p className="font-display text-lg font-bold text-forest">{label}</p>
          <div className="flex gap-1.5" aria-hidden>
            {[0, 150, 300].map((d) => (
              <span key={d} className="h-2 w-2 animate-bounce rounded-full bg-forest" style={{ animationDelay: `${d}ms` }} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}