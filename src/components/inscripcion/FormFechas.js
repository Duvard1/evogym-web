"use client";

import React, { useState, useMemo } from "react";
import "./FormFechas.css";

/**
 * ═══════════════════════════════════════════════════════════════════
 * FormFechas — Fechas de la Membresía
 * ═══════════════════════════════════════════════════════════════════
 *
 * Props:
 *   - selectedPlan (string): ID del plan seleccionado. Se usa para
 *     calcular automáticamente la fecha de fin de la membresía.
 *
 * Campos:
 *   1. Fecha de compra   → Hoy (automático, no editable)
 *   2. Fecha de asistencia → El usuario elige cuándo empieza a ir
 *   3. Fin de membresía  → Se calcula automáticamente según el plan
 *
 * Los datos de este formulario se enviarán junto con los de
 * FormDatos y FormPago en un solo POST /api/inscripcion
 * ═══════════════════════════════════════════════════════════════════
 */

// ── Duración de cada plan (usado para calcular la fecha de fin) ──
const PLAN_DURACION = {
    diario: { dias: 1 },
    mensual: { meses: 1 },
    trimestral: { meses: 3 },
    semestral: { meses: 6 },
    anual: { meses: 12 },
};

/**
 * Formatea una fecha Date a string "DD/MM/YYYY"
 */
function formatDateDMY(date) {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${d}/${m}/${y}`;
}

/**
 * Formatea una fecha Date a string "YYYY-MM-DD" (formato del input date)
 */
function formatDateISO(date) {
    const d = String(date.getDate()).padStart(2, "0");
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const y = date.getFullYear();
    return `${y}-${m}-${d}`;
}

/**
 * Calcula la fecha de fin sumando la duración del plan a la fecha de asistencia.
 * @param {Date} fechaInicio
 * @param {string} planId
 * @returns {Date}
 */
function calcularFechaFin(fechaInicio, planId) {
    const duracion = PLAN_DURACION[planId];
    if (!duracion) return fechaInicio;

    const resultado = new Date(fechaInicio);

    if (duracion.dias) {
        resultado.setDate(resultado.getDate() + duracion.dias);
    }

    if (duracion.meses) {
        resultado.setMonth(resultado.getMonth() + duracion.meses);
    }

    return resultado;
}

export default function FormFechas({ selectedPlan, onDataChange }) {
    // ── Fecha de compra: Hoy (automático) ──
    const hoy = useMemo(() => new Date(), []);
    const fechaCompraStr = formatDateDMY(hoy);

    // ── Fecha de asistencia: el usuario elige ──
    // Por defecto ponemos la fecha de mañana para que sea realista
    const manana = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() + 1);
        return d;
    }, []);

    const [fechaAsistencia, setFechaAsistencia] = useState(formatDateISO(manana));
    const [errors, setErrors] = useState({});

    // ── Fecha mínima: hoy, Fecha máxima: 30 días en el futuro ──
    const fechaMinima = formatDateISO(hoy);
    const fechaMaxima = useMemo(() => {
        const d = new Date();
        d.setDate(d.getDate() + 30);
        return formatDateISO(d);
    }, []);

    // ── Cálculo automático de la fecha de fin ──
    const fechaFinStr = useMemo(() => {
        if (!fechaAsistencia || !selectedPlan) return "—";
        // Parseamos la fecha del input (YYYY-MM-DD)
        const partes = fechaAsistencia.split("-");
        if (partes.length !== 3) return "—";
        const inicio = new Date(
            parseInt(partes[0], 10),
            parseInt(partes[1], 10) - 1,
            parseInt(partes[2], 10)
        );
        const fin = calcularFechaFin(inicio, selectedPlan);
        return formatDateDMY(fin);
    }, [fechaAsistencia, selectedPlan]);

    // ── Validación ──
    const handleBlur = () => {
        if (!fechaAsistencia) {
            setErrors({ fechaAsistencia: "La fecha de asistencia es obligatoria." });
        } else {
            // Verificar que la fecha no sea anterior a hoy
            const seleccionada = new Date(fechaAsistencia + "T00:00:00");
            const hoyNormalizado = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
            if (seleccionada < hoyNormalizado) {
                setErrors({ fechaAsistencia: "La fecha no puede ser anterior a hoy." });
            } else {
                setErrors({});
            }
        }
    };

    const handleChange = (e) => {
        setFechaAsistencia(e.target.value);
        if (errors.fechaAsistencia) {
            setErrors({});
        }
    };

    // ══════════════════════════════════════
    // NOTIFICAR AL PADRE (Lifting State Up)
    // ══════════════════════════════════════
    React.useEffect(() => {
        if (!onDataChange) return;

        const isValid = !!fechaAsistencia && Object.keys(errors).length === 0;

        onDataChange({
            data: {
                fechaCompra: fechaCompraStr,
                fechaAsistencia: fechaAsistencia,
                fechaFin: fechaFinStr
            },
            isValid: isValid
        });
    }, [fechaCompraStr, fechaAsistencia, fechaFinStr, errors, onDataChange]);

    return (
        <section className="form-fechas">
            <div className="form-fechas__inner">
                <h2 className="form-fechas__title">Fechas de la membresía</h2>
                <p className="form-fechas__subtitle">
                    La fecha de compra es hoy. Indica cual es la fecha en la que comenzarás a
                    asistir, la fecha de fin de la membresía se calcula automáticamente.
                </p>

                <div className="form-fechas__card">
                    <div className="form-fechas__row">

                        {/* ── Fecha de compra (automático, hoy) ── */}
                        <div className="form-group">
                            <label className="form-group__label form-group__label--required">
                                Fecha de compra
                            </label>
                            <input
                                type="text"
                                className="form-group__input form-group__input--disabled"
                                value={fechaCompraStr}
                                disabled
                                readOnly
                            />
                            <p className="form-fechas__hint">Se registra automáticamente</p>
                        </div>

                        {/* ── Fecha de asistencia (editable) ── */}
                        <div className="form-group">
                            <label className="form-group__label form-group__label--required" htmlFor="fechaAsistencia">
                                Fecha de asistencia
                            </label>
                            <input
                                id="fechaAsistencia"
                                name="fechaAsistencia"
                                type="date"
                                className={`form-group__input ${errors.fechaAsistencia ? "form-group__input--error" : ""}`}
                                value={fechaAsistencia}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                min={fechaMinima}
                                max={fechaMaxima}
                            />
                            {errors.fechaAsistencia ? (
                                <p className="form-group__error">{errors.fechaAsistencia}</p>
                            ) : (
                                <p className="form-fechas__hint">¿Cuándo empiezas a ir?</p>
                            )}
                        </div>

                        {/* ── Fin de la membresía (calculado automáticamente) ── */}
                        <div className="form-group">
                            <label className="form-group__label">
                                Fin de la membresía
                            </label>
                            <input
                                type="text"
                                className="form-group__input form-group__input--disabled"
                                value={fechaFinStr}
                                disabled
                                readOnly
                            />
                            <p className="form-fechas__hint">Se calcula automáticamente</p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
