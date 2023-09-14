import "./globals.css";
import { Inter } from "next/font/google";
import Hero from "@/components/Hero";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "F1 Companion",
  description: "Acompanhe resultados da Fórmula 1 de forma simplificada.",
  alternates: {
    canonical: "https://f1-companion-lake.vercel.app/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={inter.className}>
        <div className="bg-[url(/bg.jpg)] bg-fixed bg-center px-6">
          <Header />
          <Hero />
        </div>
        {children}
      </body>
    </html>
  );
}
