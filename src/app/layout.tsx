import type { Metadata } from "next";

import "./globals.css";

import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";
import { AuthProvider } from "@/lib/auth-context";

export const metadata: Metadata = {
  title: "Elevate | Premium Technology Goods",
  description:
    "A cinematic premium ecommerce experience for modern technology, workspace, audio, travel, and photography essentials.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <div className="noise" aria-hidden="true" />
          <Navbar />
          <main>{children}</main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
