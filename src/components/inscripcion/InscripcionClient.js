"use client";

/**
 * ═══════════════════════════════════════════════════════════════════
 * InscripcionClient — Wrapper Cliente
 * ═══════════════════════════════════════════════════════════════════
 *
 * Gestiona el estado compartido `selectedPlan` para que:
 *   1. PlanSelector pueda actualizar el plan seleccionado.
 *   2. FormDatos pueda leer el plan seleccionado al enviar.
 *   3. FormFechas pueda calcular la fecha de fin según el plan.
 *   4. (Futuro) FormPago pueda enviar todo junto al backend.
 *
 * Flujo completo del backend (futuro):
 *   page.js (Server Component — SEO metadata)
 *     └── InscripcionClient.js (Client Wrapper — estado compartido)
 *           ├── PlanSelector   ← selectedPlan + onPlanChange
 *           ├── FormDatos      ← selectedPlan
 *           ├── FormFechas     ← selectedPlan (calcula fin automático)
 *           └── FormPago       ← (futuro) botón "Confirmar" + envío
 *
 *   Al confirmar:
 *     POST /api/inscripcion → { plan, datos, fechas, comprobante }
 *       → Google Apps Script
 *         ├── Google Sheets (estado: Pendiente)
 *         └── Telegram (notificación con botones)
 * ═══════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import PlanSelector from "./PlanSelector";
import FormDatos from "./FormDatos";
import FormFechas from "./FormFechas";
import MetodoPago from "./MetodoPago";

// Datos compartidos de planes (misma fuente de verdad)
const PLANES_IDS = ["diario", "mensual", "trimestral", "semestral", "anual"];

export default function InscripcionClient() {
    const searchParams = useSearchParams();
    const [selectedPlan, setSelectedPlan] = useState("mensual");

    // ── Estado levantado de los formularios ──
    const [datosBeneficiario, setDatosBeneficiario] = useState({ data: {}, isValid: false });
    const [fechasMembresia, setFechasMembresia] = useState({ data: {}, isValid: false });

    // Callbacks estables para evitar re-renders innecesarios
    const handleDatosChange = useCallback((info) => {
        setDatosBeneficiario(info);
    }, []);

    const handleFechasChange = useCallback((info) => {
        setFechasMembresia(info);
    }, []);

    // Leer plan desde URL al montar (ej: ?plan=trimestral)
    useEffect(() => {
        const planParam = searchParams.get("plan");
        if (planParam && PLANES_IDS.includes(planParam)) {
            setSelectedPlan(planParam);
        }
    }, [searchParams]);

    return (
        <>
            <PlanSelector
                selectedPlan={selectedPlan}
                onPlanChange={setSelectedPlan}
            />
            <FormDatos
                selectedPlan={selectedPlan}
                onDataChange={handleDatosChange}
            />
            <FormFechas
                selectedPlan={selectedPlan}
                onDataChange={handleFechasChange}
            />
            <MetodoPago
                selectedPlan={selectedPlan}
                formDatosData={datosBeneficiario.data}
                formDatosValid={datosBeneficiario.isValid}
                formFechasData={fechasMembresia.data}
                formFechasValid={fechasMembresia.isValid}
            />
        </>
    );
}
