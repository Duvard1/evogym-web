"use client";

import Image from "next/image";
import "./Hero.css";

export default function Hero() {
    return (
        <section id="inicio" className="hero">


            <img
                src="/images/hero/hero-bg.webp"
                alt="Interior del gimnasio EvoGym"
                className="hero__bg"
                draggable="false"
            />

            <div className="hero__overlay" aria-hidden="true" />

            <div className="hero__content">


                <div className="hero__logo">
                    <Image
                        src="/images/hero/hero-logo.webp"
                        alt="EvoGym"
                        width={220}
                        height={60}
                        className="hero__logo-img"
                        priority
                    />
                </div>

                {/* Título principal */}
                <h1 className="hero__title">
                    Sé parte de<br />la evolución
                </h1>

                {/* Subtítulo */}
                <p className="hero__subtitle">
                    Gimnasio en Tambillo con entrenamiento personalizado, cardio
                    HIIT y asesoría nutricional para que alcances tus metas reales.
                </p>

                {/* Botones de acción */}
                <div className="hero__actions">
                    <a
                        href="#membresias"
                        className="hero__btn hero__btn--primary"
                        id="hero-inscribete"
                    >
                        Inscríbete
                    </a>
                    <a
                        href="#ubicacion"
                        className="hero__btn hero__btn--secondary"
                        id="hero-visitanos"
                    >
                        Visítanos
                    </a>
                </div>

            </div>
        </section>
    );
}
