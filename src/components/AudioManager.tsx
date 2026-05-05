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
  const dynRef = useRef<GainNode | null>(null);
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

    // Nodo dedicato alla modulazione dinamica (scroll/interazione)
    const dyn = ctx.createGain();
    dyn.gain.value = 1;
    dyn.connect(master);

    const decks: Deck[] = [0, 1].map((idx) => {
      const el = new Audio();
      el.loop = true;
      el.preload = "auto";
      el.crossOrigin = "anonymous";
      el.addEventListener("error", () => {
        const failed = el.currentSrc || el.src;
        console.warn(`[AudioManager] errore caricamento traccia (deck ${idx})`, failed);
        if (failed) availabilityCache.set(failed, Promise.resolve(false));
        if (failed && !failed.endsWith(FALLBACK_SRC)) {
          checkAvailable(FALLBACK_SRC).then((ok) => {
            if (!ok) return;
            try {
              el.src = FALLBACK_SRC;
              el.play().catch(() => {});
            } catch {
              /* noop */
            }
          });
        }
      });
      const src = ctx.createMediaElementSource(el);
      const gain = ctx.createGain();
      gain.gain.value = MIN_GAIN;
      src.connect(gain).connect(dyn);
      return { el, src, gain, currentSrc: "" };
    });

    ctxRef.current = ctx;
    masterRef.current = master;
    dynRef.current = dyn;
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

    let cancelled = false;
    let stopTimer: number | undefined;

    (async () => {
      const preferred = trackFor(location.pathname);
      const next = await resolveSrc(preferred);
      if (cancelled || !next) return;

      const active = decks[activeIdxRef.current];
      if (active.currentSrc === next) return;

      const incomingIdx = activeIdxRef.current === 0 ? 1 : 0;
      const incoming = decks[incomingIdx];
      const outgoing = active;

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
      const tau = FADE_SEC / 4;

      incoming.gain.gain.cancelScheduledValues(now);
      outgoing.gain.gain.cancelScheduledValues(now);
      incoming.gain.gain.setValueAtTime(Math.max(incoming.gain.gain.value, MIN_GAIN), now);
      outgoing.gain.gain.setValueAtTime(Math.max(outgoing.gain.gain.value, MIN_GAIN), now);

      incoming.gain.gain.setTargetAtTime(target, now, tau);
      outgoing.gain.gain.setTargetAtTime(MIN_GAIN, now, tau);

      activeIdxRef.current = incomingIdx;

      const stopMs = FADE_SEC * 1000 + 200;
      stopTimer = window.setTimeout(() => {
        if (decks[activeIdxRef.current] !== outgoing) {
          try {
            outgoing.el.pause();
          } catch {
            /* noop */
          }
        }
      }, stopMs);
    })();

    return () => {
      cancelled = true;
      if (stopTimer) window.clearTimeout(stopTimer);
    };
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

  // Modulazione dinamica del volume in base a scroll e interazione utente.
  // - Scroll vicino al top: volume pieno
  // - Scroll profondo: ducking graduale fino a 0.55x per non disturbare la lettura
  // - Click utente: brevissima enfasi (1.12x) che poi rientra
  useEffect(() => {
    if (!enabled) return;
    const ctx = ctxRef.current;
    const dyn = dynRef.current;
    if (!ctx || !dyn) return;

    const SCROLL_FULL = 1;
    const SCROLL_DUCKED = 0.55;
    const ACCENT = 1.12;
    const ACCENT_DECAY = 1.2; // sec
    const SCROLL_TAU = 0.25;

    let accentUntil = 0;
    let raf = 0;
    let lastScrollFactor = 1;

    const computeScrollFactor = () => {
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const ratio = Math.min(1, Math.max(0, window.scrollY / max));
      // ease-out: scende più rapido all'inizio, poi si stabilizza
      const eased = 1 - Math.pow(1 - ratio, 2);
      return SCROLL_FULL + (SCROLL_DUCKED - SCROLL_FULL) * eased;
    };

    const apply = () => {
      const now = ctx.currentTime;
      const accentBoost = now < accentUntil
        ? 1 + (ACCENT - 1) * ((accentUntil - now) / ACCENT_DECAY)
        : 1;
      const target = Math.max(MIN_GAIN, lastScrollFactor * accentBoost);
      dyn.gain.cancelScheduledValues(now);
      dyn.gain.setValueAtTime(Math.max(dyn.gain.value, MIN_GAIN), now);
      dyn.gain.setTargetAtTime(target, now, SCROLL_TAU);
    };

    const onScroll = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        lastScrollFactor = computeScrollFactor();
        apply();
      });
    };

    const onClick = () => {
      accentUntil = ctx.currentTime + ACCENT_DECAY;
      apply();
    };

    // valori iniziali coerenti con la posizione corrente
    lastScrollFactor = computeScrollFactor();
    apply();

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", onClick);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [enabled, location.pathname]);

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
