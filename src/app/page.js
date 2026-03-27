import Hero from "@/components/home/Hero";
import Presentacion from "@/components/home/Presentacion";
import Servicios from "@/components/home/Servicios";
import Instalaciones from "@/components/home/Instalaciones";
import Membresias from "@/components/home/Membresias";
import VentaSuplementos from "@/components/home/VentaSuplementos";
import Suplementos from "@/components/home/Suplementos";
import ScrollAnimation from "@/components/layout/ScrollAnimation";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "HealthAndBeautyBusiness",
    "name": "Evo Gym",
    "image": "https://evogym.com.ec/images/hero/og-image.jpg",
    "url": "https://evogym.com.ec",
    "telephone": "+593984605235",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Panamericana Sur, Barrio La Cruz",
      "addressLocality": "Tambillo",
      "addressRegion": "Pichincha",
      "addressCountry": "EC"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -0.405068,
      "longitude": -78.546053
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "06:20",
        "closes": "21:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "08:00",
        "closes": "12:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/p/Evogym-61558127704452/",
      "https://www.instagram.com/evogym8",
      "https://www.tiktok.com/@evogym25"
    ]
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <ScrollAnimation>
        <Presentacion />
      </ScrollAnimation>
      <ScrollAnimation>
        <Servicios />
      </ScrollAnimation>
      <ScrollAnimation>
        <Instalaciones />
      </ScrollAnimation>
      <ScrollAnimation>
        <Membresias />
      </ScrollAnimation>
      <ScrollAnimation>
        <VentaSuplementos />
      </ScrollAnimation>
      <ScrollAnimation>
        <Suplementos />
      </ScrollAnimation>
    </main>
  );
}
