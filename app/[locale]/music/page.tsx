import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MusicPage } from "../../components/music-page";
import { isLocale, locales, type Locale } from "../../lib/i18n";

const metadataByLocale: Record<Locale, Metadata> = {
  "zh-CN": {
    title: "音乐档案馆 | GCGS Vocaloid Club",
    description: "探索 VOCALOID、Synthesizer V、ACE Studio 等音声合成音乐作品。",
  },
  en: {
    title: "Music Archive | GCGS Vocaloid Club",
    description: "Explore music created with VOCALOID, Synthesizer V, ACE Studio, and more.",
  },
  ja: {
    title: "楽曲アーカイブ | GCGS Vocaloid Club",
    description: "VOCALOID、Synthesizer V、ACE Studioなどの音声合成楽曲を探しましょう。",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  return metadataByLocale[locale];
}

export default async function MusicRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <MusicPage locale={locale} />;
}