import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  MapPin
} from 'lucide-react';
import { INSTAGRAM } from '../data/clubData';

const CATEGORIES = ['Alle', 'Spielbericht', 'Ausrüstung', 'Kabine', 'Turnier'];

export const PostCard = ({ post, setLightbox }) => {
  const [imgIdx, setImgIdx] = useState(0);
  const images =
    post.images && post.images.length > 0
      ? post.images
      : ['./images/logo-gold-black.jpg'];
  const currentImg = images[imgIdx % images.length];

  return (
    <article className="rounded-[2px] bg-white dark:bg-[#11141c] border border-black/15 dark:border-[#d4af37]/30 border-t-2 border-t-[#d4af37] overflow-hidden flex flex-col justify-between">
      <div>
        {/* Post Header */}
        <div className="px-5 py-3.5 flex items-center justify-between gap-3 border-b border-black/10 dark:border-white/10">
          <div className="flex items-center gap-3 min-w-0">
            <img
              src="./images/logo-gold-black.jpg"
              alt="Locos Colectivos"
              className="w-9 h-9 rounded-full object-cover border border-[#d4af37] shrink-0"
            />
            <div className="min-w-0">
              <div className="font-sans font-bold text-[15px] text-[#090b10] dark:text-white truncate">
                @{post.author || 'locoscolectivos'}
              </div>
              <div className="flex items-center gap-1.5 text-[13px] font-sans text-black/60 dark:text-white/60 truncate">
                <MapPin size={12} className="text-[#d4af37] shrink-0" />
                <span className="truncate">{post.location || 'Niederösterreich'}</span>
                {post.date && (
                  <>
                    <span>·</span>
                    <span>{post.date}</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-[2px] border border-[#d4af37]/50 text-[#9a7b1c] dark:text-[#d4af37] font-sans font-bold text-[11px] uppercase tracking-[0.12em] shrink-0">
            {post.category}
          </span>
        </div>

        {/* Media / Carousel (Am Handy natürliches Vollbild ohne Blur-Ränder, am Desktop 4:3) */}
        <div className="relative sm:aspect-[4/3] bg-[#090b10] overflow-hidden group">
          <img
            src={currentImg}
            alt=""
            aria-hidden="true"
            className="hidden sm:block absolute inset-0 w-full h-full object-cover blur-xl opacity-40 scale-110 pointer-events-none"
          />
          <img
            src={currentImg}
            alt={post.title}
            onClick={() => setLightbox(currentImg)}
            className="relative z-10 w-full h-auto sm:h-full sm:object-contain cursor-pointer group-hover:scale-[1.01] transition-transform duration-300"
          />

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImgIdx((i) => (i - 1 + images.length) % images.length);
                }}
                aria-label="Vorheriges Bild"
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/65 border border-[#d4af37]/40 text-white flex items-center justify-center hover:border-[#d4af37]"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setImgIdx((i) => (i + 1) % images.length);
                }}
                aria-label="Nächstes Bild"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/65 border border-[#d4af37]/40 text-white flex items-center justify-center hover:border-[#d4af37]"
              >
                <ChevronRight size={18} />
              </button>
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setImgIdx(idx);
                    }}
                    aria-label={`Bild ${idx + 1}`}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      idx === imgIdx % images.length ? 'bg-[#d4af37]' : 'bg-white/40'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* Meta / Score & Instagram Link */}
        <div className="px-5 pt-3.5 pb-2 flex items-center justify-between gap-3">
          <div>
            {post.scoreBadge && (
              <span className="inline-block px-2.5 py-0.5 rounded bg-[#090b10] dark:bg-[#d4af37]/15 border border-[#d4af37]/40 text-[#d4af37] font-serif font-bold text-[14px]">
                {post.scoreBadge}
              </span>
            )}
          </div>

          <a
            href={post.sourceLink || INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-sans font-bold text-[14px] text-[#b48f22] dark:text-[#d4af37] hover:underline"
          >
            <span>Auf Instagram ansehen</span>
            <ArrowUpRight size={14} />
          </a>
        </div>

        {/* Title & Caption */}
        <div className="px-5 pb-5">
          <h2 className="font-serif font-bold text-[23px] leading-[1.2] text-[#090b10] dark:text-white">
            {post.title}
          </h2>
          <p className="mt-2.5 font-sans text-[17px] leading-[1.45] text-black/80 dark:text-white/80 whitespace-pre-line">
            {post.caption}
          </p>

          {post.hashtags && post.hashtags.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {post.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="font-sans font-semibold text-[14px] text-[#b48f22] dark:text-[#d4af37]"
                >
                  {tag.startsWith('#') ? tag : `#${tag}`}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const BlogSection = ({ posts, navigate, setLightbox }) => {
  const [filter, setFilter] = useState('Alle');

  const filteredPosts =
    filter === 'Alle' ? posts : posts.filter((p) => p.category === filter);

  return (
    <section id="blog" className="py-12 bg-[#faf8f4] dark:bg-[#090b10]">
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
              CLUB-JOURNAL · @LOCOSCOLECTIVOS
            </div>
            <h1 className="como-title text-[34px] sm:text-[42px] leading-[1.2] text-[#090b10] dark:text-white mt-1">
              Spielberichte &amp; Beiträge
            </h1>
          </div>

          <a
            href={INSTAGRAM}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 font-sans font-bold text-[16px] text-[#b48f22] dark:text-[#d4af37] hover:underline"
          >
            <span>@locoscolectivos</span>
            <ArrowUpRight size={16} />
          </a>
        </div>

        {/* Category Filter */}
        <div className="flex overflow-x-auto no-scrollbar gap-2 pb-1 mb-6 sm:mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={`cursor-pointer px-4 py-1.5 rounded-[2px] font-sans font-bold text-[12px] uppercase tracking-[0.1em] border transition-colors ${
                filter === cat
                  ? 'bg-[#090b10] text-[#d4af37] border-[#090b10] dark:bg-[#d4af37] dark:text-[#090b10] dark:border-[#d4af37]'
                  : 'bg-white dark:bg-[#11141c] text-[#090b10] dark:text-white/80 border-black/15 dark:border-white/15 hover:border-[#d4af37]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Posts Grid */}
        {filteredPosts.length === 0 ? (
          <div className="rounded-[4px] bg-white dark:bg-[#11141c] border border-black/15 dark:border-white/15 p-10 text-center">
            <p className="font-sans text-[19px] text-black/70 dark:text-white/70">
              Noch keine Beiträge in der Kategorie „{filter}“.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                setLightbox={setLightbox}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
