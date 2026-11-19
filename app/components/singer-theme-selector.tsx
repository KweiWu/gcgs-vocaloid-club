
"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight,
  Check,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Star,
} from "lucide-react";

import { singerThemes } from "../lib/singer-themes";
import { messages, type Locale } from "../lib/i18n";
import {
  generateSingerTheme,
  type ColorMode,
} from "../lib/theme-engine";
import { useSingerTheme } from "./theme-provider";

type Palette = ReturnType<typeof generateSingerTheme>;
type PaletteKey = keyof Palette;
type ThemeText = {
  [K in keyof (typeof messages)["zh-CN"]["theme"]]: string;
};
type ThemeTextKey = keyof ThemeText;

type PaletteRow = {
  label: ThemeTextKey;
  keys: {
    key: PaletteKey;
    label: ThemeTextKey;
  }[];
};

const groups = [
  { id: "default", label: "groupDefault" },
  { id: "crypton", label: "groupCrypton" },
  { id: "vsinger", label: "groupVsinger" },
] as const;

const paletteRows: PaletteRow[] = [
  {
    label: "primaryColors",
    keys: [
      { key: "--md-sys-color-primary", label: "primary" },
      { key: "--md-sys-color-on-primary", label: "onPrimary" },
      {
        key: "--md-sys-color-primary-container",
        label: "colorContainer",
      },
      {
        key: "--md-sys-color-on-primary-container",
        label: "onContainer",
      },
    ],
  },
  {
    label: "secondaryColors",
    keys: [
      { key: "--md-sys-color-secondary", label: "secondary" },
      { key: "--md-sys-color-on-secondary", label: "onSecondary" },
      {
        key: "--md-sys-color-secondary-container",
        label: "colorContainer",
      },
      {
        key: "--md-sys-color-on-secondary-container",
        label: "onContainer",
      },
    ],
  },
  {
    label: "tertiaryColors",
    keys: [
      { key: "--md-sys-color-tertiary", label: "tertiaryColors" },
      { key: "--md-sys-color-on-tertiary", label: "onTertiary" },
      {
        key: "--md-sys-color-tertiary-container",
        label: "colorContainer",
      },
      {
        key: "--md-sys-color-on-tertiary-container",
        label: "onContainer",
      },
    ],
  },
  {
    label: "surfaceColors",
    keys: [
      { key: "--md-sys-color-surface", label: "surface" },
      { key: "--md-sys-color-surface-dim", label: "surfaceDim" },
      { key: "--md-sys-color-surface-bright", label: "surfaceBright" },
      {
        key: "--md-sys-color-surface-container-lowest",
        label: "surfaceContainerLowest",
      },
      {
        key: "--md-sys-color-surface-container-low",
        label: "surfaceContainerLow",
      },
      {
        key: "--md-sys-color-surface-container",
        label: "surfaceContainer",
      },
      {
        key: "--md-sys-color-surface-container-high",
        label: "surfaceContainerHigh",
      },
      {
        key: "--md-sys-color-surface-container-highest",
        label: "surfaceContainerHighest",
      },
    ],
  },
  {
    label: "otherColors",
    keys: [
      { key: "--md-sys-color-on-surface", label: "onSurface" },
      {
        key: "--md-sys-color-on-surface-variant",
        label: "onSurfaceVariant",
      },
      { key: "--md-sys-color-outline", label: "outline" },
      {
        key: "--md-sys-color-outline-variant",
        label: "outlineVariant",
      },
      { key: "--md-sys-color-error", label: "error" },
      {
        key: "--md-sys-color-error-container",
        label: "errorContainer",
      },
      {
        key: "--md-sys-color-inverse-surface",
        label: "inverseSurface",
      },
      {
        key: "--md-sys-color-inverse-primary",
        label: "inversePrimary",
      },
    ],
  },
];

function getThemeName(
  theme: (typeof singerThemes)[number],
  locale: Locale
) {
  if (locale === "en") return theme.nameEn;
  if (locale === "ja") return theme.nameJa;
  return theme.name;
}

function getThemeDescription(
  theme: (typeof singerThemes)[number],
  locale: Locale
) {
  return theme.descriptions[locale];
}

function getFilterAnnouncement(
  locale: Locale,
  favoritesOnly: boolean,
  count: number
) {
  if (locale === "en") {
    return favoritesOnly
      ? `${count} favorite themes displayed`
      : `${count} themes displayed`;
  }

  if (locale === "ja") {
    return favoritesOnly
      ? `お気に入りテーマ ${count} 件を表示中`
      : `テーマ ${count} 件を表示中`;
  }

  return favoritesOnly
    ? `正在显示 ${count} 个收藏主题`
    : `正在显示全部 ${count} 个主题`;
}

function PaletteColor({
  label,
  value,
  locale,
  t,
}: {
  label: string;
  value: string;
  locale: Locale;
  t: ThemeText;
}) {
  const [copyStatus, setCopyStatus] = useState<
    "copied" | "error" | null
  >(null);

  async function copyColor() {
    try {
      await navigator.clipboard.writeText(value);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }

    window.setTimeout(() => {
      setCopyStatus(null);
    }, 1600);
  }

  const copyLabel =
    locale === "zh-CN"
      ? `${t.copyColor} ${label}: ${value}`
      : locale === "ja"
        ? `${t.copyColor} ${label}: ${value}`
        : `${t.copyColor} ${label}: ${value}`;

  return (
    <button
      type="button"
      onClick={() => void copyColor()}
      title={`${t.copyColor} ${value}`}
      aria-label={copyLabel}
      className="group flex min-h-11 min-w-0 items-center gap-2 rounded-xl p-2 text-left transition-colors hover:bg-[var(--md-sys-color-surface-container-high)]"
    >
      <span
        aria-hidden="true"
        className="h-9 w-9 shrink-0 rounded-xl border border-black/10 shadow-sm"
        style={{ backgroundColor: value }}
      />

      <span className="min-w-0 flex-1">
        <span className="block truncate text-xs font-medium">
          {label}
        </span>
        <span
          className="block font-mono text-[10px] text-[var(--md-sys-color-on-surface-variant)]"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {copyStatus === "copied"
            ? t.copied
            : copyStatus === "error"
              ? t.copyUnavailable
              : value}
        </span>
      </span>
    </button>
  );
}

function ThemePaletteCard({
  themeName,
  mode,
  palette,
  t,
  locale,
}: {
  themeName: string;
  mode: "light" | "dark";
  palette: Palette;
  t: ThemeText;
  locale: Locale;
}) {
  const isDark = mode === "dark";

  return (
    <div
      className="overflow-hidden rounded-2xl border"
      style={{
        backgroundColor: palette["--md-sys-color-surface"],
        color: palette["--md-sys-color-on-surface"],
        borderColor: palette["--md-sys-color-outline-variant"],
      }}
    >
      <div
        className="flex items-center justify-between gap-3 px-4 py-3"
        style={{
          backgroundColor:
            palette["--md-sys-color-surface-container"],
        }}
      >
        <div>
          <p className="text-sm font-bold">{themeName}</p>
          <p
            className="text-xs"
            style={{
              color: palette["--md-sys-color-on-surface-variant"],
            }}
          >
            {isDark ? t.darkTheme : t.lightTheme}
          </p>
        </div>

        <span
          className="rounded-full px-3 py-1 text-xs font-semibold"
          style={{
            backgroundColor: palette["--md-sys-color-primary"],
            color: palette["--md-sys-color-on-primary"],
          }}
        >
          {isDark ? t.dark.toUpperCase() : t.light.toUpperCase()}
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 p-3 sm:grid-cols-2">
        {paletteRows.map((row) => (
          <div
            key={row.label}
            className="min-w-0 rounded-xl p-2"
            style={{
              backgroundColor:
                palette["--md-sys-color-surface-container-low"],
            }}
          >
            <p
              className="mb-1 px-2 text-xs font-bold"
              style={{
                color: palette["--md-sys-color-primary"],
              }}
            >
              {t[row.label]}
            </p>

            <div className="grid grid-cols-1 gap-1">
              {row.keys.map((item) => (
                <PaletteColor
                  key={item.key}
                  label={t[item.label]}
                  value={palette[item.key]}
                  locale={locale}
                  t={t}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 p-3 pt-0">
        <div
          className="rounded-xl p-3"
          style={{
            backgroundColor: palette["--md-sys-color-primary"],
            color: palette["--md-sys-color-on-primary"],
          }}
        >
          <p className="text-sm font-bold">{t.primaryButton}</p>
          <p className="mt-1 text-xs opacity-90">
            {t.sampleAction}
          </p>
        </div>

        <div
          className="rounded-xl p-3"
          style={{
            backgroundColor:
              palette["--md-sys-color-secondary-container"],
            color:
              palette["--md-sys-color-on-secondary-container"],
          }}
        >
          <p className="text-sm font-bold">{t.container}</p>
          <p className="mt-1 text-xs opacity-90">
            {t.sampleContent}
          </p>
        </div>
      </div>

      <div
        className="flex items-center justify-between border-t px-4 py-3 text-xs"
        style={{
          borderColor: palette["--md-sys-color-outline-variant"],
          color: palette["--md-sys-color-on-surface-variant"],
        }}
      >
        <span>{isDark ? t.darkPalette : t.lightPalette}</span>
        <span>{t.copyHint}</span>
      </div>
    </div>
  );
}

export function SingerThemeSelector({
  locale,
}: {
  locale: Locale;
}) {
  const t = messages[locale].theme;

  const {
    characterId,
    colorMode,
    setCharacterId,
    setColorMode,
    resetTheme,
    savedCharacters,
    toggleSavedCharacter,
  } = useSingerTheme();

  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [showPaletteLab, setShowPaletteLab] = useState(true);

  const filteredThemes = useMemo(
    () =>
      singerThemes.filter((theme) =>
        showFavoritesOnly
          ? savedCharacters.includes(theme.id)
          : true
      ),
    [showFavoritesOnly, savedCharacters]
  );

  const filterAnnouncement = getFilterAnnouncement(
    locale,
    showFavoritesOnly,
    filteredThemes.length
  );

  const palettePreviews = useMemo(
    () =>
      singerThemes.map((theme) => ({
        theme,
        light: generateSingerTheme(theme, "light"),
        dark: generateSingerTheme(theme, "dark"),
      })),
    []
  );

  const activeTheme = singerThemes.find(
    (theme) => theme.id === characterId
  ) ?? singerThemes[0];

  const activeThemeName = getThemeName(activeTheme, locale);

  return (
    <section className="space-y-8">
      {/* Theme settings */}
      <div className="rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)] p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm font-semibold text-[var(--md-sys-color-primary)]">
              {t.personalization}
            </p>

            <h2 className="mt-2 text-2xl font-bold">
              {t.appearance}
            </h2>

            <p className="mt-2 text-sm text-[var(--md-sys-color-on-surface-variant)]">
              {t.description}
            </p>
          </div>

          <button
            type="button"
            onClick={resetTheme}
            className="flex min-h-11 w-fit items-center gap-2 rounded-full border border-[var(--md-sys-color-outline)] px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-[var(--md-sys-color-surface-container)]"
          >
            <RotateCcw size={16} aria-hidden="true" />
            {t.resetTheme}
          </button>
        </div>

        <div className="mt-7">
          <p className="mb-3 text-sm font-semibold">
            {t.colorMode}
          </p>

          <div className="inline-flex flex-wrap gap-2 rounded-full bg-[var(--md-sys-color-surface-container)] p-1.5">
            {(["light", "dark", "system"] as const).map((mode) => {
              const labels: Record<ColorMode, string> = {
                light: t.light,
                dark: t.dark,
                system: t.system,
              };

              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setColorMode(mode)}
                  aria-pressed={colorMode === mode}
                  className={`min-h-11 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                    colorMode === mode
                      ? "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)] shadow-sm"
                      : "text-[var(--md-sys-color-on-surface-variant)] hover:bg-[var(--md-sys-color-surface-container-high)]"
                  }`}
                >
                  {labels[mode]}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current theme */}
      <div className="overflow-hidden rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)]">
        <div className="p-6 sm:p-8">
          <p className="text-sm font-semibold text-[var(--md-sys-color-primary)]">
            {t.currentTheme}
          </p>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-5">
            <div>
              <h3 className="text-3xl font-bold">
                {activeThemeName}
              </h3>

              <p className="mt-3 text-sm text-[var(--md-sys-color-on-surface-variant)]">
                {getThemeDescription(activeTheme, locale)}
              </p>
            </div>

            <div className="flex gap-2">
              <span
                className="h-12 w-12 rounded-2xl border border-black/10"
                style={{ backgroundColor: activeTheme.seed }}
                title={`${t.characterColor} ${activeTheme.seed}`}
                role="img"
                aria-label={`${t.characterColor} ${activeTheme.seed}`}
              />
              <span
                className="h-12 w-12 rounded-2xl border border-black/10"
                style={{ backgroundColor: activeTheme.accent }}
                title={`${t.accentColor} ${activeTheme.accent}`}
                role="img"
                aria-label={`${t.accentColor} ${activeTheme.accent}`}
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3 text-xs">
            <span className="rounded-full bg-[var(--md-sys-color-surface-container)] px-3 py-2">
              {t.character}: {activeTheme.seed}
            </span>
            <span className="rounded-full bg-[var(--md-sys-color-surface-container)] px-3 py-2">
              {t.accent}: {activeTheme.accent}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-3 divide-x divide-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface-container-low)]">
          <div className="p-4 text-center">
            <div className="text-lg font-bold text-[var(--md-sys-color-primary)]">
              Aa
            </div>
            <p className="mt-1 text-xs text-[var(--md-sys-color-on-surface-variant)]">
              {t.typography}
            </p>
          </div>

          <div className="p-4 text-center">
            <div className="mx-auto h-6 w-10 rounded-full bg-[var(--md-sys-color-primary)]" />
            <p className="mt-2 text-xs text-[var(--md-sys-color-on-surface-variant)]">
              {t.primary}
            </p>
          </div>

          <div className="p-4 text-center">
            <div className="mx-auto h-6 w-10 rounded-full bg-[var(--md-sys-color-secondary-container)]" />
            <p className="mt-2 text-xs text-[var(--md-sys-color-on-surface-variant)]">
              {t.secondary}
            </p>
          </div>
        </div>
      </div>

      {/* Theme Palette Lab */}
      <div className="overflow-hidden rounded-3xl border border-[var(--md-sys-color-outline-variant)] bg-[var(--md-sys-color-surface)]">
        <button
          type="button"
          onClick={() => setShowPaletteLab((value) => !value)}
          aria-expanded={showPaletteLab}
          aria-controls="theme-palette-lab-panel"
          className="flex min-h-20 w-full flex-wrap items-center justify-between gap-4 p-6 text-left transition-colors hover:bg-[var(--md-sys-color-surface-container-low)] sm:p-8"
        >
          <div>
            <p className="text-sm font-semibold text-[var(--md-sys-color-primary)]">
              {t.designSystem}
            </p>
            <h2 id="theme-palette-lab-title" className="mt-2 text-2xl font-bold">
              {t.paletteLab}
            </h2>
            <p className="mt-2 text-sm text-[var(--md-sys-color-on-surface-variant)]">
              {t.compare}
            </p>
          </div>

          <span className="flex min-h-11 items-center gap-2 rounded-full bg-[var(--md-sys-color-secondary-container)] px-4 py-2 text-sm font-semibold text-[var(--md-sys-color-on-secondary-container)]">
            {showPaletteLab ? (
              <>
                {t.collapse}
                <ChevronUp size={18} aria-hidden="true" />
              </>
            ) : (
              <>
                {t.explorePalettes}
                <ChevronDown size={18} aria-hidden="true" />
              </>
            )}
          </span>
        </button>

        {showPaletteLab && (
          <div
            id="theme-palette-lab-panel"
            role="region"
            aria-labelledby="theme-palette-lab-title"
            className="space-y-8 border-t border-[var(--md-sys-color-outline-variant)] p-4 sm:p-6"
          >
            <div className="rounded-2xl bg-[var(--md-sys-color-surface-container-low)] p-4">
              <p className="text-sm font-semibold">
                {t.howToUse}
              </p>
              <p className="mt-2 text-xs leading-6 text-[var(--md-sys-color-on-surface-variant)]">
                {t.paletteHint}
              </p>
            </div>

            {palettePreviews.map(({ theme, light, dark }) => {
              const themeName = getThemeName(theme, locale);

              return (
                <div key={theme.id} className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      aria-hidden="true"
                      className="h-5 w-5 rounded-full border border-black/10"
                      style={{ backgroundColor: theme.seed }}
                    />
                    <h3 className="text-lg font-bold">
                      {themeName}
                    </h3>
                    {theme.id === characterId && (
                      <span className="rounded-full bg-[var(--md-sys-color-primary)] px-3 py-1 text-xs font-semibold text-[var(--md-sys-color-on-primary)]">
                        {t.active}
                      </span>
                    )}
                  </div>

                  <div className="grid gap-4 xl:grid-cols-2">
                    <ThemePaletteCard
                      themeName={themeName}
                      mode="light"
                      palette={light}
                      t={t}
                      locale={locale}
                    />
                    <ThemePaletteCard
                      themeName={themeName}
                      mode="dark"
                      palette={dark}
                      t={t}
                      locale={locale}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Character collection */}
      <div>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[var(--md-sys-color-primary)]">
              {t.favorites}
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              {t.choose}
            </h2>

            <p className="mt-2 text-sm text-[var(--md-sys-color-on-surface-variant)]">
              {t.collectionDescription}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFavoritesOnly((value) => !value)}
            aria-pressed={showFavoritesOnly}
            className={`flex min-h-11 items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-sys-color-primary)] ${
              showFavoritesOnly
                ? "bg-[var(--md-sys-color-primary)] text-[var(--md-sys-color-on-primary)]"
                : "border border-[var(--md-sys-color-outline)] hover:bg-[var(--md-sys-color-surface-container)]"
            }`}
          >
            <Star
              size={16}
              fill={showFavoritesOnly ? "currentColor" : "none"}
              aria-hidden="true"
            />
            {showFavoritesOnly ? t.showAll : t.showFavorites}
          </button>
        </div>

        {/* Screen reader announcement for filter results */}
        <p
          className="sr-only"
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {filterAnnouncement}
        </p>

        <div className="mt-8 space-y-9">
          {groups.map((group) => {
            const groupThemes = filteredThemes.filter(
              (theme) => theme.group === group.id
            );

            if (groupThemes.length === 0) {
              return null;
            }

            return (
              <div key={group.id}>
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-lg font-bold">
                    {t[group.label]}
                  </h3>

                  <span className="text-xs text-[var(--md-sys-color-on-surface-variant)]">
                    {groupThemes.length} {t.themes}
                  </span>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {groupThemes.map((theme) => {
                    const isActive = characterId === theme.id;
                    const isSaved = savedCharacters.includes(theme.id);
                    const themeName = getThemeName(theme, locale);

                    return (
                      <article
                        key={theme.id}
                        className={`relative overflow-hidden rounded-3xl border bg-[var(--md-sys-color-surface)] transition-all ${
                          isActive
                            ? "border-[var(--md-sys-color-primary)] ring-2 ring-[var(--md-sys-color-primary)]"
                            : "border-[var(--md-sys-color-outline-variant)] hover:-translate-y-1 hover:shadow-md"
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => setCharacterId(theme.id)}
                          aria-pressed={isActive}
                          aria-label={`${themeName}, ${
                            isActive
                              ? t.currentlySelected
                              : t.selectThisTheme
                          }`}
                          className="block min-h-full w-full text-left focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--md-sys-color-primary)]"
                        >
                          <div
                            className="flex h-24 items-end justify-between p-4"
                            style={{
                              backgroundColor: theme.seed,
                            }}
                          >
                            <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-900">
                              {isActive ? t.active : t.preview}
                            </span>

                            <div
                              aria-hidden="true"
                              className="h-10 w-10 rounded-2xl border-2 border-white/70 shadow-sm"
                              style={{
                                backgroundColor: theme.accent,
                              }}
                            />
                          </div>

                          <div className="p-5">
                            <h4 className="text-lg font-bold">
                              {themeName}
                            </h4>

                            {locale !== "en" && (
                              <p className="mt-1 text-sm text-[var(--md-sys-color-on-surface-variant)]">
                                {theme.nameEn}
                              </p>
                            )}

                            <p className="mt-3 min-h-10 text-xs leading-5 text-[var(--md-sys-color-on-surface-variant)]">
                              {getThemeDescription(theme, locale)}
                            </p>

                            <div className="mt-4 flex items-center gap-2">
                              <span
                                aria-hidden="true"
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: theme.seed }}
                              />
                              <span
                                aria-hidden="true"
                                className="h-3 w-3 rounded-full"
                                style={{ backgroundColor: theme.accent }}
                              />
                              <span className="ml-auto flex items-center gap-1 text-xs font-semibold text-[var(--md-sys-color-primary)]">
                                {isActive ? (
                                  <>
                                    {t.selected}
                                    <Check size={14} aria-hidden="true" />
                                  </>
                                ) : (
                                  <>
                                    {t.select}
                                    <ArrowRight size={14} aria-hidden="true" />
                                  </>
                                )}
                              </span>
                            </div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => toggleSavedCharacter(theme.id)}
                          aria-label={
                            isSaved
                              ? `${t.removeFromFavorites}: ${themeName}`
                              : `${t.addToFavorites}: ${themeName}`
                          }
                          aria-pressed={isSaved}
                          title={
                            isSaved
                              ? t.removeFromFavorites
                              : t.addToFavorites
                          }
                          className="absolute right-3 top-3 flex min-h-11 min-w-11 items-center justify-center rounded-full border border-black/10 bg-[var(--md-sys-color-surface-container-high)] text-[var(--md-sys-color-on-surface)] shadow-sm transition-transform hover:scale-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--md-sys-color-primary)]"
                        >
                          <Star
                            size={19}
                            fill={isSaved ? "currentColor" : "none"}
                            aria-hidden="true"
                          />
                        </button>
                      </article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {filteredThemes.length === 0 && (
          <div className="mt-8 rounded-3xl bg-[var(--md-sys-color-surface-container)] p-10 text-center">
            <Star
              size={36}
              className="mx-auto text-[var(--md-sys-color-on-surface-variant)]"
              aria-hidden="true"
            />
            <p className="mt-3 font-semibold">
              {t.noFavorites}
            </p>
            <p className="mt-2 text-sm text-[var(--md-sys-color-on-surface-variant)]">
              {t.saveHint}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
