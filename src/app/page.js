import Hero from "@/components/home/Hero";
import Presentacion from "@/components/home/Presentacion";
import Servicios from "@/components/home/Servicios";
import Instalaciones from "@/components/home/Instalaciones";
import Membresias from "@/components/home/Membresias";
import VentaSuplementos from "@/components/home/VentaSuplementos";
import Suplementos from "@/components/home/Suplementos";

export default function Home() {
  return (
    <main>
      <Hero />
      <Presentacion />
      <Servicios />
      <Instalaciones />
      <Membresias />
      <VentaSuplementos />
      <Suplementos />
    </main>
  );
}
