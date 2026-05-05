import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * Video con lazy loading via IntersectionObserver.
 * - Mostra subito il poster sfocato + skeleton shimmer
 * - Carica e avvia il video solo quando entra nel viewport
 * - Lo skeleton scompare con fade quando il video è davvero pronto (canplay)
 */
export default function LazyVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.disconnect();
          }
        });
      },
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    el.src = src;
    el.load();
    el.play().catch(() => {
      /* autoplay può fallire, niente di grave */
    });
  }, [inView, src]);

  return (
    <>
      <video
        ref={ref}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        onCanPlay={() => setReady(true)}
        className={className}
      />
      {/* Skeleton sfumato + shimmer, fade-out quando il video è pronto */}
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        {/* gradient base coerente col tema */}
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface" />
        {/* shimmer sweep */}
        <div className="absolute inset-0 video-shimmer" />
      </div>
    </>
  );
}
