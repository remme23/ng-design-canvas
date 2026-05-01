import { useState } from "react";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import Reveal from "@/components/Reveal";
import { useToast } from "@/hooks/use-toast";

export default function Contatti() {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    const data = new FormData(e.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    if (!name || !email || !message) {
      toast({ title: "Campi mancanti", description: "Compila tutti i campi.", variant: "destructive" });
      setSubmitting(false);
      return;
    }
    // Apre client di posta del visitatore con il messaggio precompilato
    const subject = encodeURIComponent(`Richiesta da ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name}\n${email}`);
    window.location.href = `mailto:ng.studio.associato@gmail.com?subject=${subject}&body=${body}`;
    setTimeout(() => {
      toast({
        title: "Messaggio pronto",
        description: "Si è aperto il tuo client di posta per inviare la richiesta.",
      });
      setSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 600);
  };

  return (
    <>
      <section className="pt-40 pb-16 container-editorial">
        <Reveal>
          <div className="section-number mb-8">Contatti</div>
        </Reveal>
        <Reveal>
          <h1 className="display-xl text-[clamp(3rem,9vw,9rem)] font-light leading-[0.9]">
            Costruiamo
            <br />
            <span className="gold-italic">insieme</span>
          </h1>
        </Reveal>
      </section>

      <section className="pb-32 container-editorial">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          {/* INFO */}
          <div className="md:col-span-5 space-y-12">
            <Reveal>
              <div>
                <div className="section-number mb-4">Studio NG Associato</div>
                <div className="space-y-4 text-foreground/80">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-gold mt-1 shrink-0" />
                    <span>
                      Via Des Geneys 8<br />
                      18100 Imperia (IM)
                    </span>
                  </div>
                  <a href="tel:+390183296526" className="flex items-start gap-3 hover:text-gold transition-colors">
                    <Phone size={18} className="text-gold mt-1 shrink-0" />
                    <span>
                      0183 296526
                      <span className="block text-sm text-muted-foreground">Fax 0183 754028</span>
                    </span>
                  </a>
                  <a
                    href="mailto:ng.studio.associato@gmail.com"
                    className="flex items-start gap-3 hover:text-gold transition-colors"
                  >
                    <Mail size={18} className="text-gold mt-1 shrink-0" />
                    <span>
                      ng.studio.associato@gmail.com
                      <span className="block text-sm text-muted-foreground">studiong@pec.it</span>
                    </span>
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="pt-8 border-t border-border/50">
                <div className="section-number mb-4">Opera S.r.l.</div>
                <p className="text-foreground/80 leading-relaxed">
                  Via Des Geneys 8 — 18100 Imperia
                  <br />
                  <a
                    href="mailto:operacostruzioni@gmail.com"
                    className="text-gold hover-underline"
                  >
                    operacostruzioni@gmail.com
                  </a>
                  <span className="block text-sm text-muted-foreground mt-1">
                    C.F. e P.I. 01494050089
                  </span>
                </p>
              </div>
            </Reveal>
          </div>

          {/* FORM */}
          <div className="md:col-span-7">
            <Reveal>
              <p className="font-display text-2xl md:text-3xl font-light leading-relaxed mb-12 max-w-2xl">
                Hai un progetto in mente? <span className="gold-italic">Raccontacelo.</span> Ogni
                grande opera inizia da una conversazione.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <form onSubmit={handleSubmit} className="space-y-8">
                <div>
                  <label htmlFor="name" className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Nome
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-display text-xl transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-display text-xl transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Il tuo progetto
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="mt-2 w-full bg-transparent border-b border-border focus:border-gold outline-none py-3 text-foreground font-display text-xl resize-none transition-colors"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-4 px-8 py-4 border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all duration-500 group disabled:opacity-60"
                >
                  <span className="text-xs uppercase tracking-[0.3em]">
                    {submitting ? "Invio…" : "Invia richiesta"}
                  </span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
