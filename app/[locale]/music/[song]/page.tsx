import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MusicDetailPage } from "../../../components/music-detail-page";
import { isLocale, locales, type Locale } from "../../../lib/i18n";
import { getMusicSongById, musicSongs } from "../../../lib/music";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    musicSongs.map((song) => ({
      locale,
      song: song.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; song: string }>;
}): Promise<Metadata> {
  const { locale, song: songId } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const song = getMusicSongById(songId);

  if (!song) {
    return {};
  }

  const descriptions: Record<Locale, string> = {
    "zh-CN": `${song.title} — ${song.creators.join(", ")}。GCGS Vocaloid Club 音乐档案馆。`,
    en: `${song.title} by ${song.creators.join(", ")}. GCGS Vocaloid Club Music Archive.`,
    ja: `${song.title} — ${song.creators.join(", ")}。GCGS Vocaloid Club 楽曲アーカイブ。`,
  };

  return {
    title: `${song.title} | GCGS Vocaloid Club`,
    description: descriptions[locale],
  };
}

export default async function MusicDetailRoute({
  params,
}: {
  params: Promise<{ locale: string; song: string }>;
}) {
  const { locale, song: songId } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const song = getMusicSongById(songId);

  if (!song) {
    notFound();
  }

  return <MusicDetailPage locale={locale} song={song} />;
}