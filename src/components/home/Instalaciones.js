"use client";

import Image from "next/image";
import "./Instalaciones.css";

const INSTALACIONES_DATA = [
    {
        id: "pesas",
        title: "Zona de Levantamiento de Pesas y Máquinas",
        description: "Área principal equipada con máquinas articuladas y de poleas de última generación. Perfecta para el entrenamiento de fuerza guiado y trabajo muscular seguro enfocado en hipertrofia y tonificación.",
        imagePath: "/images/instalaciones/instalacion-1.webp",
        reversed: false
    },
    {
        id: "mancuernas",
        title: "Zona de Mancuernas y Peso Libre",
        description: "Espacio dedicado a los pesos libres, equipado con mancuernas de todos los kilajes, racks de sentadillas, barras olímpicas y bancos ajustables. Ideal para atletas que buscan libertad de movimiento y fuerza.",
        imagePath: "/images/instalaciones/instalacion-2.webp",
        reversed: true // TRUE = Texto izquierda, Foto derecha en Desktop
    },
    {
        id: "cardio",
        title: "Zona de Cardio",
        description: "Potencia tu resistencia cardiovascular. Esta zona está equipada con caminadoras y bicicletas estáticas, ideal para el calentamiento o quema intensiva de calorías.",
        imagePath: "/images/instalaciones/instalacion-3.webp",
        reversed: false
    },
    {
        id: "pilates",
        title: "Zona de Pilates",
        description: "Un espacio libre con césped sintético, pensado para Pilates, yoga y entrenamiento funcional. Equipado con colchonetas, pelotas y bandas, permite realizar pilates, ejercicios con balones, flexiones y circuitos de alta intensidad, ofreciendo una zona tranquila y versátil.",
        imagePath: "/images/instalaciones/instalacion-4.webp",
        reversed: true
    },
    {
        /* Hay 5 elementos en el diseño de la imagen, aunque mencionaste 4. 
           He integrado el 5to para que el diseño quede idéntico al adjunto. */
        id: "suplementos",
        title: "Venta de suplementos",
        description: "En Evo Gym también encontrarás suplementos de alta calidad dentro del gimnasio. Ofrecemos proteínas, pre-entrenos, creatina y más, con asesoría nutricional gratuita para que elijas el producto que mejor se adapte a tus objetivos y maximices tus resultados.",
        imagePath: "/images/instalaciones/instalacion-5.webp",
        reversed: false,
        button: {
            text: "Más Información",
            href: "#suplementos"
        }
    }
];

export default function Instalaciones() {
    return (
        <section id="instalaciones" className="facilities">
            <h2 className="facilities__title">Instalaciones</h2>

            <div className="facilities__inner">
                {INSTALACIONES_DATA.map((item) => (
                    <div
                        key={item.id}
                        /* Si `reversed` es true, aplicamos la clase que invierte el orden del flex-box en desktop */
                        className={`facility-row ${item.reversed ? "facility-row--reversed" : ""}`}
                    >
                        {/* IMAGEN: Siempre primero en el DOM para que en móvil quede arriba automáticamente */}
                        <div className="facility-row__img-wrapper">
                            <Image
                                src={item.imagePath}
                                alt={item.title}
                                fill
                                sizes="(max-width: 768px) 100vw, 50vw"
                                className="facility-row__img"
                                quality={85}
                            />
                        </div>

                        {/* TEXTO */}
                        <div className="facility-row__content">
                            <h3 className="facility-row__title">{item.title}</h3>
                            <p className="facility-row__description">{item.description}</p>

                            {/* Botón condicional solo si existe en la data */}
                            {item.button && (
                                <a href={item.button.href} className="facility-row__btn">
                                    {item.button.text}
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
