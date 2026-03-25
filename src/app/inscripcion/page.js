import { Suspense } from "react";
import Presentacion from "@/components/inscripcion/Presentacion";
import InscripcionClient from "@/components/inscripcion/InscripcionClient";

export const metadata = {
    title: "Inscripción a Membresía | EvoGym",
    description: "Completa el formulario para activar tu membresía en EvoGym.",
};

export default function InscripcionPage() {
    return (
        <main>
            <Presentacion />

            {/* Suspense necesario porque InscripcionClient usa useSearchParams() */}
            <Suspense fallback={<div style={{ textAlign: "center", color: "#60DB00", padding: "2rem" }}>Cargando...</div>}>
                <InscripcionClient />
            </Suspense>
        </main>
    );
}
