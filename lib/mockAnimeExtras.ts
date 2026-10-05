/**
 * Per-title cast and production staff — isolated mock data used by
 * the /anime/[id] Characters and Overview tabs. No external
 * metadata source; swap for AniList/Jikan later.
 */

export interface AnimeCharacter {
  name: string;
  role: string;
  voiceActor: string;
}

export interface AnimeStaffMember {
  role: string;
  name: string;
}

export interface AnimeExtras {
  characters: AnimeCharacter[];
  staff: AnimeStaffMember[];
  synopsisNote: string;
}

export const ANIME_EXTRAS: Record<string, AnimeExtras> = {
  'solo-leveling': {
    characters: [
      { name: 'Sung Jinwoo', role: 'Protagonist', voiceActor: 'Kaito Ishikawa' },
      { name: 'Chae Jong-In', role: 'Party Leader', voiceActor: 'Daisuke Ono' },
      { name: 'Baek Yoonho', role: 'Guild Master', voiceActor: 'Hiroshi Kamiya' },
    ],
    staff: [
      { role: 'Director', name: 'Sung-Ho Park' },
      { role: 'Animation', name: 'A-1 Pictures' },
      { role: 'Composer', name: 'Hiroyuki Sawano-style cues' },
    ],
    synopsisNote:
      'A double curse extraction turns an unaverage student into the strongest hunter the archive has on file.',
  },
  frieren: {
    characters: [
      { name: 'Frieren', role: 'Elf mage', voiceActor: 'Atsumi Tanezaki' },
      { name: 'Fern', role: 'Apprentice mage', voiceActor: 'Rie Takahashi' },
      { name: 'Himmel', role: 'Hero', voiceActor: 'Yoshitsugu Matsuoka' },
    ],
    staff: [
      { role: 'Director', name: 'Keiichiro Saito' },
      { role: 'Animation', name: 'Madhouse' },
      { role: 'Series Composition', name: 'Katsuhiko Takayama' },
    ],
    synopsisNote:
      'An immortal mage retraces a decade-long journey to understand the humans who walked it with her.',
  },
  'jujutsu-kaisen-s2': {
    characters: [
      { name: 'Yuji Itadori', role: 'Protagonist', voiceActor: 'Kaiu Irino' },
      { name: 'Megumi Fushiguro', role: 'Ten Shadows', voiceActor: 'Yoshitsugu Matsuoka' },
      { name: 'Nobara Kugisaki', role: 'Strawberry Technique', voiceActor: 'Asami Seto' },
    ],
    staff: [
      { role: 'Director', name: 'Shuji Saito' },
      { role: 'Animation', name: 'MAPPA' },
      { role: 'Sound Design', name: 'Akio Saitō' },
    ],
    synopsisNote:
      'Shibuya goes dark in one night and every curse in Tokyo moves at once.',
  },
  'chainsaw-man': {
    characters: [
      { name: 'Denji', role: 'Protagonist', voiceActor: 'Ryōhei Kimura' },
      { name: 'Power', role: 'Hybrid fiend', voiceActor: 'Atsumi Tanezaki' },
      { name: 'Aki Hayakawa', role: 'Public Safety Devil Hunter', voiceActor: 'Suzuki Ayasa' },
    ],
    staff: [
      { role: 'Director', name: 'Ryu Nakayama' },
      { role: 'Animation', name: 'MAPPA' },
      { role: 'Composer', name: 'Kensuke Ushio' },
    ],
    synopsisNote:
      'A short-lived fiend friendship ends in the Reze Arc, where chainsaws and affection pull in opposite directions.',
  },
  'demon-slayer-hashira': {
    characters: [
      { name: 'Tanjiro Kamado', role: 'Protagonist', voiceActor: 'Natsuki Hanae' },
      { name: 'Nezuko Kamado', role: 'Demon sibling', voiceActor: 'Akari Kitō' },
      { name: 'Giyu Tomioka', role: 'Water Hashira', voiceActor: 'Takahiro Sakurai' },
    ],
    staff: [
      { role: 'Director', name: 'Toshihiro Arakawa' },
      { role: 'Animation', name: 'ufotable' },
      { role: 'Choreography', name: 'Hanae' },
    ],
    synopsisNote:
      'The final training arc closes out the breathing exercises before the last battle arrives.',
  },
  'cyberpunk-edgerunners': {
    characters: [
      { name: 'David Martinez', role: 'Protagonist', voiceActor: 'Daichi Yamaguchi' },
      { name: 'Lucy', role: 'Netrunner', voiceActor: 'Tomoyo Kurosawa' },
      { name: 'Rebecca', role: 'Fixer', voiceActor: 'Hina Yomiya' },
    ],
    staff: [
      { role: 'Director', name: 'Kazuto Nakazawa' },
      { role: 'Animation', name: 'Studio Trigger' },
      { role: 'Music', name: 'Nujabes archival selections' },
    ],
    synopsisNote:
      'Night City takes the crew in through the chip and gives back a fortune that was never going to survive.',
  },
  'bleach-tybw': {
    characters: [
      { name: 'Ichigo Kurosaki', role: 'Protagonist', voiceActor: 'Moritaka Morizuki' },
      { name: 'Ryūnosuke Kuchiki', role: 'Royal Guard candidate', voiceActor: 'Noriaki Sugiyama' },
      { name: 'Yhwach', role: 'Antagonist', voiceActor: 'Toshiyuki Morikawa' },
    ],
    staff: [
      { role: 'Director', name: 'Tetsuya Nagasaki' },
      { role: 'Animation', name: 'Studio Pierrot' },
      { role: 'Composer', name: 'Yuki Hayashi' },
    ],
    synopsisNote:
      'The Thousand-Year Blood War climbs toward its climax with a special one-hour broadcast.',
  },
  'kaiju-no-8': {
    characters: [
      { name: 'Kafka Hibino', role: 'Protagonist', voiceActor: 'Daiki Yamashita' },
      { name: 'Soshiro Hoshina', role: 'Ranger captain', voiceActor: 'Yoshimasa Hosoya' },
      { name: 'Rin Shinonome', role: 'Ranger recruit', voiceActor: 'Yui Ishikawa' },
    ],
    staff: [
      { role: 'Director', name: 'Tatsuya Yoshihara' },
      { role: 'Animation', name: 'Production I.G' },
      { role: 'Director (season 1)', name: 'Yoshihisa Isa' },
    ],
    synopsisNote:
      'A rookie with a kaiju phase gets pulled into the defence force that was never built for him.',
  },
  'oshi-no-ko-s2': {
    characters: [
      { name: 'Kōshi Amano', role: 'Protagonist', voiceActor: 'Yuta Kishi' },
      { name: 'Kana Arima', role: 'Deceased idol', voiceActor: 'Rie Takahashi' },
      { name: 'Mem-cho', role: 'Fan', voiceActor: 'Yurika Kubo' },
    ],
    staff: [
      { role: 'Director', name: 'Seiji Kishi' },
      { role: 'Animation', name: 'Doga Kobo' },
      { role: 'Series Composition', name: 'Kazuyuki Fudeyasu' },
    ],
    synopsisNote:
      'The entertainment industry arc turns the private idol investigation into a public one.',
  },
  'vinland-saga-s2': {
    characters: [
      { name: 'Thorfinn', role: 'Protagonist', voiceActor: 'Yuto Uemura' },
      { name: 'Olmar', role: 'Thorfinn\u2019s brother', voiceActor: 'Kōhei Amasaki' },
      { name: 'Helga', role: 'Travelling merchant', voiceActor: 'Ayane Sakura' },
    ],
    staff: [
      { role: 'Director', name: 'Shūhei Yabuta' },
      { role: 'Animation', name: 'MAPPA' },
      { role: 'Director (season 1)', name: 'Shingo Yamashita' },
    ],
    synopsisNote:
      'The second cour trades revenge for the slow arithmetic of building a life on a foreign shore.',
  },
  'attack-on-titan-final': {
    characters: [
      { name: 'Eren Yeager', role: 'Protagonist', voiceActor: 'Yuki Kaji' },
      { name: 'Mikasa Ackerman', role: 'Scout regiment', voiceActor: 'Yui Ishikawa' },
      { name: 'Armin Arlert', role: 'Strategist', voiceActor: 'Marina Inoue' },
    ],
    staff: [
      { role: 'Director', name: 'Yūichirō Hayashi' },
      { role: 'Animation', name: 'MAPPA' },
      { role: 'Series Composition', name: 'Yoshiki Tonogai' },
    ],
    synopsisNote:
      'The final season splits its final season and spends it on what happens after the Wall.',
  },
  'fate-heavens-feel': {
    characters: [
      { name: 'Shirou Emiya', role: 'Protagonist', voiceActor: 'Kensho Ono' },
      { name: 'Sakura Matou', role: 'Master swordswoman', voiceActor: 'Chie Nakamura' },
      { name: 'Aoi Tohsaka', role: 'Sister', voiceActor: 'Ayako Kawasumi' },
    ],
    staff: [
      { role: 'Director', name: 'Tomonori Sudō' },
      { role: 'Animation', name: 'ufotable' },
      { role: 'Composer', name: 'Yuki Kajiura' },
    ],
    synopsisNote:
      'The spring song chapter closes the Heaven\u2019s Feel route on a battlefield with nowhere left to run.',
  },
};

const FALLBACK_EXTRAS: AnimeExtras = {
  characters: [],
  staff: [],
  synopsisNote: 'Cast and staff records for this title are not archived yet.',
};

export function getAnimeExtras(animeId: string): AnimeExtras {
  return ANIME_EXTRAS[animeId] ?? FALLBACK_EXTRAS;
}