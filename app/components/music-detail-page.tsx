import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ExternalLink,
  Languages,
  Mic2,
  Music2,
  UserRound,
} from "lucide-react";
import type { Locale } from "../lib/i18n";
import type { MusicSong } from "../lib/music";

type MusicDetailPageProps = {
  locale: Locale;
  song: MusicSong;
};

const copy = {
  "zh-CN": {
    back: "返回音乐档案馆",
    eyebrow: "GCGS VOCALOID CLUB · SONG DETAILS",
    creators: "创作者",
    vocals: "演唱声库",
    engines: "合成引擎",
    language: "歌曲语言",
    releaseDate: "投稿日期",
    aliases: "别名",
    tags: "作品标签",
    official: "原作者投稿",
    bilibili: "Bilibili 投稿",
    reference: "萌娘百科资料",
    about: "作品简介",
    sourceNote: "本页面仅整理作品相关公开信息。歌曲及其音视频内容的版权归原作者及相应权利人所有。",
    notAvailable: "暂无资料",
  },
  en: {
    back: "Back to Music Archive",
    eyebrow: "GCGS VOCALOID CLUB · SONG DETAILS",
    creators: "Creators",
    vocals: "Vocal Voices",
    engines: "Synthesis Engines",
    language: "Language",
    releaseDate: "Posted",
    aliases: "Aliases",
    tags: "Tags",
    official: "Original Upload",
    bilibili: "Bilibili Upload",
    reference: "Moegirl Reference",
    about: "About This Song",
    sourceNote: "This page organizes publicly available information. Copyright of the song and its audiovisual content belongs to the original creators and respective rights holders.",
    notAvailable: "Not available",
  },
  ja: {
    back: "楽曲アーカイブに戻る",
    eyebrow: "GCGS VOCALOID CLUB · SONG DETAILS",
    creators: "クリエイター",
    vocals: "歌唱音源",
    engines: "合成エンジン",
    language: "楽曲の言語",
    releaseDate: "投稿日",
    aliases: "別名",
    tags: "タグ",
    official: "原作者の投稿",
    bilibili: "Bilibili 投稿",
    reference: "萌娘百科の資料",
    about: "楽曲について",
    sourceNote: "このページは公開情報を整理したものです。楽曲および映像・音声コンテンツの著作権は原作者および各権利者に帰属します。",
    notAvailable: "情報なし",
  },
} satisfies Record<Locale, Record<string, string>>;

const languageNames: Record<Locale, Record<string, string>> = {
  "zh-CN": {
    ja: "日语",
    zh: "中文",
    en: "英语",
    other: "其他",
  },
  en: {
    ja: "Japanese",
    zh: "Chinese",
    en: "English",
    other: "Other",
  },
  ja: {
    ja: "日本語",
    zh: "中国語",
    en: "英語",
    other: "その他",
  },
};

export function MusicDetailPage({
  locale,
  song,
}: MusicDetailPageProps) {
  const t = copy[locale];

  const facts = [
    {
      label: t.creators,
      value: song.creators.join(" / "),
      icon: UserRound,
    },
    {
      label: t.vocals,
      value: song.vocals.join(" / "),
      icon: Mic2,
    },
    {
      label: t.engines,
      value: song.engines.join(" / "),
      icon: Music2,
    },
    {
      label: t.language,
      value: languageNames[locale][song.language],
      icon: Languages,
    },
    {
      label: t.releaseDate,
      value: song.releaseDate,
      icon: CalendarDays,
    },
  ];

  return (
    <main className="min-h-screen bg-[var(--md-sys-color-background)] text-[var(--md-sys-color-on-background)]">
      <div className="mx-auto max-w-5xl px-5 pb-24 pt-8 sm:px-8">
        <Link
          href={`/${locale}/music`}
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-[var(--md-sys-color-outline-variant)] px-4 py-2 text-sm text-[var(--md-sys-color-on-surface-variant)] transition hover:bg-[var(--md-sys-color-surface-container)]"
        >
          <ArrowLeft size={16} />
          {t.back}
        </Link>

        <section className="relative overflow-hidden rounded-[2rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-7 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[var(--gcgs-accent-pink)] opacity-10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 left-1/4 h-72 w-72 rounded-full bg-[var(--gcgs-accent-blue)] opacity-10 blur-3xl" />

          <div className="relative">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-[var(--md-sys-color-primary)]">
              <Music2 size={14} />
              {t.eyebrow}
            </div>

            <div className="mb-5 flex flex-wrap gap-2">
              {song.engines.map((engine) => (
                <span
                  key={engine}
                  className="rounded-full bg-[var(--md-sys-color-secondary-container)] px-3 py-1.5 text-xs font-semibold text-[var(--md-sys-color-on-secondary-container)]"
                >
                  {engine}
                </span>
              ))}
            </div>

            <h1 className="max-w-4xl break-words text-4xl font-bold tracking-tight sm:text-6xl">
              {song.title}
            </h1>

            {song.aliases.length > 0 && (
              <p className="mt-4 text-sm text-[var(--md-sys-color-on-surface-variant)]">
                {t.aliases}: {song.aliases.join(" / ")}
              </p>
            )}

            <p className="mt-7 max-w-3xl text-base leading-8 text-[var(--md-sys-color-on-surface-variant)] sm:text-lg">
              {song.description[locale]}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {song.official.url !== song.bilibili?.url && (
                <a
                  href={song.official.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--md-sys-color-primary)] px-5 py-3 text-sm font-semibold text-[var(--md-sys-color-on-primary)] transition hover:opacity-85"
                >
                  {t.official}
                  <ExternalLink size={15} />
                </a>
              )}

              {song.bilibili && (
                <a
                  href={song.bilibili.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] px-5 py-3 text-sm font-semibold transition hover:bg-[var(--md-sys-color-surface-container)]"
                >
                  {t.bilibili}
                  <ExternalLink size={15} />
                </a>
              )}

              {song.moegirl && (
                <a
                  href={song.moegirl.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] px-5 py-3 text-sm font-semibold transition hover:bg-[var(--md-sys-color-surface-container)]"
                >
                  {t.reference}
                  <ExternalLink size={15} />
                </a>
              )}
            </div>
          </div>
        </section>

        <section className="mt-8">
          <h2 className="mb-4 text-2xl font-bold">{t.about}</h2>

          <div className="grid gap-3 sm:grid-cols-2">
            {facts.map((fact) => {
              const Icon = fact.icon;

              return (
                <div
                  key={fact.label}
                  className="flex min-h-24 items-center gap-4 rounded-2xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]">
                    <Icon size={20} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
                      {fact.label}
                    </p>
                    <p className="mt-1 break-words text-sm font-semibold">
                      {fact.value || t.notAvailable}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {song.tags.length > 0 && (
          <section className="mt-8 rounded-[1.75rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] p-6">
            <h2 className="mb-4 text-lg font-bold">{t.tags}</h2>
            <div className="flex flex-wrap gap-2">
              {song.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-[var(--md-sys-color-surface-container)] px-4 py-2 text-sm text-[var(--md-sys-color-on-surface-variant)]"
                >
                  {tag}
                </span>
              ))}
            </div>
          </section>
        )}

        <p className="mt-10 text-center text-xs leading-6 text-[var(--md-sys-color-on-surface-variant)]">
          {t.sourceNote}
        </p>
      </div>
    </main>
  );
}