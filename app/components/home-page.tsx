
"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Menu, Music2, X } from "lucide-react";

import {
  localeLabels,
  messages,
  type Locale,
} from "../lib/i18n";

import { SingerThemeSelector } from "./singer-theme-selector";
import { useSingerTheme } from "./theme-provider";

type HomePageProps = {
  locale: Locale;
};

export function HomePage({ locale }: HomePageProps) {
  const t = messages[locale];
  const { colorMode, setColorMode } = useSingerTheme();
  const [menuOpen, setMenuOpen] = useState(false);

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
      description: t.discover.communityDescription,
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
      <header className="sticky top-0 z-50 border-b border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)]/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
          <a
            href="#home"
            aria-label={accessibilityLabels.home}
            className="flex shrink-0 items-center gap-3"
          >
            <div
              aria-hidden="true"
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--md-sys-color-primary-container)] text-[var(--md-sys-color-on-primary-container)]"
            >
              <Music2 size={25} />
            </div>

            <div>
              <div className="text-base font-bold tracking-tight">
                {locale === "zh-CN"
                  ? "广东碧桂园学校 Vocaloid 社团"
                  : "GCGS Vocaloid Club"}
              </div>
              <div className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
                {t.footer.slogan}
              </div>
            </div>
          </a>

          {/* Desktop navigation */}
          <nav
            aria-label={accessibilityLabels.primaryNavigation}
            className="hidden items-center gap-1 xl:flex"
          >
            {navigation.map((item, index) => (
              <a
                key={item.href}
                href={item.href}
                aria-current={index === 0 ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-medium transition-colors hover:bg-[var(--md-sys-color-surface-container-high)] ${
                  index === 0
                    ? "bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)]"
                    : "text-[var(--md-sys-color-on-surface-variant)]"
                }`}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            {/* Language selector */}
            <nav
              aria-label={accessibilityLabels.languageSelector}
              className="hidden items-center gap-1 rounded-full bg-[var(--md-sys-color-surface-container)] p-1 sm:flex"
            >
              {(["zh-CN", "en", "ja"] as Locale[]).map((item) => (
                <a
                  key={item}
                  href={`/${item}`}
                  aria-label={localeLabels[item].nativeName}
                  aria-current={locale === item ? "page" : undefined}
                  className={`rounded-full px-2.5 py-2 text-xs font-semibold transition-colors ${
                    locale === item
                      ? "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]"
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
              className="hidden items-center rounded-full bg-[var(--md-sys-color-surface-container)] p-1 lg:flex"
            >
              {themeModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setColorMode(mode.id)}
                  aria-pressed={colorMode === mode.id}
                  className={`min-h-11 rounded-full px-3 py-2 text-xs font-semibold transition-colors ${
                    colorMode === mode.id
                      ? "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]"
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
              className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--md-sys-color-surface-container)] transition-colors hover:bg-[var(--md-sys-color-surface-container-high)] xl:hidden"
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
            className="border-t border-[var(--md-sys-color-outline-variant)] px-5 py-4 xl:hidden"
          >
            <nav aria-label={accessibilityLabels.mobileNavigation}>
              <div className="flex flex-col gap-1">
                {navigation.map((item, index) => (
                  <a
                    key={item.href}
                    href={item.href}
                    aria-current={index === 0 ? "page" : undefined}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-xl px-4 py-3 text-sm font-medium transition-colors hover:bg-[var(--md-sys-color-surface-container)]"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </nav>

            {/* Mobile language selector */}
            <nav
              aria-label={accessibilityLabels.languageSelector}
              className="mt-4 flex flex-wrap gap-2"
            >
              {(["zh-CN", "en", "ja"] as Locale[]).map((item) => (
                <a
                  key={item}
                  href={`/${item}`}
                  aria-current={locale === item ? "page" : undefined}
                  className={`rounded-full px-4 py-2 text-xs font-semibold ${
                    locale === item
                      ? "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]"
                      : "bg-[var(--md-sys-color-surface-container)]"
                  }`}
                >
                  {localeLabels[item].nativeName}
                </a>
              ))}
            </nav>

            {/* Mobile color mode */}
            <div
              role="group"
              aria-label={accessibilityLabels.colorModeSelector}
              className="mt-3 flex flex-wrap gap-2"
            >
              {themeModes.map((mode) => (
                <button
                  key={mode.id}
                  type="button"
                  onClick={() => setColorMode(mode.id)}
                  aria-pressed={colorMode === mode.id}
                  className={`min-h-11 rounded-full px-4 py-2 text-xs font-semibold ${
                    colorMode === mode.id
                      ? "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]"
                      : "bg-[var(--md-sys-color-surface-container)]"
                  }`}
                >
                  {mode.label}
                </button>
              ))}
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
              <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-[var(--gcgs-accent-pink)] opacity-60 blur-3xl" />
              <div className="absolute -bottom-5 -right-5 h-40 w-40 rounded-full bg-[var(--gcgs-accent-blue)] opacity-60 blur-3xl" />

              <div className="relative overflow-hidden rounded-[2rem] bg-[var(--md-sys-color-primary-container)] p-8 sm:p-10">
                <div className="flex items-start justify-between">
                  <span className="rounded-full bg-white/50 px-4 py-2 text-xs font-bold text-[var(--md-sys-color-on-primary-container)]">
                    {t.hero.original}
                  </span>
                  <Music2
                    size={30}
                    className="text-[var(--md-sys-color-on-primary-container)]"
                  />
                </div>

                <div className="py-16 text-center">
                  <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full bg-white/60 text-7xl shadow-sm">
                    🎧
                  </div>

                  <h2 className="mt-8 text-3xl font-bold text-[var(--md-sys-color-on-primary-container)]">
                    {t.hero.slogan}
                  </h2>

                  <p className="mt-3 text-sm text-[var(--md-sys-color-on-primary-container)]/75">
                    {t.hero.subtitle}
                  </p>
                </div>

                <div className="flex items-center justify-between gap-2 text-xs font-semibold text-[var(--md-sys-color-on-primary-container)]">
                  <span>CREATE · DISCOVER · SHARE</span>
                  <span>EST. 2026</span>
                </div>
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
                  className="group relative flex min-h-64 flex-col overflow-hidden rounded-[2rem] border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)] p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:p-9"
                >
                  <div
                    aria-hidden="true"
                    className="absolute -right-10 -top-10 h-44 w-44 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-40"
                    style={{ backgroundColor: item.color }}
                  />

                  <div className="relative flex items-start justify-between">
                    <div
                      aria-hidden="true"
                      className="flex h-16 w-16 items-center justify-center rounded-2xl text-4xl"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.icon}
                    </div>

                    <span className="text-sm font-bold tracking-widest text-[var(--md-sys-color-outline)]">
                      {item.number}
                    </span>
                  </div>

                  <div className="relative mt-8">
                    <h3 className="text-2xl font-bold tracking-tight">
                      {item.title}
                    </h3>

                    <p className="mt-3 max-w-md text-sm leading-7 text-[var(--md-sys-color-on-surface-variant)]">
                      {item.description}
                    </p>
                  </div>

                  <div className="relative mt-auto flex items-center justify-between pt-7">
                    <span className="text-sm font-semibold text-[var(--md-sys-color-primary)]">
                      {t.common.explore}
                    </span>

                    <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--md-sys-color-secondary-container)] text-[var(--md-sys-color-on-secondary-container)] transition-transform duration-300 group-hover:translate-x-1">
                      <ArrowRight size={18} aria-hidden="true" />
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Music / Encyclopedia / Music Theory */}
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

                  <div className="mt-7 inline-flex items-center gap-2 rounded-full bg-[var(--md-sys-color-surface-container)] px-4 py-2 text-xs font-semibold text-[var(--md-sys-color-on-surface-variant)]">
                    <span
                      className="h-2 w-2 rounded-full"
                      style={{ backgroundColor: section.color }}
                    />
                    {sectionLabels.comingSoon}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 sm:gap-5">
                  {section.labels.map((label, index) => (
                    <div
                      key={label}
                      className={`flex min-h-36 flex-col justify-between rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-5 sm:min-h-44 sm:p-7 ${
                        section.labels.length === 3 && index === 0
                          ? "col-span-2 sm:col-span-1"
                          : ""
                      }`}
                    >
                      <span
                        className="text-2xl font-bold"
                        style={{ color: section.color }}
                      >
                        0{index + 1}
                      </span>

                      <span className="text-base font-semibold leading-6">
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
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

        {/* Community */}
        <section
          id="community"
          aria-labelledby="community-heading"
          className="scroll-mt-24 bg-[var(--md-sys-color-surface-container-low)] py-20"
        >
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <div className="overflow-hidden rounded-[2rem] bg-[var(--md-sys-color-primary-container)] px-7 py-14 sm:px-12 lg:px-16">
              <div className="max-w-3xl">
                <p className="text-sm font-bold tracking-wide text-[var(--md-sys-color-on-primary-container)]">
                  {t.community.eyebrow}
                </p>

                <h2
                  id="community-heading"
                  className="mt-4 text-3xl font-bold leading-tight tracking-tight text-[var(--md-sys-color-on-primary-container)] sm:text-5xl"
                >
                  {t.community.title}
                </h2>

                <p className="mt-6 max-w-2xl text-base leading-8 text-[var(--md-sys-color-on-primary-container)]/80">
                  {t.community.description}
                </p>

                <a
                  href="#discover"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-[var(--md-sys-color-primary)] px-6 py-3.5 text-sm font-semibold text-[var(--md-sys-color-on-primary)] transition-transform hover:-translate-y-0.5"
                >
                  {t.community.action}
                  <ArrowRight size={17} aria-hidden="true" />
                </a>
              </div>
            </div>
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
