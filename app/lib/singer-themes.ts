
export type SingerTheme = {
  id: string;
  name: string;
  nameEn: string;
  nameJa: string;
  group: "crypton" | "vsinger" | "default";
  seed: string;
  accent: string;
  descriptions: {
    "zh-CN": string;
    en: string;
    ja: string;
  };
};

export const singerThemes: SingerTheme[] = [
  {
    id: "default",
    name: "GCGS Default",
    nameEn: "GCGS Pastel",
    nameJa: "GCGS パステル",
    group: "default",
    seed: "#6750A4",
    accent: "#F4B8C8",
    descriptions: {
      "zh-CN": "GCGS 原生 Pastel 主题",
      en: "The original GCGS Pastel theme.",
      ja: "GCGS オリジナルのパステルテーマ。",
    },
  },

  // Crypton Future Media
  {
    id: "hatsune-miku",
    name: "初音未来",
    nameEn: "Hatsune Miku",
    nameJa: "初音ミク",
    group: "crypton",
    seed: "#33CCBB",
    accent: "#A8EAE2",
    descriptions: {
      "zh-CN": "苍绿色，灵感来自初音未来的标志性形象。",
      en: "A turquoise theme inspired by Hatsune Miku's iconic look.",
      ja: "初音ミクの象徴的なイメージに着想を得た、青緑色のテーマ。",
    },
  },
  {
    id: "kagamine-rin",
    name: "镜音铃",
    nameEn: "Kagamine Rin",
    nameJa: "鏡音リン",
    group: "crypton",
    seed: "#FFCC11",
    accent: "#FFE89A",
    descriptions: {
      "zh-CN": "明亮的金黄色，灵感来自镜音铃。",
      en: "A bright golden-yellow theme inspired by Kagamine Rin.",
      ja: "鏡音リンをイメージした、明るいゴールデンイエローのテーマ。",
    },
  },
  {
    id: "kagamine-len",
    name: "镜音连",
    nameEn: "Kagamine Len",
    nameJa: "鏡音レン",
    group: "crypton",
    seed: "#FFEE11",
    accent: "#FFF5A0",
    descriptions: {
      "zh-CN": "明黄色，灵感来自镜音连。",
      en: "A vivid yellow theme inspired by Kagamine Len.",
      ja: "鏡音レンをイメージした、鮮やかなイエローのテーマ。",
    },
  },
  {
    id: "megurine-luka",
    name: "巡音流歌",
    nameEn: "Megurine Luka",
    nameJa: "巡音ルカ",
    group: "crypton",
    seed: "#FFBBCC",
    accent: "#FFE0E8",
    descriptions: {
      "zh-CN": "桃粉色，灵感来自巡音流歌。",
      en: "A soft pink theme inspired by Megurine Luka.",
      ja: "巡音ルカをイメージした、柔らかなピンクのテーマ。",
    },
  },
  {
    id: "meiko",
    name: "MEIKO",
    nameEn: "MEIKO",
    nameJa: "MEIKO",
    group: "crypton",
    seed: "#DD4444",
    accent: "#F2AAAA",
    descriptions: {
      "zh-CN": "温暖的红色，灵感来自 MEIKO。",
      en: "A warm red theme inspired by MEIKO.",
      ja: "MEIKOをイメージした、温かみのあるレッドのテーマ。",
    },
  },
  {
    id: "kaito",
    name: "KAITO",
    nameEn: "KAITO",
    nameJa: "KAITO",
    group: "crypton",
    seed: "#3366CC",
    accent: "#A9C2F0",
    descriptions: {
      "zh-CN": "深蓝色，灵感来自 KAITO。",
      en: "A deep blue theme inspired by KAITO.",
      ja: "KAITOをイメージした、深みのあるブルーのテーマ。",
    },
  },

  // Vsinger
  {
    id: "luo-tianyi",
    name: "洛天依",
    nameEn: "Luo Tianyi",
    nameJa: "洛天依",
    group: "vsinger",
    seed: "#66CCFF",
    accent: "#B5E5FF",
    descriptions: {
      "zh-CN": "天依蓝，灵感来自洛天依。",
      en: "A sky-blue theme inspired by Luo Tianyi.",
      ja: "洛天依をイメージした、澄んだスカイブルーのテーマ。",
    },
  },
  {
    id: "yanhe",
    name: "言和",
    nameEn: "Yan He",
    nameJa: "言和",
    group: "vsinger",
    seed: "#00FFCC",
    accent: "#A8FFE9",
    descriptions: {
      "zh-CN": "薄荷绿，灵感来自言和。",
      en: "A mint-green theme inspired by Yan He.",
      ja: "言和をイメージした、爽やかなミントグリーンのテーマ。",
    },
  },
  {
    id: "yuezheng-ling",
    name: "乐正绫",
    nameEn: "Yuezheng Ling",
    nameJa: "乐正绫",
    group: "vsinger",
    seed: "#EE0000",
    accent: "#F5AAAA",
    descriptions: {
      "zh-CN": "阿绫红，灵感来自乐正绫。",
      en: "A vivid red theme inspired by Yuezheng Ling.",
      ja: "乐正绫をイメージした、鮮やかなレッドのテーマ。",
    },
  },
  {
    id: "yuezheng-longya",
    name: "乐正龙牙",
    nameEn: "Yuezheng Longya",
    nameJa: "乐正龙牙",
    group: "vsinger",
    seed: "#006666",
    accent: "#9BCBCB",
    descriptions: {
      "zh-CN": "龙牙绿，灵感来自乐正龙牙。",
      en: "A deep teal theme inspired by Yuezheng Longya.",
      ja: "乐正龙牙をイメージした、深みのある青緑色のテーマ。",
    },
  },
  {
    id: "zhengyu-moke",
    name: "徵羽摩柯",
    nameEn: "Zhiyu Moke",
    nameJa: "徵羽摩柯",
    group: "vsinger",
    seed: "#0080FF",
    accent: "#A6D0FF",
    descriptions: {
      "zh-CN": "摩柯蓝，灵感来自徵羽摩柯。",
      en: "A vivid blue theme inspired by Zhiyu Moke.",
      ja: "徵羽摩柯をイメージした、鮮やかなブルーのテーマ。",
    },
  },
  {
    id: "mo-qingxian",
    name: "墨清弦",
    nameEn: "Mo Qingxian",
    nameJa: "墨清弦",
    group: "vsinger",
    seed: "#FFFF00",
    accent: "#FFFFA8",
    descriptions: {
      "zh-CN": "清弦黄，灵感来自墨清弦。",
      en: "A bright yellow theme inspired by Mo Qingxian.",
      ja: "墨清弦をイメージした、明るいイエローのテーマ。",
    },
  },
];

export function getSingerTheme(id: string): SingerTheme {
  return singerThemes.find((theme) => theme.id === id) ?? singerThemes[0];
}
