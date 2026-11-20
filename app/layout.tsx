
import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const siteName = "广东碧桂园学校 Vocaloid 社团";

const siteDescription =
  "探索 Vocaloid 音乐、虚拟歌手、音乐制作人、乐理知识与歌声合成的世界，了解广东碧桂园学校 Vocaloid 社团。";

export const metadata: Metadata = {
  metadataBase: new URL("https://gcgs-vocaloid-club.netlify.app"),

  verification: {
    google: "chk7MwvXw5Tq9TMb815TtPzbGQgFOdHP1a6_X5VQufk",
  },

  applicationName: siteName,

  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },

  description: siteDescription,

  keywords: [
    "广东碧桂园学校",
    "广东碧桂园学校 Vocaloid 社团",
    "GCGS Vocaloid Club",
    "Vocaloid",
    "虚拟歌手",
    "初音未来",
    "VOCALOID 音乐",
    "Music",
    "Music Theory",
    "Singing Synthesis",
  ],

  openGraph: {
    title: siteName,
    description: siteDescription,
    siteName,
    locale: "zh_CN",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: siteName,
    description: siteDescription,
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      data-theme="system"
      data-character-theme="default"
      suppressHydrationWarning
      className="h-full antialiased"
    >
      <body className="min-h-full">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
