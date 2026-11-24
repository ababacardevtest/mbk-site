'use client';
import { useState, type ChangeEvent } from 'react';
import type { Content } from '@/lib/types';
import Pic from './Pic';

const fmt = (n: number | string) => Number(n).toLocaleString('fr-FR').replace(/[\u202f\u00a0]/g, ' ') + ' F';

export default function Booking({ content }: { content: Content }) {
  const { services, transport, business } = content;
  const [sel, setSel] = useState<string[]>([]);
  const [zone, setZone] = useState<string | undefined>(transport[0]?.id);
  const [f, setF] = useState({ name: '', address: '', date: '', time: '', notes: '' });
  const up = (k: keyof typeof f) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  const chosen = services.filter((s) => sel.includes(s.id));
  const z = transport.find((t) => t.id === zone);
  const total = chosen.reduce((a, s) => a + Number(s.price), 0) + (chosen.length && z ? Number(z.price) : 0);
  const ready = chosen.length > 0 && f.name.trim() && f.address.trim();
  const toggle = (id: string) => setSel((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const lines = [
    `Bonjour ${business.name}, je souhaite réserver :`,
    ...chosen.map((s) => `• ${s.name} (${fmt(s.price)})`),
    z ? `Transport : ${z.label} (${fmt(z.price)})` : '',
    `Total : ${fmt(total)}`,
    '',
    `Nom : ${f.name}`,
    `Adresse : ${f.address}`,
    f.date ? `Date souhaitée : ${new Date(f.date).toLocaleDateString('fr-FR')}${f.time ? ' à ' + f.time : ''}` : '',
    f.notes ? `Précisions : ${f.notes}` : '',
  ].filter((l, i, a) => l !== '' || (a[i - 1] !== '' && i !== a.length - 1));
  const href = `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(lines.join('\n'))}`;
  const today = new Date().toISOString().slice(0, 10);

  return (
    <section id="reserver" className="mx-auto max-w-6xl px-4 py-14 pb-32">
      <h2 className="font-display text-3xl font-black text-forest sm:text-4xl">Choisissez vos soins</h2>
      <p className="mt-2 text-bark/70">Touchez un soin pour l’ajouter. Vous pouvez en choisir plusieurs.</p>

      <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => {
          const on = sel.includes(s.id);
          return (
            <button key={s.id} type="button" onClick={() => toggle(s.id)} aria-pressed={on}
              className={`overflow-hidden rounded-3xl border-2 bg-white text-left transition active:scale-[.98] ${on ? 'border-forest ring-4 ring-sun/50' : 'border-transparent shadow-md'}`}>
              <Pic src={s.image} alt={s.name} className="aspect-[16/10] w-full" />
              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-display text-xl font-bold text-bark">{s.name}</h3>
                  <span className="shrink-0 rounded-full bg-forest px-3 py-1 text-sm font-bold text-white">{fmt(s.price)}</span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-bark/75">{s.desc}</p>
                <p className={`mt-3 text-sm font-bold ${on ? 'text-forest' : 'text-leaf'}`}>{on ? '✓ Ajouté' : 'Ajouter ce soin'}</p>
              </div>
            </button>
          );
        })}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-2" id="infos">
        <div>
          <h3 className="font-display text-2xl font-bold text-forest">Frais de transport</h3>
          <div className="mt-4 space-y-3">
            {transport.map((t) => (
              <label key={t.id} className={`flex cursor-pointer items-center justify-between gap-3 rounded-2xl border-2 bg-white p-4 ${zone === t.id ? 'border-forest' : 'border-forest/10'}`}>
                <span className="flex items-center gap-3">
                  <input type="radio" name="zone" checked={zone === t.id} onChange={() => setZone(t.id)} className="h-5 w-5 accent-[#1E4D2B]" />
                  <span className="font-medium">{t.label}</span>
                </span>
                <span className="font-bold text-forest">{fmt(t.price)}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-display text-2xl font-bold text-forest">Vos informations</h3>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="bk-name" className="mb-1.5 block text-sm font-semibold text-bark">
                Votre nom <span className="text-red-700" aria-hidden>*</span>
              </label>
              <input id="bk-name" className="field" placeholder="Ex : Awa Diop" autoComplete="name" required value={f.name} onChange={up('name')} />
            </div>

            <div>
              <label htmlFor="bk-address" className="mb-1.5 block text-sm font-semibold text-bark">
                Adresse / quartier <span className="text-red-700" aria-hidden>*</span>
              </label>
              <input id="bk-address" className="field" placeholder="Ex : Pikine, Icotaf, près de la mosquée" autoComplete="street-address" required value={f.address} onChange={up('address')} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="bk-date" className="mb-1.5 block text-sm font-semibold text-bark">Date souhaitée</label>
                <input id="bk-date" className="field" type="date" min={today} value={f.date} onChange={up('date')} />
              </div>
              <div>
                <label htmlFor="bk-time" className="mb-1.5 block text-sm font-semibold text-bark">Heure souhaitée</label>
                <input id="bk-time" className="field" type="time" value={f.time} onChange={up('time')} />
              </div>
            </div>

            <div>
              <label htmlFor="bk-notes" className="mb-1.5 block text-sm font-semibold text-bark">
                Précisions <span className="font-normal text-bark/60">(facultatif)</span>
              </label>
              <textarea id="bk-notes" className="field" rows={2} placeholder="Ex : étage, point de repère, demande particulière" value={f.notes} onChange={up('notes')} />
            </div>
          </div>
        </div>
      </div>

      {/* Barre de réservation fixe */}
      <div className={`fixed inset-x-0 bottom-0 z-40 border-t border-forest/10 bg-white/95 backdrop-blur transition-transform ${chosen.length ? 'translate-y-0' : 'translate-y-full'}`}>
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3" style={{ paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}>
          <div className="leading-tight">
            <p className="text-sm text-bark/70">{chosen.length} soin{chosen.length > 1 ? 's' : ''} · transport inclus</p>
            <p className="font-display text-xl font-black text-forest">{fmt(total)}</p>
          </div>
          {ready ? (
            <a href={href} target="_blank" rel="noopener noreferrer" className="rounded-full bg-[#25D366] px-6 py-3.5 text-center font-bold text-white shadow-lg active:scale-95">Réserver sur WhatsApp</a>
          ) : (
            <a href="#infos" className="rounded-full bg-forest px-6 py-3.5 text-center font-bold text-white active:scale-95">Remplir mes infos</a>
          )}
        </div>
      </div>
    </section>
  );
}
