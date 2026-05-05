import { useEffect, useRef, useState } from "react";

type Props = {
  src: string;
  poster: string;
  className?: string;
};

/**
 * Video con lazy loading via IntersectionObserver.
 * Mostra subito il poster; carica e avvia il video solo quando
 * entra nel viewport — riduce drasticamente il carico iniziale.
 */
export default function LazyVideo({ src, poster, className }: Props) {
  const ref = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(false);

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
    <video
      ref={ref}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      className={className}
    />
  );
}
