'use client';
import { useEffect, useState, type ReactNode, type ChangeEvent } from 'react';
import type { Business, Content } from '@/lib/types';
import InstallButton from '@/components/InstallButton';

type FieldProps = { label: string; value: string | number; onChange: (v: string) => void; area?: boolean; type?: string };

function Field({ label, value, onChange, area, type = 'text' }: FieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-semibold text-bark">{label}</span>
      {area ? (
        <textarea className="field" rows={3} value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <input className="field" type={type} value={value} onChange={(e) => onChange(e.target.value)} />
      )}
    </label>
  );
}

type ImageProps = { label: string; value: string; onChange: (v: string) => void; pw: string };

function ImageField({ label, value, onChange, pw }: ImageProps) {
  const [busy, setBusy] = useState(false);
  async function pick(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setBusy(true);
    const fd = new FormData();
    fd.append('file', file);
    const r = await fetch('/api/upload', { method: 'POST', headers: { 'x-admin-password': pw }, body: fd });
    const j: { url?: string; error?: string } = await r.json();
    setBusy(false);
    if (j.url) onChange(j.url); else alert(j.error || 'Échec du téléversement');
  }
  return (
    <div>
      <span className="mb-1 block text-sm font-semibold text-bark">{label}</span>
      <div className="flex items-center gap-3">
        {value ? <img src={value} alt="" className="h-20 w-20 rounded-xl object-cover" /> : <div className="grid h-20 w-20 place-items-center rounded-xl bg-mist text-xs text-bark/60">Aucune</div>}
        <label className="cursor-pointer rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white">
          {busy ? 'Envoi…' : value ? 'Changer la photo' : 'Ajouter une photo'}
          <input type="file" accept="image/*" className="hidden" onChange={pick} />
        </label>
        {value && <button type="button" onClick={() => onChange('')} className="text-sm text-red-700 underline">Retirer</button>}
      </div>
    </div>
  );
}

function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-4 rounded-3xl bg-white p-5 shadow">
      <h2 className="font-display text-xl font-bold text-forest">{title}</h2>
      {children}
    </section>
  );
}

type ListKey = 'services' | 'transport';

export default function Admin() {
  const [pw, setPw] = useState('');
  const [ok, setOk] = useState(false);
  const [c, setC] = useState<Content | null>(null);
  const [msg, setMsg] = useState('');
  const [np, setNp] = useState('');
  const [np2, setNp2] = useState('');
  const [pmsg, setPmsg] = useState('');

  async function login(p: string) {
    const r = await fetch('/api/auth', { headers: { 'x-admin-password': p } });
    if (!r.ok) { setMsg('Mot de passe incorrect'); return; }
    sessionStorage.setItem('pw', p);
    setC(await (await fetch('/api/content', { cache: 'no-store' })).json());
    setOk(true); setMsg('');
  }
  useEffect(() => { const p = sessionStorage.getItem('pw'); if (p) { setPw(p); login(p); } }, []);

  const bus = (k: keyof Business) => (v: string) => setC((s) => s && { ...s, business: { ...s.business, [k]: v } });
  const item = (list: ListKey, i: number, k: string, num = false) => (v: string) =>
    setC((s) => s && { ...s, [list]: (s[list] as object[]).map((x, j) => (j === i ? { ...x, [k]: num ? Number(v) : v } : x)) });
  const remove = (list: ListKey, i: number) => setC((s) => s && { ...s, [list]: (s[list] as object[]).filter((_, j) => j !== i) });
  const add = (list: ListKey, blank: object) => setC((s) => s && { ...s, [list]: [...(s[list] as object[]), { id: 'x' + Date.now(), ...blank }] });

  async function save() {
    setMsg('Enregistrement…');
    const r = await fetch('/api/content', { method: 'PUT', headers: { 'Content-Type': 'application/json', 'x-admin-password': pw }, body: JSON.stringify(c) });
    setMsg(r.ok ? '✓ Enregistré. Le site est à jour.' : 'Erreur : modifications non enregistrées');
  }

  async function changePw() {
    if (np.length < 6) { setPmsg('Au moins 6 caractères.'); return; }
    if (np !== np2) { setPmsg('Les deux codes ne sont pas identiques.'); return; }
    const r = await fetch('/api/password', { method: 'POST', headers: { 'Content-Type': 'application/json', 'x-admin-password': pw }, body: JSON.stringify({ next: np }) });
    if (r.ok) { sessionStorage.setItem('pw', np); setPw(np); setNp(''); setNp2(''); setPmsg('✓ Code changé. Utilisez-le à la prochaine connexion.'); }
    else setPmsg((await r.json()).error || 'Erreur');
  }

  if (!ok || !c) {
    return (
      <main className="grid min-h-screen place-items-center p-4">
        <form onSubmit={(e) => { e.preventDefault(); login(pw); }} className="w-full max-w-sm space-y-4 rounded-3xl bg-white p-6 shadow-lg">
          <h1 className="font-display text-2xl font-black text-forest">Espace gérante</h1>
          <input className="field" type="password" placeholder="Mot de passe" value={pw} onChange={(e) => setPw(e.target.value)} />
          {msg && <p className="text-sm text-red-700">{msg}</p>}
          <button className="w-full rounded-full bg-forest py-3 font-bold text-white">Entrer</button>
        </form>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl space-y-5 p-4 pb-28">
      <h1 className="font-display text-3xl font-black text-forest">Modifier mon site</h1>
      <InstallButton label="Installer l’espace gérante sur mon téléphone" className="rounded-full bg-bark px-6 py-3 font-bold text-white" />

      <Card title="Entreprise">
        <ImageField pw={pw} label="Logo" value={c.business.logo} onChange={bus('logo')} />
        <Field label="Nom" value={c.business.name} onChange={bus('name')} />
        <Field label="Slogan" value={c.business.tagline} onChange={bus('tagline')} />
        <Field label="Numéro WhatsApp (format international, ex : 221787359292)" value={c.business.whatsapp} onChange={bus('whatsapp')} />
        <Field label="Numéro affiché" value={c.business.phoneDisplay} onChange={bus('phoneDisplay')} />
      </Card>

      <Card title="Page d’accueil">
        <Field label="Titre" value={c.business.heroTitle} onChange={bus('heroTitle')} />
        <Field label="Texte" area value={c.business.heroText} onChange={bus('heroText')} />
        <ImageField pw={pw} label="Photo d’accueil (verticale de préférence)" value={c.business.heroImage} onChange={bus('heroImage')} />
      </Card>

      <Card title="Soins proposés">
        {c.services.map((s, i) => (
          <div key={s.id} className="space-y-3 rounded-2xl border border-forest/15 p-4">
            <Field label="Nom du soin" value={s.name} onChange={item('services', i, 'name')} />
            <Field label="Prix (FCFA, chiffres seulement)" type="number" value={s.price} onChange={item('services', i, 'price', true)} />
            <Field label="Description" area value={s.desc} onChange={item('services', i, 'desc')} />
            <ImageField pw={pw} label="Photo" value={s.image} onChange={item('services', i, 'image')} />
            <button type="button" onClick={() => confirm('Supprimer ce soin ?') && remove('services', i)} className="text-sm text-red-700 underline">Supprimer ce soin</button>
          </div>
        ))}
        <button type="button" onClick={() => add('services', { name: 'Nouveau soin', price: 10000, desc: '', image: '' })} className="rounded-full border-2 border-forest px-5 py-2.5 font-semibold text-forest">+ Ajouter un soin</button>
      </Card>

      <Card title="Frais de transport">
        {c.transport.map((t, i) => (
          <div key={t.id} className="grid gap-3 rounded-2xl border border-forest/15 p-4 sm:grid-cols-[1fr_140px_auto] sm:items-end">
            <Field label="Zone" value={t.label} onChange={item('transport', i, 'label')} />
            <Field label="Prix (FCFA)" type="number" value={t.price} onChange={item('transport', i, 'price', true)} />
            <button type="button" onClick={() => remove('transport', i)} className="pb-3 text-sm text-red-700 underline">Supprimer</button>
          </div>
        ))}
        <button type="button" onClick={() => add('transport', { label: 'Nouvelle zone', price: 5000 })} className="rounded-full border-2 border-forest px-5 py-2.5 font-semibold text-forest">+ Ajouter une zone</button>
      </Card>

      <Card title="Section « À propos »">
        <Field label="Titre" value={c.business.aboutTitle} onChange={bus('aboutTitle')} />
        <Field label="Texte" area value={c.business.about} onChange={bus('about')} />
        <Field label="Zones desservies" value={c.business.zones} onChange={bus('zones')} />
        <ImageField pw={pw} label="Photo" value={c.business.aboutImage} onChange={bus('aboutImage')} />
      </Card>

      <Card title="Mon code secret">
        <Field label="Nouveau code (6 caractères minimum)" type="password" value={np} onChange={setNp} />
        <Field label="Répéter le nouveau code" type="password" value={np2} onChange={setNp2} />
        {pmsg && <p className="text-sm text-bark">{pmsg}</p>}
        <button type="button" onClick={changePw} className="rounded-full border-2 border-forest px-5 py-2.5 font-semibold text-forest">Changer mon code</button>
      </Card>

      <div className="fixed inset-x-0 bottom-0 border-t bg-white/95 p-3 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3">
          <p className="text-sm text-bark">{msg}</p>
          <button onClick={save} className="rounded-full bg-forest px-7 py-3.5 font-bold text-white">Enregistrer</button>
        </div>
      </div>
    </main>
  );
}
