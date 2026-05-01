
# NG Studio Associato — Redesign cinematografico

Reinterpretazione completa del sito di NG Studio Associato (Arch. Riccardo Torello & Ing. Gian Claudio Papone, Imperia) ispirata all'estetica di Forma Studio: dark mode editoriale, tipografia serif imponente con accenti corsivi color oro, video di sfondo ed effetti scroll-driven cinematografici. Tutti i contenuti sono presi dal sito attuale, in italiano.

## Direzione visiva

- **Palette**: nero profondo `#0a0a0a` di sfondo, crema `#f5f0e8` per i testi principali, oro caldo `#c9a75c` per accenti e corsivi, grigio attenuato per metadati
- **Tipografia**: Cormorant Garamond (display serif, anche in italic per parole-chiave) + Inter (corpo testo). Numeri sezione e label in maiuscolo con tracking ampio
- **Mood**: editoriale, lento, monumentale. Molto spazio nero, immagini "respirate" a tutto schermo, transizioni morbide

## Struttura del sito

```text
/                     Home (one-pager cinematografica)
/studio               Studio Associato NG (storia + bio Torello/Papone)
/partnership          Partnership (collaborazioni studio)
/opera                Opera (lista progetti + accesso pagine dedicate)
/opera/:slug          Pagina dedicata per ogni progetto
/life-quality-system  Life Quality System (sistema tecnologico)
/contatti             Contatti (form + dati studio)
```

Header fisso minimale sempre visibile: logo "NG STUDIO" a sinistra, nav a destra (Studio · Partnership · Opera · Life Quality System), pulsante "Contatti" outline.

## Home — scroll cinematografico

Sezioni a tutto schermo che si rivelano scrollando. Numerazione "001 / Manifesto" stile editoriale.

1. **Hero** — Video di architettura in background (loop muto, autoplay), overlay scuro. Sopra: "NG STUDIO" in alto, "Imperia · Liguria" come location chip color oro, headline gigante "ARCHITETTURA *e ingegneria*" con la seconda parola in italic oro, sottotitolo "Dal 2000 trasformiamo visioni in opere che resistono al tempo", indicatore "Scorri" con linea animata
2. **001 / Manifesto** — Testo originale dello studio ("Lo Studio Associato di Architettura ed Ingegneria NG nasce…") con prima lettera capolettera, parole chiave evidenziate
3. **002 / Competenze** — "Progettazione *integrata*" — lista con animazione staggered: Architettura · Ingegneria strutturale · Restauro · Progettazione 3D · Direzione lavori
4. **003 / Opera** — Anteprima 3 progetti di punta in griglia asimmetrica con immagini che rivelano in scroll (Villa Neoliberty, Sede AMAT, Complesso Bardellini). Hover/click → pagina progetto
5. **004 / Numeri** — Counter animati: 25+ anni, 100+ progetti, 2 fondatori, etc.
6. **005 / Contatti** — "Costruiamo *insieme*" + CTA "Parlaci del tuo progetto"
7. **Footer** — Indirizzo studio (Via Des Geneys 8, Imperia), telefono, email, P.IVA, riferimento OPERA s.r.l.

## Pagine secondarie

- **Studio Associato NG** — Storia completa, bio Arch. Riccardo Torello (nato 01/01/1968, Imperia) e Ing. Gian Claudio Papone, link curriculum PDF, immagine grande dello studio, valori in tre colonne
- **Partnership** — Sezione dedicata alle collaborazioni esterne dello staff
- **Opera (indice progetti)** — Griglia editoriale con tutti i progetti raccolti dal sito originale: Villa Neoliberty Capo Berta, Sede AMAT Imperia, Complesso Bardellini, Edificio commerciale e direzionale Imperia, Attico Porto Maurizio, Palazzo Lavagna, Ristrutturazione Area Ex-Nova, Complesso produttivo Pontedassio, Nuovo alloggio Bardellini. Ogni card ha titolo, anno, stato, immagine con hover zoom
- **Pagina progetto** — Layout cinematografico per ognuno: hero a tutto schermo con video/immagine + titolo, scheda tecnica (committente, anno, importo, categoria, stato), gallery scroll-reveal, descrizione lunga in prosa, navigazione progetto precedente/successivo
- **Life Quality System** — Pagina manifesto del sistema tecnologico marchio dello studio, con elenco progetti che lo applicano
- **Contatti** — Form (nome, email, messaggio), dati completi STUDIO NG ASSOCIATO + OPERA s.r.l., link maps, telefono e PEC

## Effetti scroll & animazioni

- **Hero video**: video stock architettonico (timelapse edifici/cantiere) da Pexels, h264 muto in loop, fallback poster image
- **Reveal su scroll**: testi entrano con fade-up + clip-path, immagini con scale-from-95% e luminosità che cresce
- **Tipografia animata**: parole italic oro entrano leggermente dopo, con un piccolo "swing"
- **Parallax**: immagini dei progetti si muovono più lentamente dello scroll
- **Indicatori sezione**: barra numerata laterale con sezioni attive evidenziate
- **Cursore custom**: piccolo dot che si espande sugli elementi cliccabili
- **Page transition**: tra pagine progetto, fade nero veloce con scritta "OPERA / titolo"

## Dettagli tecnici

- React Router con tutte le rotte sopra
- Framer Motion per le animazioni scroll-driven (`useScroll`, `useTransform`)
- Video di sfondo: tag `<video autoplay muted loop playsinline poster>` con sorgente da Pexels (URL pubblico, nessun upload necessario)
- Tutti i testi italiani estratti dal sito originale ngstudioassociato.com
- Slug dei progetti generati da ID coerenti (es. `villa-neoliberty-capo-berta`)
- Design system: tutti i colori in HSL nel `index.css`, font Cormorant + Inter caricati da Google Fonts
- Immagini progetto: usiamo placeholder architettonici da Unsplash finché non avrai i materiali finali (sostituibili in seguito)
- Mobile responsive: hero video resta, tipografia scala, sezioni diventano stack verticale

## Cosa resta da fornire (in seguito, opzionale)

- Foto reali dei progetti realizzati
- Eventuali video propri di cantieri o rendering
- Curriculum PDF aggiornato (al momento linko quello presente sul sito originale)

