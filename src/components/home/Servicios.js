"use client";

import Image from "next/image";
import "./Servicios.css";

/* Estructura de datos para mapear los componentes y mantener el código limpio */
const SERVICIOS_DATA = [
    {
        id: "medidas",
        name: "Toma de medidas",
        imagePath: "/images/servicios/servicio-1.webp",
        tipo: "col3" // Ocupará 1/3 de la fila superior
    },
    {
        id: "cardio",
        name: "Cardio",
        imagePath: "/images/servicios/servicio-2.webp",
        tipo: "col3"
    },
    {
        id: "cycling",
        name: "Cycling",
        imagePath: "/images/servicios/servicio-3.webp",
        tipo: "col3"
    },
    {
        id: "nutricion",
        name: "Asesoría nutricional",
        imagePath: "/images/servicios/servicio-4.webp",
        tipo: "col2" /* Ocupará 1/2 de la fila inferior (es más ancha) */
    },
    {
        id: "pilates",
        name: "Pilates",
        imagePath: "/images/servicios/servicio-5.webp",
        tipo: "col2"
    }
];

export default function Servicios() {
    return (
        <section id="servicios" className="services">
            <div className="services__inner">

                <h2 className="services__title">Servicios</h2>

                <div className="services__grid">
                    {SERVICIOS_DATA.map((servicio) => (
                        <div
                            key={servicio.id}
                            className={`service-card service-card--${servicio.tipo}`}
                        >
                            <Image
                                src={servicio.imagePath}
                                alt={`Servicio de ${servicio.name} en EvoGym`}
                                fill
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                className="service-card__img"
                            />
                            {/* Gradiente oscuro inferior para que las letras blancas resalten */}
                            <div className="service-card__overlay" aria-hidden="true"></div>
                            <h3 className="service-card__name">{servicio.name}</h3>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
