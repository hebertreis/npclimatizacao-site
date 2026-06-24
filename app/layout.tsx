import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NP Climatização | Instalação e Manutenção de Ar Condicionado em SP",
  description:
    "Especialistas em instalação, manutenção e projetos de ar condicionado em São Paulo. Marcas: Daikin, LG, Samsung, Fujitsu. Solicite um orçamento gratuito.",
  keywords:
    "ar condicionado São Paulo, instalação ar condicionado, manutenção ar condicionado, Daikin, LG, Samsung, Fujitsu, Tatuapé",
  openGraph: {
    title: "NP Climatização | Ar Condicionado em SP",
    description:
      "Especialistas em climatização em São Paulo. 15+ anos de experiência. Solicite orçamento gratuito.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
