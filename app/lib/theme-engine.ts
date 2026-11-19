
import type { SingerTheme } from "./singer-themes";

export type ColorMode = "light" | "dark" | "system";

type ThemeVariables = Record<string, string>;

type HSL = {
  h: number;
  s: number;
  l: number;
};

const WHITE = "#FFFFFF";
const BLACK = "#000000";

function hexToRgb(hex: string): [number, number, number] {
  const normalized = hex.replace("#", "");

  if (!/^[0-9a-fA-F]{6}$/.test(normalized)) {
    throw new Error(`Invalid HEX color: ${hex}`);
  }

  return [
    parseInt(normalized.slice(0, 2), 16),
    parseInt(normalized.slice(2, 4), 16),
    parseInt(normalized.slice(4, 6), 16),
  ];
}

function hexToHsl(hex: string): HSL {
  const [red, green, blue] = hexToRgb(hex);

  const r = red / 255;
  const g = green / 255;
  const b = blue / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h = 0;
  let s = 0;

  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;

    s = l > 0.5
      ? delta / (2 - max - min)
      : delta / (max + min);

    switch (max) {
      case r:
        h = (g - b) / delta + (g < b ? 6 : 0);
        break;

      case g:
        h = (b - r) / delta + 2;
        break;

      case b:
        h = (r - g) / delta + 4;
        break;
    }

    h /= 6;
  }

  return {
    h: h * 360,
    s: s * 100,
    l: l * 100,
  };
}

function hslToHex({ h, s, l }: HSL): string {
  const saturation = Math.max(0, Math.min(100, s)) / 100;
  const lightness = Math.max(0, Math.min(100, l)) / 100;

  const chroma =
    (1 - Math.abs(2 * lightness - 1)) * saturation;

  const hue = ((h % 360) + 360) % 360;

  const x =
    chroma * (1 - Math.abs((hue / 60) % 2 - 1));

  const m = lightness - chroma / 2;

  let r = 0;
  let g = 0;
  let b = 0;

  if (hue < 60) {
    [r, g, b] = [chroma, x, 0];
  } else if (hue < 120) {
    [r, g, b] = [x, chroma, 0];
  } else if (hue < 180) {
    [r, g, b] = [0, chroma, x];
  } else if (hue < 240) {
    [r, g, b] = [0, x, chroma];
  } else if (hue < 300) {
    [r, g, b] = [x, 0, chroma];
  } else {
    [r, g, b] = [chroma, 0, x];
  }

  const toHex = (value: number) =>
    Math.round((value + m) * 255)
      .toString(16)
      .padStart(2, "0");

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function tone(
  source: string,
  lightness: number,
  saturationScale = 1
): string {
  const hsl = hexToHsl(source);

  return hslToHex({
    h: hsl.h,
    s: hsl.s * saturationScale,
    l: lightness,
  });
}

function rotateHue(source: string, degrees: number): string {
  const hsl = hexToHsl(source);

  return hslToHex({
    ...hsl,
    h: hsl.h + degrees,
  });
}

function relativeLuminance(hex: string): number {
  const channels = hexToRgb(hex).map((value) => {
    const channel = value / 255;

    return channel <= 0.04045
      ? channel / 12.92
      : ((channel + 0.055) / 1.055) ** 2.4;
  });

  return (
    0.2126 * channels[0] +
    0.7152 * channels[1] +
    0.0722 * channels[2]
  );
}

export function contrastRatio(
  foreground: string,
  background: string
): number {
  const a = relativeLuminance(foreground);
  const b = relativeLuminance(background);

  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);

  return (lighter + 0.05) / (darker + 0.05);
}

function accessibleForeground(background: string): string {
  const whiteContrast = contrastRatio(WHITE, background);
  const blackContrast = contrastRatio(BLACK, background);

  return whiteContrast >= blackContrast ? WHITE : BLACK;
}

/**
 * Finds a color tone close to the preferred lightness
 * while ensuring that either black or white text
 * reaches the requested contrast ratio.
 */
function accessibleTone(
  source: string,
  preferredLightness: number,
  saturationScale = 1,
  minimumContrast = 4.5
): string {
  let bestColor = "";
  let bestDistance = Number.POSITIVE_INFINITY;

  for (let lightness = 0; lightness <= 100; lightness += 1) {
    const candidate = tone(
      source,
      lightness,
      saturationScale
    );

    const foreground = accessibleForeground(candidate);
    const contrast = contrastRatio(foreground, candidate);

    if (contrast < minimumContrast) continue;

    const distance = Math.abs(lightness - preferredLightness);

    if (distance < bestDistance) {
      bestDistance = distance;
      bestColor = candidate;
    }
  }

  return bestColor || tone(source, preferredLightness, saturationScale);
}

function createPalette(
  theme: SingerTheme,
  mode: "light" | "dark"
): ThemeVariables {
  const dark = mode === "dark";

  const seed = theme.seed;
  const accent = theme.accent;

  // Primary colors are adjusted for readable foregrounds.
  // The original character color is preserved separately.
  const primary = accessibleTone(
    seed,
    dark ? 80 : 40
  );

  const primaryContainer = accessibleTone(
    seed,
    dark ? 30 : 90,
    0.85
  );

  const secondarySeed = rotateHue(seed, 35);

  const secondary = accessibleTone(
    secondarySeed,
    dark ? 80 : 40,
    0.55
  );

  const secondaryContainer = accessibleTone(
    secondarySeed,
    dark ? 30 : 90,
    0.45
  );

  const tertiarySeed = rotateHue(seed, 65);

  const tertiary = accessibleTone(
    tertiarySeed,
    dark ? 80 : 40,
    0.7
  );

  const tertiaryContainer = accessibleTone(
    tertiarySeed,
    dark ? 30 : 90,
    0.55
  );

  // Neutral surfaces avoid excessive color tinting.
  const surface = tone(seed, dark ? 10 : 99, 0.035);

  const surfaceDim = tone(seed, dark ? 6 : 87, 0.035);

  const surfaceBright = tone(seed, dark ? 24 : 99, 0.035);

  const surfaceContainerLowest = tone(
    seed,
    dark ? 4 : 100,
    0.035
  );

  const surfaceContainerLow = tone(
    seed,
    dark ? 12 : 96,
    0.035
  );

  const surfaceContainer = tone(
    seed,
    dark ? 16 : 94,
    0.035
  );

  const surfaceContainerHigh = tone(
    seed,
    dark ? 22 : 92,
    0.035
  );

  const surfaceContainerHighest = tone(
    seed,
    dark ? 28 : 90,
    0.035
  );

  // Neutral foreground colors keep text readable
  // regardless of the selected character.
  const onSurface = dark ? "#E6E1E9" : "#19171D";

  const onSurfaceVariant = dark ? "#CAC4D0" : "#49454F";

  const outline = dark ? "#938F99" : "#756F79";

  const outlineVariant = dark ? "#49454F" : "#CAC4D0";

  // Standard semantic error colors.
  const error = dark ? "#FFB4AB" : "#BA1A1A";

  const errorContainer = dark ? "#93000A" : "#FFDAD6";

  return {
    // Original character identity.
    "--gcgs-character-color": seed,
    "--gcgs-character-accent": accent,

    // Primary.
    "--md-sys-color-primary": primary,
    "--md-sys-color-on-primary":
      accessibleForeground(primary),

    "--md-sys-color-primary-container": primaryContainer,
    "--md-sys-color-on-primary-container":
      accessibleForeground(primaryContainer),

    // Secondary.
    "--md-sys-color-secondary": secondary,
    "--md-sys-color-on-secondary":
      accessibleForeground(secondary),

    "--md-sys-color-secondary-container": secondaryContainer,
    "--md-sys-color-on-secondary-container":
      accessibleForeground(secondaryContainer),

    // Tertiary.
    "--md-sys-color-tertiary": tertiary,
    "--md-sys-color-on-tertiary":
      accessibleForeground(tertiary),

    "--md-sys-color-tertiary-container": tertiaryContainer,
    "--md-sys-color-on-tertiary-container":
      accessibleForeground(tertiaryContainer),

    // Error.
    "--md-sys-color-error": error,
    "--md-sys-color-on-error":
      accessibleForeground(error),

    "--md-sys-color-error-container": errorContainer,
    "--md-sys-color-on-error-container":
      accessibleForeground(errorContainer),

    // Surface.
    "--md-sys-color-surface": surface,
    "--md-sys-color-on-surface": onSurface,

    "--md-sys-color-surface-dim": surfaceDim,
    "--md-sys-color-surface-bright": surfaceBright,

    "--md-sys-color-surface-container-lowest":
      surfaceContainerLowest,

    "--md-sys-color-surface-container-low":
      surfaceContainerLow,

    "--md-sys-color-surface-container":
      surfaceContainer,

    "--md-sys-color-surface-container-high":
      surfaceContainerHigh,

    "--md-sys-color-surface-container-highest":
      surfaceContainerHighest,

    "--md-sys-color-on-surface-variant": onSurfaceVariant,

    "--md-sys-color-outline": outline,
    "--md-sys-color-outline-variant": outlineVariant,

    // Inverse colors.
    "--md-sys-color-inverse-surface":
      dark ? "#E6E1E9" : "#313033",

    "--md-sys-color-inverse-on-surface":
      dark ? "#313033" : "#F4EFF7",

    "--md-sys-color-inverse-primary":
      accessibleTone(seed, dark ? 40 : 80),

    // Utility colors.
    "--md-sys-color-scrim": BLACK,
    "--md-sys-color-shadow": BLACK,

    // GCGS accent colors.
    "--gcgs-accent-pink": accent,

    "--gcgs-accent-blue": tone(
      rotateHue(seed, 180),
      dark ? 65 : 85,
      0.65
    ),

    "--gcgs-accent-purple": tone(
      rotateHue(seed, 45),
      dark ? 65 : 85,
      0.6
    ),

    "--gcgs-accent-yellow": tone(
      rotateHue(seed, 90),
      dark ? 65 : 88,
      0.65
    ),
  };
}

export function generateSingerTheme(
  theme: SingerTheme,
  mode: "light" | "dark"
): ThemeVariables {
  return createPalette(theme, mode);
}

export function getThemeMode(
  mode: ColorMode,
  systemPrefersDark: boolean
): "light" | "dark" {
  if (mode === "system") {
    return systemPrefersDark ? "dark" : "light";
  }

  return mode;
}
