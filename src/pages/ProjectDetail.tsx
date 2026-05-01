import { useRef } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Reveal from "@/components/Reveal";
import { getProjectBySlug, getAdjacentProjects } from "@/data/projects";

export default function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const project = slug ? getProjectBySlug(slug) : undefined;
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.2]);
  const titleY = useTransform(scrollYProgress, [0, 1], [0, 150]);

  if (!project) return <Navigate to="/opera" replace />;
  const { prev, next } = getAdjacentProjects(project.slug);

  return (
    <>
      {/* HERO con video del progetto */}
      <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
        <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            poster={project.posterUrl}
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src={project.videoUrl} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />
        </motion.div>

        <motion.div
          style={{ y: titleY }}
          className="relative z-10 h-full flex flex-col justify-end container-editorial pb-16"
        >
          <Link
            to="/opera"
            className="absolute top-32 left-6 md:left-12 lg:left-20 inline-flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-foreground/80 hover:text-gold transition-colors"
          >
            <ArrowLeft size={16} /> Tutte le opere
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-wrap items-center gap-3 mb-6"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-gold">{project.category}</span>
            {project.lifeQuality && (
              <span className="text-[10px] uppercase tracking-[0.3em] px-3 py-1.5 border border-gold/40 text-gold">
                Life Quality System
              </span>
            )}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.65, 0, 0.35, 1] }}
            className="display-xl text-[clamp(2.5rem,8vw,8rem)] font-light leading-[0.9] max-w-5xl"
          >
            {project.shortTitle}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-6 text-base md:text-lg text-foreground/75"
          >
            {project.location}
          </motion.p>
        </motion.div>
      </section>

      {/* SCHEDA TECNICA */}
      <section className="py-24 border-b border-border/50">
        <div className="container-editorial">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { l: "Committente", v: project.client },
              { l: "Stato", v: project.status },
              { l: "Anno", v: project.year },
              ...(project.importo ? [{ l: "Importo lavori", v: project.importo }] : [{ l: "Categoria", v: project.category }]),
            ].map((row, i) => (
              <Reveal key={row.l} delay={i * 0.08}>
                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-2">
                    {row.l}
                  </div>
                  <div className="font-display text-xl md:text-2xl font-light">{row.v}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* DESCRIZIONE */}
      <section className="py-24 md:py-40">
        <div className="container-editorial">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-3">
              <Reveal>
                <div className="section-number">001 / Concept</div>
              </Reveal>
            </div>
            <div className="md:col-span-9">
              <Reveal>
                <p className="text-xl md:text-2xl leading-relaxed text-foreground/85 font-display font-light max-w-4xl">
                  {project.description}
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* GALLERY scroll-reveal */}
      <section className="pb-24 md:pb-40">
        <div className="container-editorial space-y-12 md:space-y-32">
          {project.gallery.map((src, i) => (
            <Reveal key={src + i} delay={0} y={80}>
              <div
                className={
                  i % 3 === 0
                    ? "max-w-6xl mx-auto"
                    : i % 3 === 1
                    ? "max-w-3xl ml-0 md:ml-12"
                    : "max-w-4xl ml-auto"
                }
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <img
                    src={src}
                    alt={`${project.shortTitle} — vista ${i + 1}`}
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                </div>
                <div className="mt-4 flex justify-between items-baseline">
                  <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Tav. {String(i + 1).padStart(2, "0")} — {project.shortTitle}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-gold">
                    NG · Studio
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* NAV PROGETTI */}
      <section className="border-t border-border/50 py-16">
        <div className="container-editorial grid md:grid-cols-2 gap-8">
          {prev && (
            <Link
              to={`/opera/${prev.slug}`}
              className="group flex items-center gap-6 p-6 border border-border/50 hover:border-gold/50 transition-colors"
            >
              <ArrowLeft size={20} className="text-gold group-hover:-translate-x-1 transition-transform" />
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
                  Opera precedente
                </div>
                <div className="font-display text-xl group-hover:text-gold transition-colors">
                  {prev.shortTitle}
                </div>
              </div>
            </Link>
          )}
          {next && (
            <Link
              to={`/opera/${next.slug}`}
              className="group flex items-center gap-6 p-6 border border-border/50 hover:border-gold/50 transition-colors md:justify-end md:text-right"
            >
              <div className="md:order-1">
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-1">
                  Opera successiva
                </div>
                <div className="font-display text-xl group-hover:text-gold transition-colors">
                  {next.shortTitle}
                </div>
              </div>
              <ArrowRight size={20} className="text-gold md:order-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
