import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "StitchHub - Bulk Apparel Manufacturing & Sourcing",
  description: "A premium operational command center and sourcing platform for high-volume custom garment runs.",
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
