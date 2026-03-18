import type { Metadata } from "next";
import { Pathway_Extreme } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const pathwayExtreme = Pathway_Extreme({
  variable: "--font-pathway",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GrøntTak",
  description: "Gjør taket grønt med oss",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="no">
      <body className={`${pathwayExtreme.variable} antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}