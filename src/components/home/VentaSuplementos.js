"use client";

import Image from "next/image";
import "./VentaSuplementos.css";

export default function VentaSuplementos() {
    return (
        <section id="suplementos" className="supplements">


            <div className="supplements__bg-wrapper">
                <Image
                    src="/images/suplementos/bg-suplementos.webp"
                    alt="Tienda de suplementos y recepción en EvoGym"
                    fill
                    className="supplements__bg-img"
                    quality={80}
                />
            </div>

            {/* Overlay para darle contraste al texto */}
            <div className="supplements__overlay" aria-hidden="true" />

            {/* ── Contenido Principal ── */}
            <div className="supplements__inner">
                <div className="supplements__content">

                    {/* Logotipo en caja verde semitransparente */}
                    <div className="supplements__logo-box">
                        <Image
                            src="/images/logo/evogym-logo.webp"
                            alt="EvoGym Logo"
                            width={120}
                            height={24}
                            className="supplements__logo-img"
                        />
                    </div>

                    <h2 className="supplements__title">
                        Venta de Suplementos
                    </h2>

                    <p className="supplements__description">
                        Ofrecemos suplementos deportivos de alta calidad y, además, brindamos asesoría y
                        guía personalizada gratuita para cada compra, ayudándote a elegir el producto ideal
                        según tus objetivos (ganancia muscular, pérdida de grasa, energía o recuperación).
                    </p>

                    <a href="#catalogo-suplementos" className="supplements__btn">
                        Conoce más
                    </a>

                </div>
            </div>

        </section>
    );
}
