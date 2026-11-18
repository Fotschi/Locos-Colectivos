import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ROSTER_GROUPS } from '../data/clubData';

const SquadSection = ({ navigate, setLightbox }) => {
  const [activeGroup, setActiveGroup] = useState('alle');

  const totalPlayers = ROSTER_GROUPS.reduce((sum, g) => sum + g.players.length, 0);
  const visibleGroups =
    activeGroup === 'alle'
      ? ROSTER_GROUPS
      : ROSTER_GROUPS.filter((g) => g.id === activeGroup);

  return (
    <section id="kabine" className="py-12 bg-white dark:bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 font-sans font-semibold text-[16px] text-[#b48f22] dark:text-[#d4af37] hover:underline mb-6"
        >
          <ArrowLeft size={16} />
          <span>Zurück zur Startseite</span>
        </button>

        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="font-sans font-bold text-[14px] uppercase tracking-[0.14em] text-[#b48f22] dark:text-[#d4af37]">
              SAISON 2026 · {totalPlayers} SPIELER
            </div>
            <h1 className="como-title text-[34px] sm:text-[42px] leading-[1.2] text-[#090b10] dark:text-white mt-1">
              Kabine &amp; Kader
            </h1>
          </div>

          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setActiveGroup('alle')}
              className={`cursor-pointer px-4 py-1.5 rounded-[2px] font-sans font-bold text-[12px] uppercase tracking-[0.1em] border transition-colors ${
                activeGroup === 'alle'
                  ? 'bg-[#d4af37] text-[#090b10] border-[#d4af37]'
                  : 'bg-transparent text-[#090b10] dark:text-white/80 border-black/15 dark:border-white/15 hover:border-[#d4af37]'
              }`}
            >
              Alle ({totalPlayers})
            </button>
            {ROSTER_GROUPS.map((group) => (
              <button
                key={group.id}
                type="button"
                onClick={() => setActiveGroup(group.id)}
                className={`cursor-pointer px-4 py-1.5 rounded-[2px] font-sans font-bold text-[12px] uppercase tracking-[0.1em] border transition-colors ${
                  activeGroup === group.id
                    ? 'bg-[#d4af37] text-[#090b10] border-[#d4af37]'
                    : 'bg-transparent text-[#090b10] dark:text-white/80 border-black/15 dark:border-white/15 hover:border-[#d4af37]'
                }`}
              >
                {group.label} ({group.players.length})
              </button>
            ))}
          </div>
        </div>

        {/* Kategorisierte Kaderliste */}
        <div className="space-y-10">
          {visibleGroups.map((group) => (
            <div key={group.id}>
              <div className="flex items-baseline justify-between border-b border-black/15 dark:border-[#d4af37]/30 pb-2 mb-5">
                <h2 className="como-title text-[26px] sm:text-[30px] text-[#090b10] dark:text-white">
                  {group.label}
                </h2>
                <span className="font-sans font-bold text-[13px] uppercase tracking-[0.14em] text-[#b48f22] dark:text-[#d4af37]">
                  {group.players.length} Spieler
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {group.players.map((player) => (
                  <div
                    key={`${group.id}-${player.num}-${player.name}`}
                    className="rounded-[2px] border border-black/15 dark:border-[#d4af37]/30 bg-[#faf8f4] dark:bg-[#11141c] px-5 py-4 flex items-center justify-between gap-4 hover:border-[#d4af37] transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-[2px] bg-[#090b10] border border-[#d4af37]/60 flex items-center justify-center shrink-0">
                        <span className="font-serif font-bold text-[22px] text-[#d4af37]">
                          {player.num}
                        </span>
                      </div>
                      <div>
                        <div className="font-serif font-bold text-[20px] leading-tight text-[#090b10] dark:text-white">
                          {player.name}
                        </div>
                        <div className="font-sans font-semibold text-[13px] uppercase tracking-wider text-black/55 dark:text-white/55 mt-0.5">
                          {group.label}
                        </div>
                      </div>
                    </div>
                    <span className="font-sans font-bold text-[12px] uppercase tracking-widest px-2.5 py-1 rounded border border-[#d4af37]/40 text-[#b48f22] dark:text-[#d4af37]">
                      {group.short}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Kabinen- & Teamfotos */}
        <div className="mt-14 pt-10 border-t border-black/10 dark:border-white/10">
          <div className="font-sans font-bold text-[14px] uppercase tracking-[0.14em] text-[#b48f22] dark:text-[#d4af37] mb-4">
            EINBLICKE AUS DER KABINE
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            <div
              onClick={() => setLightbox('./images/locker-room.jpg')}
              className="cursor-pointer group"
            >
              <div className="aspect-[4/3] rounded-[12px] overflow-hidden mb-3 bg-[#090b10] border border-black/10 dark:border-[#d4af37]/25">
                <img
                  src="./images/locker-room.jpg"
                  alt="Kabine Locos Colectivos"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif font-bold text-[22px] leading-[1.25] text-[#090b10] dark:text-white">
                In der Kabine mit den neuen Trikots
              </h3>
              <p className="mt-1 font-sans text-[17px] leading-[1.3] text-black/65 dark:text-white/65">
                Die Rückennummern #77, #22 und #7 vor dem Turnier-Anpfiff.
              </p>
            </div>

            <div
              onClick={() => setLightbox('./images/team-goal.jpg')}
              className="cursor-pointer group"
            >
              <div className="aspect-[4/3] rounded-[12px] overflow-hidden mb-3 bg-[#090b10] border border-black/10 dark:border-[#d4af37]/25">
                <img
                  src="./images/team-goal.jpg"
                  alt="Mannschaftsfoto im Tor"
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="font-serif font-bold text-[22px] leading-[1.25] text-[#090b10] dark:text-white">
                colectivo sobre todo
              </h3>
              <p className="mt-1 font-sans text-[17px] leading-[1.3] text-black/65 dark:text-white/65">
                Elf Mann vor dem Tor: geschlossen in Schwarz &amp; Gold auf dem Platz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SquadSection;
