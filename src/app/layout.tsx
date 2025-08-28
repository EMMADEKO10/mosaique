import type { Metadata } from "next";
import "./globals.css";

// Using system fonts to avoid network fetch during build

export const metadata: Metadata = {
  title: "La Grande Mosaïque - Plateforme Culturelle Congolaise",
  description: "Découvrez et célébrez la richesse culturelle du Congo à travers les arts, la musique, les événements et les talents locaux. Votez pour vos artistes favoris et participez à la Grande Mosaïque.",
  keywords: ["Congo", "culture", "arts", "musique", "événements", "artistes", "mosaïque", "talents"],
  authors: [{ name: "La Grande Mosaïque" }],
  creator: "La Grande Mosaïque",
  publisher: "La Grande Mosaïque",
  openGraph: {
    title: "La Grande Mosaïque - Plateforme Culturelle Congolaise",
    description: "Découvrez et célébrez la richesse culturelle du Congo",
    url: "https://lagrandemosaique.com",
    siteName: "La Grande Mosaïque",
    locale: "fr_FR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "La Grande Mosaïque - Plateforme Culturelle Congolaise",
    description: "Découvrez et célébrez la richesse culturelle du Congo",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`antialiased bg-neutral-50 text-neutral-900`}
      >
        {children}
      </body>
    </html>
  );
}
