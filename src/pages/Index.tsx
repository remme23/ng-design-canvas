import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowDown, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { featuredProjects, HERO_VIDEO, HERO_POSTER } from "@/data/projects";

export default function Index() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <>
      {/* HERO */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div
          style={{ scale: heroScale, opacity: heroOpacity }}
          className="absolute inset-0"
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={HERO_POSTER}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={HERO_VIDEO} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/70 via-background/40 to-background" />
          <div className="absolute inset-0 bg-background/30" />
        </motion.div>

        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 h-full flex flex-col justify-between container-editorial pt-32 pb-12"
        >
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="flex justify-center"
          >
            <span className="text-xs uppercase tracking-[0.4em] text-gold">
              Imperia · Liguria
            </span>
          </motion.div>

          <div className="flex flex-col items-center text-center">
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.6 }}
              className="display-xl text-foreground"
            >
              <motion.span
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 0.7, ease: [0.65, 0, 0.35, 1] }}
                className="block text-[clamp(3rem,11vw,11rem)] leading-[0.9] font-light tracking-tight"
              >
                ARCHITETTURA
              </motion.span>
              <motion.span
                initial={{ y: 60, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 1.2, delay: 1, ease: [0.65, 0, 0.35, 1] }}
                className="gold-italic block text-[clamp(2.2rem,9vw,9rem)] leading-[1] -mt-2 md:-mt-4"
              >
                e ingegneria
              </motion.span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.4 }}
              className="mt-10 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed"
            >
              Dal 2000 trasformiamo visioni in opere che resistono al tempo.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/60">
              Scorri
            </span>
            <div className="relative h-16 w-px bg-foreground/20 overflow-hidden">
              <motion.div
                animate={{ y: [-64, 64] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-px h-8 bg-gold"
              />
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* MARQUEE */}
      <div className="relative py-10 border-y border-border/50 overflow-hidden bg-background">
        <div className="flex whitespace-nowrap animate-marquee gap-16">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 shrink-0">
              {[
                "Architettura",
                "Ingegneria strutturale",
                "Restauro",
                "Direzione lavori",
                "Life Quality System",
                "Progettazione 3D",
                "Interior",
                "Masterplan",
              ].map((w) => (
                <span
                  key={w}
                  className="font-display italic text-3xl md:text-5xl text-foreground/30"
                >
                  {w} <span className="text-gold not-italic">·</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* 001 — MANIFESTO */}
      <section className="py-32 md:py-48 container-editorial">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-3">
            <Reveal>
              <div className="section-number">001 / Manifesto</div>
            </Reveal>
          </div>
          <div className="md:col-span-9">
            <Reveal>
              <h2 className="display-xl text-[clamp(2.5rem,6vw,5.5rem)] mb-12 font-light">
                Ogni opera è una <span className="gold-italic">promessa</span> al territorio
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="text-lg md:text-xl leading-relaxed text-foreground/85 max-w-3xl mb-6">
                Lo Studio Associato di Architettura ed Ingegneria <strong className="text-gold font-medium">NG</strong> nasce
                come associazione professionale nel gennaio del <strong className="text-foreground">2000</strong> dall'incontro
                di due professionisti di differenti formazioni e specifiche competenze: l'Architetto{" "}
                <strong className="text-foreground">Riccardo Torello</strong> e l'Ingegner{" "}
                <strong className="text-foreground">Gian Claudio Papone</strong>.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-base md:text-lg leading-relaxed text-foreground/70 max-w-3xl">
                Entrambi giovani e fortemente motivati, legati da una profonda amicizia, decidono
                di intraprendere un percorso comune finalizzato all'ottimizzazione, coordinazione e
                sinergia delle rispettive competenze nell'ottica di garantire prestazioni
                professionali di elevato standard qualitativo.
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <Link
                to="/studio"
                className="inline-flex items-center gap-3 mt-12 text-sm uppercase tracking-[0.25em] text-gold hover-underline"
              >
                Lo Studio
                <ArrowRight size={16} />
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 002 — COMPETENZE */}
      <section className="py-32 md:py-48 bg-surface border-y border-border/50">
        <div className="container-editorial">
          <Reveal>
            <div className="section-number mb-6">002 / Competenze</div>
          </Reveal>
          <Reveal>
            <h2 className="display-xl text-[clamp(2.5rem,7vw,7rem)] mb-20 font-light max-w-5xl">
              Progettazione <span className="gold-italic">integrata</span>, dal calcolo strutturale al rendering
            </h2>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-2 max-w-5xl">
            {[
              { n: "01", t: "Architettura residenziale & commerciale" },
              { n: "02", t: "Ingegneria strutturale & calcolo" },
              { n: "03", t: "Restauro conservativo" },
              { n: "04", t: "Interior design & Life Quality System" },
              { n: "05", t: "Progettazione tridimensionale & rendering" },
              { n: "06", t: "Direzione lavori & sicurezza" },
            ].map((it, i) => (
              <Reveal key={it.n} delay={i * 0.05}>
                <div className="flex items-baseline gap-6 py-6 border-b border-border/40 group">
                  <span className="text-xs text-gold font-mono">{it.n}</span>
                  <span className="font-display text-2xl md:text-3xl group-hover:text-gold transition-colors">
                    {it.t}
                  </span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 003 — OPERA (featured) */}
      <section className="py-32 md:py-48 container-editorial">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <Reveal>
              <div className="section-number mb-6">003 / Opera</div>
            </Reveal>
            <Reveal>
              <h2 className="display-xl text-[clamp(2.5rem,7vw,7rem)] font-light max-w-3xl">
                Opere <span className="gold-italic">selezionate</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <Link
              to="/opera"
              className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.25em] text-foreground/80 hover:text-gold transition-colors hover-underline"
            >
              Tutte le opere
              <ArrowRight size={16} />
            </Link>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-12 gap-8">
          {featuredProjects.map((p, idx) => (
            <Reveal
              key={p.slug}
              delay={idx * 0.15}
              className={
                idx === 0
                  ? "md:col-span-7"
                  : idx === 1
                  ? "md:col-span-5 md:mt-32"
                  : "md:col-span-8 md:col-start-3"
              }
            >
              <Link to={`/opera/${p.slug}`} className="group block">
                <div className="relative overflow-hidden aspect-[4/5] mb-6 bg-surface">
                  <img
                    src={p.posterUrl}
                    alt={p.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1500ms] group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-700" />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <span className="text-xs uppercase tracking-[0.25em] text-foreground">
                      {p.category}
                    </span>
                    <ArrowRight
                      size={20}
                      className="text-gold opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-500"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-2xl md:text-3xl group-hover:text-gold transition-colors">
                    {p.shortTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {p.location} — {p.year}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 004 — NUMERI */}
      <section className="py-32 md:py-48 bg-surface border-y border-border/50">
        <div className="container-editorial">
          <Reveal>
            <div className="section-number mb-16 text-center">004 / Misura</div>
          </Reveal>
          <div className="grid md:grid-cols-4 gap-12">
            {[
              { n: "25+", l: "Anni di attività" },
              { n: "100+", l: "Opere progettate" },
              { n: "2", l: "Studi associati" },
              { n: "1", l: "Marchio LQS" },
            ].map((it, i) => (
              <Reveal key={it.l} delay={i * 0.1} className="text-center">
                <div className="font-display text-7xl md:text-8xl font-light text-gold mb-3">
                  {it.n}
                </div>
                <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                  {it.l}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 005 — CONTATTI CTA */}
      <section className="py-32 md:py-48 container-editorial">
        <div className="text-center max-w-4xl mx-auto">
          <Reveal>
            <div className="section-number mb-8">005 / Inizia</div>
          </Reveal>
          <Reveal>
            <h2 className="display-xl text-[clamp(3rem,9vw,9rem)] font-light leading-[0.95]">
              Costruiamo
              <br />
              <span className="gold-italic">insieme</span>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-12 text-lg text-foreground/75 max-w-xl mx-auto">
              Ogni grande opera inizia da una conversazione. Raccontaci il tuo progetto.
            </p>
          </Reveal>
          <Reveal delay={0.3}>
            <Link
              to="/contatti"
              className="inline-flex items-center gap-4 mt-12 px-8 py-4 border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-500 group"
            >
              <span className="text-xs uppercase tracking-[0.3em]">Parlaci del tuo progetto</span>
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
