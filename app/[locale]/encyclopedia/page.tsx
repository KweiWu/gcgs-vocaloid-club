
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { EncyclopediaPage } from "../../components/encyclopedia-page";
import { isLocale, locales, type Locale } from "../../lib/i18n";

const metadataByLocale: Record<Locale, Metadata> = {
  "zh-CN": {
    title: "虚拟歌手百科",
    description: "认识初音未来、镜音铃、镜音连、巡音流歌、MEIKO 与 KAITO。",
  },
  en: {
    title: "Singer Encyclopedia",
    description: "Explore the profiles and backgrounds of six Crypton virtual singers.",
  },
  ja: {
    title: "バーチャルシンガー図鑑",
    description: "初音ミク、鏡音リン、鏡音レン、巡音ルカ、MEIKO、KAITOを紹介します。",
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

  if (!isLocale(locale)) return {};

  return metadataByLocale[locale];
}

export default async function EncyclopediaRoute({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <EncyclopediaPage locale={locale} />;
}
