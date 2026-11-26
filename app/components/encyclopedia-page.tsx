
import Link from "next/link";
import { ArrowLeft, ArrowRight, BookOpen, CalendarDays } from "lucide-react";

import type { Locale } from "../lib/i18n";
import { singers } from "../lib/singers";
import { getSingerTheme } from "../lib/singer-themes";
import { SingerArtwork } from "./singer-artwork";

type Props = {
  locale: Locale;
};

const copy = {
  "zh-CN": {
    back: "返回首页",
    eyebrow: "GCGS VOCALOID CLUB · DATABASE",
    title: "虚拟歌手百科",
    description: "认识那些让无数音乐创作成为可能的声音与角色。",
    count: "位歌手",
    release: "首次软件发布",
    explore: "查看档案",
    note: "本页面整理角色设定与歌声合成软件相关资料。",
  },
  en: {
    back: "Back to home",
    eyebrow: "GCGS VOCALOID CLUB · DATABASE",
    title: "Singer Encyclopedia",
    description:
      "Meet the voices and characters behind countless musical creations.",
    count: "singers",
    release: "First software release",
    explore: "View profile",
    note:
      "This encyclopedia collects character profiles and singing synthesis software information.",
  },
  ja: {
    back: "ホームに戻る",
    eyebrow: "GCGS VOCALOID CLUB · DATABASE",
    title: "バーチャルシンガー図鑑",
    description:
      "数多くの音楽作品を生み出してきた歌声とキャラクターを紹介します。",
    count: "名",
    release: "ソフトウェア初回発売日",
    explore: "プロフィールを見る",
    note:
      "キャラクター設定と歌声合成ソフトウェアに関する情報を掲載しています。",
  },
} as const;

export function EncyclopediaPage({ locale }: Props) {
  const t = copy[locale];

  return (
    <main className="min-h-screen bg-[var(--md-sys-color-background)] text-[var(--md-sys-color-on-background)]">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-8 lg:px-8">
        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold text-[var(--md-sys-color-on-surface-variant)] transition-colors hover:bg-[var(--md-sys-color-surface-container)]"
        >
          <ArrowLeft size={16} aria-hidden="true" />
          {t.back}
        </Link>

        {/* 页面标题 */}
        <header className="relative mt-12 overflow-hidden rounded-[2.5rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low] px-7 py-12 sm:px-12 sm:py-16">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[var(--gcgs-accent-blue)] opacity-20 blur-3xl"
          />

          <div className="relative max-w-3xl">
            <p className="text-xs font-bold tracking-[0.2em] text-[var(--md-sys-color-primary)]">
              {t.eyebrow}
            </p>

            <h1 className="mt-5 text-4xl font-bold tracking-tight sm:text-6xl">
              {t.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--md-sys-color-on-surface-variant)] sm:text-lg">
              {t.description}
            </p>

            <div className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--md-sys-color-secondary-container)] px-4 py-2 text-sm font-semibold text-[var(--md-sys-color-on-secondary-container)]">
              <BookOpen size={16} aria-hidden="true" />
              {singers.length} {t.count}
            </div>
          </div>
        </header>

        {/* 歌手卡片 */}
        <section className="mt-14" aria-label={t.title}>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {singers.map((singer, index) => {
              const theme = getSingerTheme(singer.themeId);

              return (
                <Link
                  key={singer.id}
                  href={`/${locale}/encyclopedia/${singer.id}`}
                  className="group relative flex min-h-[550px] flex-col overflow-hidden rounded-[2rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-6 transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--md-sys-color-outline)] hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--md-sys-color-primary)] sm:p-7"
                  style={{
                    backgroundImage: `linear-gradient(180deg, ${theme.seed}18 0%, transparent 48%)`,
                  }}
                >
                  {/* 角色专属背景光 */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-20 blur-3xl transition-opacity duration-500 group-hover:opacity-40"
                    style={{ backgroundColor: theme.seed }}
                  />

                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-24 -left-20 h-56 w-56 rounded-full opacity-10 blur-3xl transition-opacity duration-500 group-hover:opacity-25"
                    style={{ backgroundColor: theme.seed }}
                  />

                  {/* 编号与代表色 */}
                  <div className="relative z-10 flex items-center justify-between">
                    <span className="text-sm font-bold tracking-[0.2em] text-[var(--md-sys-color-outline)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      className="h-3 w-3 rounded-full shadow-sm ring-4 ring-[var(--md-sys-color-surface-container)]"
                      style={{ backgroundColor: theme.seed }}
                      aria-label={theme.descriptions[locale]}
                    />
                  </div>

                  {/* 官方角色立绘 */}
                  <div className="relative z-10 mt-4 flex h-64 w-full items-end justify-center">
                    <SingerArtwork
                      singerId={singer.id}
                      alt={singer.names[locale]}
                      className="relative h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                      sizes="(max-width: 640px) 85vw, (max-width: 1024px) 40vw, 28vw"
                    />
                  </div>

                  {/* 角色信息 */}
                  <div className="relative z-10 mt-5 flex flex-1 flex-col">
                    <p className="text-xs font-bold tracking-[0.16em] text-[var(--md-sys-color-on-surface-variant)]">
                      {singer.romanizedName}
                    </p>

                    <h2 className="mt-2 text-3xl font-bold tracking-tight">
                      {singer.names[locale]}
                    </h2>

                    <p
                      className="mt-2 text-sm font-semibold"
                      style={{ color: theme.seed }}
                    >
                      {singer.category[locale]}
                    </p>

                    <p className="mt-4 min-h-[5.5rem] text-sm leading-7 text-[var(--md-sys-color-on-surface-variant)]">
                      {singer.introduction[locale]}
                    </p>
                  </div>

                  {/* 卡片底部 */}
                  <div className="relative z-10 mt-5 flex items-center justify-between gap-3 border-t border-[var(--md-sys-color-outline-variant)] pt-5">
                    <span className="flex min-w-0 items-center gap-2 text-xs text-[var(--md-sys-color-on-surface-variant)]">
                      <CalendarDays
                        size={14}
                        className="shrink-0"
                        aria-hidden="true"
                      />
                      <span className="truncate">
                        {singer.releaseDate[locale]}
                      </span>
                    </span>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] transition-all duration-300 group-hover:translate-x-1 group-hover:bg-[var(--md-sys-color-primary)] group-hover:text-[var(--md-sys-color-on-primary)]">
                      <ArrowRight size={18} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* 页面说明 */}
        <p className="mt-10 text-center text-xs leading-6 text-[var(--md-sys-color-on-surface-variant)]">
          {t.note}
        </p>
      </div>
    </main>
  );
}
