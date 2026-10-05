'use client';

import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Plus, Check } from 'lucide-react';
import { AnimeItem } from '@/lib/mockData';
import { useUniverse } from '../tracking/UniverseProvider';
import { TrackingControlPanel } from '../tracking/TrackingControlPanel';

interface AnimeDetailModalProps {
  anime: AnimeItem | null;
  onClose: () => void;
}

/**
 * Anime detail dialog — cinematic backdrop,
 * editorial typography, tracking and rating
 * foundation. No play controls.
 */
export const AnimeDetailModal: React.FC<
  AnimeDetailModalProps
> = ({ anime, onClose }) => {
  const { isInUniverse, toggleInUniverse } = useUniverse();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (anime) {
      window.addEventListener('keydown', handleKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [anime, onClose]);

  const inUniverse = anime ? isInUniverse(anime.id) : false;

  return (
    <AnimatePresence>
      {anime && (
        <motion.div
          key="overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6"
        >
          <motion.div
            key="dialog"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={anime.title}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-[#12141D] border border-[#334155] rounded-[6px] shadow-2xl"
          >
            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              aria-label="Close details"
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-[3px] bg-[#090A0F]/80 hover:bg-[#FF2E4D] border border-[#334155] text-white flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D]"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Backdrop art */}
            <div className="relative h-56 sm:h-72 bg-[#090A0F]">
              <Image
                src={anime.backdropImage || anime.posterImage}
                alt=""
                fill
                sizes="100vw"
                className="object-cover object-center"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#12141D] via-[#12141D]/30 to-transparent" />
            </div>

            <div className="px-5 sm:px-8 pb-8 -mt-16 sm:-mt-20 relative z-10">
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-7">
                {/* Poster */}
                <div className="relative w-28 sm:w-36 aspect-[2/3] rounded-[4px] overflow-hidden bg-[#090A0F] border border-[#334155] shrink-0 shadow-xl">
                  <Image
                    src={anime.posterImage}
                    alt=""
                    fill
                    sizes="160px"
                    className="object-cover"
                    unoptimized
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0 pt-1">
                  <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-[#38BDF8]">
                    {anime.format} &bull; Rank #
                    {anime.scoreRank ?? '—'}
                  </p>
                  <h2 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-[#F8FAFC] leading-tight">
                    {anime.title}
                  </h2>
                  <p className="mt-1.5 font-mono text-xs text-[#94A3B8]">
                    {anime.japaneseTitle}
                  </p>

                  {/* Compact meta line */}
                  <p className="mt-4 font-mono text-xs tracking-wider text-[#94A3B8]">
                    <span className="text-[#38BDF8] font-bold">
                      {anime.rating.toFixed(2)}
                    </span>
                    <span className="text-[#334155] mx-2.5">
                      &bull;
                    </span>
                    {anime.season} {anime.year}
                    <span className="text-[#334155] mx-2.5">
                      &bull;
                    </span>
                    {anime.totalEpisodes} Episodes
                    <span className="text-[#334155] mx-2.5">
                      &bull;
                    </span>
                    {anime.status}
                  </p>
                  <p className="mt-3 text-[11px] font-mono uppercase tracking-[0.25em] text-[#64748B]">
                    {anime.genres.join(' / ')}
                  </p>

                  <button
                    type="button"
                    onClick={() => toggleInUniverse(anime.id)}
                    className={`mt-6 inline-flex items-center h-11 px-6 rounded-[3px] text-sm font-semibold transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF2E4D] focus-visible:ring-offset-2 focus-visible:ring-offset-[#12141D] ${
                      inUniverse
                        ? 'bg-[#FF2E4D]/15 text-[#FF2E4D] border border-[#FF2E4D]/40'
                        : 'bg-[#FF2E4D] hover:bg-[#FF4D66] text-white'
                    }`}
                  >
                    {inUniverse ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        In Universe
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Add to Universe
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tracking + rating foundation */}
              <div className="mt-8 pt-6 border-t border-[#1E293B]">
                <TrackingControlPanel anime={anime} />
              </div>

              {/* Synopsis */}
              <div className="mt-8">
                <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.25em] text-[#F8FAFC]">
                  Synopsis
                </h3>
                <p className="mt-3 text-sm text-[#94A3B8] leading-relaxed max-w-3xl">
                  {anime.synopsis}
                </p>
                <p className="mt-4 font-mono text-[11px] text-[#64748B]">
                  Studio —{' '}
                  <span className="text-[#94A3B8]">
                    {anime.studio}
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};