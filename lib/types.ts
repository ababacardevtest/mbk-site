export type Service = { id: string; name: string; price: number; desc: string; image: string };
export type Transport = { id: string; label: string; price: number };
export type Business = {
  logo: string; name: string; tagline: string; whatsapp: string; phoneDisplay: string;
  heroTitle: string; heroText: string; heroImage: string;
  aboutTitle: string; about: string; aboutImage: string; zones: string;
};
export type Content = { business: Business; services: Service[]; transport: Transport[] };
