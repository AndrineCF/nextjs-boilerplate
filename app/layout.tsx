import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {pathwayExtreme} from "@/components/ui/fonts";


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
         <Footer />
      </body>
    </html>
  );
}