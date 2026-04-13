import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LoadingBar from "@/components/LoadingBar";
import { Pathway_Extreme } from "next/font/google";

export const pathwayExtreme = Pathway_Extreme({
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
      <body className={`min-h-screen flex flex-col ${pathwayExtreme.variable} antialiased`}>
        <LoadingBar />
        <Navbar />
        <main className="flex-1">
          {children}
        </main>
         <Footer />
      </body>
    </html>
  );
}