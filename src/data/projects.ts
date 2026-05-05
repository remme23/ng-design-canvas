// Dati progetti NG Studio Associato — estratti dal sito originale
export type Project = {
  slug: string;
  title: string;
  shortTitle: string;
  category: string;
  year: string;
  status: string;
  client: string;
  location: string;
  importo?: string;
  description: string;
  // Stock architecture footage from Pexels (free, royalty-free)
  videoUrl: string;
  posterUrl: string;
  gallery: string[];
  lifeQuality: boolean;
};

// Video AI generati per ogni progetto
import villaNeolibertyAsset from "@/assets/video-villa-neoliberty.mp4.asset.json";
import sedeAmatAsset from "@/assets/video-sede-amat.mp4.asset.json";
import complessoBardelliniAsset from "@/assets/video-complesso-bardellini.mp4.asset.json";
import edificioCommercialeAsset from "@/assets/video-edificio-commerciale.mp4.asset.json";
import atticoPortoMaurizioAsset from "@/assets/video-attico-porto-maurizio.mp4.asset.json";
import palazzoLavagnaAsset from "@/assets/video-palazzo-lavagna.mp4.asset.json";
import areaExNovaAsset from "@/assets/video-area-ex-nova.mp4.asset.json";
import complessoPontedassioAsset from "@/assets/video-complesso-pontedassio.mp4.asset.json";
import alloggioBardelliniAsset from "@/assets/video-alloggio-bardellini.mp4.asset.json";
import heroAsset from "@/assets/video-hero.mp4.asset.json";

export const AI_VIDEOS = {
  villaNeoliberty: villaNeolibertyAsset.url,
  sedeAmat: sedeAmatAsset.url,
  complessoBardellini: complessoBardelliniAsset.url,
  edificioCommerciale: edificioCommercialeAsset.url,
  atticoPortoMaurizio: atticoPortoMaurizioAsset.url,
  palazzoLavagna: palazzoLavagnaAsset.url,
  areaExNova: areaExNovaAsset.url,
  complessoPontedassio: complessoPontedassioAsset.url,
  alloggioBardellini: alloggioBardelliniAsset.url,
};

// Hero video AI generato (coerente con il resto del sito)
const VIDEOS = {
  hero: heroAsset.url,
};

// Frame estratti dai video AI - garantiscono coerenza visiva con il video
const FRAME = (slug: string, i: 1 | 2 | 3 | 4) => `/frames/${slug}-${i}.jpg`;

const IMG = (q: string) =>
  `https://images.unsplash.com/photo-${q}?auto=format&fit=crop&w=1920&q=80`;

export const projects: Project[] = [
  {
    slug: "villa-neoliberty-capo-berta",
    title: "Villa Neoliberty — Capo Berta, Imperia",
    shortTitle: "Villa Neoliberty",
    category: "Architettura residenziale",
    year: "In costruzione",
    status: "In costruzione",
    client: "Privato",
    location: "Capo Berta, Imperia",
    description:
      "Nuova costruzione in zona Capo Berta ad Imperia, in attuazione a Strumento Urbanistico Attuativo. L'area, soggetta a vincolo paesaggistico, ha richiesto un'attenta integrazione tra linguaggio neoliberty e tecnologie contemporanee. La Villa adotta il sistema Life Quality System, marchio dello Studio per il benessere abitativo.",
    videoUrl: AI_VIDEOS.villaNeoliberty,
    posterUrl: FRAME("villa-neoliberty", 1),
    gallery: [
      FRAME("villa-neoliberty", 1),
      FRAME("villa-neoliberty", 2),
      FRAME("villa-neoliberty", 3),
      FRAME("villa-neoliberty", 4),
    ],
    lifeQuality: true,
  },
  {
    slug: "sede-amat-imperia",
    title: "Nuova sede AMAT S.p.A. — Imperia",
    shortTitle: "Sede AMAT",
    category: "Architettura direzionale",
    year: "2011",
    status: "Realizzato",
    client: "AMAT S.p.A. (Azienda acqua potabile)",
    location: "Imperia",
    importo: "€ 2.856.000",
    description:
      "La realizzazione della nuova sede dell'azienda fonda la sua logica attuativa nella volontà di centralizzare le varie strutture prima sparse sul territorio, ottimizzando la gestione operativa. Categoria prevalente OG1, importo lavori 2.856.000 €. Edificio realizzato nel 2011.",
    videoUrl: AI_VIDEOS.sedeAmat,
    posterUrl: FRAME("sede-amat", 1),
    gallery: [
      FRAME("sede-amat", 1),
      FRAME("sede-amat", 2),
      FRAME("sede-amat", 3),
      FRAME("sede-amat", 4),
    ],
    lifeQuality: false,
  },
  {
    slug: "complesso-residenziale-bardellini",
    title: "Complesso residenziale — Bardellini, Imperia",
    shortTitle: "Complesso Bardellini",
    category: "Architettura residenziale",
    year: "In costruzione",
    status: "In costruzione",
    client: "Società di Costruzioni",
    location: "Bardellini, Imperia",
    description:
      "Realizzazione di nuove unità immobiliari in zona Bardellini ad Imperia, in attuazione parziale di Strumento Urbanistico Attuativo di variante. Vincolo paesaggistico ai sensi del D.Lgs. 42/2004. Progetto coordinato dallo Studio in sinergia con OPERA s.r.l.",
    videoUrl: AI_VIDEOS.complessoBardellini,
    posterUrl: FRAME("complesso-bardellini", 1),
    gallery: [
      FRAME("complesso-bardellini", 1),
      FRAME("complesso-bardellini", 2),
      FRAME("complesso-bardellini", 3),
      FRAME("complesso-bardellini", 4),
    ],
    lifeQuality: false,
  },
  {
    slug: "edificio-commerciale-direzionale-imperia",
    title: "Edificio commerciale e direzionale — Imperia",
    shortTitle: "Edificio commerciale",
    category: "Architettura commerciale",
    year: "Recente",
    status: "Realizzato",
    client: "Privato",
    location: "Imperia",
    description:
      "Edificio per attività commerciali e direzionali ad Imperia, progettato secondo i principi del Life Quality System. Studio dell'inserimento ambientale tramite fotomontaggi e modellazione tridimensionale, con attenzione a flessibilità degli spazi e sostenibilità.",
    videoUrl: AI_VIDEOS.edificioCommerciale,
    posterUrl: FRAME("edificio-commerciale", 1),
    gallery: [
      FRAME("edificio-commerciale", 1),
      FRAME("edificio-commerciale", 2),
      FRAME("edificio-commerciale", 3),
      FRAME("edificio-commerciale", 4),
    ],
    lifeQuality: true,
  },
  {
    slug: "attico-porto-maurizio",
    title: "Attico — Porto Maurizio, Imperia",
    shortTitle: "Attico Porto Maurizio",
    category: "Interior · Residenziale",
    year: "Recente",
    status: "Realizzato",
    client: "Privato",
    location: "Porto Maurizio, Imperia",
    description:
      "Ristrutturazione integrale di attico panoramico nel centro storico di Porto Maurizio. Applicazione completa del Life Quality System con domotica, isolamento avanzato e illuminazione progettata. Reinterpretazione contemporanea dello spazio storico.",
    videoUrl: AI_VIDEOS.atticoPortoMaurizio,
    posterUrl: FRAME("attico-porto-maurizio", 1),
    gallery: [
      FRAME("attico-porto-maurizio", 1),
      FRAME("attico-porto-maurizio", 2),
      FRAME("attico-porto-maurizio", 3),
      FRAME("attico-porto-maurizio", 4),
    ],
    lifeQuality: true,
  },
  {
    slug: "palazzo-lavagna-restauro",
    title: "Palazzo Lavagna — Restauro alloggio piano terra",
    shortTitle: "Palazzo Lavagna",
    category: "Restauro conservativo",
    year: "Recente",
    status: "Realizzato",
    client: "Privato",
    location: "Imperia",
    description:
      "Restauro conservativo di alloggio al piano terra di Palazzo Lavagna. Recupero degli elementi storici originali — volte, pavimenti, decori — coordinato con interventi di adeguamento impiantistico e strutturale.",
    videoUrl: AI_VIDEOS.palazzoLavagna,
    posterUrl: FRAME("palazzo-lavagna", 1),
    gallery: [
      FRAME("palazzo-lavagna", 1),
      FRAME("palazzo-lavagna", 2),
      FRAME("palazzo-lavagna", 3),
      FRAME("palazzo-lavagna", 4),
    ],
    lifeQuality: false,
  },
  {
    slug: "ristrutturazione-area-ex-nova-imperia",
    title: "Ristrutturazione urbanistica — Area Ex-Nova, Imperia",
    shortTitle: "Area Ex-Nova",
    category: "Masterplan urbano",
    year: "Progetto",
    status: "Progetto",
    client: "Pubblico-Privato",
    location: "Imperia",
    description:
      "Ristrutturazione urbanistica dell'area Ex-Nova Imperia. Masterplan di rigenerazione che reinterpreta il tessuto industriale dismesso con nuove funzioni residenziali, commerciali e spazi pubblici a servizio della città.",
    videoUrl: AI_VIDEOS.areaExNova,
    posterUrl: FRAME("area-ex-nova", 1),
    gallery: [
      FRAME("area-ex-nova", 1),
      FRAME("area-ex-nova", 2),
      FRAME("area-ex-nova", 3),
      FRAME("area-ex-nova", 4),
    ],
    lifeQuality: false,
  },
  {
    slug: "complesso-produttivo-pontedassio",
    title: "Complesso produttivo — Pontedassio",
    shortTitle: "Complesso Pontedassio",
    category: "Architettura industriale",
    year: "In progetto",
    status: "In progetto",
    client: "Comune di Pontedassio",
    location: "Pontedassio (IM)",
    description:
      "Realizzazione di complesso produttivo nel Comune di Pontedassio. Progetto incentrato su efficienza distributiva, integrazione paesaggistica e flessibilità degli spazi produttivi.",
    videoUrl: AI_VIDEOS.complessoPontedassio,
    posterUrl: FRAME("complesso-pontedassio", 1),
    gallery: [
      FRAME("complesso-pontedassio", 1),
      FRAME("complesso-pontedassio", 2),
      FRAME("complesso-pontedassio", 3),
      FRAME("complesso-pontedassio", 4),
    ],
    lifeQuality: false,
  },
  {
    slug: "nuovo-alloggio-bardellini",
    title: "Nuovo alloggio — Bardellini, Imperia",
    shortTitle: "Alloggio Bardellini",
    category: "Architettura residenziale",
    year: "Recente",
    status: "Realizzato",
    client: "Privato",
    location: "Bardellini, Imperia",
    description:
      "Nuovo alloggio progettato secondo i principi del Life Quality System: ottimizzazione termica, ventilazione naturale, materiali certificati, domotica integrata. Inserimento paesaggistico curato con orientamento solare ottimale.",
    videoUrl: AI_VIDEOS.alloggioBardellini,
    posterUrl: FRAME("alloggio-bardellini", 1),
    gallery: [
      FRAME("alloggio-bardellini", 1),
      FRAME("alloggio-bardellini", 2),
      FRAME("alloggio-bardellini", 3),
      FRAME("alloggio-bardellini", 4),
    ],
    lifeQuality: true,
  },
];

export const featuredProjects = [
  projects.find((p) => p.slug === "villa-neoliberty-capo-berta")!,
  projects.find((p) => p.slug === "sede-amat-imperia")!,
  projects.find((p) => p.slug === "complesso-residenziale-bardellini")!,
];

export const HERO_VIDEO = VIDEOS.hero;
export const HERO_POSTER = "/frames/hero.jpg";

export function getProjectBySlug(slug: string) {
  return projects.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const idx = projects.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  const prev = idx > 0 ? projects[idx - 1] : projects[projects.length - 1];
  const next = idx < projects.length - 1 ? projects[idx + 1] : projects[0];
  return { prev, next };
}
