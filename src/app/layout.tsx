import "./globals.css";
import { Inter } from "next/font/google";
import Hero from "@/components/Hero";
import Header from "@/components/Header";
import AuthContext from "@/contexts/AuthContext";
import ToasterContext from "@/contexts/ToasterContext";
import Footer from "@/components/Footer";

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
      <head>
        <meta
          name="google-site-verification"
          content="s_IXTNruZUE8kOrlFuv2cssDorZTrMf-0htyZAoeZ0c"
        />
      </head>
      <body className={inter.className}>
        <AuthContext>
          <ToasterContext />
          <div className="bg-[url(/bg.png)] bg-fixed bg-center px-6 min-h-screen overflow-hidden">
            <Header />
            <Hero />
          </div>
          {children}
          <Footer />
        </AuthContext>
      </body>
    </html>
  );
}
