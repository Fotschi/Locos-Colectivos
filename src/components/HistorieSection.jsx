import React from 'react';
import { ArrowLeft, ArrowUpRight, MapPin } from 'lucide-react';

const MILESTONES = [
  {
    date: 'Vor April 2026',
    title: 'Die ersten Turniere als Gruppe',
    text: 'Noch bevor es den Namen Locos Colectivos gab, stand der Kern der Truppe bereits gemeinsam bei Hobbyturnieren auf dem Platz. Aus diesen ersten gemeinsamen Einsätzen entstand nach und nach die Idee, ein festes Team mit eigener Identität zu formen.',
    image: './images/stock-pitch-turf.jpg'
  },
  {
    date: 'April 2026',
    title: 'Gründung von Locos Colectivos',
    text: 'Im April 2026 wird aus der lockeren Runde offiziell Locos Colectivos – mit dem Leitspruch „colectivo sobre todo“, dem eigenen Schwarz-Gold-Wappen sowie regelmäßigen Trainings und gemeinsamen Turnier-Auftritten als echte Einheit.',
    image: './images/logo-gold-black.jpg'
  },
  {
    date: '02. Mai 2026',
    title: 'Langenzersdorfer Dorfturnier',
    text: 'Kurz nach der Gründung tritt das Team beim traditionellen Langenzersdorfer Dorfturnier am Sportplatz des SV Langenzersdorf (2103 Langenzersdorf) an und sammelt wichtige gemeinsame Turnier-Erfahrung auf dem Kleinfeld.',
    image: './images/stock-ball-grass.jpg'
  },
  {
    date: 'Juli 2026',
    title: 'Eigene Match-Trikots & Shorts',
    text: 'Schritt für Schritt entsteht die komplette Spielkleidung: eigene Match-Trikots mit gesticktem LC-Brustwappen, abgestimmte Shorts und individuelle Rückennummern für alle 18 Spieler des Kaders.',
    image: './images/kit-full.jpg'
  },
  {
    date: '04. Juli 2026',
    title: '3. Platz in Obergänserndorf & Freundschaft mit Tasmania Tresdorf',
    text: 'Beim Hobbyturnier & Sommerfest der Jugend TSU NeuMed Obergänserndorf gewinnen die Locos das Spiel um Platz 3 gegen Tasmania Tresdorf mit 1:0. Aus dem sportlichen Duell auf dem Platz entsteht direkt eine echte Team-Freundschaft zwischen beiden Truppen.',
    image: './images/team-goal.jpg'
  },
  {
    date: 'Saison 2026',
    title: '5 : 7 Auswärtssieg am Sportplatz Würnitz',
    text: 'Das nächste Aufeinandertreffen mit den Freunden von Tasmania Tresdorf steigt unter Flutlicht in Würnitz – eine torreiche, faire Partie auf Augenhöhe, die Locos Colectivos mit 7:5 für sich entscheidet.',
    image: './images/tasmania-tresdorf-match.jpg'
  }
];

const GROUNDS = [
  {
    name: 'Sportanlage SV Langenzersdorf',
    address: 'Klosterneuburger Str. 21–23 / Johann-Masser-Weg 6, 2103 Langenzersdorf',
    event: 'Langenzersdorfer Dorfturnier · 02. Mai 2026'
  },
  {
    name: 'Sportplatz Obergänserndorf',
    address: 'Am Sportplatz 2, 2111 Obergänserndorf',
    event: 'Sommerfest TSU NeuMed · 3. Platz am 04. Juli 2026'
  },
  {
    name: 'Sportplatz Würnitz',
    address: '2112 Würnitz · Gemeinde Harmannsdorf',
    event: 'Flutlicht-Testspiel vs. Tasmania Tresdorf (5 : 7)'
  }
];

const HistorieSection = ({ navigate, setLightbox }) => {
  return (
    <section id="historie" className="py-12 bg-white dark:bg-[#090b10]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <button
          type="button"
          onClick={() => navigate('home')}
          className="inline-flex items-center gap-1.5 font-sans font-semibold text-[16px] text-[#b48f22] dark:text-[#d4af37] hover:underline mb-6"
        >
          <ArrowLeft size={16} />
          <span>Zurück zur Startseite</span>
        </button>

        <div className="flex flex-wrap items-baseline justify-between gap-4 mb-10 pb-4 border-b border-black/10 dark:border-white/10">
          <div>
            <h1 className="como-title text-[34px] sm:text-[42px] leading-[1.15] text-[#090b10] dark:text-white">
              Vereinschronik
            </h1>
            <p className="mt-1 font-sans text-[18px] text-black/65 dark:text-white/65">
              Von den ersten Turnieren als Gruppe bis zum gemeinsamen Kollektiv in Schwarz &amp; Gold.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate('spielplan')}
            className="inline-flex items-center gap-1.5 font-sans font-bold text-[16px] text-[#b48f22] dark:text-[#d4af37] hover:underline"
          >
            <span>Zum Spielplan</span>
            <ArrowUpRight size={16} />
          </button>
        </div>

        {/* Redaktionelle Chronik */}
        <div className="divide-y divide-black/10 dark:divide-white/10">
          {MILESTONES.map((item) => (
            <article
              key={item.title}
              className="py-8 first:pt-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-center"
            >
              <div className="md:col-span-2">
                <div className="font-serif font-bold text-[20px] text-[#b48f22] dark:text-[#d4af37]">
                  {item.date}
                </div>
              </div>

              <div className="md:col-span-6 space-y-2">
                <h2 className="font-serif font-bold text-[24px] sm:text-[27px] leading-[1.2] text-[#090b10] dark:text-white">
                  {item.title}
                </h2>
                <p className="font-sans text-[18px] leading-[1.45] text-black/80 dark:text-white/80">
                  {item.text}
                </p>
              </div>

              <div className="md:col-span-4">
                <div
                  onClick={() => setLightbox(item.image)}
                  className="aspect-[16/10] rounded-[2px] overflow-hidden bg-[#090b10] border border-black/15 dark:border-[#d4af37]/30 cursor-pointer group"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bisherige Spielorte */}
        <div className="mt-12 pt-10 border-t border-black/10 dark:border-white/10">
          <h2 className="como-title text-[28px] sm:text-[34px] text-[#090b10] dark:text-white mb-6">
            Bisherige Spielorte
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
            {GROUNDS.map((ground) => (
              <div
                key={ground.name}
                className="rounded-[2px] bg-[#faf8f4] dark:bg-[#11141c] border border-black/15 dark:border-[#d4af37]/30 border-t-2 border-t-[#d4af37] p-6 flex flex-col justify-between"
              >
                <div className="flex items-center gap-1.5 text-[#b48f22] dark:text-[#d4af37] font-sans font-bold text-[13px] uppercase tracking-wider mb-2">
                  <MapPin size={14} />
                  <span>Sportplatz</span>
                </div>
                <div className="font-serif font-bold text-[21px] text-[#090b10] dark:text-white">
                  {ground.name}
                </div>
                <div className="mt-1.5 font-sans text-[15px] text-black/65 dark:text-white/65">
                  {ground.address}
                </div>
                <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 font-sans font-semibold text-[15px] text-[#b48f22] dark:text-[#d4af37]">
                  {ground.event}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorieSection;
