"use client";

import React from "react";
import "./PlanSelector.css";

// --- Datos de los planes ---
const PLANES_DATA = [
    {
        id: "diario",
        title: "Pase Diario",
        price: "$2",
        period: "/ Día",
        features: [
            "Acceso a todas las instalaciones",
            "Asesoría Básica"
        ]
    },
    {
        id: "mensual",
        title: "Mensual",
        price: "$25",
        period: "/ mes",
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
        title: "Trimestral",
        badge: "Ahorra 20%",
        price: "$60",
        period: "/ 3 meses",
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
        title: "Semestral",
        badge: "Ahorra 30%",
        price: "$105",
        period: "/ 6 meses",
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
        title: "Anual",
        badge: "Ahorra 40%",
        price: "$180",
        period: "/ año",
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

const CheckIcon = () => (
    <svg className="feature-icon-chk" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 13L9 17L19 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

const IndicatorCheck = () => (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 13L9 17L19 7" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

/**
 * PlanSelector — Tarjetas de selección de membresía
 * 
 * Props:
 *   - selectedPlan (string): ID del plan actualmente seleccionado
 *   - onPlanChange (function): Callback para cambiar el plan seleccionado
 */
export default function PlanSelector({ selectedPlan, onPlanChange }) {
    return (
        <section className="plan-selector">
            <div className="plan-selector__inner">
                <h2 className="plan-selector__title">Elije tu membresía</h2>

                <div className="plan-selector__list">
                    {PLANES_DATA.map((plan) => {
                        const isActive = selectedPlan === plan.id;

                        return (
                            <div
                                key={plan.id}
                                className={`plan-card ${isActive ? "plan-card--active" : ""}`}
                                onClick={() => onPlanChange(plan.id)}
                            >
                                {/* Check de esquina */}
                                <div className="plan-card__check-indicator">
                                    <IndicatorCheck />
                                </div>

                                {/* Título */}
                                <h3 className="plan-card__name">{plan.title}</h3>

                                {/* Badge opcional */}
                                {plan.badge && (
                                    <span className="plan-card__badge">{plan.badge}</span>
                                )}

                                {/* Precio */}
                                <div className="plan-card__price-wrapper">
                                    <p className="plan-card__price">{plan.price}</p>
                                    <span className="plan-card__period">{plan.period}</span>
                                </div>

                                {/* Beneficios */}
                                <ul className="plan-card__features">
                                    {plan.features.map((feat, idx) => (
                                        <li key={idx} className="plan-card__feature">
                                            <CheckIcon />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
