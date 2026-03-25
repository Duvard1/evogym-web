"use client";

import Image from "next/image";
import "./Presentacion.css";

export default function Presentacion() {
    return (
        <section id="nosotros" className="presentation">
            <div className="presentation__inner">

                <div className="presentation__top-image-wrapper">
                    <Image
                        src="/images/presentacion/presentacion-1.webp"
                        alt="Instalaciones panorámicas de EvoGym"
                        width={900}
                        height={450}
                        className="presentation__top-image"
                        quality={90}
                    />
                </div>

                {/* ── CONTENIDO DE TEXTO ── */}
                <div className="presentation__content">
                    <h2 className="presentation__title">¿Por que EVO GYM?</h2>
                    <p className="presentation__description">
                        Somos un gimnasio en Tambillo comprometido con tu bienestar real. No buscamos que te veas
                        diferente por un mes: queremos que evoluciones de forma integral: cuerpo, fuerza y salud. con
                        el apoyo de entrenadores comprometidos y equipamiento de primer nivel.
                    </p>
                </div>

                {/* ── IMÁGENES INFERIORES (2 COLUMNAS) ── */}
                <div className="presentation__bottom-images">

                    <div className="presentation__bottom-image-wrapper">
                        <Image
                            src="/images/presentacion/presentacion-2.webp"
                            alt="Entrenadores EvoGym"
                            width={450}
                            height={300}
                            className="presentation__bottom-image"
                            quality={85}
                        />
                    </div>

                    <div className="presentation__bottom-image-wrapper">
                        <Image
                            src="/images/presentacion/presentacion-3.webp"
                            alt="Área de zona de pesas y césped EvoGym"
                            width={450}
                            height={300}
                            className="presentation__bottom-image"
                            quality={85}
                        />
                    </div>
                </div>

            </div>
        </section>
    );
}