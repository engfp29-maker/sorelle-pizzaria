import type { Metadata, Viewport } from "next";
import { Poppins, Cinzel_Decorative } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import WhatsAppFloat from "@/components/WhatsAppFloat";
import { CartProvider } from "@/context/CartContext";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
  variable: "--font-logo",
});

const siteUrl = "https://sorelle-pizzaria.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Pizzaria Sorelle - A melhor pizza da região",
    template: "%s | Pizzaria Sorelle",
  },
  description:
    "Tradição italiana desde 1998. Massas artesanais, ingredientes selecionados e o verdadeiro sabor da Itália. Faça seu pedido pelo WhatsApp!",
  keywords: [
    "pizzaria",
    "pizza",
    "pizza artesanal",
    "delivery de pizza",
    "Pizzaria Sorelle",
    "Belém",
    "Ananindeua",
  ],
  openGraph: {
    title: "Pizzaria Sorelle - A melhor pizza da região",
    description:
      "Tradição italiana desde 1998. Massas artesanais, ingredientes selecionados e o verdadeiro sabor da Itália.",
    url: siteUrl,
    siteName: "Pizzaria Sorelle",
    images: [{ url: "/logo.jpeg", width: 800, height: 800, alt: "Pizzaria Sorelle" }],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pizzaria Sorelle - A melhor pizza da região",
    description:
      "Tradição italiana desde 1998. Faça seu pedido pelo WhatsApp!",
    images: ["/logo.jpeg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#dc2626",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${poppins.variable} ${cinzel.variable} scroll-smooth`}
    >
      <body className="font-sans antialiased">
        <CartProvider>
          {children}
          <WhatsAppFloat />
        </CartProvider>
      </body>
    </html>
  );
}
