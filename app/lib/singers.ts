import type { Locale } from "./i18n";

export type LocalizedText = Record<Locale, string>;

export type SingerPortrait = {
  /** 相对 public/ 的路径，例如 /portraits/hatsune-miku.png */
  src: string;
  /** 画师署名，例如 "Art by KEI" */
  credit: string;
};

export type SingerProfile = {
  id: string;
  themeId: string;
  names: LocalizedText;
  romanizedName: string;
  category: LocalizedText;
  introduction: LocalizedText;
  biography: LocalizedText;
  voiceSource: string;
  voiceSourceRomanized: string;
  voiceSourceType: LocalizedText;
  releaseDate: LocalizedText;
  age?: number;
  height?: number;
  weight?: number;
  softwareNote: LocalizedText;
  portrait?: SingerPortrait;
};

export const singers: SingerProfile[] = [
  {
    id: "hatsune-miku",
    themeId: "hatsune-miku",
    names: {
      "zh-CN": "初音未来",
      en: "Hatsune Miku",
      ja: "初音ミク",
    },
    romanizedName: "HATSUNE MIKU",
    category: {
      "zh-CN": "虚拟歌手",
      en: "Virtual Singer",
      ja: "バーチャルシンガー",
    },
    introduction: {
      "zh-CN": "从歌声合成软件走向世界舞台的虚拟歌手。",
      en: "A virtual singer who grew from a singing synthesis software into a worldwide phenomenon.",
      ja: "歌声合成ソフトウェアから世界的な存在へと広がったバーチャルシンガー。",
    },
    biography: {
      "zh-CN":
        "初音未来是由 Crypton Future Media 开发的歌声合成软件及其代表角色。用户输入歌词与旋律，便可以让她演唱。许多创作者以初音未来为基础创作并在网络上发布音乐，逐渐形成了独特的创作文化。她也以角色形象活跃于周边商品、演唱会等领域，拥有来自世界各地的粉丝。",
      en:
        "Hatsune Miku is a singing synthesis software developed by Crypton Future Media and the character associated with it. Users can make her sing by entering lyrics and melodies. Creators around the world have used the software to compose and publish music online, helping build a distinctive creative culture. Miku has also become a character featured in merchandise, concerts, and events around the world.",
      ja:
        "初音ミクは、クリプトン・フューチャー・メディアが開発した歌声合成ソフトウェア、およびそのキャラクターです。歌詞とメロディーを入力することで歌わせることができます。多くのクリエイターが初音ミクを使った楽曲を制作・公開し、独自の創作文化が広がりました。グッズやコンサートなどにも登場し、世界中で親しまれています。",
    },
    voiceSource: "藤田咲",
    voiceSourceRomanized: "Fujita Saki",
    voiceSourceType: {
      "zh-CN": "声优",
      en: "Voice actress",
      ja: "声優",
    },
    releaseDate: {
      "zh-CN": "2007 年 8 月 31 日",
      en: "August 31, 2007",
      ja: "2007年8月31日",
    },
    age: 16,
    height: 158,
    weight: 42,
    softwareNote: {
      "zh-CN": "角色设定：16 岁，苍绿色为代表色。",
      en: "Character profile: 16 years old, with turquoise as her representative color.",
      ja: "キャラクター設定：16歳。イメージカラーは青緑色。",
    },
    portrait: { src: "/portraits/hatsune-miku.png", credit: "Art by KEI" },
  },
  {
    id: "kagamine-rin",
    themeId: "kagamine-rin",
    names: {
      "zh-CN": "镜音铃",
      en: "Kagamine Rin",
      ja: "鏡音リン",
    },
    romanizedName: "KAGAMINE RIN",
    category: {
      "zh-CN": "虚拟歌手 · 镜音双子",
      en: "Virtual Singer · Kagamine",
      ja: "バーチャルシンガー · 鏡音",
    },
    introduction: {
      "zh-CN": "以金色短发和醒目蝴蝶结为特征的虚拟歌手。",
      en: "A virtual singer recognized by her blonde bob and distinctive ribbon.",
      ja: "金髪のボブヘアと大きなリボンが特徴のバーチャルシンガー。",
    },
    biography: {
      "zh-CN":
        "镜音铃是一位 14 岁的女性虚拟歌手，形象特征是金色短发与醒目的大蝴蝶结。她与镜音连一同收录于 2007 年 12 月 27 日发布的镜音系列歌声合成软件中。",
      en:
        "Kagamine Rin is a 14-year-old female virtual singer, recognizable by her blonde bob and large ribbon. Her voice is included alongside Kagamine Len in the Kagamine software package released on December 27, 2007.",
      ja:
        "鏡音リンは、金髪のボブヘアと大きなリボンが特徴の14歳の女性バーチャルシンガーです。2007年12月27日に発売された鏡音シリーズのソフトウェアに、鏡音レンとともに収録されています。",
    },
    voiceSource: "下田麻美",
    voiceSourceRomanized: "Shimoda Asami",
    voiceSourceType: {
      "zh-CN": "声优",
      en: "Voice actress",
      ja: "声優",
    },
    releaseDate: {
      "zh-CN": "2007 年 12 月 27 日",
      en: "December 27, 2007",
      ja: "2007年12月27日",
    },
    age: 14,
    height: 152,
    weight: 43,
    softwareNote: {
      "zh-CN": "角色设定：14 岁，橙黄色为代表色。与镜音连共同收录于同一软件系列。",
      en: "Character profile: 14 years old, with orange as her representative color. Rin and Len are included in the same software series.",
      ja: "キャラクター設定：14歳。イメージカラーはオレンジ。鏡音レンと同じソフトウェアシリーズに収録されています。",
    },
    portrait: { src: "/portraits/kagamine-rin.png", credit: "Art by KEI" },
  },
  {
    id: "kagamine-len",
    themeId: "kagamine-len",
    names: {
      "zh-CN": "镜音连",
      en: "Kagamine Len",
      ja: "鏡音レン",
    },
    romanizedName: "KAGAMINE LEN",
    category: {
      "zh-CN": "虚拟歌手 · 镜音双子",
      en: "Virtual Singer · Kagamine",
      ja: "バーチャルシンガー · 鏡音",
    },
    introduction: {
      "zh-CN": "以金色短发和侧后方束发为特征的虚拟歌手。",
      en: "A virtual singer with short blonde hair tied back.",
      ja: "後ろで短く結んだ金髪が特徴のバーチャルシンガー。",
    },
    biography: {
      "zh-CN":
        "镜音连是一位 14 岁的男性虚拟歌手，形象特征是金色头发与脑后束起的短发。他与镜音铃一同收录于 2007 年 12 月 27 日发布的镜音系列歌声合成软件中。",
      en:
        "Kagamine Len is a 14-year-old male virtual singer, characterized by blonde hair tied back at the rear. His voice is included alongside Kagamine Rin in the Kagamine software package released on December 27, 2007.",
      ja:
        "鏡音レンは、金髪を後ろで短く結んだ姿が特徴の14歳の男性バーチャルシンガーです。2007年12月27日に発売された鏡音シリーズのソフトウェアに、鏡音リンとともに収録されています。",
    },
    voiceSource: "下田麻美",
    voiceSourceRomanized: "Shimoda Asami",
    voiceSourceType: {
      "zh-CN": "声优",
      en: "Voice actress",
      ja: "声優",
    },
    releaseDate: {
      "zh-CN": "2007 年 12 月 27 日",
      en: "December 27, 2007",
      ja: "2007年12月27日",
    },
    age: 14,
    height: 156,
    weight: 47,
    softwareNote: {
      "zh-CN": "角色设定：14 岁，黄色为代表色。与镜音铃共同收录于同一软件系列。",
      en: "Character profile: 14 years old, with yellow as his representative color. Len and Rin are included in the same software series.",
      ja: "キャラクター設定：14歳。イメージカラーは黄色。鏡音リンと同じソフトウェアシリーズに収録されています。",
    },
    portrait: { src: "/portraits/kagamine-len.png", credit: "Art by KEI" },
  },
  {
    id: "megurine-luka",
    themeId: "megurine-luka",
    names: {
      "zh-CN": "巡音流歌",
      en: "Megurine Luka",
      ja: "巡音ルカ",
    },
    romanizedName: "MEGURINE LUKA",
    category: {
      "zh-CN": "虚拟歌手",
      en: "Virtual Singer",
      ja: "バーチャルシンガー",
    },
    introduction: {
      "zh-CN": "以粉色长发为特征，支持日语与英语的虚拟歌手。",
      en: "A pink-haired virtual singer whose software supports Japanese and English.",
      ja: "ピンクの長い髪が特徴で、日本語と英語に対応するバーチャルシンガー。",
    },
    biography: {
      "zh-CN":
        "巡音流歌是一位 20 岁的女性虚拟歌手，以粉色长发为主要形象特征。她的歌声合成软件于 2009 年 1 月 30 日发布，支持日语和英语演唱。",
      en:
        "Megurine Luka is a 20-year-old female virtual singer known for her long pink hair. Her singing synthesis software was released on January 30, 2009, and supports both Japanese and English vocals.",
      ja:
        "巡音ルカは、長いピンク色の髪が特徴の20歳の女性バーチャルシンガーです。歌声合成ソフトウェアは2009年1月30日に発売され、日本語と英語の歌唱に対応しています。",
    },
    voiceSource: "浅川悠",
    voiceSourceRomanized: "Asakawa Yū",
    voiceSourceType: {
      "zh-CN": "声优",
      en: "Voice actress",
      ja: "声優",
    },
    releaseDate: {
      "zh-CN": "2009 年 1 月 30 日",
      en: "January 30, 2009",
      ja: "2009年1月30日",
    },
    age: 20,
    height: 162,
    weight: 45,
    softwareNote: {
      "zh-CN": "角色设定：20 岁，粉色为代表色。歌声合成软件支持日语与英语。",
      en: "Character profile: 20 years old, with pink as her representative color. The software supports Japanese and English vocals.",
      ja: "キャラクター設定：20歳。イメージカラーはピンク。ソフトウェアは日本語と英語に対応しています。",
    },
    portrait: { src: "/portraits/megurine-luka.png", credit: "Art by KEI" },
  },
  {
    id: "meiko",
    themeId: "meiko",
    names: {
      "zh-CN": "MEIKO",
      en: "MEIKO",
      ja: "MEIKO",
    },
    romanizedName: "MEIKO",
    category: {
      "zh-CN": "虚拟歌手",
      en: "Virtual Singer",
      ja: "バーチャルシンガー",
    },
    introduction: {
      "zh-CN": "以栗色短发和红色服装为标志的女性虚拟歌手。",
      en: "A female virtual singer known for her chestnut bob and red outfit.",
      ja: "栗色のボブヘアと赤い衣装が印象的な女性バーチャルシンガー。",
    },
    biography: {
      "zh-CN":
        "MEIKO 是一位女性虚拟歌手，形象以栗色短发、红色上衣与迷你裙为特征。她的歌声合成软件于 2004 年 11 月 5 日发布，是日本语歌声合成软件发展早期的重要作品，也开创了在软件包装上加入角色形象的做法。",
      en:
        "MEIKO is a female virtual singer characterized by her chestnut-colored bob, red crop top, and miniskirt. Her singing synthesis software was released on November 5, 2004. It was an important early Japanese singing synthesis product and helped establish the practice of featuring a character illustration on the software package.",
      ja:
        "MEIKOは、栗色のボブヘア、赤いトップスとミニスカートが特徴の女性バーチャルシンガーです。歌声合成ソフトウェアは2004年11月5日に発売され、日本語歌声合成ソフトウェアの初期を代表する作品の一つです。また、パッケージにキャラクターイラストを採用したことでも知られています。",
    },
    voiceSource: "拝郷メイコ",
    voiceSourceRomanized: "Haigō Meiko",
    voiceSourceType: {
      "zh-CN": "歌手",
      en: "Singer",
      ja: "歌手",
    },
    releaseDate: {
      "zh-CN": "2004 年 11 月 5 日",
      en: "November 5, 2004",
      ja: "2004年11月5日",
    },
    softwareNote: {
      "zh-CN": "红色为代表色。原始资料未提供年龄、身高与体重设定。",
      en: "Red is her representative color. No age, height, or weight profile was provided.",
      ja: "イメージカラーは赤。年齢・身長・体重の設定資料は提供されていません。",
    },
    portrait: { src: "/portraits/meiko.png", credit: "Art by iXima" },
  },
  {
    id: "kaito",
    themeId: "kaito",
    names: {
      "zh-CN": "KAITO",
      en: "KAITO",
      ja: "KAITO",
    },
    romanizedName: "KAITO",
    category: {
      "zh-CN": "虚拟歌手",
      en: "Virtual Singer",
      ja: "バーチャルシンガー",
    },
    introduction: {
      "zh-CN": "以深蓝色头发和蓝色长围巾为标志的男性虚拟歌手。",
      en: "A male virtual singer recognized by his dark-blue hair and long blue scarf.",
      ja: "濃い青色の髪と青いロングマフラーが特徴の男性バーチャルシンガー。",
    },
    biography: {
      "zh-CN":
        "KAITO 是一位男性虚拟歌手，形象特征是略微翘起的深蓝色头发与蓝色长围巾。他的歌声合成软件于 2006 年 2 月 17 日发布，是日本男性歌声合成软件发展早期的代表作品。",
      en:
        "KAITO is a male virtual singer known for his slightly flipped dark-blue hair and long blue scarf. His singing synthesis software was released on February 17, 2006, and is an early landmark in Japanese male singing synthesis software.",
      ja:
        "KAITOは、少し跳ねた濃い青色の髪と青いロングマフラーが特徴の男性バーチャルシンガーです。歌声合成ソフトウェアは2006年2月17日に発売され、日本語男性歌声合成ソフトウェアの初期を代表する作品です。",
    },
    voiceSource: "風雅なおと",
    voiceSourceRomanized: "Fūga Naoto",
    voiceSourceType: {
      "zh-CN": "歌手",
      en: "Singer",
      ja: "歌手",
    },
    releaseDate: {
      "zh-CN": "2006 年 2 月 17 日",
      en: "February 17, 2006",
      ja: "2006年2月17日",
    },
    softwareNote: {
      "zh-CN": "蓝色为代表色。原始资料未提供年龄、身高与体重设定。",
      en: "Blue is his representative color. No age, height, or weight profile was provided.",
      ja: "イメージカラーは青。年齢・身長・体重の設定資料は提供されていません。",
    },
    portrait: { src: "/portraits/kaito.png", credit: "Art by iXima" },
  },
];

export function getSingerById(id: string) {
  return singers.find((singer) => singer.id === id);
}

export function getSingerText<T extends LocalizedText>(
  value: T,
  locale: Locale,
) {
  return value[locale];
}