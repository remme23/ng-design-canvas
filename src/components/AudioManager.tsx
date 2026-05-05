import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Volume2, VolumeX } from "lucide-react";

/**
 * Audio ambient per sezione con crossfade equal-power via WebAudio.
 * - Niente click: rampe esponenziali sui GainNode
 * - Cambi rapidi di route gestiti: il fade in corso viene annullato e
 *   ripreso dal volume corrente verso il nuovo target
 * - Parte al primo gesto utente (policy autoplay)
 */

const ROUTE_TRACKS: { match: RegExp; src: string }[] = [
  { match: /^\/opera/, src: "/audio/opera.mp3" },
  { match: /^\/studio/, src: "/audio/studio.mp3" },
  { match: /^\/life-quality-system/, src: "/audio/lqs.mp3" },
  { match: /^\/contatti/, src: "/audio/contatti.mp3" },
  { match: /.*/, src: "/audio/home.mp3" },
];

const FALLBACK_SRC = "/audio/home.mp3";

function trackFor(pathname: string) {
  return ROUTE_TRACKS.find((t) => t.match.test(pathname))!.src;
}

// Cache dei risultati: src -> esiste/no. Promise per evitare fetch concorrenti.
const availabilityCache = new Map<string, Promise<boolean>>();

function checkAvailable(src: string): Promise<boolean> {
  let p = availabilityCache.get(src);
  if (p) return p;
  p = fetch(src, { method: "HEAD" })
    .then((r) => r.ok)
    .catch(() => false);
  availabilityCache.set(src, p);
  return p;
}

async function resolveSrc(preferred: string): Promise<string | null> {
  if (await checkAvailable(preferred)) return preferred;
  if (preferred !== FALLBACK_SRC && (await checkAvailable(FALLBACK_SRC))) {
    console.warn(`[AudioManager] "${preferred}" non disponibile, uso fallback ${FALLBACK_SRC}`);
    return FALLBACK_SRC;
  }
  console.warn(`[AudioManager] nessuna traccia audio disponibile per ${preferred}`);
  return null;
}

const TARGET_VOLUME = 0.18;
const FADE_SEC = 1.4;
const INITIAL_FADE_SEC = 3.5; // fade-in più morbido al primo abilitamento
const MIN_GAIN = 0.0001; // setTargetAtTime non accetta 0

type Deck = {
  el: HTMLAudioElement;
  src: MediaElementAudioSourceNode;
  gain: GainNode;
  currentSrc: string;
};

export default function AudioManager() {
  const location = useLocation();
  const ctxRef = useRef<AudioContext | null>(null);
  const masterRef = useRef<GainNode | null>(null);
  const decksRef = useRef<Deck[]>([]);
  const activeIdxRef = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [muted, setMuted] = useState<boolean>(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("audio:muted") === "1";
  });

  // Persisti preferenza mute
  useEffect(() => {
    try {
      window.localStorage.setItem("audio:muted", muted ? "1" : "0");
    } catch {
      /* noop */
    }
  }, [muted]);

  // Inizializza WebAudio dopo il primo gesto
  const ensureAudio = () => {
    if (ctxRef.current) return;
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const master = ctx.createGain();
    // Parte sempre da silenzio: la rampa al primo enable rende l'avvio morbido
    master.gain.value = MIN_GAIN;
    master.connect(ctx.destination);

    const decks: Deck[] = [0, 1].map(() => {
      const el = new Audio();
      el.loop = true;
      el.preload = "auto";
      el.crossOrigin = "anonymous";
      const src = ctx.createMediaElementSource(el);
      const gain = ctx.createGain();
      gain.gain.value = MIN_GAIN;
      src.connect(gain).connect(master);
      return { el, src, gain, currentSrc: "" };
    });

    ctxRef.current = ctx;
    masterRef.current = master;
    decksRef.current = decks;
  };

  // Prima interazione utente
  useEffect(() => {
    if (enabled) return;
    const enable = () => {
      ensureAudio();
      ctxRef.current?.resume();
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled]);

  // Fade-in graduale del master al primo enable
  const firstEnableRef = useRef(true);
  useEffect(() => {
    if (!enabled) return;
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    if (!firstEnableRef.current) return;
    firstEnableRef.current = false;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(MIN_GAIN, now);
    // Rampa esponenziale dolce verso il volume finale (rispetta il mute)
    master.gain.exponentialRampToValueAtTime(
      muted ? MIN_GAIN : 1,
      now + INITIAL_FADE_SEC,
    );
  }, [enabled, muted]);

  // Crossfade su cambio route
  useEffect(() => {
    if (!enabled) return;
    const ctx = ctxRef.current;
    const decks = decksRef.current;
    if (!ctx || decks.length < 2) return;

    const next = trackFor(location.pathname);
    const active = decks[activeIdxRef.current];
    if (active.currentSrc === next) return;

    const incomingIdx = activeIdxRef.current === 0 ? 1 : 0;
    const incoming = decks[incomingIdx];
    const outgoing = active;

    // Carica nuova traccia sul deck inattivo
    if (incoming.currentSrc !== next) {
      incoming.el.src = next;
      incoming.currentSrc = next;
    }
    try {
      incoming.el.currentTime = 0;
    } catch {
      /* noop */
    }
    const playPromise = incoming.el.play();
    if (playPromise) playPromise.catch(() => {});

    const now = ctx.currentTime;
    const target = TARGET_VOLUME;
    const tau = FADE_SEC / 4; // setTargetAtTime "time constant" (~98% in 4*tau)

    // Cancella eventuali rampe in corso e riparte dal valore corrente
    incoming.gain.gain.cancelScheduledValues(now);
    outgoing.gain.gain.cancelScheduledValues(now);
    incoming.gain.gain.setValueAtTime(Math.max(incoming.gain.gain.value, MIN_GAIN), now);
    outgoing.gain.gain.setValueAtTime(Math.max(outgoing.gain.gain.value, MIN_GAIN), now);

    incoming.gain.gain.setTargetAtTime(target, now, tau);
    outgoing.gain.gain.setTargetAtTime(MIN_GAIN, now, tau);

    activeIdxRef.current = incomingIdx;

    // Pausa il deck uscente quando il fade è praticamente concluso
    const stopMs = FADE_SEC * 1000 + 200;
    const stopTimer = window.setTimeout(() => {
      // se nel frattempo è tornato attivo (route rapida), non fermarlo
      if (decks[activeIdxRef.current] !== outgoing) {
        try {
          outgoing.el.pause();
        } catch {
          /* noop */
        }
      }
    }, stopMs);

    return () => window.clearTimeout(stopTimer);
  }, [enabled, location.pathname]);

  // Mute/unmute via master gain (rampa breve, niente click)
  useEffect(() => {
    const ctx = ctxRef.current;
    const master = masterRef.current;
    if (!ctx || !master) return;
    const now = ctx.currentTime;
    master.gain.cancelScheduledValues(now);
    master.gain.setValueAtTime(Math.max(master.gain.value, MIN_GAIN), now);
    master.gain.setTargetAtTime(muted ? MIN_GAIN : 1, now, 0.05);
  }, [muted]);

  return (
    <button
      type="button"
      onClick={() => {
        ensureAudio();
        ctxRef.current?.resume();
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
