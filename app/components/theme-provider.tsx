
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

import {
  generateSingerTheme,
  type ColorMode,
} from "../lib/theme-engine";

import {
  getSingerTheme,
  singerThemes,
} from "../lib/singer-themes";

type ThemeContextValue = {
  characterId: string;
  colorMode: ColorMode;
  setCharacterId: (id: string) => void;
  setColorMode: (mode: ColorMode) => void;
  resetTheme: () => void;
  savedCharacters: string[];
  toggleSavedCharacter: (id: string) => void;
  activeTheme: ReturnType<typeof getSingerTheme>;
};

type ThemeSettings = {
  characterId: string;
  colorMode: ColorMode;
  savedCharacters: string[];
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const CHARACTER_STORAGE_KEY = "gcgs-character-theme";
const MODE_STORAGE_KEY = "gcgs-theme";
const SAVED_STORAGE_KEY = "gcgs-saved-themes";
const THEME_EVENT = "gcgs-theme-change";

const VALID_MODES: ColorMode[] = ["light", "dark", "system"];

const DEFAULT_SETTINGS: ThemeSettings = {
  characterId: "default",
  colorMode: "system",
  savedCharacters: ["default"],
};

function isValidCharacter(id: string): boolean {
  return singerThemes.some((theme) => theme.id === id);
}

function readSettings(): ThemeSettings {
  if (typeof window === "undefined") {
    return DEFAULT_SETTINGS;
  }

  try {
    const character = localStorage.getItem(CHARACTER_STORAGE_KEY);
    const mode = localStorage.getItem(MODE_STORAGE_KEY);
    const saved = localStorage.getItem(SAVED_STORAGE_KEY);

    let savedCharacters = ["default"];

    if (saved) {
      const parsed: unknown = JSON.parse(saved);

      if (Array.isArray(parsed)) {
        savedCharacters = Array.from(
          new Set(
            parsed.filter(
              (id): id is string =>
                typeof id === "string" && isValidCharacter(id)
            )
          )
        );
      }
    }

    return {
      characterId:
        character && isValidCharacter(character)
          ? character
          : "default",

      colorMode:
        mode && VALID_MODES.includes(mode as ColorMode)
          ? (mode as ColorMode)
          : "system",

      savedCharacters,
    };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function getSnapshot(): string {
  return JSON.stringify(readSettings());
}

function getServerSnapshot(): string {
  return JSON.stringify(DEFAULT_SETTINGS);
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(THEME_EVENT, callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(THEME_EVENT, callback);
  };
}

function updateStorage(
  updates: Partial<ThemeSettings>
) {
  const current = readSettings();
  const next = { ...current, ...updates };

  try {
    localStorage.setItem(
      CHARACTER_STORAGE_KEY,
      next.characterId
    );

    localStorage.setItem(
      MODE_STORAGE_KEY,
      next.colorMode
    );

    localStorage.setItem(
      SAVED_STORAGE_KEY,
      JSON.stringify(next.savedCharacters)
    );
  } catch {
    // The current page can still use the updated external event.
  }

  window.dispatchEvent(new Event(THEME_EVENT));
}

function getEffectiveMode(
  mode: ColorMode
): "light" | "dark" {
  if (mode !== "system") {
    return mode;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({
  children,
}: {
  children: ReactNode;
}) {
  const settingsSnapshot = useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );

  const settings = useMemo<ThemeSettings>(
    () => JSON.parse(settingsSnapshot) as ThemeSettings,
    [settingsSnapshot]
  );

  const {
    characterId,
    colorMode,
    savedCharacters,
  } = settings;

  const setCharacterId = useCallback((id: string) => {
    if (!isValidCharacter(id)) {
      return;
    }

    updateStorage({ characterId: id });
  }, []);

  const setColorMode = useCallback((mode: ColorMode) => {
    if (!VALID_MODES.includes(mode)) {
      return;
    }

    updateStorage({ colorMode: mode });
  }, []);

  const toggleSavedCharacter = useCallback((id: string) => {
    if (!isValidCharacter(id)) {
      return;
    }

    const current = readSettings().savedCharacters;

    const next = current.includes(id)
      ? current.filter((item) => item !== id)
      : [...current, id];

    updateStorage({ savedCharacters: next });
  }, []);

  const resetTheme = useCallback(() => {
    updateStorage(DEFAULT_SETTINGS);
  }, []);

  const activeTheme = useMemo(
    () => getSingerTheme(characterId),
    [characterId]
  );

  useEffect(() => {
    const applyTheme = () => {
      const effectiveMode = getEffectiveMode(colorMode);
      const palette = generateSingerTheme(
        activeTheme,
        effectiveMode
      );

      const root = document.documentElement;

      root.dataset.theme = colorMode;
      root.dataset.characterTheme = characterId;
      root.style.colorScheme = effectiveMode;

      for (const [key, value] of Object.entries(palette)) {
        root.style.setProperty(key, value);
      }
    };

    applyTheme();

    const mediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );

    if (colorMode !== "system") {
      return;
    }

    mediaQuery.addEventListener("change", applyTheme);

    return () => {
      mediaQuery.removeEventListener("change", applyTheme);
    };
  }, [characterId, colorMode, activeTheme]);

  const contextValue = useMemo<ThemeContextValue>(
    () => ({
      characterId,
      colorMode,
      setCharacterId,
      setColorMode,
      resetTheme,
      savedCharacters,
      toggleSavedCharacter,
      activeTheme,
    }),
    [
      characterId,
      colorMode,
      setCharacterId,
      setColorMode,
      resetTheme,
      savedCharacters,
      toggleSavedCharacter,
      activeTheme,
    ]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useSingerTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error(
      "useSingerTheme must be used inside ThemeProvider"
    );
  }

  return context;
}
