import { Montserrat, Red_Rose } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";



const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const redRose = Red_Rose({
  variable: "--font-red-rose",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});
export const metadata = {
  metadataBase: new URL('https://evogym.com.ec'),
  title: {
    default: 'EVO GYM — Se parte de la evolución',
    template: '%s | EVO GYM',
  },
  description: 'Entrena en EVO GYM, el gimnasio más completo de Tambillo. Membresías desde $25. Zona de pesas, cardio, pilates, suplementos y más. ¡Sé parte de la evolución!',
  keywords: [
    'gimnasio',
    'gym tambillo ecuador',
    'membresía gimnasio tambillo',
    'entrenamiento tambillo',
    'evo gym',
    'gimnasio tambillo',
    'suplementos tambillo',
  ],

  authors: [{ name: 'EVO GYM' }],
  creator: 'EVO GYM',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: 'website',
    locale: 'es_EC',
    url: 'https://evogym.com.ec',
    siteName: 'EVO GYM',
    title: 'EVO GYM — Se parte de la evolución',
    description: 'Membresías desde $25. Zona de pesas, cardio, pilates y suplementos en Tambillo, Ecuador.',
    images: [
      {
        url: '/images/hero/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'EVO GYM — Gimnasio en Tambillo Ecuador',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'EVO GYM — Se parte de la evolución',
    description: 'Membresías desde $25. Zona de pesas, cardio, pilates y suplementos en Tambillo, Ecuador.',
    images: ['/images/hero/og-image.jpg'],
  },
  other: {
    'geo.region': 'EC-P',
    'geo.placename': 'Tambillo',
    'geo.position': '-0.405128;-78.54606',
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${redRose.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
