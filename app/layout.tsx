import type { Metadata } from "next";
import { Inter, Barlow_Condensed } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NP Climatização | Instalação e Manutenção de Ar Condicionado em SP",
  description:
    "Especialistas em instalação, manutenção e projetos de ar condicionado em São Paulo — Cidade Mãe do Céu, Tatuapé e Grande SP. Daikin, LG, Samsung, Fujitsu. Visita técnica gratuita.",
  keywords:
    "ar condicionado São Paulo, instalação ar condicionado, Cidade Mãe do Céu, manutenção ar condicionado, Daikin, LG, Samsung, Fujitsu, VRF, cassete, split, NP Climatização",
  openGraph: {
    title: "NP Climatização | Ar Condicionado em SP",
    description:
      "Especialistas em climatização em São Paulo. 15+ anos de experiência. Visita técnica gratuita.",
    locale: "pt_BR",
    type: "website",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "NP Climatização",
  description:
    "Instalação, manutenção preventiva, manutenção corretiva e projetos de ar condicionado em São Paulo.",
  address: {
    "@type": "PostalAddress",
    streetAddress: "R. Demétrio Ribeiro, 572",
    addressLocality: "São Paulo",
    addressRegion: "SP",
    postalCode: "03332-000",
    addressCountry: "BR",
  },
  telephone: "+551123891033",
  email: "sac@npclimatizacao.com.br",
  priceRange: "$$",
  openingHours: "Mo-Fr 08:15-18:00",
  areaServed: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: -23.5505,
      longitude: -46.6333,
    },
    geoRadius: "50000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${inter.variable} ${barlowCondensed.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(localBusinessSchema),
          }}
        />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
