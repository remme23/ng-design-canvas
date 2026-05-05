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

// Hero stock fallback (Pexels)
const VIDEOS = {
  cityArch: "https://videos.pexels.com/video-files/3214448/3214448-uhd_2560_1440_25fps.mp4",
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
    posterUrl: IMG("1497366216548-37526070297c"),
    gallery: [
      IMG("1497366216548-37526070297c"),
      IMG("1486325212027-8081e485255e"),
      IMG("1497366754035-f200968a6e72"),
      IMG("1551038247-3d9af20df552"),
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
    posterUrl: IMG("1545324418-cc1a3fa10c00"),
    gallery: [
      IMG("1545324418-cc1a3fa10c00"),
      IMG("1503387762-592deb58ef4e"),
      IMG("1597047084897-51e81819a499"),
      IMG("1486406146926-c627a92ad1ab"),
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
    posterUrl: IMG("1486406146926-c627a92ad1ab"),
    gallery: [
      IMG("1486406146926-c627a92ad1ab"),
      IMG("1497366811353-6870744d04b2"),
      IMG("1503387762-592deb58ef4e"),
      IMG("1582407947304-fd86f028f716"),
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
    posterUrl: IMG("1502672260266-1c1ef2d93688"),
    gallery: [
      IMG("1502672260266-1c1ef2d93688"),
      IMG("1560448204-e02f11c3d0e2"),
      IMG("1505691938895-1758d7feb511"),
      IMG("1493809842364-78817add7ffb"),
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
    posterUrl: IMG("1513519245088-0e12902e5a38"),
    gallery: [
      IMG("1513519245088-0e12902e5a38"),
      IMG("1448630360428-65456885c650"),
      IMG("1505873242700-f289a29e1e0f"),
      IMG("1519677100203-a0e668c92439"),
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
    posterUrl: IMG("1487958449943-2429e8be8625"),
    gallery: [
      IMG("1487958449943-2429e8be8625"),
      IMG("1496564203457-11990fbac01b"),
      IMG("1518709268805-4e9042af2176"),
      IMG("1581094288338-2314dddb7ece"),
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
    posterUrl: IMG("1565008447742-97f6f38c985c"),
    gallery: [
      IMG("1565008447742-97f6f38c985c"),
      IMG("1565538810643-b5bdb714032a"),
      IMG("1581092160562-40aa08e78837"),
      IMG("1597047084897-51e81819a499"),
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
    posterUrl: IMG("1600607687939-ce8a6c25118c"),
    gallery: [
      IMG("1600607687939-ce8a6c25118c"),
      IMG("1600566753051-6057eed29f7d"),
      IMG("1600585152915-d208bec867a1"),
      IMG("1600566752355-35792bedcfea"),
    ],
    lifeQuality: true,
  },
];

export const featuredProjects = [
  projects.find((p) => p.slug === "villa-neoliberty-capo-berta")!,
  projects.find((p) => p.slug === "sede-amat-imperia")!,
  projects.find((p) => p.slug === "complesso-residenziale-bardellini")!,
];

export const HERO_VIDEO = VIDEOS.cityArch;
export const HERO_POSTER = IMG("1486325212027-8081e485255e");

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
