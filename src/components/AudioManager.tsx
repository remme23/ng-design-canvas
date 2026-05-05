import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Riproduce un loop ambient diverso per ogni sezione del sito.
 * - Parte automaticamente al primo click dell'utente (policy autoplay)
 * - Cambia traccia con crossfade quando cambia la route
 * - Pulsante mute/unmute fisso in basso a destra
 */

const ROUTE_TRACKS: { match: RegExp; src: string }[] = [
  { match: /^\/opera/, src: "/audio/opera.mp3" },
  { match: /^\/studio/, src: "/audio/studio.mp3" },
  { match: /^\/life-quality-system/, src: "/audio/lqs.mp3" },
  { match: /^\/contatti/, src: "/audio/contatti.mp3" },
  { match: /.*/, src: "/audio/home.mp3" },
];

function trackFor(pathname: string) {
  return ROUTE_TRACKS.find((t) => t.match.test(pathname))!.src;
}

const TARGET_VOLUME = 0.18;
const FADE_MS = 1200;

export default function AudioManager() {
  const location = useLocation();
  const aRef = useRef<HTMLAudioElement | null>(null);
  const bRef = useRef<HTMLAudioElement | null>(null);
  const activeRef = useRef<"a" | "b">("a");
  const [enabled, setEnabled] = useState(false);
  const [muted, setMuted] = useState(false);
  const currentSrc = useRef<string>("");

  // crea i due elementi audio una sola volta
  useEffect(() => {
    aRef.current = new Audio();
    bRef.current = new Audio();
    [aRef.current, bRef.current].forEach((a) => {
      a.loop = true;
      a.preload = "auto";
      a.volume = 0;
    });
    return () => {
      aRef.current?.pause();
      bRef.current?.pause();
    };
  }, []);

  // prima interazione utente -> abilita audio
  useEffect(() => {
    if (enabled) return;
    const enable = () => {
      setEnabled(true);
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("keydown", enable);
    };
    window.addEventListener("pointerdown", enable, { once: true });
    window.addEventListener("keydown", enable, { once: true });
    return () => {
      window.removeEventListener("pointerdown", enable);
      window.removeEventListener("keydown", enable);
    };
  }, [enabled]);

  // gestisce play + crossfade quando cambia route o quando si abilita
  useEffect(() => {
    if (!enabled) return;
    const next = trackFor(location.pathname);
    if (next === currentSrc.current) return;

    const fromKey = activeRef.current;
    const toKey = fromKey === "a" ? "b" : "a";
    const from = fromKey === "a" ? aRef.current! : bRef.current!;
    const to = toKey === "a" ? aRef.current! : bRef.current!;

    to.src = next;
    to.currentTime = 0;
    to.volume = 0;
    const playPromise = to.play();
    if (playPromise) playPromise.catch(() => {});

    const target = muted ? 0 : TARGET_VOLUME;
    const steps = 24;
    const stepMs = FADE_MS / steps;
    let i = 0;
    const fade = setInterval(() => {
      i++;
      const k = i / steps;
      to.volume = Math.min(target * k, target);
      from.volume = Math.max(target * (1 - k), 0);
      if (i >= steps) {
        clearInterval(fade);
        from.pause();
      }
    }, stepMs);

    activeRef.current = toKey;
    currentSrc.current = next;

    return () => clearInterval(fade);
  }, [enabled, location.pathname, muted]);

  // muta/smuta in tempo reale
  useEffect(() => {
    const active = activeRef.current === "a" ? aRef.current : bRef.current;
    if (!active) return;
    active.volume = muted ? 0 : TARGET_VOLUME;
  }, [muted]);

  return (
    <button
      type="button"
      onClick={() => {
        if (!enabled) setEnabled(true);
        setMuted((m) => !m);
      }}
      aria-label={muted ? "Attiva audio" : "Disattiva audio"}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full border border-border/60 bg-background/70 backdrop-blur-md text-foreground/80 hover:text-gold hover:border-gold/50 transition-all duration-300 flex items-center justify-center shadow-lg"
    >
      {muted || !enabled ? <VolumeX size={16} /> : <Volume2 size={16} />}
    </button>
  );
}
