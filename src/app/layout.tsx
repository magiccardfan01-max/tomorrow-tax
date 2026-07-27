import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TomorrowTax — Procrastination Penalty App",
  description:
    "Set goals, stake virtual money, and pay the price if you say \"I'll start tomorrow\". Loss aversion as a productivity tool. Inspired by a cool idea from Twitter.",
  keywords: ["procrastination", "productivity", "accountability", "stakes", "commitment"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0f] antialiased">{children}</body>
    </html>
  );
}
