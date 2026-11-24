'use client';
import { useEffect, useState } from 'react';

type InstallEvent = Event & { prompt: () => Promise<void> };

export default function InstallButton({ label = 'Installer l’application', className = '' }: { label?: string; className?: string }) {
  const [ev, setEv] = useState<InstallEvent | null>(null);
  const [ios, setIos] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const standalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone;
    if (standalone) { setInstalled(true); return; }
    setIos(/iphone|ipad|ipod/i.test(navigator.userAgent));
    const onPrompt = (e: Event) => { e.preventDefault(); setEv(e as InstallEvent); };
    const onInstalled = () => setInstalled(true);
    window.addEventListener('beforeinstallprompt', onPrompt);
    window.addEventListener('appinstalled', onInstalled);
    return () => { window.removeEventListener('beforeinstallprompt', onPrompt); window.removeEventListener('appinstalled', onInstalled); };
  }, []);

  if (installed || (!ev && !ios)) return null;

  async function click() {
    if (ev) { await ev.prompt(); setEv(null); } else setShowHint((s) => !s);
  }

  return (
    <div className="text-center">
      <button type="button" onClick={click} className={className}>{label}</button>
      {showHint && (
        <p className="mx-auto mt-3 max-w-xs rounded-2xl bg-white p-3 text-sm text-bark shadow">
          Sur iPhone : touchez le bouton Partager de Safari, puis « Sur l’écran d’accueil ».
        </p>
      )}
    </div>
  );
}
