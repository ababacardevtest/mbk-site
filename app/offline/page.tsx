export const metadata = { title: 'Hors ligne' };

export default function Offline() {
  return (
    <main className="grid min-h-screen place-items-center bg-mist p-6 text-center">
      <div className="max-w-sm space-y-4">
        <h1 className="font-display text-3xl font-black text-forest">Pas de connexion</h1>
        <p className="text-bark/80">Vérifiez votre connexion internet, puis réessayez.</p>
        <a href="/" className="inline-block rounded-full bg-forest px-7 py-3.5 font-bold text-white">Réessayer</a>
      </div>
    </main>
  );
}
