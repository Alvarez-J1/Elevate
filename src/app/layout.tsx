import type { Metadata } from "next";

import "./globals.css";

import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";

export const metadata: Metadata = {
  title: "Elevate | Premium Technology Goods",
  description:
    "A cinematic premium ecommerce experience for modern technology, workspace, audio, travel, and photography essentials."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="noise" aria-hidden="true" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
