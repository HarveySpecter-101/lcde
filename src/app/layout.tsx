import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";
import { ThemeProvider } from "@/components/site/theme-provider";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://leclubdesexperts1.com"),
  title: "Le Club Des Experts (LCDE) — Formation Audit, Finance & Fiscalité à Casablanca",
  description:
    "Formation 100 % pratique en Audit, Finance, Fiscalité et Comptabilité à Casablanca. 10 modules en 12 mois, animés par des experts-comptables OEC et des seniors de l'audit. Opérationnel dès le premier jour.",
  keywords: [
    "formation audit Casablanca",
    "formation finance Maroc",
    "fiscalité marocaine",
    "expert-comptable OEC",
    "IFRS Maroc",
    "due diligence",
    "M&A Casablanca",
    "Le Club Des Experts",
    "LCDE",
    "formation comptabilité Casablanca",
  ],
  authors: [{ name: "Le Club Des Experts" }],
  creator: "Le Club Des Experts",
  icons: {
    icon: [
      { url: "/logo-lcde.png", type: "image/png" },
      { url: "/logo.svg", type: "image/svg+xml" },
    ],
    apple: "/logo-lcde.png",
  },
  openGraph: {
    title: "Le Club Des Experts (LCDE) — Créons les experts de demain",
    description:
      "La formation 100 % pratique en Audit, Finance, Fiscalité et Comptabilité. Opérationnel dès le premier jour.",
    siteName: "Le Club Des Experts",
    type: "website",
    locale: "fr_FR",
    images: [
      {
        url: "/og/og-image.png",
        width: 1344,
        height: 768,
        alt: "Le Club Des Experts — Formation Audit, Finance & Fiscalité à Casablanca",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Le Club Des Experts (LCDE)",
    description:
      "Formation 100 % pratique en Audit, Finance, Fiscalité et Comptabilité à Casablanca.",
    images: ["/og/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={`${fraunces.variable} ${inter.variable} font-sans antialiased text-foreground`}
      >
        <ThemeProvider attribute="class" defaultTheme="light" disableTransitionOnChange>
          {children}
          <SonnerToaster position="top-center" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  );
}
