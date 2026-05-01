import { Link } from "react-router-dom";
import Reveal from "@/components/Reveal";
import { ArrowRight, Download } from "lucide-react";

export default function Studio() {
  return (
    <>
      <section className="pt-40 pb-24 container-editorial">
        <Reveal>
          <div className="section-number mb-8">Studio Associato NG</div>
        </Reveal>
        <Reveal>
          <h1 className="display-xl text-[clamp(3rem,9vw,9rem)] font-light leading-[0.9]">
            Due <span className="gold-italic">visioni</span>,
            <br />
            un'unica firma
          </h1>
        </Reveal>
      </section>

      <section className="pb-24 container-editorial">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <Reveal>
              <div className="aspect-[3/4] overflow-hidden bg-surface">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80"
                  alt="Studio NG — interno"
                  className="w-full h-full object-cover"
                />
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-7 md:pt-12">
            <Reveal>
              <p className="text-lg md:text-xl leading-relaxed text-foreground/85 mb-6">
                Lo Studio Associato di Architettura ed Ingegneria{" "}
                <span className="text-gold">NG</span> nasce come associazione professionale nel
                gennaio del 2000 dall'incontro di due professionisti di differenti formazioni e
                specifiche competenze: l'Architetto Riccardo Torello e l'Ingegner Gian Claudio
                Papone.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-base md:text-lg leading-relaxed text-foreground/70 mb-6">
                Entrambi giovani e fortemente motivati, legati da una profonda amicizia, decidono
                di intraprendere un percorso comune finalizzato all'ottimizzazione, coordinazione
                e sinergia delle rispettive specifiche competenze nell'ottica di garantire
                prestazioni professionali di elevato standard qualitativo.
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-base md:text-lg leading-relaxed text-foreground/70 mb-6">
                Fin dagli esordi, lo Studio si dota delle più moderne tecnologie informatiche che
                permettono di assistere l'intero ciclo progettuale ed esecutivo — dal calcolo
                strutturale alla progettazione tridimensionale — in grado di prefigurare l'opera,
                studiandone il suo inserimento ambientale attraverso fotomontaggi ed animazioni
                virtuali.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-base md:text-lg leading-relaxed text-foreground/70 mb-10">
                Attualmente lo Studio opera principalmente nel campo delle nuove costruzioni,
                delle ristrutturazioni e del risanamento statico conservativo, sia in ambito
                pubblico che privato. Dal <span className="text-gold">2009</span>, nell'ottica di
                offrire all'utente finale un'assistenza a tutto tondo — dall'idea al manufatto
                abitabile — lo Studio si avvale di una specifica struttura,{" "}
                <Link to="/opera" className="text-gold hover-underline">
                  OPERA
                </Link>
                , dedicata alla gestione dei vari aspetti del processo costruttivo.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <a
                href="http://www.ngstudioassociato.com/wp-content/uploads/2015/02/CURRICULUM-VITAE-20151.pdf"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-3 text-xs uppercase tracking-[0.25em] text-gold hover-underline"
              >
                <Download size={16} /> Scarica il Curriculum
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* I FONDATORI */}
      <section className="py-24 bg-surface border-y border-border/50">
        <div className="container-editorial">
          <Reveal>
            <div className="section-number mb-12">I fondatori</div>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-16">
            <Reveal>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Architetto</div>
                <h3 className="font-display text-4xl md:text-5xl font-light mb-2">
                  Riccardo <span className="gold-italic">Torello</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Nato a Imperia il 01/01/1968
                </p>
                <p className="text-base text-foreground/75 leading-relaxed">
                  Architetto specializzato in progettazione residenziale e commerciale, restauro
                  conservativo e interior design. Cura l'inserimento paesaggistico delle opere
                  attraverso modellazione tridimensionale e studio dei dettagli costruttivi.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.15}>
              <div>
                <div className="text-xs uppercase tracking-[0.3em] text-gold mb-4">Ingegnere</div>
                <h3 className="font-display text-4xl md:text-5xl font-light mb-2">
                  Gian Claudio <span className="gold-italic">Papone</span>
                </h3>
                <p className="text-sm text-muted-foreground mb-6">Imperia</p>
                <p className="text-base text-foreground/75 leading-relaxed">
                  Ingegnere strutturale e direttore lavori. Coordina la fase esecutiva delle
                  opere, dal calcolo statico alla sicurezza in cantiere, garantendo coerenza tra
                  visione architettonica e affidabilità costruttiva.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 container-editorial text-center">
        <Reveal>
          <Link
            to="/opera"
            className="inline-flex items-center gap-4 text-sm uppercase tracking-[0.3em] text-gold hover-underline"
          >
            Vedi le opere <ArrowRight size={16} />
          </Link>
        </Reveal>
      </section>
    </>
  );
}
