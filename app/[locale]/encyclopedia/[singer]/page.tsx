
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { SingerProfilePage } from "../../../components/singer-profile-page";
import { isLocale, locales, type Locale } from "../../../lib/i18n";
import { getSingerById, singers } from "../../../lib/singers";

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    singers.map((singer) => ({
      locale,
      singer: singer.id,
    })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; singer: string }>;
}): Promise<Metadata> {
  const { locale, singer: singerId } = await params;

  if (!isLocale(locale)) return {};

  const singer = getSingerById(singerId);

  if (!singer) return {};

  return {
    title: singer.names[locale],
    description: singer.introduction[locale],
    openGraph: {
      title: singer.names[locale],
      description: singer.introduction[locale],
      type: "profile",
    },
  };
}

export default async function SingerRoute({
  params,
}: {
  params: Promise<{ locale: string; singer: string }>;
}) {
  const { locale, singer: singerId } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const singer = getSingerById(singerId);

  if (!singer) {
    notFound();
  }

  return <SingerProfilePage locale={locale as Locale} singer={singer} />;
}
