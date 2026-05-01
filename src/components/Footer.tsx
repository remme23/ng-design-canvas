import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background pt-20 pb-10">
      <div className="container-editorial">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div>
            <div className="section-number mb-4">Studio</div>
            <p className="font-display text-2xl leading-tight mb-3">NG Studio Associato</p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Via Des Geneys 8<br />
              18100 Imperia (IM)<br />
              C.F. e P.I. 01248640086
            </p>
          </div>

          <div>
            <div className="section-number mb-4">Contatti</div>
            <p className="text-sm text-muted-foreground leading-relaxed space-y-1">
              <a href="tel:+390183296526" className="block hover:text-gold transition-colors">
                Tel. 0183 296526
              </a>
              <span className="block">Fax 0183 754028</span>
              <a
                href="mailto:ng.studio.associato@gmail.com"
                className="block hover:text-gold transition-colors"
              >
                ng.studio.associato@gmail.com
              </a>
              <a href="mailto:studiong@pec.it" className="block hover:text-gold transition-colors">
                studiong@pec.it
              </a>
            </p>
          </div>

          <div>
            <div className="section-number mb-4">Opera S.r.l.</div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Via Des Geneys 8 — 18100 Imperia<br />
              C.F. e P.I. 01494050089
              <br />
              <a
                href="mailto:operacostruzioni@gmail.com"
                className="block mt-2 hover:text-gold transition-colors"
              >
                operacostruzioni@gmail.com
              </a>
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pt-8 border-t border-border/50">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} NG Studio Associato — Imperia
          </p>
          <div className="flex gap-6 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <Link to="/studio" className="hover:text-gold transition-colors">Studio</Link>
            <Link to="/opera" className="hover:text-gold transition-colors">Opera</Link>
            <Link to="/contatti" className="hover:text-gold transition-colors">Contatti</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
