import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kelechi Uba — HNG14 Backend Portfolio",
  description:
    "A focused, evidence-backed portfolio of Kelechi Uba's HNG14 backend work.",
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
