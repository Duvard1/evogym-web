"use client";

import React from 'react';
import './Presentacion.css';

/* Icono azul-grisáceo de "Info" como en la captura */
const InfoIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="24" height="24" rx="4" fill="#7D9DB4" />
        <path d="M12 11V16M12 8V8.01" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function Presentacion() {
    return (
        <section className="inscripcion-presentacion">
            <div className="inscripcion-presentacion__inner">
                
                {/* Título Principal */}
                <h2 className="inscripcion-presentacion__title">Inscripción de Membresía</h2>

                {/* Texto Superior */}
                <p className="inscripcion-presentacion__desc">
                    Completa el formulario para activar tu membresía. El pago se 
                    procesa de forma manual y segura.
                </p>

                {/* Caja de Alerta (Dark Mode / Verde oscuro) */}
                <div className="inscripcion-presentacion__alert">
                    <div className="alert-icon">
                        <InfoIcon />
                    </div>
                    <p className="alert-text">
                        <strong>Importante:</strong> Los datos solicitados son de la <strong>persona que usará el gimnasio</strong>, 
                        no necesariamente de quien realiza el pago. Si estás comprando para alguien más, 
                        ingresa los datos del beneficiario.
                    </p>
                </div>

            </div>
        </section>
    );
}
