
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
    title: "ボーカロイド音楽とバーチャルシンガー",
    openGraphLocale: "ja_JP",
  },
};

const siteName = "GCGS Vocaloid Club";

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
  const fullTitle = `${title} | ${siteName}`;
  const pageUrl = `/${locale}`;

  return {
    title,
    description,

    alternates: {
      canonical: pageUrl,
      languages: {
        "zh-CN": "/zh-CN",
        en: "/en",
        ja: "/ja",
        "x-default": "/zh-CN",
      },
    },

    openGraph: {
      title: fullTitle,
      description,
      siteName,
      locale: localized.openGraphLocale,
      type: "website",
      url: pageUrl,
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
