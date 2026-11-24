import type { Content } from './types';

export const defaultContent: Content = {
  business: {
    logo: '/logo.png',
    name: 'Keer Maam Birabar',
    tagline: 'Beauté · Bien-être · Détente à domicile',
    whatsapp: '221787359292',
    phoneDisplay: '78 735 92 92',
    heroTitle: 'Le bien-être vient jusqu’à votre porte',
    heroText: 'Damp traditionnel, ventouses et soins du visage, réalisés chez vous dans le calme et le confort de votre maison.',
    heroImage: '',
    aboutTitle: 'Votre beauté, notre priorité',
    about: 'Keer Maam Birabar vous accueille à domicile pour des moments de détente simples et soignés. Choisissez vos soins, indiquez votre adresse, et nous venons à vous avec tout le matériel.',
    aboutImage: '',
    zones: 'Pikine, Guédiawaye et toute la région de Dakar',
  },
  services: [
    { id: 'damp', name: 'Damp traditionnel', price: 10000, desc: 'Massage aux compresses chaudes d’herbes, pour relâcher le dos et les tensions.', image: '' },
    { id: 'ventouse', name: 'Ventouse', price: 10000, desc: 'Séance de ventouses pour une détente profonde du dos.', image: '' },
    { id: 'visage', name: 'Soins du visage', price: 10000, desc: 'Nettoyage et masque pour un teint frais et lumineux.', image: '' },
  ],
  transport: [
    { id: 'pikine', label: 'Pikine et Guédiawaye', price: 5000 },
    { id: 'hors', label: 'Hors Pikine et Guédiawaye', price: 10000 },
  ],
};
