// Image avec repli élégant (feuillage) si aucune photo n'est encore ajoutée.
export default function Pic({ src, alt = '', className = '' }: { src?: string; alt?: string; className?: string }) {
  if (src) return <img src={src} alt={alt} loading="lazy" className={`object-cover ${className}`} />;
  return (
    <div role="img" aria-label={alt} className={`grid place-items-center bg-gradient-to-br from-mist via-[#D9E8C0] to-leaf/40 ${className}`}>
      <svg viewBox="0 0 64 64" className="h-1/3 w-1/3 max-h-16 max-w-16 text-forest/40" fill="currentColor" aria-hidden>
        <path d="M32 6C18 14 10 28 16 44c4 8 12 12 16 14 4-2 12-6 16-14 6-16-2-30-16-38Zm0 8c8 7 12 17 9 28-2 5-6 8-9 10V14Z" />
      </svg>
    </div>
  );
}
