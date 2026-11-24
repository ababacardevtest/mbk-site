import { getContent } from '@/lib/store';
import Booking from '@/components/Booking';
import Pic from '@/components/Pic';
import InstallButton from '@/components/InstallButton';

export const dynamic = 'force-dynamic';

export default async function Home() {
  const c = await getContent();
  const b = c.business;
  const wa = `https://wa.me/${b.whatsapp}`;

  return (
    <>
      <header className="sticky top-0 z-30 border-b border-forest/10 bg-paper/90 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#top" className="flex min-w-0 items-center gap-2 sm:gap-3" aria-label={b.name}>
            <img src={b.logo || '/logo.png'} alt="" className="h-9 w-auto shrink-0 sm:h-11" />
            <span className="truncate font-display text-lg font-black leading-none text-forest sm:text-2xl">{b.name}</span>
          </a>
          <a href="#reserver" className="ml-3 shrink-0 rounded-full bg-forest px-4 py-2.5 text-sm font-semibold text-white active:scale-95 sm:px-5">Réserver</a>
        </div>
      </header>

      <main id="top">
        {/* Accueil */}
        <section className="bg-mist">
          <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
            <div>
              <p className="mb-3 inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-forest">{b.tagline}</p>
              <h1 className="font-display text-4xl font-black leading-[1.05] text-forest sm:text-5xl lg:text-6xl">{b.heroTitle}</h1>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-bark/80">{b.heroText}</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#reserver" className="rounded-full bg-forest px-7 py-4 text-center text-base font-bold text-white shadow-lg shadow-forest/20 active:scale-95">Choisir mes soins</a>
                <a href={wa} className="rounded-full border-2 border-forest px-7 py-4 text-center text-base font-bold text-forest active:scale-95">Écrire sur WhatsApp</a>
              </div>
            </div>
            <Pic src={b.heroImage} alt="Soin de bien-être à domicile" className="mx-auto aspect-[4/5] w-full max-w-md rounded-t-[999px] rounded-b-3xl shadow-xl" />
          </div>
        </section>

        {/* Réservation (services + transport + formulaire) */}
        <Booking content={c} />

        {/* À propos */}
        <section className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2">
          <Pic src={b.aboutImage} alt="L’équipe Keer Maam Birabar" className="aspect-[4/3] w-full rounded-3xl" />
          <div>
            <h2 className="font-display text-3xl font-black text-forest sm:text-4xl">{b.aboutTitle}</h2>
            <p className="mt-4 text-lg leading-relaxed text-bark/80">{b.about}</p>
            <p className="mt-4 font-semibold text-forest">Zones : {b.zones}</p>
          </div>
        </section>
      </main>

      <footer className="bg-forest text-white">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-4 py-10 text-center">
          <img src={b.logo || '/logo.png'} alt="" className="h-14 w-auto rounded-2xl bg-white px-3 py-2" />
          <p className="font-display text-2xl font-black">{b.name}</p>
          <a href={`tel:+${b.whatsapp}`} className="text-xl font-bold text-sun">{b.phoneDisplay}</a>
          <p className="text-sm text-white/70">{b.tagline}</p>
          <InstallButton label="Installer l’application" className="mt-3 rounded-full bg-sun px-6 py-3 font-bold text-bark" />
        </div>
      </footer>

      <a href={wa} aria-label="Nous écrire sur WhatsApp" className="fixed bottom-24 right-4 z-20 hidden h-12 w-12 place-items-center rounded-full bg-[#25D366] text-white shadow-lg md:grid">
        <svg viewBox="0 0 24 24" className="h-6 w-6" fill="currentColor"><path d="M12 2a10 10 0 0 0-8.6 15L2 22l5.1-1.3A10 10 0 1 0 12 2Zm5.2 14.1c-.2.6-1.300 1.200-1.800 1.200-.5.1-1 .2-3.300-.7-2.800-1.200-4.500-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.8 2c.1.2.1.300 0 .5l-.3.400-.4.400c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2.100 1.300 2.400 1.500.3.100.4.100.6-.1l.8-1c.2-.3.400-.2.600-.1l1.900.9c.3.100.5.200.5.300.1.200.1.700-.1 1.300Z"/></svg>
      </a>
    </>
  );
}
