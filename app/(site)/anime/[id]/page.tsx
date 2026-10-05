import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { AnimeDetailView } from '@/components/anime/AnimeDetailView';
import { MOCK_ANIME_LIST } from '@/lib/mockData';
import { getAnimeById } from '@/lib/anime';

interface AnimePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return MOCK_ANIME_LIST.map((anime) => ({ id: anime.id }));
}

export async function generateMetadata({
  params,
}: AnimePageProps): Promise<Metadata> {
  const { id } = await params;
  const anime = getAnimeById(id);

  if (!anime) {
    return { title: 'Title not found — KAGE' };
  }

  return {
    title: `${anime.title} — KAGE Score ${anime.rating.toFixed(2)}`,
    description: anime.synopsis,
  };
}

export default async function AnimePage({ params }: AnimePageProps) {
  const { id } = await params;
  const anime = getAnimeById(id);

  if (!anime) notFound();

  return <AnimeDetailView anime={anime} />;
}