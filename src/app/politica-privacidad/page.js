import React from "react";
import "./PoliticaPrivacidad.css";

export const metadata = {
    title: "Política de Privacidad | EvoGym",
    description: "Política de privacidad de EvoGym para la gestión de inscripciones.",
};

export default function PoliticaPrivacidadPage() {
    return (
        <main className="politica-page">
            <div className="politica-page__inner">
                <h1 className="politica-page__title">Política de Privacidad</h1>

                <div className="politica-page__content">
                    <p>
                        Los datos personales recopilados en este sitio (nombre, cédula, teléfono, etc.) son utilizados únicamente para la gestión de inscripciones y comunicación con el cliente.
                    </p>
                    <p>
                        La información no será compartida con terceros y será utilizada exclusivamente para fines administrativos del gimnasio.
                    </p>
                    <p>
                        El usuario acepta el uso de sus datos al completar el formulario de inscripción.
                    </p>
                    <p>
                        Para cualquier consulta sobre el uso de sus datos, puede comunicarse directamente con el gimnasio.
                    </p>
                </div>
            </div>
        </main>
    );
}
