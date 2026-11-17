import React, { useEffect, useState } from 'react';
import {
  Instagram,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowUpRight,
  Trophy,
  Shirt,
  Users,
  Mail,
  Sun,
  Moon,
  Quote,
  X
} from 'lucide-react';

const INSTAGRAM = 'https://www.instagram.com/locoscolectivos/';

const PAGES = [
  { id: 'home', hash: '#/', label: 'START' },
  { id: 'spielplan', hash: '#/spielplan', label: 'SPIELPLAN' },
  { id: 'trikots', hash: '#/trikots', label: 'TRIKOTS' },
  { id: 'kabine', hash: '#/kabine', label: 'KABINE' },
  { id: 'kontakt', hash: '#/kontakt', label: 'KONTAKT' }
];

const HERO_SLIDES = [
  {
    src: './images/team-goal.jpg',
    position: 'object-[50%_55%]',
    title: 'Locos Colectivos · colectivo sobre todo',
    ctaLabel: 'Folge uns auf Instagram →',
    route: null,
    externalHref: INSTAGRAM
  },
  {
    src: './images/locker-room.jpg',
    position: 'object-[50%_52%]',
    title: 'Das Kollektiv in der Kabine · #77 · #22 · #7',
    ctaLabel: 'Zu Kabine & Kader →',
    route: 'kabine',
    externalHref: null
  },
  {
    src: './images/kit-front-close.jpg',
    position: 'object-[50%_28%]',
    zoomOut: true,
    title: 'Schwarz & Gold · Unsere Match Trikots 2026',
    ctaLabel: 'Zu den Trikots →',
    route: 'trikots',
    externalHref: null
  }
];

const QUICK_CARDS = [
  {
    route: 'spielplan',
    title: 'SPIELPLAN',
    sub: 'ERGEBNISSE & TURNIERE',
    src: './images/hero-pitch-night.jpg',
    pos: 'object-center',
    icon: Trophy
  },
  {
    route: 'trikots',
    title: 'TRIKOTS',
    sub: 'UNSERE MATCH TRIKOTS',
    src: './images/kit-front-close.jpg',
    pos: 'object-[50%_20%]',
    icon: Shirt
  },
  {
    route: 'kabine',
    title: 'KABINE',
    sub: 'TEAM & RÜCKENNUMMERN',
    src: './images/locker-room.jpg',
    pos: 'object-[50%_30%]',
    icon: Users
  },
  {
    route: 'kontakt',
    title: 'KONTAKT',
    sub: 'TURNIER ODER TESTSPIEL',
    src: './images/logo-gold-black.jpg',
    pos: 'object-center',
    icon: Mail
  }
];

const VOICES = [
  {
    role: 'Clubobmann · Platzhalter',
    name: 'Vorstand Locos Colectivos',
    quote:
      '„Wir wollten keinen losen Haufen für ein Wochenende, sondern einen Namen, ein Wappen und ein echtes Kollektiv, das man ab der ersten Sekunde spürt.“'
  },
  {
    role: 'Trainer · Platzhalter',
    name: 'An der Seitenlinie',
    quote:
      '„Auf dem Kleinfeld entscheiden Tempo, Laufbereitschaft und Vertrauen in den Nebenmann. Der 1:0-Sieg gegen Tresdorf hat gezeigt, wohin wir wollen.“'
  },
  {
    role: 'Spieler #19 · Platzhalter',
    name: 'Aus der Kabine',
    quote:
      '„Wenn elf Mann im selben Schwarz und Gold auf den Platz gehen, spielt niemand für die Galerie – jeder läuft für das Kollektiv.“'
  }
];

const KIT_CARDS = [
  {
    id: 'full',
    src: './images/kit-full.jpg',
    title: 'Locos Colectivos Match Kit 2026',
    meta: 'Gold · Schwarz · Weiß'
  },
  {
    id: 'front',
    src: './images/kit-front-close.jpg',
    title: 'Match Trikot · Wappen Detail',
    meta: 'Brustwappen LC 2026'
  },
  {
    id: 'back',
    src: './images/kit-back-19.jpg',
    title: 'Match Trikot · Rücken #19',
    meta: '19 · Diringer'
  },
  {
    id: 'shorts',
    src: './images/kit-shorts.jpg',
    title: 'Match Shorts · Schwarz & Gold',
    meta: 'Hosen-Wappen LC 2026'
  }
];

const ROSTER = [
  { num: '1', name: 'Tormann (Platzhalter)', pos: 'Tor' },
  { num: '7', name: 'Spieler #7 (Kabinen-Foto)', pos: 'Feld' },
  { num: '19', name: 'Diringer', pos: 'Feld' },
  { num: '22', name: 'Spieler #22 (Kabinen-Foto)', pos: 'Feld' },
  { num: '77', name: 'Spieler #77 (Kabinen-Foto)', pos: 'Feld' },
  { num: 'HC', name: 'Trainer (Platzhalter)', pos: 'Coach' },
  { num: 'OB', name: 'Clubobmann (Platzhalter)', pos: 'Vorstand' }
];

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (['spielplan', 'trikots', 'kabine', 'kontakt'].includes(raw)) return raw;
  return 'home';
}

const App = () => {
  const [page, setPage] = useState(parseHash);
  const [slideIdx, setSlideIdx] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('locos-theme');
    return saved ? saved === 'dark' : true;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('locos-theme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    const onHash = () => setPage(parseHash());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (target) => {
    window.location.hash = target === 'home' ? '#/' : `#/${target}`;
    setPage(target);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentSlide = HERO_SLIDES[slideIdx];
  const prevSlide = () => setSlideIdx((i) => (i - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  const nextSlide = () => setSlideIdx((i) => (i + 1) % HERO_SLIDES.length);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#090b10] dark:bg-[#090b10] dark:text-[#f5f4f0] transition-colors duration-300">
      {/* 1. TOP SOCIAL BAR (Tiefschwarz + Gold) */}
      <div className="bg-[#06070b] border-b border-[#d4af37]/30 min-h-[40px] flex items-center">
        <div className="max-w-[1380px] w-full mx-auto px-5 sm:px-12 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @locoscolectivos"
              className="w-[26px] h-[26px] rounded-full bg-[#d4af37] flex items-center justify-center text-[#090b10] hover:scale-105 transition-transform"
            >
              <Instagram size={14} />
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="text-white/90 hover:text-[#d4af37] text-[15px] font-semibold tracking-wide ml-1 transition-colors"
            >
              @locoscolectivos
            </a>
          </div>
          <span className="text-[#d4af37] text-[15px] font-medium hidden sm:inline">
            ⚜️ colectivo sobre todo ⚜️
          </span>
        </div>
      </div>

      {/* 2. NAVBAR (Adaptive Light/Dark + Schwarzes Logo + Dark/Light Mode Switch) */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#090b10]/95 backdrop-blur border-b border-black/10 dark:border-white/10">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-12 h-[74px] flex items-center justify-between">
          <div className="flex items-center">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                navigate('home');
              }}
              className="shrink-0 flex items-center gap-3"
            >
              <img
                src="./images/logo-gold-black.jpg"
                alt="Locos Colectivos Wappen"
                className="w-[52px] h-[52px] rounded-full object-cover border border-[#d4af37]/70"
              />
            </a>
            <nav className="flex items-center ml-3 sm:ml-[38px] gap-1 sm:gap-5">
              {PAGES.filter((p) => p.id !== 'home').map((item) => (
                <a
                  key={item.id}
                  href={item.hash}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.id);
                  }}
                  className={`como-nav-link text-[#090b10] hover:text-[#b48f22] dark:text-white/90 dark:hover:text-[#d4af37] ${
                    page === item.id ? 'active text-[#b48f22] dark:text-[#d4af37]' : ''
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <span className="hidden lg:inline text-[15px] font-semibold text-black/55 dark:text-white/55">
              Niederösterreich
            </span>
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label="Dark / Light Mode umschalten"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-black/15 dark:border-[#d4af37]/45 bg-[#f5f4f0] dark:bg-[#11141c] text-[#090b10] dark:text-[#d4af37] text-[13px] font-bold uppercase tracking-wider hover:border-[#d4af37] transition-colors"
            >
              {dark ? <Sun size={14} /> : <Moon size={14} />}
              <span className="hidden sm:inline">{dark ? 'Light' : 'Dark'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {page === 'home' && (
          <>
            {/* HERO SLIDER (Vollflächig & mittendrin, Leiste sauber darunter) */}
            <section id="hero" className="relative bg-[#090b10] select-none border-b border-[#d4af37]/30">
              <div className="relative w-full h-[52vh] sm:h-[560px] overflow-hidden bg-[#090b10]">
                {currentSlide.zoomOut && (
                  <img
                    src={currentSlide.src}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-45 scale-110 pointer-events-none"
                  />
                )}
                <img
                  src={currentSlide.src}
                  alt={currentSlide.title}
                  className={`relative z-10 w-full h-full ${currentSlide.zoomOut ? 'object-contain' : `object-cover ${currentSlide.position}`} transition-all duration-500`}
                />

                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label="Vorheriges Bild"
                  className="z-20 absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-[#d4af37]/40 hover:border-[#d4af37] text-white flex items-center justify-center transition-colors"
                >
                  <ChevronLeft size={22} />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label="Nächstes Bild"
                  className="z-20 absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-[#d4af37]/40 hover:border-[#d4af37] text-white flex items-center justify-center transition-colors"
                >
                  <ChevronRight size={22} />
                </button>
              </div>

              {/* Untere Leiste unter dem Bild (verdeckt nichts mehr!) */}
              <div className="px-6 py-5 sm:px-12 sm:py-6 bg-[#0d1017] border-t border-[#d4af37]/30">
                <div className="max-w-[1380px] mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <h1 className="font-serif font-bold text-white text-[22px] sm:text-[32px] leading-[1.2]">
                    {currentSlide.title}
                  </h1>
                  {currentSlide.externalHref ? (
                    <a
                      href={currentSlide.externalHref}
                      target="_blank"
                      rel="noreferrer"
                      className="self-start sm:self-auto inline-flex items-center gap-2 border border-[#d4af37] bg-[#d4af37] hover:bg-[#e8c75a] text-[#090b10] rounded-[8px] px-6 py-2 font-sans font-extrabold text-[16px] sm:text-[17px] leading-[1.7] transition-colors"
                    >
                      <span>{currentSlide.ctaLabel}</span>
                    </a>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate(currentSlide.route)}
                      className="self-start sm:self-auto inline-flex items-center gap-2 border border-[#d4af37] bg-[#d4af37] hover:bg-[#e8c75a] text-[#090b10] rounded-[8px] px-6 py-2 font-sans font-extrabold text-[16px] sm:text-[17px] leading-[1.7] transition-colors"
                    >
                      <span>{currentSlide.ctaLabel}</span>
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* 4 QUICK-CARDS (Schwarz & Gold, ungeschnittene Fotos) */}
            <section className="bg-[#f5f4f0] dark:bg-[#0d1017] py-10 border-b border-black/10 dark:border-white/10">
              <div className="max-w-[1380px] mx-auto px-5 sm:px-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {QUICK_CARDS.map((card) => {
                    const Icon = card.icon;
                    return (
                      <a
                        key={card.route}
                        href={`#/${card.route}`}
                        onClick={(e) => {
                          e.preventDefault();
                          navigate(card.route);
                        }}
                        className="group relative block aspect-[4/5] rounded-[22px] overflow-hidden shadow-lg bg-[#090b10] border border-black/10 dark:border-[#d4af37]/30"
                      >
                        <img
                          src={card.src}
                          alt={card.title}
                          className={`absolute inset-0 w-full h-full object-cover ${card.pos} group-hover:scale-105 transition-transform duration-500`}
                        />
                        <div
                          className="absolute inset-x-0 bottom-0 h-[170px]"
                          style={{
                            background: 'linear-gradient(0deg, #090b10 0%, rgba(9, 11, 16, 0) 100%)'
                          }}
                        />
                        <div className="absolute left-0 right-0 bottom-[18px] mx-auto w-[86%] h-[132px] bg-[#090b10]/95 border border-[#d4af37] rounded-[16px] px-3 py-3 flex flex-col items-center justify-center text-center text-white">
                          <Icon size={24} strokeWidth={1.8} className="mb-1.5 text-[#d4af37]" />
                          <div className="como-title text-[20px] leading-[1.3] tracking-[0.02em] text-white">
                            {card.title}
                          </div>
                          <div className="mt-1 font-sans font-medium text-[12px] leading-none tracking-[0.06em] text-[#d4af37] uppercase">
                            {card.sub}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* STORY / IDENTITÄT (Leicht futuristischer Eck-Schnitt + Ball-Foto) */}
            <section className="py-14 sm:py-20 bg-white dark:bg-[#090b10]">
              <div className="max-w-[1380px] mx-auto px-5 sm:px-12 grid lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-5">
                  <div className="cut-corner overflow-hidden border border-[#d4af37]/50 bg-[#090b10] aspect-square max-w-[480px] mx-auto">
                    <img
                      src="./images/logo-gold-black.jpg"
                      alt="Locos Colectivos Vereinswappen"
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                </div>

                <div className="lg:col-span-7 space-y-5">
                  <div className="inline-block border-l-2 border-[#d4af37] pl-3 font-sans font-bold text-[14px] uppercase tracking-[0.14em] text-[#b48f22] dark:text-[#d4af37]">
                    DER VEREIN · NIEDERÖSTERREICH
                  </div>
                  <h2 className="como-title text-[34px] sm:text-[42px] leading-[1.12] text-[#090b10] dark:text-white">
                    Mehr als ein Turnierteam. <br />
                    <span className="text-[#b48f22] dark:text-[#d4af37]">colectivo sobre todo.</span>
                  </h2>
                  <p className="font-sans text-[20px] leading-[1.4] text-black/75 dark:text-white/75">
                    Locos Colectivos steht für ehrlichen Kleinfeld-Fußball auf den Hobbyturnieren in Niederösterreich.
                    Kein Zusammenwürfeln vor dem Anpfiff, sondern eine feste Truppe in Schwarz und Gold –
                    mit eigenem Wappen, klaren Prinzipien und dem Ziel, auf jedem Platz ein Zeichen zu setzen.
                  </p>
                  <div className="pt-3 grid grid-cols-3 gap-4 border-t border-black/10 dark:border-white/10">
                    <div>
                      <div className="font-serif font-bold text-[30px] text-[#b48f22] dark:text-[#d4af37]">2026</div>
                      <div className="font-sans text-[15px] text-black/60 dark:text-white/60">Vereinsjahr</div>
                    </div>
                    <div>
                      <div className="font-serif font-bold text-[30px] text-[#090b10] dark:text-white">3. Platz</div>
                      <div className="font-sans text-[15px] text-black/60 dark:text-white/60">Obergänserndorf</div>
                    </div>
                    <div>
                      <div className="font-serif font-bold text-[30px] text-[#090b10] dark:text-white">NÖ</div>
                      <div className="font-sans text-[15px] text-black/60 dark:text-white/60">Kleinfeld &amp; Turniere</div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* KOMPAKTES TURNIER-HIGHLIGHT */}
            <section className="py-6 pb-14 bg-white dark:bg-[#090b10]">
              <div className="max-w-[1380px] mx-auto px-5 sm:px-12">
                <div className="cut-corner border border-[#d4af37]/50 bg-[#f5f4f0] dark:bg-[#11141c] p-6 sm:p-9 flex flex-col md:flex-row items-center justify-between gap-6">
                  <div>
                    <div className="font-sans font-bold text-[14px] uppercase tracking-[0.12em] text-[#b48f22] dark:text-[#d4af37]">
                      LETZTES TURNIER · 04. JULI 2026 · OBERGÄNSERNDORF
                    </div>
                    <h2 className="font-serif font-bold text-[28px] sm:text-[34px] text-[#090b10] dark:text-white mt-1">
                      Tasmania Tresdorf <span className="text-[#b48f22] dark:text-[#d4af37]">0 : 1</span> Locos Colectivos
                    </h2>
                    <p className="font-sans text-[19px] text-black/70 dark:text-white/70 mt-1">
                      3. Platz beim Hobbyturnier &amp; Sommerfest der Jugend TSU NeuMed Obergänserndorf.
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('spielplan')}
                    className="shrink-0 h-[46px] px-7 rounded-[24px] bg-[#090b10] dark:bg-[#d4af37] text-white dark:text-[#090b10] font-sans font-extrabold text-[16px] uppercase inline-flex items-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    <span>Zum Spielplan</span>
                    <ArrowUpRight size={17} />
                  </button>
                </div>
              </div>
            </section>

            {/* STIMMEN AUS DEM KOLLEKTIV (Clubobmann, Trainer, Spieler - editierbare Platzhalter) */}
            <section className="py-14 sm:py-20 bg-[#f5f4f0] dark:bg-[#0d1017] border-t border-black/10 dark:border-white/10">
              <div className="max-w-[1380px] mx-auto px-5 sm:px-12">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                  <div>
                    <div className="font-sans font-bold text-[14px] uppercase tracking-[0.14em] text-[#b48f22] dark:text-[#d4af37]">
                      STIMMEN AUS DEM KOLLEKTIV
                    </div>
                    <h2 className="como-title text-[32px] sm:text-[38px] text-[#090b10] dark:text-white mt-1">
                      Was das Team sagt
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('kabine')}
                    className="font-sans font-bold text-[17px] text-[#b48f22] dark:text-[#d4af37] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Kader &amp; Kabine ansehen</span>
                    <ArrowUpRight size={17} />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {VOICES.map((item) => (
                    <div
                      key={item.role}
                      className="cut-corner bg-white dark:bg-[#11141c] border border-black/10 dark:border-[#d4af37]/30 p-7 flex flex-col justify-between gap-6"
                    >
                      <div>
                        <Quote size={22} className="text-[#d4af37] mb-4" />
                        <p className="font-serif italic text-[19px] leading-[1.45] text-[#090b10] dark:text-white/90">
                          {item.quote}
                        </p>
                      </div>
                      <div className="pt-4 border-t border-black/10 dark:border-white/10">
                        <div className="font-sans font-bold text-[17px] text-[#090b10] dark:text-white">
                          {item.name}
                        </div>
                        <div className="font-sans font-semibold text-[14px] uppercase tracking-wider text-[#b48f22] dark:text-[#d4af37]">
                          {item.role}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* EIGENE SEITE: SPIELPLAN */}
        {page === 'spielplan' && (
          <section id="spiel" className="py-12 bg-white dark:bg-[#090b10]">
            <div className="max-w-[1380px] mx-auto px-5 sm:px-12">
              <button
                type="button"
                onClick={() => navigate('home')}
                className="inline-flex items-center gap-1.5 font-sans font-semibold text-[16px] text-[#b48f22] dark:text-[#d4af37] hover:underline mb-6"
              >
                <ArrowLeft size={16} />
                <span>Zurück zur Startseite</span>
              </button>

              <div className="flex flex-wrap items-baseline gap-6 mb-8">
                <h1 className="como-title text-[34px] sm:text-[42px] leading-[1.15] text-[#090b10] dark:text-white">
                  Spielplan &amp; Ergebnisse
                </h1>
                <span className="font-sans font-bold text-[15px] uppercase tracking-wider text-[#b48f22] dark:text-[#d4af37] border-b-2 border-[#d4af37] pb-0.5">
                  KLEINFELD · NIEDERÖSTERREICH
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Match Card 1 */}
                <div className="cut-corner border border-black/15 dark:border-[#d4af37]/35 bg-[#f5f4f0] dark:bg-[#11141c] p-6 min-h-[450px] flex flex-col justify-between">
                  <div>
                    <div className="font-sans font-bold text-[18px] uppercase text-[#b48f22] dark:text-[#d4af37]">
                      SPIEL UM PLATZ 3
                    </div>
                    <div className="mt-4">
                      <div className="font-serif font-bold text-[20px] text-[#090b10] dark:text-white">
                        Tasmania Tresdorf – Locos Colectivos
                      </div>
                      <div className="font-serif font-bold text-[32px] text-[#b48f22] dark:text-[#d4af37] mt-1">
                        Juli 4, 2026
                      </div>
                    </div>
                    <div className="mt-6 text-[19px] text-black/80 dark:text-white/80">
                      <div className="font-bold uppercase">HERREN · HOBBYTURNIER</div>
                      <div>Endergebnis: 0 : 1 (3. Platz)</div>
                      <div className="font-semibold mt-0.5">Jugend TSU NeuMed Obergänserndorf</div>
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-4">
                      <div className="w-[56px] h-[56px] rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center font-serif font-bold text-[16px]">
                        TT
                      </div>
                      <div className="w-[70px] pb-1.5 border-b border-[#d4af37] text-center font-serif font-bold text-[20px]">
                        0 : 1
                      </div>
                      <img
                        src="./images/logo-gold-black.jpg"
                        alt="Locos Colectivos"
                        className="w-[56px] h-[56px] rounded-full object-cover border border-[#d4af37]"
                      />
                    </div>
                  </div>
                  <div className="pt-6 flex justify-center">
                    <a
                      href={INSTAGRAM}
                      target="_blank"
                      rel="noreferrer"
                      className="w-full max-w-[280px] h-[44px] rounded-[24px] bg-[#d4af37] text-[#090b10] font-sans font-black text-[16px] uppercase flex items-center justify-center gap-1.5"
                    >
                      <span>3. PLATZ · TURNIER-PODIUM</span>
                      <Trophy size={15} />
                    </a>
                  </div>
                </div>

                {/* Match Card 2 */}
                <div className="cut-corner border border-black/15 dark:border-white/15 bg-[#f5f4f0] dark:bg-[#11141c] p-6 min-h-[450px] flex flex-col justify-between">
                  <div>
                    <div className="font-sans font-bold text-[18px] uppercase text-[#b48f22] dark:text-[#d4af37]">
                      VEREINS-MEILENSTEIN
                    </div>
                    <div className="mt-4">
                      <div className="font-serif font-bold text-[20px] text-[#090b10] dark:text-white">
                        Locos Colectivos · Match Trikots
                      </div>
                      <div className="font-serif font-bold text-[32px] text-[#b48f22] dark:text-[#d4af37] mt-1">
                        Juli 3, 2026
                      </div>
                    </div>
                    <div className="mt-6 text-[19px] text-black/80 dark:text-white/80">
                      <div className="font-bold uppercase">OFFIZIELLER KIT-RELEASE</div>
                      <div>⚜️ Unsere Match Trikots ⚜️</div>
                      <div className="font-semibold mt-0.5">Gold &amp; Schwarz · LC 2026</div>
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-4">
                      <img
                        src="./images/logo-gold-black.jpg"
                        alt="Locos Colectivos Schwarz-Gold"
                        className="w-[56px] h-[56px] rounded-full object-cover border border-[#d4af37]"
                      />
                      <div className="w-[60px] pb-1.5 border-b border-[#d4af37] text-center font-serif font-bold text-[15px]">
                        2026
                      </div>
                      <img
                        src="./images/logo-gold-navy.jpg"
                        alt="Locos Colectivos Gold"
                        className="w-[56px] h-[56px] rounded-full object-cover border border-[#d4af37]"
                      />
                    </div>
                  </div>
                  <div className="pt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => navigate('trikots')}
                      className="w-full max-w-[280px] h-[44px] rounded-[24px] bg-[#090b10] dark:bg-white text-white dark:text-[#090b10] font-sans font-black text-[16px] uppercase flex items-center justify-center gap-1.5"
                    >
                      <span>TRIKOTS ANSEHEN</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Match Card 3 */}
                <div className="cut-corner border border-black/15 dark:border-white/15 bg-[#f5f4f0] dark:bg-[#11141c] p-6 min-h-[450px] flex flex-col justify-between">
                  <div>
                    <div className="font-sans font-bold text-[18px] uppercase text-[#b48f22] dark:text-[#d4af37]">
                      FREUNDSCHAFTSSPIEL / TURNIER
                    </div>
                    <div className="mt-4">
                      <div className="font-serif font-bold text-[20px] text-[#090b10] dark:text-white">
                        Locos Colectivos – Euer Team?
                      </div>
                      <div className="font-serif font-bold text-[32px] text-[#b48f22] dark:text-[#d4af37] mt-1">
                        Saison 2026
                      </div>
                    </div>
                    <div className="mt-6 text-[19px] text-black/80 dark:text-white/80">
                      <div className="font-bold uppercase">HERREN · KLEINFELD</div>
                      <div>Termin nach Vereinbarung</div>
                      <div className="font-semibold mt-0.5">Niederösterreich</div>
                    </div>
                    <div className="mt-10 flex items-center justify-center gap-4">
                      <img
                        src="./images/logo-gold-black.jpg"
                        alt="Locos Colectivos"
                        className="w-[56px] h-[56px] rounded-full object-cover border border-[#d4af37]"
                      />
                      <div className="w-[60px] pb-1.5 border-b border-[#d4af37] text-center font-serif font-bold text-[15px]">
                        VS
                      </div>
                      <div className="w-[56px] h-[56px] rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center font-serif font-bold text-[18px]">
                        ?
                      </div>
                    </div>
                  </div>
                  <div className="pt-6 flex justify-center">
                    <button
                      type="button"
                      onClick={() => navigate('kontakt')}
                      className="w-full max-w-[280px] h-[44px] rounded-[24px] bg-[#d4af37] text-[#090b10] font-sans font-black text-[16px] uppercase flex items-center justify-center gap-1.5"
                    >
                      <span>SPIEL ANFRAGEN</span>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* EIGENE SEITE: TRIKOTS (object-contain damit KEIN Trikot abgeschnitten ist!) */}
        {page === 'trikots' && (
          <section id="trikot" className="py-12 bg-[#f5f4f0] dark:bg-[#090b10]">
            <div className="max-w-[1380px] mx-auto px-5 sm:px-12">
              <button
                type="button"
                onClick={() => navigate('home')}
                className="inline-flex items-center gap-1.5 font-sans font-semibold text-[16px] text-[#b48f22] dark:text-[#d4af37] hover:underline mb-6"
              >
                <ArrowLeft size={16} />
                <span>Zurück zur Startseite</span>
              </button>

              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <h1 className="como-title text-[34px] sm:text-[42px] leading-[1.2] text-[#090b10] dark:text-white">
                  Unsere Match Trikots
                </h1>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#b48f22] dark:text-[#d4af37] font-sans font-bold text-[18px] hover:underline inline-flex items-center gap-1"
                >
                  <span>@locoscolectivos</span>
                  <ArrowUpRight size={17} />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {KIT_CARDS.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setLightbox(card.src)}
                    className="bg-white dark:bg-[#11141c] border border-black/15 dark:border-[#d4af37]/30 rounded-[12px] overflow-hidden cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-[#0c0f15]">
                      <img
                        src={card.src}
                        alt={card.title}
                        className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="pt-4 px-4 pb-4">
                      <div className="font-serif font-semibold text-[21px] leading-[1.2] text-[#090b10] dark:text-white min-h-[2.4em]">
                        {card.title}
                      </div>
                      <div className="mt-2 font-sans font-medium text-[18px] leading-[1.3] text-black/65 dark:text-[#d4af37]">
                        {card.meta}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 flex justify-center">
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-[100px] bg-[#d4af37] text-[#090b10] font-sans font-extrabold text-[17px] uppercase tracking-[1px] px-10 py-3 hover:bg-[#e8c75a] transition-colors"
                >
                  <span>AUF INSTAGRAM ANSEHEN</span>
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </section>
        )}

        {/* EIGENE SEITE: KABINE & KADER-PLATZHALTER */}
        {page === 'kabine' && (
          <section id="kabine" className="py-12 bg-white dark:bg-[#090b10]">
            <div className="max-w-[1380px] mx-auto px-5 sm:px-12">
              <button
                type="button"
                onClick={() => navigate('home')}
                className="inline-flex items-center gap-1.5 font-sans font-semibold text-[16px] text-[#b48f22] dark:text-[#d4af37] hover:underline mb-6"
              >
                <ArrowLeft size={16} />
                <span>Zurück zur Startseite</span>
              </button>

              <h1 className="como-title text-[34px] sm:text-[42px] leading-[1.2] text-[#090b10] dark:text-white mb-8">
                Kabine &amp; Kader
              </h1>

              <div className="grid lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7 grid sm:grid-cols-2 gap-6">
                  <div
                    onClick={() => setLightbox('./images/locker-room.jpg')}
                    className="cursor-pointer group"
                  >
                    <div className="aspect-[3/4] rounded-[12px] overflow-hidden mb-4 bg-[#090b10]">
                      <img
                        src="./images/locker-room.jpg"
                        alt="Kabine Locos Colectivos"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h2 className="font-serif font-bold text-[24px] leading-[1.25] text-[#090b10] dark:text-white">
                      In der Kabine mit den neuen Trikots
                    </h2>
                    <p className="mt-2 font-sans text-[18px] leading-[1.3] text-black/65 dark:text-white/65">
                      Die Rückennummern #77, #22 und #7 vor dem Turnier-Anpfiff.
                    </p>
                  </div>

                  <div
                    onClick={() => setLightbox('./images/team-goal.jpg')}
                    className="cursor-pointer group"
                  >
                    <div className="aspect-[3/4] rounded-[12px] overflow-hidden mb-4 bg-[#090b10]">
                      <img
                        src="./images/team-goal.jpg"
                        alt="Mannschaftsfoto im Tor"
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <h2 className="font-serif font-bold text-[24px] leading-[1.25] text-[#090b10] dark:text-white">
                      colectivo sobre todo
                    </h2>
                    <p className="mt-2 font-sans text-[18px] leading-[1.3] text-black/65 dark:text-white/65">
                      Elf Mann vor dem Tor: neun Feldspieler in Gold, unser Tormann und der Coach an der Linie.
                    </p>
                  </div>
                </div>

                <div className="lg:col-span-5 cut-corner border border-black/15 dark:border-[#d4af37]/35 bg-[#f5f4f0] dark:bg-[#11141c] p-6">
                  <div className="font-sans font-bold text-[18px] uppercase tracking-[0.06em] text-[#b48f22] dark:text-[#d4af37]">
                    KADER &amp; ROLLEN
                  </div>
                  <p className="mt-1 font-sans text-[17px] text-black/60 dark:text-white/60">
                    Nummern aus den Fotos plus Platzhalter für Namen, Trainer &amp; Clubobmann.
                  </p>

                  <ul className="mt-5 divide-y divide-black/10 dark:divide-white/10 border-t border-b border-black/10 dark:border-white/10">
                    {ROSTER.map((item) => (
                      <li key={item.num} className="py-3.5 flex items-baseline justify-between gap-4">
                        <span className="font-serif font-bold text-[28px] leading-none text-[#b48f22] dark:text-[#d4af37]">
                          {item.num.match(/^\d+$/) ? `#${item.num}` : item.num}
                        </span>
                        <span className="font-serif font-bold text-[19px] text-[#090b10] dark:text-white text-right">
                          {item.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* EIGENE SEITE: KONTAKT */}
        {page === 'kontakt' && (
          <section id="kontakt" className="py-14 bg-[#f5f4f0] dark:bg-[#090b10]">
            <div className="max-w-3xl mx-auto px-5 sm:px-8">
              <button
                type="button"
                onClick={() => navigate('home')}
                className="inline-flex items-center gap-1.5 font-sans font-semibold text-[16px] text-[#b48f22] dark:text-[#d4af37] hover:underline mb-6"
              >
                <ArrowLeft size={16} />
                <span>Zurück zur Startseite</span>
              </button>

              <div className="cut-corner bg-white dark:bg-[#11141c] border border-black/15 dark:border-[#d4af37]/40 p-8 sm:p-12 text-center">
                <img
                  src="./images/logo-gold-black.jpg"
                  alt="Locos Colectivos"
                  className="w-24 h-24 rounded-full object-cover border-2 border-[#d4af37] mx-auto mb-6"
                />
                <h1 className="como-title text-[34px] sm:text-[42px] text-[#090b10] dark:text-white">
                  Turnier oder Testspiel?
                </h1>
                <p className="mt-4 font-sans text-[20px] text-black/70 dark:text-white/75 leading-relaxed">
                  Ihr veranstaltet ein Kleinfeld- oder Hobbyturnier in Niederösterreich oder sucht einen Gegner?
                  Schreibt uns direkt auf Instagram.
                </p>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-8 inline-flex items-center justify-center gap-2 h-[48px] px-8 rounded-[24px] bg-[#d4af37] hover:bg-[#e8c75a] text-[#090b10] font-sans font-extrabold text-[18px] uppercase tracking-wide transition-colors"
                >
                  <Instagram size={18} />
                  <span>@locoscolectivos</span>
                  <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* SCHWARZ-GOLD FOOTER */}
      <footer className="bg-[#06070b] text-white pt-12 pb-8 border-t border-[#d4af37]/30">
        <div className="max-w-[1380px] mx-auto px-5 sm:px-12">
          <div className="pb-8 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            <img
              src="./images/logo-gold-black.jpg"
              alt="Locos Colectivos Wappen"
              className="w-[74px] h-[74px] rounded-full object-cover border border-[#d4af37]"
            />
            <div className="text-center">
              <div className="como-title text-[28px] sm:text-[32px] text-white">LOCOS COLECTIVOS</div>
              <div className="font-serif italic text-[18px] text-[#d4af37] mt-0.5">
                ⚜️ colectivo sobre todo ⚜️
              </div>
            </div>
          </div>

          <div className="h-[1px] bg-[#d4af37]/40 my-6" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-4 items-start">
            <div className="md:col-span-3 flex justify-center md:justify-start">
              <img
                src="./images/logo-gold-black.jpg"
                alt="LC 2026"
                className="w-[104px] h-[104px] rounded-full object-cover border-2 border-[#d4af37]"
              />
            </div>

            <div className="md:col-span-3 space-y-2">
              <div className="font-sans font-semibold text-[15px] tracking-[2px] uppercase text-[#d4af37] mb-2">
                DER VEREIN
              </div>
              {PAGES.map((item) => (
                <div key={item.id}>
                  <a
                    href={item.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.id);
                    }}
                    className="text-[17px] text-white/80 hover:text-[#d4af37] transition-colors"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>

            <div className="md:col-span-3 space-y-2">
              <div className="font-sans font-semibold text-[15px] tracking-[2px] uppercase text-[#d4af37] mb-2">
                TURNIERE &amp; REGION
              </div>
              <div className="text-[17px] text-white/80">Niederösterreich</div>
              <div className="text-[17px] text-white/80">Kleinfeld &amp; Hobbyturniere</div>
              <div className="text-[17px] text-white/80">3. Platz · Obergänserndorf 2026</div>
            </div>

            <div className="md:col-span-3 space-y-4">
              <div className="font-sans font-semibold text-[15px] tracking-[2px] uppercase text-[#d4af37]">
                TURNIER ODER TESTSPIEL?
              </div>
              <p className="text-[16px] text-white/80 leading-snug">
                Schreibt uns für Turnier-Einladungen oder Freundschaftsspiele direkt auf Instagram.
              </p>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 h-[44px] px-7 rounded-[24px] bg-[#d4af37] text-[#090b10] font-sans font-black text-[18px] uppercase tracking-wide hover:bg-[#e8c75a] transition-colors"
              >
                <span>NACHRICHT SENDEN</span>
                <ChevronRight size={18} />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[14px] font-light text-white/70">
              © 2026 Locos Colectivos · Niederösterreich
            </div>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="w-[28px] h-[28px] rounded-full bg-[#d4af37] flex items-center justify-center text-[#090b10] hover:scale-105 transition-transform"
            >
              <Instagram size={15} />
            </a>
          </div>
        </div>
      </footer>

      {/* LIGHTBOX */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            aria-label="Schließen"
            className="absolute top-5 right-5 text-white/80 hover:text-[#d4af37]"
          >
            <X size={30} />
          </button>
          <img
            src={lightbox}
            alt="Vollbild"
            className="max-w-full max-h-[90vh] object-contain rounded-[10px] border border-[#d4af37]/30"
          />
        </div>
      )}
    </div>
  );
};

export default App;
