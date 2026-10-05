import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProfileView } from '@/components/profile/ProfileView';
import { getProfile, MOCK_PROFILES } from '@/lib/mockProfile';

interface ProfilePageProps {
  params: Promise<{ username: string }>;
}

export function generateStaticParams() {
  return MOCK_PROFILES.map((profile) => ({ username: profile.username }));
}

export async function generateMetadata({
  params,
}: ProfilePageProps): Promise<Metadata> {
  const { username } = await params;
  const profile = getProfile(username);

  if (!profile) {
    return { title: 'Profile not found — KAGE' };
  }

  return {
    title: `${profile.displayName} (@${profile.username}) | KAGE`,
    description: profile.tagline,
  };
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  const profile = getProfile(username);

  if (!profile) notFound();

  return <ProfileView profile={profile} />;
}