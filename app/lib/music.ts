import type { Locale } from "./i18n";

export type MusicEngine =
  | "VOCALOID"
  | "Synthesizer V"
  | "ACE Studio"
  | "UTAU"
  | "CeVIO"
  | "Other";

export type MusicLanguage = "ja" | "zh" | "en" | "other";

export type MusicSource = {
  label: string;
  url: string;
};

export type MusicSong = {
  id: string;
  title: string;
  aliases: string[];
  creators: string[];
  vocals: string[];
  engines: MusicEngine[];
  language: MusicLanguage;
  releaseDate: string;
  description: Record<Locale, string>;
  tags: string[];
  moegirl?: MusicSource;
  bilibili?: MusicSource;
  official: MusicSource;
};

export const musicSongs: MusicSong[] = [
  {
    id: "freely-tomorrow",
    title: "FREELY TOMORROW",
    aliases: ["自由明天"],
    creators: ["Mitchie M"],
    vocals: ["初音未来", "Hatsune Miku"],
    engines: ["VOCALOID"],
    language: "ja",
    releaseDate: "2011-07-31",
    description: {
      "zh-CN":
        "Mitchie M 创作的初音未来歌曲，以细腻的人声调校和富有活力的电子流行编曲而受到关注。",
      en:
        "A Hatsune Miku song by Mitchie M, known for its detailed vocal tuning and energetic electronic pop arrangement.",
      ja:
        "Mitchie Mによる初音ミク楽曲。繊細な調声と躍動感のあるエレクトロポップのアレンジで知られています。",
    },
    tags: ["经典作品", "电子流行", "殿堂曲"],
    moegirl: {
      label: "萌娘百科 · VOCALOID 传说曲资料",
      url: "https://zh.moegirl.org.cn/VOCALOID传说曲/最速达成排行榜",
    },
    official: {
      label: "Mitchie M Official YouTube",
      url: "https://www.youtube.com/watch?v=KmvydnVTriE",
    },
  },
  {
    id: "butcher-vanity",
    title: "BUTCHER VANITY",
    aliases: ["虚荣的屠夫", "虚栄の屠殺者"],
    creators: ["FLAVOR FOLEY"],
    vocals: ["奕夕", "Yi Xi"],
    engines: ["Synthesizer V"],
    language: "en",
    releaseDate: "2024-03-28",
    description: {
      "zh-CN":
        "FLAVOR FOLEY 创作的英语 Synthesizer V 原创歌曲，由奕夕演唱。作品融合了戏剧化表达与强烈的音乐风格。",
      en:
        "An English Synthesizer V original by FLAVOR FOLEY, featuring Yi Xi, with dramatic vocals and an intense musical style.",
      ja:
        "FLAVOR FOLEYによる英語のSynthesizer Vオリジナル楽曲。奕夕が歌唱し、ドラマチックな表現が特徴です。",
    },
    tags: ["英语歌曲", "Synthesizer V", "原创歌曲"],
    moegirl: {
      label: "萌娘百科 · BUTCHER VANITY",
      url: "https://zh.moegirl.org.cn/ja/BUTCHER_VANITY",
    },
    official: {
      label: "FLAVOR FOLEY Official YouTube",
      url: "https://www.youtube.com/watch?v=vjBFftpQxxM",
    },
  },
  {
    id: "san-shi-wu-ying-shen",
    title: "三是无应神",
    aliases: ["概念神系列第三作"],
    creators: ["JUSF周存"],
    vocals: ["重音Teto", "洛天依", "言和", "乐正龙牙"],
    engines: ["Synthesizer V", "ACE Studio"],
    language: "zh",
    releaseDate: "2026-11-13",
    description: {
      "zh-CN":
        "JUSF周存创作的中文原创歌曲，由重音 Teto、洛天依、言和与乐正龙牙演唱，是概念神系列第三作。",
      en:
        "A Chinese original song by JUSF Zhou Cun, featuring Kasane Teto, Luo Tianyi, Yan He and Yuezheng Longya. It is the third work in the Concept Deity series.",
      ja:
        "JUSF周存による中国語オリジナル楽曲。重音テト、洛天依、言和、楽正龍牙が歌唱する「概念神」シリーズの第3作です。",
    },
    tags: ["中文歌曲", "多人合唱", "系列作品"],
    moegirl: {
      label: "萌娘百科 · 三是无应神",
      url: "https://zh.moegirl.org.cn/三是无应神",
    },
    official: {
      label: "Bilibili 原投稿",
      url: "https://www.bilibili.com/video/BV1DUWo6uEii/",
    },
  },
];

export const musicEngineOptions: MusicEngine[] = [
  "VOCALOID",
  "Synthesizer V",
  "ACE Studio",
  "UTAU",
  "CeVIO",
  "Other",
];

export const musicLanguageOptions: {
  id: MusicLanguage;
  labels: Record<Locale, string>;
}[] = [
  {
    id: "ja",
    labels: {
      "zh-CN": "日语",
      en: "Japanese",
      ja: "日本語",
    },
  },
  {
    id: "zh",
    labels: {
      "zh-CN": "中文",
      en: "Chinese",
      ja: "中国語",
    },
  },
  {
    id: "en",
    labels: {
      "zh-CN": "英语",
      en: "English",
      ja: "英語",
    },
  },
  {
    id: "other",
    labels: {
      "zh-CN": "其他",
      en: "Other",
      ja: "その他",
    },
  },
];

export function getMusicSongById(id: string) {
  return musicSongs.find((song) => song.id === id);
}