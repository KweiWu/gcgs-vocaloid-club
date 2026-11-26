"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  ArrowDownAZ,
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ExternalLink,
  Music2,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import {
  musicEngineOptions,
  musicLanguageOptions,
  musicSongs,
} from "../lib/music";
import type { MusicEngine, MusicLanguage } from "../lib/music";
import type { Locale } from "../lib/i18n";

type MusicPageProps = {
  locale: Locale;
};

const copy = {
  "zh-CN": {
    eyebrow: "GCGS VOCALOID CLUB · MUSIC ARCHIVE",
    title: "音乐档案馆",
    subtitle: "探索不同声音、创作者与音乐合成技术所创造的作品。",
    back: "返回首页",
    search: "搜索歌曲、创作者、歌声或标签……",
    allEngines: "全部引擎",
    allLanguages: "全部语言",
    sortLatest: "最新发布",
    sortEarliest: "最早发布",
    sortTitle: "标题 A–Z",
    results: "首作品",
    noResults: "没有找到符合条件的作品",
    noResultsHint: "试试更换关键词或筛选条件。",
    creators: "创作者",
    vocals: "演唱声库",
    engine: "合成引擎",
    language: "歌曲语言",
    releaseDate: "投稿日期",
    official: "官方投稿",
    reference: "资料来源",
    explore: "查看作品详情",
    sourceNote: "作品资料根据公开资料整理；投稿平台链接以原作者发布页面为准。",
    emptyTag: "音乐作品",
    clear: "清除筛选",
  },
  en: {
    eyebrow: "GCGS VOCALOID CLUB · MUSIC ARCHIVE",
    title: "Music Archive",
    subtitle: "Explore music created through different voices, artists, and synthesis technologies.",
    back: "Back to Home",
    search: "Search songs, creators, voices, or tags...",
    allEngines: "All Engines",
    allLanguages: "All Languages",
    sortLatest: "Newest First",
    sortEarliest: "Oldest First",
    sortTitle: "Title A–Z",
    results: "songs",
    noResults: "No matching songs found",
    noResultsHint: "Try changing your search or filters.",
    creators: "Creators",
    vocals: "Vocal Voices",
    engine: "Synthesis Engine",
    language: "Language",
    releaseDate: "Posted",
    official: "Official Upload",
    reference: "Reference",
    explore: "Explore Song",
    sourceNote: "Song information is compiled from public references. Upload links lead to the original creators' publications.",
    emptyTag: "Music",
    clear: "Clear Filters",
  },
  ja: {
    eyebrow: "GCGS VOCALOID CLUB · MUSIC ARCHIVE",
    title: "楽曲アーカイブ",
    subtitle: "さまざまな歌声、クリエイター、音声合成技術から生まれた作品を探しましょう。",
    back: "ホームに戻る",
    search: "楽曲・クリエイター・歌声・タグを検索...",
    allEngines: "すべてのエンジン",
    allLanguages: "すべての言語",
    sortLatest: "新しい順",
    sortEarliest: "古い順",
    sortTitle: "タイトル順 A–Z",
    results: "曲",
    noResults: "該当する楽曲が見つかりません",
    noResultsHint: "検索キーワードや絞り込み条件を変更してください。",
    creators: "クリエイター",
    vocals: "歌唱音源",
    engine: "合成エンジン",
    language: "言語",
    releaseDate: "投稿日",
    official: "公式投稿",
    reference: "参考資料",
    explore: "楽曲の詳細を見る",
    sourceNote: "楽曲情報は公開資料をもとに整理しています。投稿リンクは原作者による公開ページです。",
    emptyTag: "音楽作品",
    clear: "フィルターを解除",
  },
} satisfies Record<Locale, Record<string, string>>;

const languageNames: Record<Locale, Record<MusicLanguage, string>> = {
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

export function MusicPage({ locale }: MusicPageProps) {
  const t = copy[locale];

  const [search, setSearch] = useState("");
  const [engine, setEngine] = useState<MusicEngine | "all">("all");
  const [language, setLanguage] = useState<MusicLanguage | "all">("all");
  const [sort, setSort] = useState<"latest" | "earliest" | "title">("latest");

  const filteredSongs = useMemo(() => {
    const keyword = search.trim().toLocaleLowerCase();

    const result = musicSongs.filter((song) => {
      const matchesSearch =
        !keyword ||
        [
          song.title,
          ...song.aliases,
          ...song.creators,
          ...song.vocals,
          ...song.tags,
          ...song.engines,
        ]
          .join(" ")
          .toLocaleLowerCase()
          .includes(keyword);

      const matchesEngine =
        engine === "all" || song.engines.includes(engine);

      const matchesLanguage =
        language === "all" || song.language === language;

      return matchesSearch && matchesEngine && matchesLanguage;
    });

    return [...result].sort((a, b) => {
      if (sort === "latest") {
        return b.releaseDate.localeCompare(a.releaseDate);
      }

      if (sort === "earliest") {
        return a.releaseDate.localeCompare(b.releaseDate);
      }

      return a.title.localeCompare(b.title);
    });
  }, [search, engine, language, sort]);

  const clearFilters = () => {
    setSearch("");
    setEngine("all");
    setLanguage("all");
    setSort("latest");
  };

  return (
    <main className="min-h-screen bg-[var(--md-sys-color-background)] text-[var(--md-sys-color-on-background)]">
      <div className="mx-auto max-w-7xl px-5 pb-24 pt-8 sm:px-8 lg:px-10">
        <Link
          href={`/${locale}`}
          className="mb-10 inline-flex items-center gap-2 rounded-full border border-[var(--md-sys-color-outline-variant)] px-4 py-2 text-sm text-[var(--md-sys-color-on-surface-variant)] transition hover:bg-[var(--md-sys-color-surface-container)]"
        >
          <ArrowLeft size={16} />
          {t.back}
        </Link>

        <section className="relative mb-10 overflow-hidden rounded-[2rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-7 sm:p-12">
          <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-[var(--gcgs-accent-pink)] opacity-10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-32 right-1/4 h-72 w-72 rounded-full bg-[var(--gcgs-accent-blue)] opacity-10 blur-3xl" />

          <div className="relative max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] px-3 py-1.5 text-xs font-semibold tracking-[0.16em] text-[var(--md-sys-color-primary)]">
              <Music2 size={14} />
              {t.eyebrow}
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              {t.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--md-sys-color-on-surface-variant)] sm:text-lg">
              {t.subtitle}
            </p>

            <div className="mt-8 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]">
                <Music2 size={23} />
              </div>
              <div>
                <div className="text-2xl font-bold tabular-nums">
                  {musicSongs.length}
                </div>
                <div className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
                  {t.results}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8 rounded-[1.75rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] p-5 sm:p-6">
          <div className="mb-5 flex items-center gap-2 text-sm font-semibold">
            <SlidersHorizontal size={17} />
            {locale === "zh-CN"
              ? "搜索与筛选"
              : locale === "ja"
                ? "検索と絞り込み"
                : "Search & Filters"}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative sm:col-span-2">
              <Search
                size={18}
                className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--md-sys-color-on-surface-variant)]"
              />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder={t.search}
                className="h-12 w-full rounded-xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] pl-11 pr-4 text-sm outline-none transition focus:border-[var(--md-sys-color-primary)]"
              />
            </div>

            <select
              value={engine}
              onChange={(event) =>
                setEngine(event.target.value as MusicEngine | "all")
              }
              className="h-12 rounded-xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] px-4 text-sm outline-none focus:border-[var(--md-sys-color-primary)]"
              aria-label={t.engine}
            >
              <option value="all">{t.allEngines}</option>
              {musicEngineOptions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <select
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value as MusicLanguage | "all")
              }
              className="h-12 rounded-xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] px-4 text-sm outline-none focus:border-[var(--md-sys-color-primary)]"
              aria-label={t.language}
            >
              <option value="all">{t.allLanguages}</option>
              {musicLanguageOptions.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.labels[locale]}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-[var(--md-sys-color-on-surface-variant)]">
              <ArrowDownAZ size={15} />
              <span>{locale === "zh-CN" ? "排序方式" : locale === "ja" ? "並び替え" : "Sort by"}</span>
              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value as typeof sort)
                }
                className="rounded-lg bg-[var(--md-sys-color-surface-container)] px-3 py-2 text-xs text-[var(--md-sys-color-on-surface)] outline-none"
              >
                <option value="latest">{t.sortLatest}</option>
                <option value="earliest">{t.sortEarliest}</option>
                <option value="title">{t.sortTitle}</option>
              </select>
            </div>

            <button
              type="button"
              onClick={clearFilters}
              className="text-xs font-medium text-[var(--md-sys-color-primary)] transition hover:opacity-70"
            >
              {t.clear}
            </button>
          </div>
        </section>

        <div className="mb-5 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold tracking-[0.16em] text-[var(--md-sys-color-primary)]">
              MUSIC COLLECTION
            </p>
            <h2 className="mt-2 text-2xl font-bold">
              {locale === "zh-CN"
                ? "全部作品"
                : locale === "ja"
                  ? "すべての楽曲"
                  : "All Songs"}
            </h2>
          </div>
          <span className="text-sm tabular-nums text-[var(--md-sys-color-on-surface-variant)]">
            {filteredSongs.length} / {musicSongs.length}
          </span>
        </div>

        {filteredSongs.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {filteredSongs.map((song, index) => (
              <article
                key={song.id}
                className="group flex min-h-[25rem] flex-col overflow-hidden rounded-[1.75rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div
                  className="relative flex min-h-40 items-center justify-center overflow-hidden p-6"
                  style={{
                    background:
                      index % 3 === 0
                        ? "linear-gradient(135deg, var(--gcgs-accent-pink), var(--gcgs-accent-purple))"
                        : index % 3 === 1
                          ? "linear-gradient(135deg, var(--gcgs-accent-blue), var(--gcgs-accent-purple))"
                          : "linear-gradient(135deg, var(--gcgs-accent-yellow), var(--gcgs-accent-pink))",
                  }}
                >
                  <div className="absolute inset-0 bg-black/10" />
                  <div className="absolute -right-8 -top-16 h-48 w-48 rounded-full border border-white/25" />
                  <div className="absolute -bottom-24 -left-8 h-56 w-56 rounded-full border border-white/20" />

                  <div className="relative text-center text-white">
                    <Music2 size={34} className="mx-auto mb-3 opacity-90" />
                    <p className="text-xs font-semibold tracking-[0.2em] opacity-80">
                      MUSIC ARCHIVE
                    </p>
                    <p className="mt-2 max-w-xs text-xl font-bold tracking-tight sm:text-2xl">
                      {song.title}
                    </p>
                  </div>

                  <span className="absolute right-4 top-4 rounded-full border border-white/30 bg-black/10 px-3 py-1 text-[10px] font-semibold text-white backdrop-blur-sm">
                    {song.engines.join(" / ")}
                  </span>
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[var(--md-sys-color-secondary-container)] px-3 py-1 text-xs font-medium text-[var(--md-sys-color-on-secondary-container)]">
                      {languageNames[locale][song.language]}
                    </span>
                    {song.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[var(--md-sys-color-surface-container)] px-3 py-1 text-xs text-[var(--md-sys-color-on-surface-variant)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <h3 className="text-xl font-bold tracking-tight">
                    {song.title}
                  </h3>

                  <p className="mt-2 line-clamp-2 text-sm leading-6 text-[var(--md-sys-color-on-surface-variant)]">
                    {song.description[locale]}
                  </p>

                  <div className="mt-5 space-y-2 text-xs text-[var(--md-sys-color-on-surface-variant)]">
                    <p>
                      <span className="font-semibold text-[var(--md-sys-color-on-surface)]">
                        {t.creators}:
                      </span>{" "}
                      {song.creators.join(", ")}
                    </p>
                    <p>
                      <span className="font-semibold text-[var(--md-sys-color-on-surface)]">
                        {t.vocals}:
                      </span>{" "}
                      {song.vocals.join(", ")}
                    </p>
                    <p className="flex items-center gap-2">
                      <CalendarDays size={14} />
                      {song.releaseDate}
                    </p>
                  </div>

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--md-sys-color-outline-variant)] pt-5">
                    <div className="flex flex-wrap gap-3">
                      <a
                        href={song.official.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-medium text-[var(--md-sys-color-primary)] hover:underline"
                      >
                        {t.official}
                        <ExternalLink size={12} />
                      </a>
                      {song.moegirl && (
                        <a
                          href={song.moegirl.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-[var(--md-sys-color-on-surface-variant)] hover:underline"
                        >
                          {t.reference}
                          <ExternalLink size={12} />
                        </a>
                      )}
                    </div>

                    <Link
                      href={`/${locale}/music/${song.id}`}
                      aria-label={`${t.explore}: ${song.title}`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] transition group-hover:translate-x-1"
                    >
                      <ArrowRight size={17} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-[1.75rem] border border-dashed border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] px-6 py-20 text-center">
            <Music2
              size={36}
              className="mx-auto mb-4 text-[var(--md-sys-color-on-surface-variant)]"
            />
            <h3 className="text-xl font-bold">{t.noResults}</h3>
            <p className="mt-2 text-sm text-[var(--md-sys-color-on-surface-variant)]">
              {t.noResultsHint}
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-full bg-[var(--md-sys-color-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--md-sys-color-on-primary)] transition hover:opacity-85"
            >
              {t.clear}
            </button>
          </div>
        )}

        <p className="mt-10 text-center text-xs leading-6 text-[var(--md-sys-color-on-surface-variant)]">
          {t.sourceNote}
        </p>
      </div>
    </main>
  );
}