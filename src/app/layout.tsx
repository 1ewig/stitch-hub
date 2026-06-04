import type { Metadata } from "next";
import SupabaseProvider from "@/providers/SupabaseProvider";
import Navbar from "@/components/Navbar";
import CartDrawerWrapper from "../components/CartDrawerWrapper";
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
      <body className="bg-black text-white antialiased">
        {/* SupabaseProvider broadcasts user authentication states down the entire application tree */}
        <SupabaseProvider>
          {/* Universal Dark-Luxury Header Controller */}
          <Navbar />
          
          <main>{children}</main>
          
          {/* Your friend's sliding cart system element */}
          <CartDrawerWrapper />
        </SupabaseProvider>
      </body>
    </html>
  );
}