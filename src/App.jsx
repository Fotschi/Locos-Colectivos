import React, { useEffect, useState } from 'react';
import {
  Instagram,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowUpRight,
  MapPin,
  Sun,
  Moon,
  X
} from 'lucide-react';
import {
  INSTAGRAM,
  PAGES,
  HERO_SLIDES,
  QUICK_CARDS,
  KIT_CARDS,
  INITIAL_POSTS
} from './data/clubData';
import SquadSection from './components/SquadSection';
import BlogSection from './components/BlogSection';
import SpielplanSection from './components/SpielplanSection';
import HistorieSection from './components/HistorieSection';

function parseHash() {
  const raw = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (['blog', 'spielplan', 'trikots', 'kabine', 'historie', 'kontakt'].includes(raw)) return raw;
  return 'home';
}

const HOME_GROUNDS = [
  {
    place: '2112 Würnitz · Harmannsdorf',
    title: 'Sportplatz Würnitz',
    meta: 'Flutlicht-Testspiel · 5 : 7 vs. Tasmania Tresdorf',
    image: './images/tasmania-tresdorf-match.jpg',
    route: 'spielplan'
  },
  {
    place: '2111 Obergänserndorf · Am Sportplatz 2',
    title: 'Sportanlage TSU NeuMed',
    meta: 'Sommerfest 04. Juli 2026 · 3. Platz (0 : 1)',
    image: './images/stock-grass-line.jpg',
    route: 'spielplan'
  },
  {
    place: '2103 Langenzersdorf · Klosterneuburger Str. 21–23',
    title: 'Sportanlage SV Langenzersdorf',
    meta: 'Langenzersdorfer Dorfturnier · 02. Mai 2026',
    image: './images/stock-pitch-turf.jpg',
    route: 'historie'
  }
];

const App = () => {
  const [page, setPage] = useState(parseHash);
  const [slideIdx, setSlideIdx] = useState(0);
  const [lightbox, setLightbox] = useState(null);
  const [dark, setDark] = useState(() => {
    const saved = localStorage.getItem('locos-theme-v2');
    return saved ? saved === 'dark' : false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    localStorage.setItem('locos-theme-v2', dark ? 'dark' : 'light');
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

  const featuredPost = INITIAL_POSTS[0];
  const kitLead = KIT_CARDS[0];
  const kitDetails = KIT_CARDS.slice(1);

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#090b10] dark:bg-[#090b10] dark:text-[#f5f4f0] transition-colors duration-200">
      {/* 1. TOP BAR */}
      <div className="bg-[#06070b] border-b border-[#d4af37]/35 min-h-[38px] flex items-center">
        <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram @locoscolectivos"
              className="w-6 h-6 rounded-[2px] border border-[#d4af37]/60 bg-[#090b10] flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-[#090b10] transition-colors duration-200 cursor-pointer"
            >
              <Instagram size={13} />
            </a>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              className="text-white/90 hover:text-[#d4af37] text-[13px] font-medium tracking-wide transition-colors duration-200"
            >
              @locoscolectivos
            </a>
          </div>
          <span className="text-[#d4af37] text-[12px] font-medium tracking-[0.14em] uppercase hidden sm:inline">
            Gegründet April 2026 · Bezirk Korneuburg · colectivo sobre todo
          </span>
        </div>
      </div>

      {/* 2. NAVBAR */}
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-[#090b10]/95 backdrop-blur border-b border-black/15 dark:border-[#d4af37]/25">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-[74px] flex items-center justify-between gap-3">
          <div className="flex items-center min-w-0">
            <a
              href="#/"
              onClick={(e) => {
                e.preventDefault();
                navigate('home');
              }}
              className="shrink-0 flex items-center gap-3 cursor-pointer"
            >
              <img
                src="./images/logo-gold-black.jpg"
                alt="Locos Colectivos Wappen"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border border-[#d4af37]"
              />
            </a>
            <nav aria-label="Hauptnavigation" className="flex items-center ml-3 sm:ml-8 gap-1 sm:gap-4 overflow-x-auto no-scrollbar">
              {PAGES.filter((p) => p.id !== 'home').map((item) => (
                <a
                  key={item.id}
                  href={item.hash}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(item.id);
                  }}
                  className={`como-nav-link shrink-0 cursor-pointer text-[#090b10] hover:text-[#9a7b1c] dark:text-white/90 dark:hover:text-[#d4af37] ${
                    page === item.id ? 'active text-[#9a7b1c] dark:text-[#d4af37]' : ''
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <span className="hidden lg:inline text-[12px] uppercase tracking-[0.12em] font-semibold text-black/55 dark:text-white/55">
              Niederösterreich
            </span>
            <button
              type="button"
              onClick={() => setDark((d) => !d)}
              aria-label="Dark / Light Mode umschalten"
              className="cursor-pointer min-h-[36px] inline-flex items-center gap-1.5 px-3 py-1 rounded-[2px] border border-black/20 dark:border-[#d4af37]/45 bg-[#faf8f4] dark:bg-[#11141c] text-[#090b10] dark:text-[#d4af37] text-[12px] font-semibold uppercase tracking-wider hover:border-[#d4af37] transition-colors duration-200"
            >
              {dark ? <Sun size={13} /> : <Moon size={13} />}
              <span className="hidden sm:inline">{dark ? 'Hell' : 'Dunkel'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT */}
      <main className="flex-1">
        {page === 'home' && (
          <>
            {/* SEKTION 1: EDITORIAL HERO + ERGEBNIS-TICKET */}
            <section id="hero" className="relative bg-[#090b10] border-b border-[#d4af37]/40">
              <div className="relative w-full h-[64vh] sm:h-[640px] overflow-hidden bg-[#090b10]">
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
                  className={`relative z-10 w-full h-full ${
                    currentSlide.zoomOut ? 'object-contain' : `object-cover ${currentSlide.position}`
                  } transition-opacity duration-300`}
                />
                <div
                  className="absolute inset-0 z-10 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(180deg, rgba(9,11,16,0.1) 0%, rgba(9,11,16,0.35) 50%, rgba(9,11,16,0.92) 100%)'
                  }}
                />

                {/* Slider Controls */}
                <div className="z-20 absolute top-5 right-4 sm:right-10 flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label="Vorheriges Bild"
                    className="cursor-pointer w-10 h-10 rounded-[2px] bg-[#090b10]/85 border border-[#d4af37]/50 hover:border-[#d4af37] text-white flex items-center justify-center transition-colors duration-200"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label="Nächstes Bild"
                    className="cursor-pointer w-10 h-10 rounded-[2px] bg-[#090b10]/85 border border-[#d4af37]/50 hover:border-[#d4af37] text-white flex items-center justify-center transition-colors duration-200"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                {/* Asymmetrischer Hero-Footer */}
                <div className="z-20 absolute inset-x-0 bottom-0 px-4 sm:px-6 lg:px-10 pb-6 sm:pb-10">
                  <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-4 items-end">
                    <div className="lg:col-span-8 bg-[#090b10]/92 border border-[#d4af37]/45 border-t-2 border-t-[#d4af37] p-5 sm:p-7 rounded-[2px]">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#d4af37] mb-1.5">
                        Locos Colectivos · Kleinfeld &amp; Turniere · NÖ
                      </div>
                      <h1 className="como-title text-white text-[24px] sm:text-[36px] leading-[1.15]">
                        {currentSlide.title}
                      </h1>
                      <div className="mt-4 flex flex-wrap items-center gap-3">
                        {currentSlide.externalHref ? (
                          <a
                            href={currentSlide.externalHref}
                            target="_blank"
                            rel="noreferrer"
                            className="cursor-pointer inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#e8c75a] text-[#090b10] rounded-[2px] px-5 py-2 font-sans font-bold text-[13px] uppercase tracking-[0.1em] transition-colors duration-200"
                          >
                            <span>{currentSlide.ctaLabel}</span>
                          </a>
                        ) : (
                          <button
                            type="button"
                            onClick={() => navigate(currentSlide.route)}
                            className="cursor-pointer inline-flex items-center gap-2 bg-[#d4af37] hover:bg-[#e8c75a] text-[#090b10] rounded-[2px] px-5 py-2 font-sans font-bold text-[13px] uppercase tracking-[0.1em] transition-colors duration-200"
                          >
                            <span>{currentSlide.ctaLabel}</span>
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => navigate('historie')}
                          className="cursor-pointer inline-flex items-center gap-1.5 border border-white/25 hover:border-[#d4af37] text-white/90 hover:text-[#d4af37] rounded-[2px] px-4 py-2 font-sans font-semibold text-[13px] uppercase tracking-[0.1em] transition-colors duration-200"
                        >
                          <span>Vereinschronik</span>
                        </button>
                      </div>
                    </div>

                    <div
                      onClick={() => navigate('spielplan')}
                      className="cursor-pointer lg:col-span-4 bg-[#faf8f4] text-[#090b10] border border-[#d4af37] p-5 rounded-[2px] hover:bg-white transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between border-b border-black/15 pb-2 mb-3">
                        <span className="font-sans font-bold text-[11px] uppercase tracking-[0.14em] text-[#9a7b1c]">
                          Letztes Ergebnis · Würnitz
                        </span>
                        <ArrowUpRight size={15} className="text-[#9a7b1c]" />
                      </div>
                      <div className="flex items-baseline justify-between gap-2">
                        <div className="font-serif font-bold text-[17px] leading-snug">
                          Tasmania Tresdorf – Locos
                        </div>
                        <div className="font-serif font-bold text-[24px] text-[#9a7b1c] shrink-0">
                          5 : 7
                        </div>
                      </div>
                      <div className="mt-2 pt-2 border-t border-black/10 flex items-center justify-between text-[13px] text-black/70">
                        <span>04. Juli · Obergänserndorf</span>
                        <span className="font-semibold text-[#090b10]">3. Platz (0 : 1)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 4 BILD-KACHELN IM COMO-LOOK MIT FEINEM RAND */}
            <section className="py-12 bg-white dark:bg-[#090b10] border-b border-black/15 dark:border-[#d4af37]/25">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
                        className="cursor-pointer group relative block aspect-[4/5] rounded-[2px] overflow-hidden bg-[#090b10] border border-black/15 dark:border-[#d4af37]/35 hover:border-[#d4af37] transition-colors duration-200"
                      >
                        <img
                          src={card.src}
                          alt={card.title}
                          className={`absolute inset-0 w-full h-full object-cover ${card.pos} opacity-90 group-hover:opacity-100 transition-opacity duration-200`}
                        />
                        <div
                          className="absolute inset-x-0 bottom-0 h-[175px]"
                          style={{
                            background: 'linear-gradient(0deg, rgba(9, 11, 16, 0.85) 0%, rgba(9, 11, 16, 0) 100%)'
                          }}
                        />
                        <div className="absolute left-3.5 right-3.5 bottom-3.5 bg-[#faf8f4]/95 dark:bg-[#090b10]/95 border border-[#d4af37]/80 border-t-2 border-t-[#d4af37] rounded-[2px] px-4 py-3.5 flex flex-col items-center justify-center text-center text-[#090b10] dark:text-white">
                          <Icon size={19} strokeWidth={1.8} className="mb-1 text-[#9a7b1c] dark:text-[#d4af37]" />
                          <div className="como-title text-[18px] leading-snug text-[#090b10] dark:text-white">
                            {card.title}
                          </div>
                          <div className="mt-0.5 font-sans font-semibold text-[11px] tracking-[0.1em] text-[#9a7b1c] dark:text-[#d4af37] uppercase">
                            {card.sub}
                          </div>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </div>
            </section>

            {/* SEKTION 01: ASYMMETRISCHES 8/4 MAGAZIN-RASTER AUF #FAF8F4 */}
            <section className="py-14 sm:py-20 bg-[#faf8f4] dark:bg-[#0d1017] border-b border-black/15 dark:border-[#d4af37]/25">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 mb-10 border-b border-black/15 dark:border-white/15">
                  <div className="flex items-baseline gap-4">
                    <span className="font-sans font-bold text-[12px] uppercase tracking-[0.16em] text-[#9a7b1c] dark:text-[#d4af37]">
                      01 · Spielbetrieb &amp; Journal
                    </span>
                    <h2 className="como-title text-[28px] sm:text-[34px] text-[#090b10] dark:text-white">
                      Vom Platz &amp; den Turnieren
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('blog')}
                    className="cursor-pointer font-sans font-semibold text-[14px] uppercase tracking-[0.08em] text-[#9a7b1c] dark:text-[#d4af37] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Zum gesamten Journal</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  {/* 8 Spalten: Großer Leitbericht Würnitz 5:7 */}
                  <article className="lg:col-span-8 bg-white dark:bg-[#11141c] border border-black/15 dark:border-[#d4af37]/30 rounded-[2px] overflow-hidden">
                    <div
                      onClick={() => setLightbox(featuredPost.images[0])}
                      className="aspect-[16/10] bg-[#090b10] overflow-hidden cursor-pointer border-b border-black/15 dark:border-white/10"
                    >
                      <img
                        src={featuredPost.images[0]}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover object-center hover:opacity-95 transition-opacity duration-200"
                      />
                    </div>
                    <div className="p-6 sm:p-8">
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-4 border-b border-black/10 dark:border-white/10 text-[13px]">
                        <span className="inline-flex items-center gap-1.5 font-semibold text-[#9a7b1c] dark:text-[#d4af37] uppercase tracking-[0.1em]">
                          <MapPin size={13} />
                          {featuredPost.location} · {featuredPost.date}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-[2px] border border-[#d4af37]/60 bg-[#090b10] text-[#d4af37] font-serif font-bold text-[14px]">
                          {featuredPost.scoreBadge}
                        </span>
                      </div>
                      <h3 className="como-title text-[24px] sm:text-[30px] leading-[1.2] text-[#090b10] dark:text-white">
                        {featuredPost.title}
                      </h3>
                      <p className="mt-3 font-sans text-[16px] leading-[1.65] text-black/80 dark:text-white/80 whitespace-pre-line">
                        {featuredPost.caption}
                      </p>
                      <div className="mt-5 pt-4 border-t border-black/10 dark:border-white/10 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex flex-wrap gap-2">
                          {featuredPost.hashtags.map((tag) => (
                            <span
                              key={tag}
                              className="text-[13px] font-medium text-[#9a7b1c] dark:text-[#d4af37]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          onClick={() => navigate('blog')}
                          className="cursor-pointer font-sans font-bold text-[13px] uppercase tracking-[0.1em] text-[#090b10] dark:text-[#d4af37] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Weiterlesen</span>
                          <ArrowUpRight size={14} />
                        </button>
                      </div>
                    </div>
                  </article>

                  {/* 4 Spalten: Turnier-Dossier & Bild-Callout */}
                  <div className="lg:col-span-4 space-y-5">
                    <div className="bg-white dark:bg-[#11141c] border border-black/15 dark:border-[#d4af37]/30 border-t-2 border-t-[#d4af37] p-6 rounded-[2px]">
                      <div className="font-sans font-bold text-[11px] uppercase tracking-[0.16em] text-[#9a7b1c] dark:text-[#d4af37]">
                        Turnier-Chronik 2026
                      </div>
                      <div className="mt-4 divide-y divide-black/10 dark:divide-white/10">
                        <div className="pb-4">
                          <div className="text-[12px] font-semibold text-black/55 dark:text-white/55">
                            04. Juli 2026 · 2111 Obergänserndorf
                          </div>
                          <div className="font-serif font-bold text-[19px] text-[#090b10] dark:text-white mt-0.5">
                            3. Platz · Sommerfest TSU NeuMed
                          </div>
                          <p className="mt-1 text-[14px] text-black/75 dark:text-white/75 leading-relaxed">
                            1 : 0 im Spiel um Platz 3 gegen Tasmania Tresdorf am Sportplatz Obergänserndorf – Beginn der Freundschaft beider Teams.
                          </p>
                        </div>

                        <div className="py-4">
                          <div className="text-[12px] font-semibold text-black/55 dark:text-white/55">
                            02. Mai 2026 · 2103 Langenzersdorf
                          </div>
                          <div className="font-serif font-bold text-[19px] text-[#090b10] dark:text-white mt-0.5">
                            Langenzersdorfer Dorfturnier
                          </div>
                          <p className="mt-1 text-[14px] text-black/75 dark:text-white/75 leading-relaxed">
                            Turnierauftritt auf der Sportanlage des SV Langenzersdorf (Klosterneuburger Str. 21–23).
                          </p>
                        </div>

                        <div className="pt-4">
                          <div className="text-[12px] font-semibold text-black/55 dark:text-white/55">
                            April 2026 · Niederösterreich
                          </div>
                          <div className="font-serif font-bold text-[19px] text-[#090b10] dark:text-white mt-0.5">
                            Gründung Locos Colectivos
                          </div>
                          <p className="mt-1 text-[14px] text-black/75 dark:text-white/75 leading-relaxed">
                            Aus ersten gemeinsamen Turnieren als Gruppe entsteht der Verein mit 18 Kaderspielern in Schwarz &amp; Gold.
                          </p>
                        </div>
                      </div>

                      <div className="mt-5 pt-4 border-t border-black/15 dark:border-white/15 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={() => navigate('spielplan')}
                          className="cursor-pointer font-sans font-bold text-[13px] uppercase tracking-[0.1em] text-[#9a7b1c] dark:text-[#d4af37] hover:underline inline-flex items-center gap-1"
                        >
                          <span>Alle Spiele &amp; Details</span>
                          <ArrowUpRight size={14} />
                        </button>
                        <button
                          type="button"
                          onClick={() => navigate('historie')}
                          className="cursor-pointer font-sans font-semibold text-[13px] text-black/65 dark:text-white/65 hover:text-[#9a7b1c] dark:hover:text-[#d4af37]"
                        >
                          Chronik →
                        </button>
                      </div>
                    </div>

                    {/* Testspiel-Ticket mit Stock-Foto */}
                    <div className="bg-[#090b10] text-white border border-[#d4af37]/50 rounded-[2px] overflow-hidden">
                      <div className="aspect-[16/9] overflow-hidden border-b border-[#d4af37]/30">
                        <img
                          src="./images/stock-goal-net.jpg"
                          alt="Anstoß auf dem Rasen"
                          className="w-full h-full object-cover object-center opacity-90"
                        />
                      </div>
                      <div className="p-6">
                        <div className="font-sans font-bold text-[11px] uppercase tracking-[0.16em] text-[#d4af37]">
                          Gegner gesucht · Kleinfeld NÖ
                        </div>
                        <div className="como-title text-[22px] mt-1">
                          Testspiel oder Turnier-Einladung?
                        </div>
                        <p className="mt-2 text-[14px] text-white/75 leading-relaxed">
                          Wir treten im Raum Korneuburg &amp; Weinviertel gerne zu Freundschaftsspielen und Hobbyturnieren an.
                        </p>
                        <button
                          type="button"
                          onClick={() => navigate('kontakt')}
                          className="cursor-pointer mt-4 w-full py-2.5 rounded-[2px] border border-[#d4af37] bg-[#d4af37] hover:bg-[#e8c75a] text-[#090b10] font-sans font-bold text-[13px] uppercase tracking-[0.1em] transition-colors duration-200"
                        >
                          Anfrage stellen
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* SEKTION 02: DER VEREIN & SPIELORTE */}
            <section className="py-14 sm:py-20 bg-white dark:bg-[#090b10] border-b border-black/15 dark:border-[#d4af37]/25">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 mb-10 border-b border-black/15 dark:border-white/15">
                  <div className="flex items-baseline gap-4">
                    <span className="font-sans font-bold text-[12px] uppercase tracking-[0.16em] text-[#9a7b1c] dark:text-[#d4af37]">
                      02 · Identität &amp; Plätze
                    </span>
                    <h2 className="como-title text-[28px] sm:text-[34px] text-[#090b10] dark:text-white">
                      colectivo sobre todo
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('historie')}
                    className="cursor-pointer font-sans font-semibold text-[14px] uppercase tracking-[0.08em] text-[#9a7b1c] dark:text-[#d4af37] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Zur Vereinschronik</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>

                {/* Story + 2 Atmosphären-Bilder */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
                  <div className="lg:col-span-6 space-y-4">
                    <div className="inline-block border-l-2 border-[#d4af37] pl-3 font-sans font-bold text-[11px] uppercase tracking-[0.16em] text-[#9a7b1c] dark:text-[#d4af37]">
                      Gegründet im April 2026 · Niederösterreich
                    </div>
                    <h3 className="como-title text-[28px] sm:text-[36px] leading-[1.15] text-[#090b10] dark:text-white">
                      Vom gemeinsamen Turnierstart zum festen Verein in Schwarz &amp; Gold.
                    </h3>
                    <p className="font-sans text-[16px] leading-[1.65] text-black/80 dark:text-white/80">
                      Aus ersten Turnier-Auftritten als Freundesgruppe entstand im April 2026 Locos Colectivos.
                      Heute stehen wir mit eigenem Wappen, maßgeschneiderten Match-Trikots und 18 gemeldeten Spielern bei Kleinfeld- und Hobbyturnieren im Bezirk Korneuburg auf dem Platz.
                    </p>
                    <div className="pt-4 grid grid-cols-3 gap-4 border-t border-black/15 dark:border-white/15">
                      <div>
                        <div className="font-serif font-bold text-[26px] text-[#9a7b1c] dark:text-[#d4af37]">April 2026</div>
                        <div className="text-[13px] text-black/65 dark:text-white/65">Gründung</div>
                      </div>
                      <div>
                        <div className="font-serif font-bold text-[26px] text-[#090b10] dark:text-white">3 Plätze</div>
                        <div className="text-[13px] text-black/65 dark:text-white/65">Bezirk Korneuburg</div>
                      </div>
                      <div>
                        <div className="font-serif font-bold text-[26px] text-[#090b10] dark:text-white">18 Mann</div>
                        <div className="text-[13px] text-black/65 dark:text-white/65">Fester Kader</div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 grid grid-cols-2 gap-4">
                    <div
                      onClick={() => setLightbox('./images/locker-room.jpg')}
                      className="cursor-pointer rounded-[2px] overflow-hidden border border-black/15 dark:border-[#d4af37]/30 bg-[#090b10] aspect-[4/5]"
                    >
                      <img
                        src="./images/locker-room.jpg"
                        alt="Kabine #77 #22 #7"
                        className="w-full h-full object-cover object-center hover:opacity-95 transition-opacity duration-200"
                      />
                    </div>
                    <div
                      onClick={() => setLightbox('./images/stock-ball-grass.jpg')}
                      className="cursor-pointer rounded-[2px] overflow-hidden border border-black/15 dark:border-[#d4af37]/30 bg-[#090b10] aspect-[4/5] mt-6"
                    >
                      <img
                        src="./images/stock-ball-grass.jpg"
                        alt="Spielball auf dem Rasen"
                        className="w-full h-full object-cover object-center hover:opacity-95 transition-opacity duration-200"
                      />
                    </div>
                  </div>
                </div>

                {/* 3 Bild-Karten: Unsere bisherigen Spielorte */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {HOME_GROUNDS.map((ground) => (
                    <div
                      key={ground.title}
                      onClick={() => navigate(ground.route)}
                      className="cursor-pointer group bg-[#faf8f4] dark:bg-[#11141c] border border-black/15 dark:border-[#d4af37]/30 rounded-[2px] overflow-hidden hover:border-[#d4af37] transition-colors duration-200"
                    >
                      <div className="aspect-[16/10] bg-[#090b10] overflow-hidden border-b border-black/15 dark:border-white/10">
                        <img
                          src={ground.image}
                          alt={ground.title}
                          className="w-full h-full object-cover object-center group-hover:opacity-95 transition-opacity duration-200"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-1.5 font-sans font-bold text-[11px] uppercase tracking-[0.14em] text-[#9a7b1c] dark:text-[#d4af37]">
                          <MapPin size={12} />
                          <span>{ground.place}</span>
                        </div>
                        <div className="como-title text-[21px] text-[#090b10] dark:text-white mt-1">
                          {ground.title}
                        </div>
                        <div className="mt-1.5 text-[14px] text-black/75 dark:text-white/75">
                          {ground.meta}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* SEKTION 03: ASYMMETRISCHES TRIKOT-LOOKBOOK (6/6 SPLIT AUF #FAF8F4) */}
            <section className="py-14 sm:py-20 bg-[#faf8f4] dark:bg-[#0d1017]">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
                <div className="flex flex-wrap items-baseline justify-between gap-4 pb-4 mb-10 border-b border-black/15 dark:border-white/15">
                  <div className="flex items-baseline gap-4">
                    <span className="font-sans font-bold text-[12px] uppercase tracking-[0.16em] text-[#9a7b1c] dark:text-[#d4af37]">
                      03 · Ausstattung
                    </span>
                    <h2 className="como-title text-[28px] sm:text-[34px] text-[#090b10] dark:text-white">
                      Match Kit 2026 · Schwarz &amp; Gold
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('trikots')}
                    className="cursor-pointer font-sans font-semibold text-[14px] uppercase tracking-[0.08em] text-[#9a7b1c] dark:text-[#d4af37] hover:underline inline-flex items-center gap-1"
                  >
                    <span>Zur Trikot-Ansicht</span>
                    <ArrowUpRight size={15} />
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                  <div
                    onClick={() => setLightbox(kitLead.src)}
                    className="lg:col-span-6 cursor-pointer border border-black/15 dark:border-[#d4af37]/30 rounded-[2px] bg-[#0c0f15] overflow-hidden flex flex-col justify-between group"
                  >
                    <div className="aspect-[4/5] overflow-hidden">
                      <img
                        src={kitLead.src}
                        alt={kitLead.title}
                        className="w-full h-full object-cover object-top group-hover:opacity-95 transition-opacity duration-200"
                      />
                    </div>
                    <div className="p-5 bg-white dark:bg-[#11141c] border-t border-black/15 dark:border-white/10 flex items-baseline justify-between gap-4">
                      <span className="font-serif font-bold text-[20px] text-[#090b10] dark:text-white">
                        {kitLead.title}
                      </span>
                      <span className="font-sans font-semibold text-[13px] uppercase tracking-wider text-[#9a7b1c] dark:text-[#d4af37]">
                        {kitLead.meta}
                      </span>
                    </div>
                  </div>

                  <div className="lg:col-span-6 flex flex-col justify-between gap-6">
                    <div className="border border-black/15 dark:border-[#d4af37]/30 border-t-2 border-t-[#d4af37] bg-white dark:bg-[#11141c] p-6 sm:p-7 rounded-[2px]">
                      <div className="font-sans font-bold text-[11px] uppercase tracking-[0.16em] text-[#9a7b1c] dark:text-[#d4af37]">
                        Offizielle Spielkleidung · Juli 2026
                      </div>
                      <h3 className="como-title text-[24px] sm:text-[28px] text-[#090b10] dark:text-white mt-1">
                        Einheitlicher Auftritt von #1 bis #99
                      </h3>
                      <p className="mt-2.5 text-[16px] text-black/75 dark:text-white/75 leading-relaxed">
                        Goldenes Match-Trikot mit schwarzem Kragen, gesticktem LC-2026-Wappen auf Brust und Hose sowie klarer Rückennummerierung für alle 18 Kaderspieler.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      {kitDetails.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => setLightbox(item.src)}
                          className="cursor-pointer border border-black/15 dark:border-[#d4af37]/30 rounded-[2px] bg-white dark:bg-[#11141c] overflow-hidden hover:border-[#d4af37] transition-colors duration-200"
                        >
                          <div className="aspect-[3/4] bg-[#0c0f15] overflow-hidden">
                            <img
                              src={item.src}
                              alt={item.title}
                              className="w-full h-full object-cover object-top"
                            />
                          </div>
                          <div className="p-3.5 border-t border-black/10 dark:border-white/10">
                            <div className="font-serif font-bold text-[15px] leading-snug text-[#090b10] dark:text-white">
                              {item.title}
                            </div>
                            <div className="mt-1 text-[12px] font-medium text-[#9a7b1c] dark:text-[#d4af37]">
                              {item.meta}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* EIGENE SEITE: BLOG / JOURNAL */}
        {page === 'blog' && (
          <BlogSection
            posts={INITIAL_POSTS}
            navigate={navigate}
            setLightbox={setLightbox}
          />
        )}

        {/* EIGENE SEITE: SPIELPLAN */}
        {page === 'spielplan' && <SpielplanSection navigate={navigate} />}

        {/* EIGENE SEITE: TRIKOTS */}
        {page === 'trikots' && (
          <section id="trikot" className="py-12 bg-[#faf8f4] dark:bg-[#090b10]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
              <button
                type="button"
                onClick={() => navigate('home')}
                className="cursor-pointer inline-flex items-center gap-1.5 font-sans font-semibold text-[15px] text-[#9a7b1c] dark:text-[#d4af37] hover:underline mb-6"
              >
                <ArrowLeft size={16} />
                <span>Zurück zur Startseite</span>
              </button>

              <div className="flex flex-wrap items-center justify-between gap-4 pb-4 mb-8 border-b border-black/15 dark:border-white/15">
                <h1 className="como-title text-[32px] sm:text-[40px] leading-[1.2] text-[#090b10] dark:text-white">
                  Unsere Match Trikots
                </h1>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#9a7b1c] dark:text-[#d4af37] font-sans font-semibold text-[15px] hover:underline inline-flex items-center gap-1"
                >
                  <span>@locoscolectivos</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {KIT_CARDS.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setLightbox(card.src)}
                    className="cursor-pointer bg-white dark:bg-[#11141c] border border-black/15 dark:border-[#d4af37]/30 rounded-[2px] overflow-hidden group flex flex-col justify-between hover:border-[#d4af37] transition-colors duration-200"
                  >
                    <div className="aspect-[3/4] overflow-hidden bg-[#0c0f15]">
                      <img
                        src={card.src}
                        alt={card.title}
                        className="w-full h-full object-cover object-top opacity-95 group-hover:opacity-100 transition-opacity duration-200"
                      />
                    </div>
                    <div className="p-4 border-t border-black/10 dark:border-white/10">
                      <div className="font-serif font-semibold text-[18px] leading-snug text-[#090b10] dark:text-white min-h-[2.4em]">
                        {card.title}
                      </div>
                      <div className="mt-1.5 font-sans font-medium text-[14px] text-[#9a7b1c] dark:text-[#d4af37]">
                        {card.meta}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* EIGENE SEITE: KABINE & KADER */}
        {page === 'kabine' && (
          <SquadSection navigate={navigate} setLightbox={setLightbox} />
        )}

        {/* EIGENE SEITE: HISTORIE */}
        {page === 'historie' && (
          <HistorieSection navigate={navigate} setLightbox={setLightbox} />
        )}

        {/* EIGENE SEITE: KONTAKT */}
        {page === 'kontakt' && (
          <section id="kontakt" className="py-14 bg-[#faf8f4] dark:bg-[#090b10]">
            <div className="max-w-3xl mx-auto px-4 sm:px-6">
              <button
                type="button"
                onClick={() => navigate('home')}
                className="cursor-pointer inline-flex items-center gap-1.5 font-sans font-semibold text-[15px] text-[#9a7b1c] dark:text-[#d4af37] hover:underline mb-6"
              >
                <ArrowLeft size={16} />
                <span>Zurück zur Startseite</span>
              </button>

              <div className="rounded-[2px] bg-white dark:bg-[#11141c] border border-black/15 dark:border-[#d4af37]/40 border-t-2 border-t-[#d4af37] p-8 sm:p-12 text-center">
                <img
                  src="./images/logo-gold-black.jpg"
                  alt="Locos Colectivos"
                  className="w-24 h-24 rounded-full object-cover border border-[#d4af37] mx-auto mb-6"
                />
                <h1 className="como-title text-[32px] sm:text-[40px] text-[#090b10] dark:text-white">
                  Turnier oder Testspiel?
                </h1>
                <p className="mt-4 font-sans text-[17px] text-black/75 dark:text-white/75 leading-relaxed">
                  Ihr veranstaltet ein Kleinfeld- oder Hobbyturnier in Niederösterreich oder sucht einen Gegner?
                  Schreibt uns direkt auf Instagram.
                </p>
                <a
                  href={INSTAGRAM}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer mt-8 min-h-[44px] inline-flex items-center justify-center gap-2 px-7 rounded-[2px] bg-[#d4af37] hover:bg-[#e8c75a] text-[#090b10] font-sans font-bold text-[14px] uppercase tracking-[0.1em] transition-colors duration-200"
                >
                  <Instagram size={17} />
                  <span>@locoscolectivos</span>
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* SCHWARZ-GOLD FOOTER */}
      <footer className="bg-[#06070b] text-white pt-12 pb-8 border-t border-[#d4af37]/35">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-4 items-start">
            <div className="md:col-span-3 flex items-center gap-4">
              <img
                src="./images/logo-gold-black.jpg"
                alt="LC 2026"
                className="w-[68px] h-[68px] rounded-full object-cover border border-[#d4af37] shrink-0"
              />
              <div>
                <div className="como-title text-[19px] text-white leading-tight">LOCOS COLECTIVOS</div>
                <div className="font-serif italic text-[14px] text-[#d4af37] mt-0.5">
                  colectivo sobre todo
                </div>
              </div>
            </div>

            <div className="md:col-span-3 space-y-2">
              <div className="font-sans font-bold text-[11px] tracking-[0.16em] uppercase text-[#d4af37] mb-3">
                Navigation
              </div>
              {PAGES.map((item) => (
                <div key={item.id}>
                  <a
                    href={item.hash}
                    onClick={(e) => {
                      e.preventDefault();
                      navigate(item.id);
                    }}
                    className="cursor-pointer text-[14px] text-white/80 hover:text-[#d4af37] transition-colors duration-200"
                  >
                    {item.label}
                  </a>
                </div>
              ))}
            </div>

            <div className="md:col-span-3 space-y-2">
              <div className="font-sans font-bold text-[11px] tracking-[0.16em] uppercase text-[#d4af37] mb-3">
                Spielorte &amp; Bilanz
              </div>
              <div className="text-[14px] text-white/80">2112 Würnitz · Auswärtssieg 5 : 7</div>
              <div className="text-[14px] text-white/80">2111 Obergänserndorf · 3. Platz (0 : 1)</div>
              <div className="text-[14px] text-white/80">2103 Langenzersdorf · Dorfturnier</div>
            </div>

            <div className="md:col-span-3 space-y-4">
              <div className="font-sans font-bold text-[11px] tracking-[0.16em] uppercase text-[#d4af37]">
                Kontakt
              </div>
              <p className="text-[14px] text-white/75 leading-relaxed">
                Für Turnier-Einladungen oder Testspiele im Raum Korneuburg &amp; NÖ direkt per DM melden.
              </p>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="cursor-pointer min-h-[40px] inline-flex items-center justify-center gap-2 px-5 rounded-[2px] bg-[#d4af37] text-[#090b10] font-sans font-bold text-[13px] uppercase tracking-[0.1em] hover:bg-[#e8c75a] transition-colors duration-200"
              >
                <span>Nachricht senden</span>
                <ChevronRight size={15} />
              </a>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-[13px] text-white/60">
              © 2026 Locos Colectivos · Gegründet April 2026 · Niederösterreich
            </div>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="cursor-pointer w-7 h-7 rounded-[2px] border border-[#d4af37]/60 flex items-center justify-center text-[#d4af37] hover:bg-[#d4af37] hover:text-[#090b10] transition-colors duration-200"
            >
              <Instagram size={14} />
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
            className="cursor-pointer absolute top-5 right-5 w-10 h-10 rounded-[2px] bg-black/70 border border-[#d4af37]/50 text-white/85 hover:text-[#d4af37] flex items-center justify-center transition-colors duration-200"
          >
            <X size={22} />
          </button>
          <img
            src={lightbox}
            alt="Vollbild"
            className="max-w-full max-h-[90vh] object-contain rounded-[2px] border border-[#d4af37]/40"
          />
        </div>
      )}
    </div>
  );
};

export default App;
