import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navItems = [
  { to: "/studio", label: "Studio" },
  { to: "/partnership", label: "Partnership" },
  { to: "/opera", label: "Opera" },
  { to: "/life-quality-system", label: "Life Quality System" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || open
          ? "bg-background/85 backdrop-blur-md border-b border-border/50"
          : "bg-transparent"
      }`}
    >
      <div className="container-editorial flex items-center justify-between h-20">
        <Link
          to="/"
          className="font-display text-xl tracking-[0.25em] text-foreground hover:text-gold transition-colors"
          aria-label="NG Studio Associato — Home"
        >
          NG <span className="text-gold">·</span> STUDIO
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `text-xs uppercase tracking-[0.25em] transition-colors hover-underline ${
                  isActive ? "text-gold" : "text-foreground/80 hover:text-foreground"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contatti"
            className="text-xs uppercase tracking-[0.25em] border border-foreground/30 px-5 py-2.5 hover:border-gold hover:text-gold transition-colors"
          >
            Contatti
          </Link>
        </nav>

        <button
          onClick={() => setOpen((v) => !v)}
          className="lg:hidden p-2 text-foreground"
          aria-label={open ? "Chiudi menu" : "Apri menu"}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
            className="lg:hidden overflow-hidden border-t border-border/50"
          >
            <div className="container-editorial py-8 flex flex-col gap-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `font-display text-3xl ${isActive ? "text-gold italic" : "text-foreground"}`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
              <Link to="/contatti" className="font-display text-3xl text-gold italic">
                Contatti
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
