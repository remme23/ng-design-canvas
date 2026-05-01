import Reveal from "@/components/Reveal";

const partners = [
  {
    title: "OPERA S.r.l.",
    role: "Costruzione · Direzione cantiere",
    description:
      "Struttura dedicata, fondata nel 2009, alla gestione operativa dei processi costruttivi. Cura la fase esecutiva fino alla consegna chiavi in mano, garantendo continuità tra progetto e realizzazione.",
  },
  {
    title: "Studi di ingegneria specializzati",
    role: "Strutture · Geotecnica · Impianti",
    description:
      "Collaborazioni continuative con consulenti specialisti per le opere strutturali complesse, le verifiche geologiche e la progettazione impiantistica avanzata, in ottica Life Quality System.",
  },
  {
    title: "Imprese di costruzione locali",
    role: "Realizzazione · Maestranze",
    description:
      "Rete consolidata di imprese e maestranze del territorio ligure, selezionate per affidabilità, qualità del lavoro e capacità di interpretare i dettagli costruttivi richiesti.",
  },
  {
    title: "Studi di restauro & conservazione",
    role: "Patrimonio · Vincoli paesaggistici",
    description:
      "Partner specializzati nelle pratiche autorizzative su immobili sottoposti a vincolo, per il recupero di edifici storici come Palazzo Lavagna e altri interventi conservativi nel centro di Imperia.",
  },
];

export default function Partnership() {
  return (
    <>
      <section className="pt-40 pb-24 container-editorial">
        <Reveal>
          <div className="section-number mb-8">Partnership</div>
        </Reveal>
        <Reveal>
          <h1 className="display-xl text-[clamp(3rem,9vw,9rem)] font-light leading-[0.9]">
            Una rete che <span className="gold-italic">costruisce</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-3xl text-lg text-foreground/75 leading-relaxed">
            Le competenze professionali dello staff interno si affiancano a consolidate
            collaborazioni esterne per garantire la copertura dell'intero processo della
            costruzione sotto il profilo professionale.
          </p>
        </Reveal>
      </section>

      <section className="pb-32 container-editorial">
        <div className="grid md:grid-cols-2 gap-x-16 gap-y-2">
          {partners.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.1}>
              <div className="py-12 border-t border-border/50 group">
                <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">{p.role}</div>
                <h3 className="font-display text-3xl md:text-4xl font-light mb-4 group-hover:text-gold transition-colors">
                  {p.title}
                </h3>
                <p className="text-base text-foreground/70 leading-relaxed">{p.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
