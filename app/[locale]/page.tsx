
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomePage } from "../components/home-page";
import {
  getDictionary,
  isLocale,
  locales,
  type Locale,
} from "../lib/i18n";

const localizedMetadata: Record<
  Locale,
  {
    title: string;
    openGraphLocale: string;
  }
> = {
  "zh-CN": {
    title: "Vocaloid 音乐与虚拟歌手",
    openGraphLocale: "zh_CN",
  },
  en: {
    title: "Vocaloid Music & Virtual Singers",
    openGraphLocale: "en_US",
  },
  ja: {
    title: "ボカロ音楽とバーチャルシンガー",
    openGraphLocale: "ja_JP",
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

  const dictionary = getDictionary(locale);
  const localized = localizedMetadata[locale];

  const title = localized.title;
  const description = dictionary.hero.description;
  const fullTitle = `${title} | GCGS Vocaloid Club`;

  return {
    title,
    description,

    openGraph: {
      title: fullTitle,
      description,
      siteName: "GCGS Vocaloid Club",
      locale: localized.openGraphLocale,
      type: "website",
    },

    twitter: {
      card: "summary",
      title: fullTitle,
      description,
    },
  };
}

export default async function LocalePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  return <HomePage locale={locale as Locale} />;
}
