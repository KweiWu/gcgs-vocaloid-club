
"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, Music2, X } from "lucide-react";
import Link from "next/link";

import {
  localeLabels,
  messages,
  type Locale,
} from "../lib/i18n";

import { singers } from "../lib/singers";
import { getSingerTheme } from "../lib/singer-themes";
import { SingerArtwork } from "./singer-artwork";
import { SingerThemeSelector } from "./singer-theme-selector";
import { useSingerTheme } from "./theme-provider";

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  const t = messages[locale];
  const { colorMode, setColorMode } = useSingerTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  // Homepage Hero character
  const heroSinger = singers[0];
  const heroTheme = getSingerTheme(heroSinger.themeId);

  const accessibilityLabels = {
    skipToContent:
      locale === "zh-CN"
        ? "跳转到主要内容"
        : locale === "ja"
          ? "メインコンテンツへスキップ"
          : "Skip to main content",
    primaryNavigation:
      locale === "zh-CN"
        ? "主要导航"
        : locale === "ja"
          ? "メインナビゲーション"
          : "Primary navigation",
    mobileNavigation:
      locale === "zh-CN"
        ? "移动端导航"
        : locale === "ja"
          ? "モバイルナビゲーション"
          : "Mobile navigation",
    languageSelector:
      locale === "zh-CN"
        ? "语言选择"
        : locale === "ja"
          ? "言語選択"
          : "Language selector",
    colorModeSelector:
      locale === "zh-CN"
        ? "颜色模式"
        : locale === "ja"
          ? "カラーモード"
          : "Color mode",
    openMenu:
      locale === "zh-CN"
        ? "打开导航菜单"
        : locale === "ja"
          ? "ナビゲーションメニューを開く"
          : "Open navigation menu",
    closeMenu:
      locale === "zh-CN"
        ? "关闭导航菜单"
        : locale === "ja"
          ? "ナビゲーションメニューを閉じる"
          : "Close navigation menu",
    home:
      locale === "zh-CN"
        ? "返回首页"
        : locale === "ja"
          ? "ホームへ戻る"
          : "Go to homepage",
  };

  const sectionLabels = {
    music:
      locale === "zh-CN"
        ? ["歌曲", "歌单", "音乐发现"]
        : locale === "ja"
          ? ["楽曲", "プレイリスト", "音楽発見"]
          : ["Songs", "Playlists", "Music discovery"],

    encyclopedia:
      locale === "zh-CN"
        ? ["初音未来", "镜音双子", "巡音流歌"]
        : locale === "ja"
          ? ["初音ミク", "鏡音リン・レン", "巡音ルカ"]
          : ["Hatsune Miku", "Kagamine Rin & Len", "Megurine Luka"],

    theory:
      locale === "zh-CN"
        ? ["作曲", "编曲", "调声", "音乐制作"]
        : locale === "ja"
          ? ["作曲", "編曲", "調声", "音楽制作"]
          : ["Composition", "Arrangement", "Vocal tuning", "Production"],

    community:
      locale === "zh-CN"
        ? ["社团动态", "活动与企划", "作品展示", "成员交流"]
        : locale === "ja"
          ? ["クラブニュース", "イベント・企画", "作品展示", "メンバー交流"]
          : [
              "Club updates",
              "Events & projects",
              "Creative showcase",
              "Member community",
            ],

    comingSoon:
      locale === "zh-CN"
        ? "内容正在规划中"
        : locale === "ja"
          ? "コンテンツを準備中"
          : "Content in development",
  };

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const navigation = [
    { label: t.navigation.home, href: "#home" },
    { label: t.navigation.discover, href: "#discover" },
    { label: t.navigation.encyclopedia, href: "#encyclopedia" },
    { label: t.navigation.musicTheory, href: "#music-theory" },
    { label: t.navigation.favoriteSinger, href: "#my-favorite-singer" },
    { label: t.navigation.community, href: "#community" },
  ];

  const themeModes = [
    { id: "light", label: t.common.light },
    { id: "dark", label: t.common.dark },
    { id: "system", label: t.common.system },
  ] as const;

  const exploreItems = [
    {
      icon: "🎵",
      title: t.discover.music,
      description: t.discover.musicDescription,
      color: "var(--gcgs-accent-pink)",
      id: "music",
      number: "01",
    },
    {
      icon: "🎤",
      title: t.discover.encyclopedia,
      description: t.discover.encyclopediaDescription,
      color: "var(--gcgs-accent-blue)",
      id: "encyclopedia",
      number: "02",
    },
    {
      icon: "🎼",
      title: t.discover.theory,
      description: t.discover.theoryDescription,
      color: "var(--gcgs-accent-purple)",
      id: "music-theory",
      number: "03",
    },
    {
      icon: "🌸",
      title: t.discover.community,
      description: t.community.description,
      color: "var(--gcgs-accent-yellow)",
      id: "community",
      number: "04",
    },
  ];

  const contentSections = [
    {
      id: "music",
      number: "01",
      icon: "🎵",
      title: t.discover.music,
      description: t.discover.musicDescription,
      color: "var(--gcgs-accent-pink)",
      labels: sectionLabels.music,
    },
    {
      id: "encyclopedia",
      number: "02",
      icon: "🎤",
      title: t.discover.encyclopedia,
      description: t.discover.encyclopediaDescription,
      color: "var(--gcgs-accent-blue)",
      labels: sectionLabels.encyclopedia,
    },
    {
      id: "music-theory",
      number: "03",
      icon: "🎼",
      title: t.discover.theory,
      description: t.discover.theoryDescription,
      color: "var(--gcgs-accent-purple)",
      labels: sectionLabels.theory,
    },
    {
      id: "community",
      number: "04",
      icon: "🌸",
      title: t.community.title,
      description: t.community.description,
      color: "var(--gcgs-accent-yellow)",
      labels: sectionLabels.community,
    },
  ];

  return (
    <>
      <a
        href="#main-content"
        className="sr-only z-[100] rounded-full bg-[var(--md-sys-color-primary)] px-5 py-3 font-semibold text-[var(--md-sys-color-on-primary)] focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        {accessibilityLabels.skipToContent}
      </a>


      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)]/85 shadow-sm backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3.5 lg:px-8">
          {/* Brand */}
          <a
            href="#home"
            aria-label={accessibilityLabels.home}
            className="group flex min-w-0 shrink-0 items-center gap-3"
          >
            <div
              aria-hidden="true"
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[var(--md-sys-color-primary-container)] to-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-primary-container)] shadow-sm ring-1 ring-[var(--md-sys-color-outline-variant)] transition-transform duration-300 group-hover:scale-105 group-hover:-rotate-3"
            >
              <Music2 size={26} strokeWidth={2.2} />
            </div>

            <div className="min-w-0">
              <div className="truncate text-sm font-bold tracking-tight transition-colors group-hover:text-[var(--md-sys-color-primary)] sm:text-base">
                {locale === "zh-CN"
                  ? "广东碧桂园学校 Vocaloid 社团"
                  : "GCGS Vocaloid Club"}
              </div>

              <div className="mt-0.5 hidden text-xs text-[var(--md-sys-color-on-surface-variant)] sm:block">
                {t.footer.slogan}
              </div>
            </div>
          </a>

          {/* Desktop navigation */}
          <nav
            aria-label={accessibilityLabels.primaryNavigation}
            className="hidden items-center gap-1 2xl:flex"
          >
            {navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={index === 0 ? "page" : undefined}
                className={`relative whitespace-nowrap rounded-full px-3.5 py-2.5 text-sm font-semibold transition-all duration-200 hover:-translate-y-0.5 ${
                  index === 0
                    ? "bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] shadow-sm"
                    : "text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-container-high)] hover:text-[var(--md-sys-color-primary)]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop controls */}
          <div className="flex shrink-0 items-center gap-2">
            {/* Language selector */}
            <nav
              aria-label={accessibilityLabels.languageSelector}
              className="hidden items-center gap-1 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-1 2xl:flex"
            >
              {(["zh-CN", "en", "ja"] as Locale[]).map((item) => (
                <a
                  key={item}
                  href={`/${item}`}
                  aria-label={localeLabels[item].nativeName}
                  aria-current={locale === item ? "page" : undefined}
                  className={`rounded-full px-3 py-2 text-xs font-bold transition-all duration-200 ${
                    locale === item
                      ? "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] shadow-sm"
                      : "text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-container-high)]"
                  }`}
                >
                  {item === "zh-CN" ? "中文" : item === "en" ? "EN" : "日本語"}
                </a>
              ))}
            </nav>

            {/* Desktop color mode */}
            <div
              role="group"
              aria-label={accessibilityLabels.colorModeSelector}
              className="hidden items-center gap-0.5 rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-1 2xl:flex"
            >
              {themeModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setColorMode(mode.id)}
                  aria-pressed={colorMode === mode.id}
                  className={`min-h-10 rounded-full px-3 py-2 text-xs font-bold transition-all duration-200 ${
                    colorMode === mode.id
                      ? "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] shadow-sm"
                      : "text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-container-high)]"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container)] transition-all duration-200 hover:bg-[var(--md-sys-color-surface-container-high)] hover:shadow-sm 2xl:hidden"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={
                menuOpen
                  ? accessibilityLabels.closeMenu
                  : accessibilityLabels.openMenu
              }
            >
              {menuOpen ? (
                <X size={21} aria-hidden="true" />
              ) : (
                <Menu size={21} aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            className="border-t border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)]/95 px-5 pb-5 pt-4 backdrop-blur-xl 2xl:hidden"
          >
            <nav aria-label={accessibilityLabels.mobileNavigation}>
              <div className="flex flex-col gap-1">
                {navigation.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={index === 0 ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-semibold transition-colors ${
                      index === 0
                        ? "bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]"
                        : "text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-container-high)]"
                    }`}
                  >
                    {item.label}

                    {index === 0 && (
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full bg-[var(--md-sys-color-primary)]"
                      />
                    )}
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile language selector */}
            <div className="mt-5">
              <p className="mb-2 px-1 text-xs font-bold tracking-wide text-[var(--md-sys-color-on-surface-variant)]">
                {accessibilityLabels.languageSelector}
              </p>

              <nav
                aria-label={accessibilityLabels.languageSelector}
                className="flex flex-wrap gap-2"
              >
                {(["zh-CN", "en", "ja"] as Locale[]).map((item) => (
                  <a
                    key={item}
                    href={`/${item}`}
                    aria-current={locale === item ? "page" : undefined}
                    className={`rounded-full border px-4 py-2.5 text-xs font-bold transition-colors ${
                      locale === item
                        ? "border-[var(--md-sys-color-primary)] bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]"
                        : "border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-container-high)]"
                    }`}
                  >
                    {localeLabels[item].nativeName}
                  </a>
                ))}
              </nav>
            </div>

            {/* Mobile color mode */}
            <div className="mt-5">
              <p className="mb-2 px-1 text-xs font-bold tracking-wide text-[var(--md-sys-color-on-surface-variant)]">
                {accessibilityLabels.colorModeSelector}
              </p>

              <div
                role="group"
                aria-label={accessibilityLabels.colorModeSelector}
                className="flex flex-wrap gap-2"
              >
                {themeModes.map((mode) => (
                  <button
                    key={mode.id}
                    type="button"
                    onClick={() => setColorMode(mode.id)}
                    aria-pressed={colorMode === mode.id}
                    className={`min-h-11 rounded-full border px-4 py-2.5 text-xs font-bold transition-all ${
                      colorMode === mode.id
                        ? "border-[var(--md-sys-color-primary)] bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]"
                        : "border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-container-high)]"
                    }`}
                  >
                    {mode.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </header>


      <main id="main-content" className="min-h-screen">
        {/* Hero */}
        <section
          id="home"
          aria-labelledby="home-heading"
          className="mx-auto max-w-7xl px-5 pb-20 pt-16 lg:px-8 lg:pb-28 lg:pt-24"
        >
          <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-[var(--md-sys-color-secondary-container)] px-4 py-2 text-sm font-medium text-[var(--md-sys-color-on-secondary-container)]">
                <span aria-hidden="true">✦</span>
                {t.hero.badge}
              </div>

              <h1
                id="home-heading"
                className="max-w-3xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl"
              >
                {t.hero.title}
              </h1>

              <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--md-sys-color-on-surface-variant)]">
                {t.hero.description}
              </p>

              <div className="mt-9 flex flex-wrap gap-3">
                <a
                  href="#discover"
                  className="inline-flex items-center gap-2 rounded-full bg-[var(--md-sys-color-primary)] px-7 py-3.5 text-sm font-semibold text-[var(--md-sys-color-on-primary)] shadow-sm transition-transform hover:-translate-y-0.5"
                >
                  {t.hero.exploreMusic}
                  <ArrowRight size={17} aria-hidden="true" />
                </a>

                <a
                  href="#encyclopedia"
                  className="rounded-full border border-[var(--md-sys-color-outline)] px-7 py-3.5 text-sm font-semibold transition-colors hover:bg-[var(--md-sys-color-surface-container)]"
                >
                  {t.hero.exploreEncyclopedia}
                </a>
              </div>
            </div>

            {/* Hero visual */}
            <div className="relative" aria-hidden="true">
              {/* Ambient glow */}
              <div
                className="absolute -left-8 -top-8 h-44 w-44 rounded-full opacity-50 blur-3xl"
                style={{ backgroundColor: "var(--gcgs-accent-pink)" }}
              />
              <div
                className="absolute -bottom-8 -right-8 h-52 w-52 rounded-full opacity-50 blur-3xl"
                style={{ backgroundColor: "var(--gcgs-accent-blue)" }}
              />

              {/* Main character stage */}
              <div
                className="relative min-h-[480px] overflow-hidden rounded-[2.5rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-primary-container)] sm:min-h-[560px]"
                style={{
                  backgroundImage: `
                    radial-gradient(circle at 72% 35%, ${heroTheme.seed}45, transparent 48%),
                    linear-gradient(145deg, var(--md-sys-color-primary-container), var(--md-sys-color-surface-container))
                  `,
                }}
              >
                {/* Decorative circles */}
                <div
                  className="absolute right-[-12%] top-[8%] aspect-square h-[75%] rounded-full border opacity-20"
                  style={{ borderColor: heroTheme.seed }}
                />
                <div
                  className="absolute right-[-4%] top-[16%] aspect-square h-[60%] rounded-full border opacity-20"
                  style={{ borderColor: heroTheme.seed }}
                />

                {/* Top labels */}
                <div className="absolute left-6 right-6 top-6 z-20 flex items-center justify-between sm:left-8 sm:right-8">
                  <span className="rounded-full bg-white/60 px-4 py-2 text-xs font-bold text-[var(--md-sys-color-on-primary-container)] backdrop-blur-md">
                    {t.hero.original}
                  </span>

                  <Music2
                    size={28}
                    className="text-[var(--md-sys-color-on-primary-container)]"
                  />
                </div>

                {/* Character artwork */}
                <div className="absolute inset-x-0 bottom-0 top-12 z-10">
                  <SingerArtwork
                    singerId={heroSinger.id}
                    alt=""
                    priority
                    className="absolute inset-0 h-full w-full object-contain object-bottom transition-transform duration-700 hover:scale-[1.025]"
                    sizes="(max-width: 1024px) 90vw, 520px"
                  />
                </div>

                {/* Bottom information panel */}
                <div className="absolute inset-x-0 bottom-0 z-20 bg-gradient-to-t from-[var(--md-sys-color-primary-container)] via-[var(--md-sys-color-primary-container)]/90 to-transparent px-6 pb-7 pt-24 sm:px-8 sm:pb-9">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs font-bold tracking-[0.2em] text-[var(--md-sys-color-on-primary-container)]/65">
                        GCGS VOCALOID CLUB
                      </p>

                      <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--md-sys-color-on-primary-container)] sm:text-4xl">
                        {t.hero.slogan}
                      </h2>

                      <p className="mt-2 max-w-xs text-sm leading-6 text-[var(--md-sys-color-on-primary-container)]/75">
                        {t.hero.subtitle}
                      </p>
                    </div>

                    <span className="hidden shrink-0 rounded-full border border-[var(--md-sys-color-on-primary-container)]/20 bg-white/30 px-4 py-2 text-xs font-bold text-[var(--md-sys-color-on-primary-container)] backdrop-blur-md sm:inline-flex">
                      EST. 2026
                    </span>
                  </div>
                </div>

                {/* Character color accent */}
                <div
                  className="absolute bottom-0 left-0 h-1 w-full"
                  style={{ backgroundColor: heroTheme.seed }}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Discover */}
        <section
          id="discover"
          aria-labelledby="discover-heading"
          className="scroll-mt-24 bg-[var(--md-sys-color-surface-container-low)] py-20 sm:py-24"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-12 grid gap-5 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <div>
                <p className="text-sm font-semibold tracking-wide text-[var(--md-sys-color-primary)]">
                  {t.discover.eyebrow}
                </p>

                <h2
                  id="discover-heading"
                  className="mt-3 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl"
                >
                  {t.discover.title}
                </h2>
              </div>

              <p className="max-w-xl text-base leading-7 text-[var(--md-sys-color-on-surface-variant)] lg:justify-self-end">
                {t.discover.description}
              </p>
            </div>


            <div className="grid gap-5 md:grid-cols-2">
              {exploreItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="group relative isolate flex min-h-[310px] flex-col overflow-hidden rounded-[2rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] p-7 shadow-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--md-sys-color-primary)] sm:min-h-[330px] sm:p-9"
                >
                  {/* Ambient color background */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-15 blur-3xl transition-all duration-500 group-hover:scale-125 group-hover:opacity-30"
                    style={{ backgroundColor: item.color }}
                  />

                  {/* Subtle gradient */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 opacity-70"
                    style={{
                      backgroundImage: `linear-gradient(145deg, ${item.color}12 0%, transparent 55%)`,
                    }}
                  />

                  {/* Oversized decorative icon */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute -bottom-8 -right-2 select-none text-[10rem] leading-none opacity-[0.055] transition-all duration-500 group-hover:-translate-y-3 group-hover:rotate-6 group-hover:scale-110 group-hover:opacity-[0.12] sm:text-[12rem]"
                  >
                    {item.icon}
                  </div>

                  {/* Card header */}
                  <div className="relative flex items-start justify-between">
                    <div
                      className="flex h-[4.5rem] w-[4.5rem] items-center justify-center rounded-[1.5rem] border border-white/30 text-4xl shadow-sm transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3"
                      style={{
                        background: `linear-gradient(135deg, ${item.color}55, ${item.color}20)`,
                      }}
                    >
                      {item.icon}
                    </div>

                    <span
                      className="rounded-full border px-3 py-1.5 text-xs font-bold tracking-[0.18em]"
                      style={{
                        borderColor: `${item.color}55`,
                        color: "var(--md-sys-color-on-surface-variant)",
                      }}
                    >
                      {item.number}
                    </span>
                  </div>

                  {/* Card content */}
                  <div className="relative mt-8">
                    <p
                      className="mb-2 text-[10px] font-bold tracking-[0.24em] sm:text-xs"
                      style={{ color: item.color }}
                    >
                      GCGS · EXPLORE
                    </p>

                    <h3 className="text-2xl font-bold tracking-tight transition-colors duration-200 group-hover:text-[var(--md-sys-color-primary)] sm:text-3xl">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-7 text-[var(--md-sys-color-on-surface-variant)] sm:text-base">
                      {item.description}
                    </p>
                  </div>

                  {/* Card footer */}
                  <div className="relative mt-auto flex items-center justify-between pt-8">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--md-sys-color-primary)]">
                      {t.common.explore}
                      <span
                        aria-hidden="true"
                        className="h-px w-6 origin-left transition-transform duration-300 group-hover:scale-x-150"
                        style={{ backgroundColor: item.color }}
                      />
                    </span>

                    <span
                      className="flex h-11 w-11 items-center justify-center rounded-full transition-all duration-300 group-hover:translate-x-1 group-hover:shadow-md"
                      style={{
                        backgroundColor: `${item.color}25`,
                        color: "var(--md-sys-color-on-surface)",
                      }}
                    >
                      <ArrowRight size={19} aria-hidden="true" />
                    </span>
                  </div>

                  {/* Bottom accent */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                    style={{ backgroundColor: item.color }}
                  />
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Four main modules */}
        {contentSections.map((section) => (
          <section
            key={section.id}
            id={section.id}
            aria-labelledby={`${section.id}-heading`}
            className="scroll-mt-24 border-b border-[var(--md-sys-color-outline-variant)] py-20 sm:py-24"
          >
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
                <div>
                  <p className="text-sm font-bold tracking-widest text-[var(--md-sys-color-primary)]">
                    DISCOVER · {section.number}
                  </p>

                  <div
                    aria-hidden="true"
                    className="mt-6 flex h-16 w-16 items-center justify-center rounded-2xl text-4xl"
                    style={{ backgroundColor: section.color }}
                  >
                    {section.icon}
                  </div>

                  <h2
                    id={`${section.id}-heading`}
                    className="mt-7 text-3xl font-bold tracking-tight sm:text-4xl"
                  >
                    {section.title}
                  </h2>

                  <p className="mt-5 max-w-xl text-base leading-8 text-[var(--md-sys-color-on-surface-variant)]">
                    {section.description}
                  </p>

                  {section.id === "encyclopedia" ? (
                    <Link
                      href={`/${locale}/encyclopedia`}
                      className="mt-7 inline-flex items-center gap-3 rounded-full bg-[var(--md-sys-color-secondary-container)] px-5 py-3 text-sm font-semibold text-[var(--md-sys-color-on-secondary-container)] transition-all hover:gap-4"
                    >
                      {t.common.learnMore}
                      <ArrowRight size={16} aria-hidden="true" />
                    </Link>
                  ) : (
                    <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--md-sys-color-surface-container)] px-4 py-2 text-xs font-semibold text-[var(--md-sys-color-on-surface-variant)]">
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ backgroundColor: section.color }}
                      />
                      {sectionLabels.comingSoon}
                    </div>
                  )}
                </div>


                {section.id === "encyclopedia" ? (
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                    {singers.map((singer, index) => {
                      const theme = getSingerTheme(singer.themeId);

                      return (
                        <Link
                          key={singer.id}
                          href={`/${locale}/encyclopedia/${singer.id}`}
                          className="group relative flex min-h-[280px] flex-col overflow-hidden rounded-[1.75rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:min-h-[320px] sm:p-5"
                          style={{
                            backgroundImage: `linear-gradient(180deg, ${theme.seed}20 0%, transparent 65%)`,
                          }}
                        >
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-25 blur-3xl transition-opacity group-hover:opacity-50"
                            style={{ backgroundColor: theme.seed }}
                          />

                          <div className="relative z-10 flex items-center justify-between">
                            <span className="text-xs font-bold tracking-widest text-[var(--md-sys-color-outline)]">
                              {String(index + 1).padStart(2, "0")}
                            </span>

                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ backgroundColor: theme.seed }}
                            />
                          </div>

                          <div className="relative z-10 mt-2 flex h-40 items-end justify-center sm:h-48">
                            <SingerArtwork
                              singerId={singer.id}
                              alt={singer.names[locale]}
                              className="relative h-full w-full transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 42vw, (max-width: 1024px) 25vw, 220px"
                            />
                          </div>

                          <div className="relative z-10 mt-3">
                            <p className="truncate text-[10px] font-bold tracking-wider text-[var(--md-sys-color-on-surface-variant)] sm:text-xs">
                              {singer.romanizedName}
                            </p>

                            <h3 className="mt-1 truncate text-lg font-bold tracking-tight sm:text-xl">
                              {singer.names[locale]}
                            </h3>

                            <p
                              className="mt-1 text-xs font-semibold"
                              style={{ color: theme.seed }}
                            >
                              {singer.category[locale]}
                            </p>
                          </div>

                          <div className="relative z-10 mt-auto flex items-center justify-end pt-3">
                            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] transition-transform group-hover:translate-x-1">
                              <ArrowRight size={16} aria-hidden="true" />
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : section.id === "music" ? (
                  <div className="grid grid-cols-2 gap-4 sm:gap-5">
                    {section.labels.map((label, index) => (
                      <Link
                        key={label}
                        href={`/${locale}/music`}
                        className={`group relative flex min-h-48 flex-col justify-between overflow-hidden rounded-[1.75rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-56 sm:p-7 ${
                          index === 0 ? "row-span-2 min-h-[25rem] sm:min-h-[29rem]" : ""
                        }`}
                        style={{
                          backgroundImage: `linear-gradient(145deg, ${section.color}20, transparent 70%)`,
                        }}
                      >
                        <div
                          aria-hidden="true"
                          className="absolute -right-8 -top-8 h-36 w-36 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                          style={{ backgroundColor: section.color }}
                        />

                        <div className="relative flex items-center justify-between">
                          <span className="text-xs font-bold tracking-[0.2em] text-[var(--md-sys-color-outline)]">
                            MUSIC / 0{index + 1}
                          </span>
                          <span
                            className="flex h-9 w-9 items-center justify-center rounded-full text-lg"
                            style={{ backgroundColor: `${section.color}30` }}
                          >
                            {index === 0 ? "♫" : index === 1 ? "▤" : "♪"}
                          </span>
                        </div>

                        <div className="relative mt-8">
                          <div
                            aria-hidden="true"
                            className={`mb-5 flex items-center justify-center rounded-2xl border border-white/20 shadow-lg ${
                              index === 0
                                ? "aspect-square w-full max-w-48"
                                : "h-16 w-16"
                            }`}
                            style={{
                              background: `linear-gradient(135deg, ${section.color}, var(--md-sys-color-surface-container-high))`,
                            }}
                          >
                            <span
                              className={`font-serif text-white/90 ${
                                index === 0 ? "text-7xl" : "text-3xl"
                              }`}
                            >
                              {index === 0 ? "♫" : index === 1 ? "▤" : "♪"}
                            </span>
                          </div>

                          <h3 className="text-lg font-bold leading-snug sm:text-xl">
                            {label}
                          </h3>
                        </div>

                        <div className="relative mt-5 flex items-center justify-between">
                          <span className="text-xs font-medium text-[var(--md-sys-color-on-surface-variant)]">
                            GCGS MUSIC
                          </span>
                          <span
                            className="flex h-8 w-8 items-center justify-center rounded-full transition-transform group-hover:translate-x-1"
                            style={{
                              backgroundColor: `${section.color}30`,
                            }}
                          >
                            <ArrowRight size={15} aria-hidden="true" />
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                ) : section.id === "music-theory" ? (
                  <div className="grid grid-cols-2 gap-4 sm:gap-5">
                    {section.labels.map((label, index) => (
                      <div
                        key={label}
                        className="group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-52 sm:p-7"
                      >
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -right-3 -top-8 select-none font-serif text-8xl opacity-[0.07] transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110"
                          style={{ color: section.color }}
                        >
                          {["𝄞", "♫", "♬", "♩"][index]}
                        </div>

                        <div className="relative flex items-center justify-between">
                          <span
                            className="text-3xl font-bold tracking-tight"
                            style={{ color: section.color }}
                          >
                            0{index + 1}
                          </span>
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: section.color }}
                          />
                        </div>

                        <div className="relative mt-8">
                          <h3 className="text-base font-bold leading-snug sm:text-xl">
                            {label}
                          </h3>
                          <div
                            className="mt-4 h-1 w-9 rounded-full transition-all duration-300 group-hover:w-16"
                            style={{ backgroundColor: section.color }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-4 sm:gap-5">
                    {section.labels.map((label, index) => (
                      <div
                        key={label}
                        className="group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg sm:min-h-52 sm:p-7"
                        style={{
                          backgroundImage: `linear-gradient(145deg, ${section.color}15, transparent 80%)`,
                        }}
                      >
                        <div
                          aria-hidden="true"
                          className="pointer-events-none absolute -right-5 -top-7 h-28 w-28 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
                          style={{ backgroundColor: section.color }}
                        />

                        <div className="relative flex items-center justify-between">
                          <span
                            className="text-3xl font-bold"
                            style={{ color: section.color }}
                          >
                            0{index + 1}
                          </span>
                          <span className="text-2xl opacity-70">
                            {["✦", "◈", "♫", "✿"][index]}
                          </span>
                        </div>

                        <div className="relative mt-8">
                          <h3 className="text-base font-bold leading-snug sm:text-xl">
                            {label}
                          </h3>

                          <div className="mt-4 flex items-center justify-between">
                            <span className="text-[10px] font-bold tracking-widest text-[var(--md-sys-color-on-surface-variant)]">
                              GCGS CLUB
                            </span>
                            <ArrowRight
                              size={17}
                              className="transition-transform duration-300 group-hover:translate-x-1"
                              aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            </div>
          </section>
        ))}

        {/* Favorite Singer / Theme */}
        <section
          id="my-favorite-singer"
          aria-labelledby="favorite-singer-heading"
          className="scroll-mt-24 py-20"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <p className="text-sm font-semibold text-[var(--md-sys-color-primary)]">
                {t.hero.inspiredBy}
              </p>

              <h2
                id="favorite-singer-heading"
                className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl"
              >
                {t.navigation.favoriteSinger}
              </h2>

              <p className="mt-4 text-base leading-7 text-[var(--md-sys-color-on-surface-variant)]">
                {t.theme.description}
              </p>
            </div>

            <SingerThemeSelector locale={locale} />
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--md-sys-color-outline-variant)] px-5 py-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-3 text-sm text-[var(--md-sys-color-on-surface-variant)] sm:flex-row">
          <span>{t.footer.copyright}</span>
          <span>{t.footer.madeWith} ♡</span>
        </div>
      </footer>
    </>
  );
}
