'use client';
import Loader from '@/app/loader';
import { useEffect, useState } from 'react';

export default function Splash() {
  const [phase, setPhase] = useState<'show' | 'fade' | 'gone'>('show');

  useEffect(() => {
    if (sessionStorage.getItem('km-splash')) { setPhase('gone'); return; }
    sessionStorage.setItem('km-splash', '1');
    const t1 = setTimeout(() => setPhase('fade'), 1100);
    const t2 = setTimeout(() => setPhase('gone'), 1600);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  if (phase === 'gone') return null;
  return (
    <div className={`transition-opacity duration-500 ${phase === 'fade' ? 'opacity-0' : 'opacity-100'}`}>
      <Loader label="Bienvenue" />
    </div>
  );
}