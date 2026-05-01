import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { projects } from "@/data/projects";

export default function Opera() {
  return (
    <>
      <section className="pt-40 pb-16 container-editorial">
        <Reveal>
          <div className="section-number mb-8">Opera</div>
        </Reveal>
        <Reveal>
          <h1 className="display-xl text-[clamp(3rem,9vw,9rem)] font-light leading-[0.9]">
            Le nostre <span className="gold-italic">opere</span>
          </h1>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-10 max-w-3xl text-lg text-foreground/75 leading-relaxed">
            Una selezione di progetti realizzati e in corso. Architettura residenziale,
            commerciale, restauro conservativo e masterplan urbano — sempre coordinati
            internamente dallo Studio, dal concept alla chiave in mano.
          </p>
        </Reveal>
      </section>

      <section className="pb-32 container-editorial">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          {projects.map((p, i) => (
            <Reveal
              key={p.slug}
              delay={(i % 2) * 0.15}
              className={i % 3 === 0 ? "md:mt-0" : i % 3 === 1 ? "md:mt-24" : "md:mt-12"}
            >
              <Link to={`/opera/${p.slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[4/5] bg-surface mb-6">
                  <img
                    src={p.posterUrl}
                    alt={p.title}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                  <video
                    src={p.videoUrl}
                    poster={p.posterUrl}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
                  <div className="absolute top-6 left-6 flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 bg-background/60 backdrop-blur text-foreground border border-border/50">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {p.lifeQuality && (
                      <span className="text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 bg-gold/15 backdrop-blur text-gold border border-gold/30">
                        LQS
                      </span>
                    )}
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <span className="text-xs uppercase tracking-[0.25em] text-foreground/90">
                      {p.category}
                    </span>
                    <ArrowRight
                      size={20}
                      className="text-gold translate-x-0 group-hover:translate-x-1 transition-transform duration-500"
                    />
                  </div>
                </div>
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl md:text-3xl font-light group-hover:text-gold transition-colors">
                    {p.shortTitle}
                  </h3>
                  <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground shrink-0">
                    {p.year}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mt-2">{p.location}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
