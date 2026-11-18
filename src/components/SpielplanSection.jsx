import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Calendar,
  MapPin,
  Trophy,
  Users,
  X
} from 'lucide-react';
import { INSTAGRAM } from '../data/clubData';

const MATCHES = [
  {
    id: 'tresdorf-5-7',
    badge: 'FLUTLICHT-TESTSPIEL',
    title: 'Tasmania Tresdorf – Locos Colectivos',
    headline: '5 : 7',
    category: 'HERREN · KLEINFELD',
    resultText: 'Auswärtssieg unter Flutlicht',
    venueShort: 'Sportplatz Würnitz',
    homeShort: 'TT',
    score: '5 : 7',
    ctaLabel: 'Spielbericht & Infos',
    image: './images/tasmania-tresdorf-match.jpg',
    details: {
      date: 'Saison 2026 · Flutlicht',
      address: 'Sportplatz Würnitz, Harmannsdorf (Bezirk Korneuburg, NÖ)',
      organizer: 'Testspiel gegen @tasmania_tresdorf',
      summary:
        'Hochklassige Kleinfeld-Partie auf Augenhöhe unter Flutlicht in Würnitz. Nach intensivem Schlagabtausch setzen sich die Locos am Ende verdient mit 7:5 durch.',
      facts: [
        'Format: Herren Kleinfeld · Flutlichtspiel',
        'Torschützen Tasmania: 3x @stefan_thal, 1x @da_vo2410, 1x Eigentor',
        'Besonderheit: Starke Torwart-Leistung von @jakobpaul_ & extrem faire Partie'
      ],
      externalHref: 'https://www.instagram.com/tasmania_tresdorf/',
      externalLabel: 'Beitrag auf Instagram'
    }
  },
  {
    id: 'obergaenserndorf-0-1',
    badge: 'SPIEL UM PLATZ 3',
    title: 'Tasmania Tresdorf – Locos Colectivos',
    headline: '04. Juli 2026',
    category: 'HERREN · HOBBYTURNIER',
    resultText: 'Endergebnis: 0 : 1 (3. Platz)',
    venueShort: 'Jugend TSU NeuMed Obergänserndorf',
    homeShort: 'TT',
    score: '0 : 1',
    ctaLabel: 'Turnier-Infos',
    image: './images/team-goal.jpg',
    details: {
      date: '04. Juli 2026',
      address: 'Am Sportplatz 2, 2111 Obergänserndorf (Gemeinde Harmannsdorf, NÖ)',
      organizer: 'TSU NeuMed Obergänserndorf · Sommerfest & Hobbyturnier',
      summary:
        'Im Rahmen des traditionellen Sommerfests der TSU NeuMed Obergänserndorf sicherten sich die Locos Colectivos im kleinen Finale gegen Tasmania Tresdorf mit einem knappen 1:0 den 3. Platz. Aus dem Duell entstand eine sportliche Freundschaft zwischen beiden Teams.',
      facts: [
        'Turnier: Hobbyturnier beim Sommerfest der Jugend TSU NeuMed Obergänserndorf',
        'Platzierung: 3. Platz am Turnier-Podium',
        'Besonderheit: Beginn der Team-Freundschaft mit @tasmania_tresdorf',
        'Austragungsort: Sportanlage Obergänserndorf (Bezirk Korneuburg)'
      ],
      externalHref: INSTAGRAM,
      externalLabel: '@locoscolectivos auf Instagram'
    }
  },
  {
    id: 'langenzersdorf-turnier',
    badge: 'LANGENZERSDORFER DORFTURNIER',
    title: 'Langenzersdorfer Dorfturnier',
    headline: '02. Mai 2026',
    category: 'HERREN · KLEINFELD',
    resultText: 'Teilnahme · 2103 Langenzersdorf',
    venueShort: 'Sportanlage SV Langenzersdorf',
    homeShort: 'LE',
    score: 'LE',
    ctaLabel: 'Turnier-Infos',
    image: './images/stock-pitch-turf.jpg',
    details: {
      date: '02. Mai 2026',
      address:
        'Klosterneuburger Straße 21–23 / Kunstrasen Johann-Masser-Weg 6, 2103 Langenzersdorf (Bezirk Korneuburg)',
      organizer: 'Langenzersdorfer Dorfturnier · SV Langenzersdorf (SVLE 1919)',
      summary:
        'Einer der ersten gemeinsamen Turnierauftritte von Locos Colectivos kurz nach der Gründung im April 2026 – beim traditionellen Langenzersdorfer Dorfturnier.',
      facts: [
        'Veranstalter: SV Langenzersdorf (SVLE 1919)',
        'Sportstätten: Hauptspielfeld Klosterneuburger Str. 21–23 & Kunstrasen Johann-Masser-Weg 6',
        'Region: Bezirk Korneuburg, Niederösterreich'
      ],
      externalHref: INSTAGRAM,
      externalLabel: '@locoscolectivos auf Instagram'
    }
  },
  {
    id: 'anfrage-2026',
    badge: 'FREUNDSCHAFTSSPIEL / TURNIER',
    title: 'Locos Colectivos – Euer Team?',
    headline: 'Saison 2026',
    category: 'HERREN · KLEINFELD',
    resultText: 'Termin nach Vereinbarung',
    venueShort: 'Niederösterreich · Raum Korneuburg',
    homeShort: '?',
    score: 'VS',
    ctaLabel: 'Spiel anfragen',
    image: './images/stock-ball-grass.jpg',
    details: {
      date: 'Saison 2026 · Laufend',
      address: 'Niederösterreich (Schwerpunkt Bezirk Korneuburg & Weinviertel)',
      organizer: 'Locos Colectivos',
      summary:
        'Ihr veranstaltet ein Hobby- oder Kleinfeldturnier in Niederösterreich oder sucht ein faires Team für ein Testspiel unter Flutlicht? Meldet euch direkt bei uns.',
      facts: [
        'Kaderstärke: 18 Spieler (3 TW, 5 ABW, 6 MF, 4 ST)',
        'Spielform: Kleinfeld / Hobbyturniere / Freundschaftsspiele',
        'Kontakt: Direkt per DM über @locoscolectivos auf Instagram'
      ],
      externalHref: INSTAGRAM,
      externalLabel: 'Direkt auf Instagram schreiben'
    }
  }
];

const SpielplanSection = ({ navigate }) => {
  const [selectedMatch, setSelectedMatch] = useState(null);

  return (
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

        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8 pb-4 border-b border-black/10 dark:border-white/10">
          <div className="flex flex-wrap items-baseline gap-5">
            <h1 className="como-title text-[34px] sm:text-[42px] leading-[1.15] text-[#090b10] dark:text-white">
              Spielplan &amp; Ergebnisse
            </h1>
            <span className="font-sans font-bold text-[15px] uppercase tracking-wider text-[#b48f22] dark:text-[#d4af37]">
              Kleinfeld · Niederösterreich
            </span>
          </div>
          <span className="font-sans text-[15px] text-black/55 dark:text-white/55">
            Klicke auf eine Partie für Details &amp; Turnier-Infos
          </span>
        </div>

        {/* 4-Spalten Match-Grid (sauber ohne cut-corner) */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {MATCHES.map((match) => (
            <div
              key={match.id}
              onClick={() => setSelectedMatch(match)}
              className="cursor-pointer rounded-[4px] border border-black/15 dark:border-white/15 border-t-2 border-t-[#d4af37] bg-[#f5f4f0] dark:bg-[#11141c] p-6 min-h-[430px] flex flex-col justify-between hover:border-[#d4af37] transition-colors group"
            >
              <div>
                <div className="font-sans font-bold text-[14px] uppercase tracking-wider text-[#b48f22] dark:text-[#d4af37]">
                  {match.badge}
                </div>
                <div className="mt-3">
                  <div className="font-serif font-bold text-[20px] text-[#090b10] dark:text-white leading-snug">
                    {match.title}
                  </div>
                  <div className="font-serif font-bold text-[30px] text-[#b48f22] dark:text-[#d4af37] mt-1">
                    {match.headline}
                  </div>
                </div>
                <div className="mt-5 text-[18px] text-black/80 dark:text-white/80 space-y-0.5">
                  <div className="font-bold uppercase text-[14px] tracking-wider text-black/55 dark:text-white/55">
                    {match.category}
                  </div>
                  <div>{match.resultText}</div>
                  <div className="font-semibold">{match.venueShort}</div>
                </div>
                <div className="mt-8 flex items-center justify-center gap-4">
                  {match.id === 'anfrage-2026' ? (
                    <>
                      <img
                        src="./images/logo-gold-black.jpg"
                        alt="Locos Colectivos"
                        className="w-[52px] h-[52px] rounded-full object-cover border border-[#d4af37]"
                      />
                      <div className="w-[56px] pb-1 border-b border-[#d4af37] text-center font-serif font-bold text-[15px]">
                        VS
                      </div>
                      <div className="w-[52px] h-[52px] rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center font-serif font-bold text-[18px]">
                        ?
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-[52px] h-[52px] rounded-full border border-black/20 dark:border-white/20 flex items-center justify-center font-serif font-bold text-[16px]">
                        {match.homeShort}
                      </div>
                      <div className="w-[66px] pb-1 border-b border-[#d4af37] text-center font-serif font-bold text-[20px]">
                        {match.score}
                      </div>
                      <img
                        src="./images/logo-gold-black.jpg"
                        alt="Locos Colectivos"
                        className="w-[52px] h-[52px] rounded-full object-cover border border-[#d4af37]"
                      />
                    </>
                  )}
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMatch(match);
                  }}
                  className="w-full h-[42px] rounded-[4px] bg-[#090b10] dark:bg-[#d4af37] text-white dark:text-[#090b10] group-hover:opacity-90 font-sans font-bold text-[15px] uppercase tracking-wider flex items-center justify-center gap-1.5 transition-opacity"
                >
                  <span>{match.ctaLabel}</span>
                  <ArrowUpRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* MATCH- & TURNIER-DETAIL MODAL */}
      {selectedMatch && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedMatch(null)}
        >
          <div
            className="rounded-[4px] bg-white dark:bg-[#11141c] border border-[#d4af37]/50 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-52 sm:h-64 bg-[#090b10] overflow-hidden">
              <img
                src={selectedMatch.image}
                alt={selectedMatch.title}
                className="w-full h-full object-cover object-center opacity-85"
              />
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(0deg, #090b10 0%, rgba(9,11,16,0.15) 100%)'
                }}
              />
              <button
                type="button"
                onClick={() => setSelectedMatch(null)}
                aria-label="Schließen"
                className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 border border-[#d4af37]/50 text-white flex items-center justify-center hover:text-[#d4af37]"
              >
                <X size={20} />
              </button>
              <div className="absolute bottom-4 left-6 right-6">
                <div className="font-sans font-bold text-[13px] uppercase tracking-[0.12em] text-[#d4af37]">
                  {selectedMatch.badge}
                </div>
                <h2 className="como-title text-[26px] sm:text-[32px] text-white leading-tight mt-0.5">
                  {selectedMatch.title}
                </h2>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <span className="px-3.5 py-1 rounded-[4px] bg-[#090b10] border border-[#d4af37]/60 font-serif font-bold text-[20px] text-[#d4af37]">
                  {selectedMatch.score}
                </span>
                <span className="inline-flex items-center gap-1.5 font-sans font-semibold text-[15px] text-black/70 dark:text-white/75">
                  <Calendar size={15} className="text-[#d4af37]" />
                  {selectedMatch.details.date}
                </span>
              </div>

              <div className="space-y-1.5 text-[16px] font-sans text-black/75 dark:text-white/80">
                <div className="flex items-start gap-2">
                  <MapPin size={17} className="text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{selectedMatch.details.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Trophy size={17} className="text-[#d4af37] shrink-0 mt-0.5" />
                  <span>{selectedMatch.details.organizer}</span>
                </div>
              </div>

              <p className="font-sans text-[18px] leading-[1.45] text-[#090b10] dark:text-white/90">
                {selectedMatch.details.summary}
              </p>

              <div className="border-t border-black/10 dark:border-white/10 pt-4">
                <div className="flex items-center gap-2 font-sans font-bold text-[13px] uppercase tracking-[0.12em] text-[#b48f22] dark:text-[#d4af37] mb-2.5">
                  <Users size={15} />
                  <span>Infos zum Spiel</span>
                </div>
                <ul className="space-y-2">
                  {selectedMatch.details.facts.map((fact) => (
                    <li
                      key={fact}
                      className="font-sans text-[16px] text-black/80 dark:text-white/80 flex items-start gap-2"
                    >
                      <span className="text-[#d4af37] font-bold">·</span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-black/10 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setSelectedMatch(null)}
                  className="px-5 py-2 rounded-[4px] border border-black/20 dark:border-white/20 font-sans font-bold text-[15px] text-[#090b10] dark:text-white"
                >
                  Schließen
                </button>
                <a
                  href={selectedMatch.details.externalHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-[4px] bg-[#d4af37] hover:bg-[#e8c75a] text-[#090b10] font-sans font-extrabold text-[15px] uppercase tracking-wider transition-colors"
                >
                  <span>{selectedMatch.details.externalLabel}</span>
                  <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SpielplanSection;
