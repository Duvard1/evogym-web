"use client";

import Image from "next/image";
import "./Membresias.css";

/* -- Datos de Membresías -- */
const MEMBRESIAS_DATA = [
    {
        id: "diario",
        title: "Pase Diario",
        price: "$2",
        subprice: "",
        image: "/images/membresias/membresia-1.webp",
        features: [
            "Acceso a todas las instalaciones",
            "Asesoría Básica"
        ]
    },
    {
        id: "mensual",
        title: "Membresía Mensual",
        price: "$25",
        subprice: "",
        image: "/images/membresias/membresia-2.webp",
        features: [
            "Acceso a todas las instalaciones",
            "Acceso a todas las clases",
            "Evaluación física",
            "Asesoría nutricional",
            "Seguimiento y Acompañamiento"
        ]
    },
    {
        id: "trimestral",
        title: "Membresía Trimestral",
        price: "$60",
        subprice: "$20/Mes",
        image: "/images/membresias/membresia-3.webp",
        features: [
            "Acceso a todas las instalaciones",
            "Acceso a todas las clases",
            "Evaluación física",
            "Programa de entrenamiento",
            "Asesoría nutricional",
            "Cardio HIIT y LISS",
            "1 invitado gratis"
        ]
    },
    {
        id: "semestral",
        title: "Membresía Semestral",
        price: "$105",
        subprice: "$17.50/Mes",
        image: "/images/membresias/membresia-4.webp",
        features: [
            "Acceso a todas las instalaciones",
            "Acceso a todas las clases",
            "Evaluación física",
            "Programa de entrenamiento",
            "Asesoría nutricional",
            "Cardio HIIT y LISS",
            "Medición de músculo y grasa",
            "1 invitado gratis al mes"
        ]
    },
    {
        id: "anual",
        title: "Membresía Anual",
        price: "$180",
        subprice: "$15/Mes",
        image: "/images/membresias/membresia-5.webp",
        features: [
            "Acceso a todas las instalaciones",
            "Acceso a todas las clases",
            "Evaluación física",
            "Programa de entrenamiento",
            "Asesoría nutricional",
            "Cardio HIIT y LISS",
            "Medición de bioimpedancia y músculo",
            "1 invitado gratis al mes"
        ]
    }
];

/* -- Datos de Promociones -- */
const PROMOCIONES_DATA = [
    {
        id: "promo1",
        image: "/images/membresias/promo-1.webp",
        link: "#inscribirme"
    },
    {
        id: "promo2",
        image: "/images/membresias/promo-2.webp",
        link: "#inscribirme"
    }
];

// Icono de validación (Visto) para las listas
const CheckIcon = () => (
    <svg className="feature-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 13L9 17L19 7" stroke="#333333" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function Membresias() {
    return (
        <section id="membresias" className="memberships">

            {/* ── Fondo Principal ── 
                Ruta recomendada: public/images/membresias/bg-membresias.webp
            */}
            <div className="memberships__bg-wrapper">
                <Image
                    src="/images/membresias/bg-membresias.webp"
                    alt="Interior oscuro de EvoGym de fondo"
                    fill
                    className="memberships__bg-img"
                    quality={70}
                />
                {/* Overlay oscuro gradiente circular */}
                <div className="memberships__overlay" aria-hidden="true" />
            </div>

            <div className="memberships__inner">
                {/* ── Encabezado ── */}
                <div className="memberships__header">
                    <h2 className="memberships__title">Membresías</h2>
                    <p className="memberships__description">
                        Elige el plan que mejor se adapte a tu estilo de vida. Con acceso completo a
                        nuestras instalaciones y los mejores beneficios. Pregunta por nuestras promociones en recepción.
                    </p>
                </div>

                {/* ── Tarjetas de Membresía ── */}
                <div className="memberships__list">
                    {MEMBRESIAS_DATA.map((plan) => (
                        <article key={plan.id} className="membership-card">

                            {/* Parte Superior: Imagen, Precio y Botón */}
                            <div className="membership-card__top">
                                <Image
                                    src={plan.image}
                                    alt={`Imagen del plan ${plan.title}`}
                                    fill
                                    className="membership-card__img"
                                    sizes="(max-width: 768px) 100vw, 340px"
                                />
                                <div className="membership-card__top-overlay" />

                                <div className="membership-card__info">
                                    <h3 className="membership-card__name">{plan.title}</h3>
                                    <div className="membership-card__price-wrapper">
                                        <p className="membership-card__price">{plan.price}</p>
                                        {plan.subprice && (
                                            <span className="membership-card__subprice">{plan.subprice}</span>
                                        )}
                                    </div>
                                </div>

                                <a href="#inscribirme" className="membership-card__btn-top">
                                    Inscríbete
                                </a>
                            </div>

                            {/* Parte Inferior: Beneficios Blancos */}
                            <div className="membership-card__bottom">
                                <h4 className="membership-card__subtitle">Qué incluye</h4>
                                <ul className="membership-card__features">
                                    {plan.features.map((feat, index) => (
                                        <li key={index} className="membership-card__feature">
                                            <CheckIcon />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </div>

                {/* ── Promociones y Eventos ── */}
                <div className="promotions">
                    <h2 className="promotions__title">Promociones y Eventos</h2>

                    <div className="promotions__list">
                        {PROMOCIONES_DATA.map((promo) => (
                            <div key={promo.id} className="promotions__item">
                                {/* Flyer/Banner Promo */}
                                <div className="promotions__img-wrapper">
                                    <Image
                                        src={promo.image}
                                        alt="Promoción especial EvoGym"
                                        fill
                                        sizes="(max-width: 768px) 100vw, 500px"
                                        className="promotions__img"
                                    />
                                </div>
                                <a href={promo.link} className="promotions__btn">
                                    Inscríbete
                                </a>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
