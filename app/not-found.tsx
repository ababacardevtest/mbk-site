import Link from 'next/link';

export const metadata = { title: 'Page introuvable – Keer Maam Birabar' };

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center bg-mist px-6 py-12 text-center">
      <div className="max-w-md space-y-6">
        <img src="/logo.png" alt="Keer Maam Birabar" className="mx-auto h-16 w-auto" />

        <p className="font-display text-7xl font-black leading-none text-forest sm:text-8xl">404</p>

        <div className="space-y-2">
          <h1 className="font-display text-2xl font-black text-bark sm:text-3xl">Page introuvable</h1>
          <p className="text-bark/75">
            Cette page n’existe pas ou a été déplacée. Revenez à l’accueil pour choisir vos soins.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link href="/" className="rounded-full bg-forest px-7 py-3.5 font-bold text-white shadow-lg shadow-forest/20 active:scale-95">
            Retour à l’accueil
          </Link>
          <Link href="/#reserver" className="rounded-full border-2 border-forest px-7 py-3.5 font-bold text-forest active:scale-95">
            Réserver un soin
          </Link>
        </div>
      </div>
    </main>
  );
}