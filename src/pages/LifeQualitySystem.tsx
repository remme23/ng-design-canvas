import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

const principles = [
  {
    n: "01",
    t: "Comfort termico",
    d: "Involucro ad alta efficienza, ponti termici risolti, ventilazione meccanica controllata. La temperatura interna resta stabile in ogni stagione.",
  },
  {
    n: "02",
    t: "Qualità dell'aria",
    d: "Materiali certificati a basse emissioni, filtraggio dell'aria immessa, monitoraggio CO₂. Spazi sani per chi li abita ogni giorno.",
  },
  {
    n: "03",
    t: "Luce naturale",
    d: "Studio dell'orientamento solare, schermature dinamiche, illuminazione progettata. La luce diventa elemento architettonico.",
  },
  {
    n: "04",
    t: "Acustica progettata",
    d: "Isolamento dai rumori esterni e correzione acustica interna. Il silenzio come lusso quotidiano.",
  },
  {
    n: "05",
    t: "Domotica integrata",
    d: "Climatizzazione, illuminazione, sicurezza e gestione energetica controllabili da un'unica interfaccia. Tecnologia che semplifica.",
  },
  {
    n: "06",
    t: "Materiali certificati",
    d: "Finiture e componenti scelti per durabilità, sostenibilità e tracciabilità delle filiere. Bellezza che dura nel tempo.",
  },
];

export default function LifeQualitySystem() {
  const lqsProjects = projects.filter((p) => p.lifeQuality);

  return (
    <>
      <section className="pt-40 pb-24 container-editorial">
        <Reveal>
          <div className="section-number mb-8">Marchio · NG Studio</div>
        </Reveal>
        <Reveal>
          <h1 className="display-xl text-[clamp(3rem,9vw,9rem)] font-light leading-[0.9]">
            Life Quality
            <br />
            <span className="gold-italic">System</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-3xl text-lg md:text-xl text-foreground/80 leading-relaxed">
            Un sistema progettuale integrato — sviluppato dallo Studio NG — che eleva ogni opera
            al massimo standard di qualità abitativa. Sei principi, applicati dal concept alla
            consegna chiavi in mano.
          </p>
        </Reveal>
      </section>

      {/* PRINCIPI */}
      <section className="py-24 bg-surface border-y border-border/50">
        <div className="container-editorial">
          <Reveal>
            <h2 className="font-display text-4xl md:text-6xl font-light mb-16 max-w-3xl">
              Sei <span className="gold-italic">principi</span>, una sola promessa
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
            {principles.map((p, i) => (
              <Reveal key={p.n} delay={i * 0.08}>
                <div>
                  <div className="text-xs text-gold font-mono mb-4">{p.n}</div>
                  <h3 className="font-display text-2xl md:text-3xl font-light mb-3">{p.t}</h3>
                  <p className="text-sm text-foreground/70 leading-relaxed">{p.d}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* OPERE LQS */}
      <section className="py-24 md:py-32 container-editorial">
        <Reveal>
          <div className="section-number mb-6">Opere certificate LQS</div>
        </Reveal>
        <Reveal>
          <h2 className="font-display text-4xl md:text-6xl font-light mb-16">
            Dove abita la <span className="gold-italic">qualità</span>
          </h2>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-8">
          {lqsProjects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 0.1}>
              <Link to={`/opera/${p.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden bg-surface mb-4">
                  <img
                    src={p.posterUrl}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 text-[10px] uppercase tracking-[0.3em] px-2.5 py-1 bg-gold/20 backdrop-blur text-gold border border-gold/30">
                    LQS
                  </div>
                </div>
                <h3 className="font-display text-xl md:text-2xl group-hover:text-gold transition-colors">
                  {p.shortTitle}
                </h3>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mt-2">
                  {p.location}
                </p>
              </Link>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div className="mt-16 text-center">
            <Link
              to="/contatti"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-gold hover-underline"
            >
              Progetta con noi <ArrowRight size={16} />
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
