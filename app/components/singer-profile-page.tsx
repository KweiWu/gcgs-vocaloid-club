
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Ruler,
  Scale,
  UserRound,
  Users,
} from "lucide-react";

import type { Locale } from "../lib/i18n";
import { getSingerById, singers, type SingerProfile } from "../lib/singers";
import { getSingerTheme } from "../lib/singer-themes";
import { SingerArtwork } from "./singer-artwork";

type Props = {
  locale: Locale;
  singer: SingerProfile;
};

const copy = {
  "zh-CN": {
    back: "返回歌手列表",
    database: "虚拟歌手档案",
    profile: "角色资料",
    age: "年龄",
    height: "身高",
    weight: "体重",
    voice: "音源提供者",
    voiceType: "身份",
    release: "首次软件发布",
    background: "角色与背景",
    software: "补充资料",
    color: "角色代表色",
    years: "岁",
    centimeters: "厘米",
    kilograms: "千克",
    navigation: "继续探索",
    previous: "上一位歌手",
    next: "下一位歌手",
    related: "关联角色",
    relatedDescription: "镜音系列的另一位成员",
    viewProfile: "查看角色资料",
    first: "已经是第一位歌手",
    last: "已经是最后一位歌手",
  },
  en: {
    back: "Back to encyclopedia",
    database: "VIRTUAL SINGER PROFILE",
    profile: "Character profile",
    age: "Age",
    height: "Height",
    weight: "Weight",
    voice: "Voice provider",
    voiceType: "Role",
    release: "First software release",
    background: "Character & background",
    software: "Additional information",
    color: "Character color",
    years: "years",
    centimeters: "cm",
    kilograms: "kg",
    navigation: "Continue exploring",
    previous: "Previous singer",
    next: "Next singer",
    related: "Related character",
    relatedDescription: "Another member of the Kagamine series",
    viewProfile: "View profile",
    first: "This is the first singer",
    last: "This is the last singer",
  },
  ja: {
    back: "図鑑に戻る",
    database: "バーチャルシンガー・プロフィール",
    profile: "キャラクター設定",
    age: "年齢",
    height: "身長",
    weight: "体重",
    voice: "音声提供者",
    voiceType: "職業",
    release: "ソフトウェア初回発売日",
    background: "キャラクター・紹介",
    software: "補足情報",
    color: "キャラクターカラー",
    years: "歳",
    centimeters: "cm",
    kilograms: "kg",
    navigation: "次のキャラクターを探す",
    previous: "前のシンガー",
    next: "次のシンガー",
    related: "関連キャラクター",
    relatedDescription: "鏡音シリーズのもう一人のメンバー",
    viewProfile: "プロフィールを見る",
    first: "最初のシンガーです",
    last: "最後のシンガーです",
  },
} as const;

const relatedSingerIds: Record<string, string> = {
  "kagamine-rin": "kagamine-len",
  "kagamine-len": "kagamine-rin",
};

export function SingerProfilePage({ locale, singer }: Props) {
  const t = copy[locale];
  const theme = getSingerTheme(singer.themeId);

  const currentIndex = singers.findIndex(
    (item) => item.id === singer.id,
  );

  const previousSinger =
    currentIndex > 0 ? singers[currentIndex - 1] : undefined;

  const nextSinger =
    currentIndex >= 0 && currentIndex < singers.length - 1
      ? singers[currentIndex + 1]
      : undefined;

  const relatedSingerId = relatedSingerIds[singer.id];
  const relatedSinger = relatedSingerId
    ? getSingerById(relatedSingerId)
    : undefined;

  const facts = [
    singer.age !== undefined && {
      label: t.age,
      value: `${singer.age} ${t.years}`,
      icon: UserRound,
    },
    singer.height !== undefined && {
      label: t.height,
      value: `${singer.height} ${t.centimeters}`,
      icon: Ruler,
    },
    singer.weight !== undefined && {
      label: t.weight,
      value: `${singer.weight} ${t.kilograms}`,
      icon: Scale,
    },
  ].filter((fact) => fact !== false);

  return (
    <main className="min-h-screen bg-[var(--md-sys-color-background)] text-[var(--md-sys-color-on-background)]">
      <div className="mx-auto max-w-6xl px-5 pb-24 pt-8 lg:px-8">
        <Link
          href={`/${locale}/encyclopedia`}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--md-sys-color-on-surface-variant)] transition-colors hover:bg-[var(--md-sys-color-surface-container)]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t.back}
        </Link>

        <header
          className="relative mt-10 overflow-hidden rounded-[2.5rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] px-7 py-12 sm:px-12 sm:py-16"
          style={{
            backgroundImage: `radial-gradient(circle at 85% 20%, ${theme.seed}30, transparent 42%)`,
          }}
        >
          {/* 右侧官方立绘 */}
          <SingerArtwork
            singerId={singer.id}
            alt={singer.names[locale]}
            priority
            className="pointer-events-none absolute inset-y-0 right-0 z-0 hidden h-full w-[42%] opacity-95 sm:block"
            sizes="(max-width: 1024px) 42vw, 520px"
          />

          {/* 左侧文字内容 */}
          <div className="relative z-10 max-w-3xl sm:max-w-[62%]">
            <p className="text-xs font-bold tracking-[0.2em] text-[var(--md-sys-color-primary)]">
              {t.database}
            </p>

            <div className="relative inline-block">
              <p className="mt-8 text-xs font-bold tracking-[0.22em] text-[var(--md-sys-color-on-surface-variant)]">
                {singer.romanizedName}
              </p>

              <h1 className="mt-3 text-5xl font-bold tracking-tight sm:text-7xl">
                {singer.names[locale]}
              </h1>
            </div>

            <p className="mt-5 text-base leading-8 text-[var(--md-sys-color-on-surface-variant)] sm:text-lg">
              {singer.introduction[locale]}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[var(--md-sys-color-secondary-container)] px-4 py-2 text-sm font-semibold text-[var(--md-sys-color-on-secondary-container)]">
                {singer.category[locale]}
              </span>

              <span className="rounded-full border border-[var(--md-sys-color-outline-variant)] px-4 py-2 text-sm font-medium">
                {singer.releaseDate[locale]}
              </span>
            </div>
          </div>

          <div
            aria-hidden="true"
            className="absolute -bottom-20 -right-12 h-64 w-64 rounded-full opacity-30 blur-3xl"
            style={{ backgroundColor: theme.seed }}
          />

          {singer.portrait && (
            <p className="absolute bottom-3 right-6 z-10 text-[10px] tracking-wider text-[var(--md-sys-color-on-surface-variant)] opacity-70">
              {singer.portrait.credit} © Crypton Future Media, INC.
            </p>
          )}
        </header>

        <div className="mt-8 grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <section className="rounded-[2rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-6 sm:p-7">
            <p className="text-xs font-bold tracking-[0.18em] text-[var(--md-sys-color-primary)]">
              {t.profile}
            </p>

            <h2 className="mt-3 text-2xl font-bold">
              {t.background}
            </h2>

            <p className="mt-5 text-sm leading-7 text-[var(--md-sys-color-on-surface-variant)] sm:text-base">
              {singer.biography[locale]}
            </p>

            <p className="mt-5 rounded-2xl bg-[var(--md-sys-color-surface-container)] p-4 text-sm leading-7 text-[var(--md-sys-color-on-surface-variant)]">
              {singer.softwareNote[locale]}
            </p>
          </section>

          <section className="rounded-[2rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-5 sm:p-7">
            <div className="grid items-center gap-5 md:grid-cols-[minmax(0,1fr)_180px] lg:grid-cols-[minmax(0,1fr)_190px]">
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-[0.18em] text-[var(--md-sys-color-primary)]">
                  {t.profile}
                </p>

                <h2 className="mt-2 text-xl font-bold">
                  {t.voice}
                </h2>

                {facts.length > 0 && (
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    {facts.map((fact) => {
                      if (!fact) return null;

                      const Icon = fact.icon;

                      return (
                        <div
                          key={fact.label}
                          className="min-w-0 rounded-xl bg-[var(--md-sys-color-surface-container)] p-3"
                        >
                          <Icon
                            size={16}
                            className="text-[var(--md-sys-color-primary)]"
                            aria-hidden="true"
                          />

                          <p className="mt-2 text-xs text-[var(--md-sys-color-on-surface-variant)]">
                            {fact.label}
                          </p>

                          <p className="mt-1 break-words text-base font-bold">
                            {fact.value}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                )}

                <div className="mt-4 border-t border-[var(--md-sys-color-outline-variant)] pt-4">
                  <p className="text-lg font-bold">
                    {singer.voiceSource}
                  </p>

                  <p className="mt-1 text-xs text-[var(--md-sys-color-on-surface-variant)]">
                    {singer.voiceSourceRomanized}
                  </p>

                  <p className="mt-2 text-xs text-[var(--md-sys-color-on-surface-variant)]">
                    {t.voiceType} · {singer.voiceSourceType[locale]}
                  </p>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 border-t border-[var(--md-sys-color-outline-variant)] pt-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={16}
                        className="text-[var(--md-sys-color-primary)]"
                        aria-hidden="true"
                      />
                      <p className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
                        {t.release}
                      </p>
                    </div>

                    <p className="mt-2 text-sm font-bold">
                      {singer.releaseDate[locale]}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
                      {t.color}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <span
                        className="h-8 w-8 shrink-0 rounded-xl border border-black/10 shadow-sm"
                        style={{ backgroundColor: theme.seed }}
                      />
                      <p className="text-sm font-bold">
                        {theme.seed.toUpperCase()}
                      </p>
                    </div>
                  </div>
                </div>

                <p className="mt-2 text-xs leading-5 text-[var(--md-sys-color-on-surface-variant)]">
                  {theme.descriptions[locale]}
                </p>
              </div>

              <div className="relative mx-auto h-72 w-full max-w-[190px] md:h-80">
                <SingerArtwork
                  singerId={singer.id}
                  alt={singer.names[locale]}
                  className="relative h-full w-full"
                  sizes="(max-width: 768px) 190px, 190px"
                />
              </div>
            </div>
          </section>
        </div>

        {relatedSinger && (
          <section className="mt-8">
            <div className="mb-5 flex items-center gap-3">
              <Users
                size={20}
                className="text-[var(--md-sys-color-primary)]"
                aria-hidden="true"
              />

              <h2 className="text-xl font-bold">
                {t.related}
              </h2>
            </div>

            <Link
              href={`/${locale}/encyclopedia/${relatedSinger.id}`}
              className="group flex flex-col gap-5 rounded-[2rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-6 transition-all hover:-translate-y-1 hover:shadow-lg sm:flex-row sm:items-center sm:justify-between sm:p-8"
            >
              <div className="flex items-center gap-5">
                <SingerArtwork
                  singerId={relatedSinger.id}
                  alt={relatedSinger.names[locale]}
                  className="h-24 w-20 shrink-0 overflow-hidden rounded-2xl"
                  sizes="80px"
                />

                <div>
                  <p className="text-xs font-semibold tracking-wider text-[var(--md-sys-color-on-surface-variant)]">
                    {t.relatedDescription}
                  </p>

                  <h3 className="mt-1 text-2xl font-bold">
                    {relatedSinger.names[locale]}
                  </h3>

                  <p className="mt-1 text-sm text-[var(--md-sys-color-on-surface-variant)]">
                    {relatedSinger.romanizedName}
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-2 self-start rounded-full bg-[var(--md-sys-color-secondary-container)] px-5 py-3 text-sm font-semibold text-[var(--md-sys-color-on-secondary-container)] transition-all group-hover:gap-3 sm:self-center">
                {t.viewProfile}
                <ArrowRight size={16} aria-hidden="true" />
              </span>
            </Link>
          </section>
        )}

        <section className="mt-12">
          <div className="mb-5">
            <p className="text-xs font-bold tracking-[0.18em] text-[var(--md-sys-color-primary)]">
              {t.navigation}
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {previousSinger ? (
              <Link
                href={`/${locale}/encyclopedia/${previousSinger.id}`}
                className="group flex min-h-28 items-center gap-4 rounded-[2rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]">
                  <ArrowLeft size={20} aria-hidden="true" />
                </span>

                <div className="min-w-0">
                  <p className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
                    {t.previous}
                  </p>

                  <p className="mt-1 truncate text-lg font-bold">
                    {previousSinger.names[locale]}
                  </p>
                </div>
              </Link>
            ) : (
              <div className="flex min-h-28 items-center rounded-[2rem] border border-dashed border-[var(--md-sys-color-outline-variant)] px-6 py-5 text-sm text-[var(--md-sys-color-on-surface-variant)]">
                {t.first}
              </div>
            )}

            {nextSinger ? (
              <Link
                href={`/${locale}/encyclopedia/${nextSinger.id}`}
                className="group flex min-h-28 items-center justify-end gap-4 rounded-[2rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-6 text-right transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="min-w-0">
                  <p className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
                    {t.next}
                  </p>

                  <p className="mt-1 truncate text-lg font-bold">
                    {nextSinger.names[locale]}
                  </p>
                </div>

                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]">
                  <ArrowRight size={20} aria-hidden="true" />
                </span>
              </Link>
            ) : (
              <div className="flex min-h-28 items-center justify-end rounded-[2rem] border border-dashed border-[var(--md-sys-color-outline-variant)] px-6 py-5 text-right text-sm text-[var(--md-sys-color-on-surface-variant)]">
                {t.last}
              </div>
            )}
          </div>
        </section>
      </div>
    </main>
  );
}
