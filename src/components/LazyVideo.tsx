import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * Video con lazy loading e auto-pause:
 * - Mostra subito il poster + skeleton shimmer
 * - Carica il video solo quando entra nel viewport (margine 300px)
 * - Lo skeleton sparisce con fade quando il video è pronto (canplay)
 * - Mette in pausa quando esce dal viewport per liberare CPU/banda
 */
export default function LazyVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [inView, setInView] = useState(false);
  const [ready, setReady] = useState(false);

  // IntersectionObserver: traccia se il video è (anche solo parzialmente) visibile
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShouldLoad(true);
            setInView(true);
          } else {
            setInView(false);
          }
        });
      },
      { rootMargin: "300px", threshold: 0 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Quando deve caricare, imposta src e avvia
  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldLoad) return;
    if (el.src !== window.location.origin + src && !el.src.endsWith(src)) {
      el.src = src;
      el.load();
    }
  }, [shouldLoad, src]);

  // Play / pause in base alla visibilità
  useEffect(() => {
    const el = ref.current;
    if (!el || !shouldLoad) return;
    if (inView) {
      el.play().catch(() => {});
    } else {
      el.pause();
    }
  }, [inView, shouldLoad]);

  return (
    <>
      <video
        ref={ref}
        poster={poster}
        muted
        loop
        playsInline
        preload="none"
        disableRemotePlayback
        onCanPlay={() => setReady(true)}
        className={className}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-surface via-background to-surface" />
        <div className="absolute inset-0 video-shimmer" />
      </div>
    </>
  );
}
