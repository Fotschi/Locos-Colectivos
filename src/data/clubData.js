import { Trophy, Shirt, Users, Mail } from 'lucide-react';

export const INSTAGRAM = 'https://www.instagram.com/locoscolectivos/';

export const PAGES = [
  { id: 'home', hash: '#/', label: 'START' },
  { id: 'blog', hash: '#/blog', label: 'JOURNAL' },
  { id: 'spielplan', hash: '#/spielplan', label: 'SPIELPLAN' },
  { id: 'trikots', hash: '#/trikots', label: 'TRIKOTS' },
  { id: 'kabine', hash: '#/kabine', label: 'KABINE' },
  { id: 'historie', hash: '#/historie', label: 'HISTORIE' },
  { id: 'kontakt', hash: '#/kontakt', label: 'KONTAKT' }
];

export const HERO_SLIDES = [
  {
    src: './images/team-goal.jpg',
    position: 'object-[50%_55%]',
    title: 'Locos Colectivos · colectivo sobre todo',
    ctaLabel: 'Folge uns auf Instagram →',
    route: null,
    externalHref: INSTAGRAM
  },
  {
    src: './images/tasmania-tresdorf-match.jpg',
    position: 'object-[50%_45%]',
    title: 'Auswärtssieg unter Flutlicht · Tasmania 5:7 Locos',
    ctaLabel: 'Zum Spielbericht →',
    route: 'blog',
    externalHref: null
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

export const QUICK_CARDS = [
  {
    route: 'spielplan',
    title: 'SPIELPLAN',
    sub: 'ERGEBNISSE & TURNIERE',
    src: './images/stock-pitch-turf.jpg',
    pos: 'object-[50%_60%]',
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
    sub: 'KADER & POSITIONEN',
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

export const VOICES = [
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
    role: 'Aus der Kabine',
    name: 'Team Locos Colectivos',
    quote:
      '„Wenn alle im selben Schwarz und Gold auf den Platz gehen, spielt niemand für die Galerie – jeder läuft für das Kollektiv.“'
  }
];

export const KIT_CARDS = [
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
    meta: 'Rückennummern-Design LC 2026'
  },
  {
    id: 'shorts',
    src: './images/kit-shorts.jpg',
    title: 'Match Shorts · Schwarz & Gold',
    meta: 'Hosen-Wappen LC 2026'
  }
];

export const ROSTER_GROUPS = [
  {
    id: 'tormaenner',
    label: 'Tormänner',
    short: 'TW',
    players: [
      { num: '1', name: 'Nico Viehböck' },
      { num: '23', name: 'Thomas Vilis' },
      { num: '63', name: 'Michael Lederer' }
    ]
  },
  {
    id: 'verteidiger',
    label: 'Verteidiger',
    short: 'ABW',
    players: [
      { num: '2', name: 'Max Frossard' },
      { num: '3', name: 'Manuel Berthold' },
      { num: '5', name: 'Lukas Zöhrer' },
      { num: '13', name: 'Jan Tmej' },
      { num: '47', name: 'Manuel Meißl' }
    ]
  },
  {
    id: 'mittelfeld',
    label: 'Mittelfeld',
    short: 'MF',
    players: [
      { num: '7', name: 'Markus Bayr' },
      { num: '8', name: 'Victor Lenneis' },
      { num: '10', name: 'Konrad Polevkovits' },
      { num: '19', name: 'Felix Gassner' },
      { num: '22', name: 'Laurenz Reiter' },
      { num: '99', name: 'Markus Tylka' }
    ]
  },
  {
    id: 'sturm',
    label: 'Sturm',
    short: 'ST',
    players: [
      { num: '11', name: 'Ben Diringer' },
      { num: '17', name: 'Florian Glaninger' },
      { num: '67', name: 'Lukas Höfle' },
      { num: '77', name: 'Jonas Barta' }
    ]
  }
];

export const INITIAL_POSTS = [
  {
    id: 'tasmania-tresdorf-5-7',
    category: 'Spielbericht',
    author: 'locoscolectivos',
    location: 'Sportplatz Würnitz',
    date: 'Flutlicht-Testspiel',
    title: 'Tasmania Tresdorf 5 : 7 Locos Colectivos',
    scoreBadge: 'Tasmania 5 : 7 Locos',
    images: ['./images/tasmania-tresdorf-match.jpg'],
    caption:
      'Hochklassige Kleinfeld-Partie auf Augenhöhe unter Flutlicht in Würnitz! Gegen starke Gastgeber von @tasmania_tresdorf nehmen wir am Ende einen verdienten 7:5-Auswärtssieg mit.\n\nGroßer Respekt an @tasmania_tresdorf für den Kampfgeist, die starke Leistung von @jakobpaul_ im Tor und die komplett faire Partie – genau so macht Hobbyfußball Spaß. Gerne wieder! 🤝🏼',
    hashtags: ['#locoscolectivos', '#hobbyfußball', '#kleinfeld', '#würnitz', '#colectivosobretodo'],
    likes: 49,
    sourceLink: 'https://www.instagram.com/tasmania_tresdorf/'
  },
  {
    id: 'match-trikots-2026',
    category: 'Ausrüstung',
    author: 'locoscolectivos',
    location: 'Niederösterreich',
    date: 'Kit Release 2026',
    title: 'Unsere Match Trikots 2026 · Schwarz & Gold',
    scoreBadge: null,
    images: [
      './images/kit-full.jpg',
      './images/kit-front-close.jpg',
      './images/kit-back-19.jpg',
      './images/kit-shorts.jpg'
    ],
    caption:
      'Gold auf dem Rasen, Schwarz im Detail: Unsere offiziellen Match Trikots für die Saison 2026.\n\nMit gesticktem LC-Brustwappen, abgestimmten Match-Shorts und klaren Rückennummern treten wir ab sofort einheitlich als Kollektiv auf – vom ersten Anpfiff bis zum letzten Turnierspiel.',
    hashtags: ['#matchkit', '#schwarzundgold', '#lc2026', '#locoscolectivos'],
    likes: 64,
    sourceLink: INSTAGRAM
  }
];
