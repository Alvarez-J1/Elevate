import type { Metadata } from "next"; //Metadata is a type that describes the metadata for a page.

import "./globals.css";

import { Footer } from "../components/layout/footer";
import { Navbar } from "../components/layout/navbar";

export const metadata: Metadata = {
  title: "Elevate | Premium Technology Goods",
  description:
    "A cinematic premium ecommerce experience for modern technology, workspace, audio, travel, and photography essentials."
};
//RootLayout is a function that renders the layout for the app.
// children: React.ReactNode;
// means:
// “This layout accepts React content/components inside it.”
// Readonly<{ children: React.ReactNode }>
// means:
// “The props object shouldn’t be mutated.”

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      {/* //noise is a class that adds a noise effect to the background. */}
        <div className="noise" aria-hidden="true" /> 
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}

