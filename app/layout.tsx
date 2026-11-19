
import type { Metadata } from "next";

import "./globals.css";
import { ThemeProvider } from "./components/theme-provider";

const siteName = "GCGS Vocaloid Club";

const siteDescription =
  "Explore Vocaloid music, virtual singers, music producers, music theory, and the world of singing synthesis with GCGS Vocaloid Club.";

export const metadata: Metadata = {
  applicationName: siteName,

  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },

  description: siteDescription,

  keywords: [
    "GCGS Vocaloid Club",
    "Vocaloid",
    "Virtual Singers",
    "Hatsune Miku",
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
      <body className="flex min-h-full flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
