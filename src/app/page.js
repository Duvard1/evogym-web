import Hero from "@/components/home/Hero";
import Presentacion from "@/components/home/Presentacion";
import Servicios from "@/components/home/Servicios";
import Instalaciones from "@/components/home/Instalaciones";
import Membresias from "@/components/home/Membresias";

export default function Home() {
  return (
    <main>
      <Hero />
      <Presentacion />
      <Servicios />
      <Instalaciones />
      <Membresias />
    </main>
  );
}
