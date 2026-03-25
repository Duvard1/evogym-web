"use client";

/**
 * ═══════════════════════════════════════════════════════════════════
 * InscripcionClient — Wrapper Cliente
 * ═══════════════════════════════════════════════════════════════════
 * 
 * Este componente actúa como "puente" entre PlanSelector y FormDatos.
 * Gestiona el estado compartido `selectedPlan` para que:
 *   1. PlanSelector pueda actualizar el plan seleccionado.
 *   2. FormDatos pueda leer el plan seleccionado al enviar.
 *
 * page.js (Server Component) → renderiza este wrapper (Client Component)
 *   └── PlanSelector (recibe selectedPlan + onPlanChange)
 *   └── FormDatos    (recibe selectedPlan)
 * ═══════════════════════════════════════════════════════════════════
 */

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import PlanSelector from "./PlanSelector";
import FormDatos from "./FormDatos";

// Datos compartidos de planes (misma fuente de verdad)
const PLANES_IDS = ["diario", "mensual", "trimestral", "semestral", "anual"];

export default function InscripcionClient() {
    const searchParams = useSearchParams();
    const [selectedPlan, setSelectedPlan] = useState("mensual");

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
            <FormDatos selectedPlan={selectedPlan} />
        </>
    );
}
