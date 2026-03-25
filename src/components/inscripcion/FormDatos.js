"use client";

import React, { useState } from "react";
import "./FormDatos.css";

/**
 * ═══════════════════════════════════════════════════════════════════
 * FormDatos — Formulario de Datos del Beneficiario
 * ═══════════════════════════════════════════════════════════════════
 *
 * Props:
 *   - selectedPlan (string): ID del plan seleccionado en PlanSelector.
 *     Se enviará junto con los datos del formulario al backend.
 *
 * Arquitectura Backend (Futuro):
 *   POST /api/inscripcion → Google Apps Script
 *     ├── Guardar fila en Google Sheets (estado: Pendiente)
 *     └── Enviar mensaje a Telegram con botones
 *
 *   Estructura de archivos sugerida:
 *     src/app/api/inscripcion/route.js
 *     src/lib/google-apps-script.js
 *     src/lib/validations.js
 * ═══════════════════════════════════════════════════════════════════
 */

// ── Constantes de Límites ──
const LIMITS = {
    cedula: 10,
    nombres: 50,
    apellidos: 50,
    telefono: 10,
    email: 100,
};

// ── Regex para nombres/apellidos: letras, espacios, tildes, diéresis, ñ ──
const REGEX_NOMBRE = /^[a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ\s]+$/;

// ── Regex para teléfono: solo dígitos ──
const REGEX_TELEFONO = /^\d+$/;

// ── Regex para email válido ──
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Algoritmo de validación de cédula ecuatoriana
 * Basado en el algoritmo de Víctor Díaz De La Gasca.
 *
 * Pasos:
 * 1. Validar que tenga 10 dígitos numéricos
 * 2. Los dos primeros dígitos (región) deben ser entre 01 y 24
 * 3. Extraer último dígito (dígito verificador)
 * 4. Sumar todos los dígitos en posiciones pares (índice 1,3,5,7)
 * 5. Multiplicar impares (índice 0,2,4,6,8) × 2; si resultado > 9, restar 9
 * 6. Obtener la decena inmediata superior de la suma total
 * 7. Restar: decena - suma = dígito validador (si es 10 → 0)
 * 8. Comparar dígito validador con el último dígito de la cédula
 *
 * @param {string} cedula - Cédula de 10 dígitos
 * @returns {{ valid: boolean, message: string }}
 */
function validarCedulaEcuatoriana(cedula) {
    // Paso 1: Verificar longitud de 10 dígitos numéricos
    if (!/^\d{10}$/.test(cedula)) {
        return { valid: false, message: "La cédula debe tener exactamente 10 dígitos numéricos." };
    }

    // Paso 2: Validar región (primeros 2 dígitos, entre 01 y 24)
    const digitoRegion = parseInt(cedula.substring(0, 2), 10);
    if (digitoRegion < 1 || digitoRegion > 24) {
        return { valid: false, message: "Los dos primeros dígitos no corresponden a ninguna provincia del Ecuador." };
    }

    // Paso 3: Extraer último dígito
    const ultimoDigito = parseInt(cedula.substring(9, 10), 10);

    // Paso 4: Sumar posiciones pares (índices 1, 3, 5, 7)
    const pares =
        parseInt(cedula[1], 10) +
        parseInt(cedula[3], 10) +
        parseInt(cedula[5], 10) +
        parseInt(cedula[7], 10);

    // Paso 5: Multiplicar posiciones impares (índices 0, 2, 4, 6, 8) × 2
    let impares = 0;
    const posicionesImpares = [0, 2, 4, 6, 8];
    for (const pos of posicionesImpares) {
        let num = parseInt(cedula[pos], 10) * 2;
        if (num > 9) num -= 9;
        impares += num;
    }

    // Paso 6: Suma total
    const sumaTotal = pares + impares;

    // Paso 7: Obtener decena inmediata superior
    const primerDigitoSuma = Math.floor(sumaTotal / 10);
    const decena = (primerDigitoSuma + 1) * 10;

    // Paso 8: Obtener dígito validador
    let digitoValidador = decena - sumaTotal;
    if (digitoValidador === 10) digitoValidador = 0;

    // Paso 9: Comparar
    if (digitoValidador === ultimoDigito) {
        return { valid: true, message: "" };
    } else {
        return { valid: false, message: "El número de cédula ingresado no es válido." };
    }
}

export default function FormDatos({ selectedPlan }) {
    // ── Estado del formulario ──
    const [formData, setFormData] = useState({
        cedula: "",
        nombres: "",
        apellidos: "",
        telefono: "",
        email: "",
    });

    // ── Estado de errores de validación ──
    const [errors, setErrors] = useState({});

    // ── Helpers para manejar errores ──
    const setFieldError = (field, message) => {
        setErrors((prev) => ({ ...prev, [field]: message }));
    };

    const clearFieldError = (field) => {
        setErrors((prev) => {
            const updated = { ...prev };
            delete updated[field];
            return updated;
        });
    };

    // ══════════════════════════════════════
    // VALIDACIONES POR CAMPO (onBlur)
    // ══════════════════════════════════════
    const validateField = (name, value) => {
        const trimmed = value.trim();

        switch (name) {
            case "cedula":
                if (!trimmed) {
                    setFieldError(name, "La cédula es obligatoria.");
                } else if (!/^\d+$/.test(trimmed)) {
                    setFieldError(name, "La cédula solo debe contener números.");
                } else if (trimmed.length !== 10) {
                    setFieldError(name, "La cédula debe tener exactamente 10 dígitos.");
                } else {
                    // Validación algorítmica ecuatoriana
                    const resultado = validarCedulaEcuatoriana(trimmed);
                    if (!resultado.valid) {
                        setFieldError(name, resultado.message);
                    } else {
                        clearFieldError(name);
                    }
                }
                break;

            case "nombres":
                if (!trimmed) {
                    setFieldError(name, "El nombre es obligatorio.");
                } else if (!REGEX_NOMBRE.test(trimmed)) {
                    setFieldError(name, "Solo se permiten letras, espacios, tildes (á), diéresis (ü) y eñe (ñ).");
                } else if (trimmed.length < 2) {
                    setFieldError(name, "El nombre debe tener al menos 2 caracteres.");
                } else {
                    clearFieldError(name);
                }
                break;

            case "apellidos":
                if (!trimmed) {
                    setFieldError(name, "El apellido es obligatorio.");
                } else if (!REGEX_NOMBRE.test(trimmed)) {
                    setFieldError(name, "Solo se permiten letras, espacios, tildes (á), diéresis (ü) y eñe (ñ).");
                } else if (trimmed.length < 2) {
                    setFieldError(name, "El apellido debe tener al menos 2 caracteres.");
                } else {
                    clearFieldError(name);
                }
                break;

            case "telefono":
                if (!trimmed) {
                    setFieldError(name, "El teléfono es obligatorio.");
                } else if (!REGEX_TELEFONO.test(trimmed)) {
                    setFieldError(name, "El teléfono solo debe contener números, sin letras ni símbolos.");
                } else if (trimmed.length !== 10) {
                    setFieldError(name, "El teléfono debe tener exactamente 10 dígitos.");
                } else {
                    clearFieldError(name);
                }
                break;

            case "email":
                // Email es opcional, pero si se escribe algo, debe ser válido
                if (trimmed && !REGEX_EMAIL.test(trimmed)) {
                    setFieldError(name, "Ingresa un email válido (ejemplo: nombre@correo.com).");
                } else {
                    clearFieldError(name);
                }
                break;

            default:
                break;
        }
    };

    // ══════════════════════════════════════
    // MANEJADOR DE CAMBIOS (onChange)
    // ══════════════════════════════════════
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Filtrado en tiempo real según el campo
        let filteredValue = value;

        switch (name) {
            case "cedula":
                // Solo permitir dígitos, máximo 10
                filteredValue = value.replace(/\D/g, "").slice(0, LIMITS.cedula);
                break;

            case "nombres":
            case "apellidos":
                // Permitir solo letras válidas, espacios, tildes, diéresis, ñ
                // Filtramos caracteres no permitidos en tiempo real
                filteredValue = value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚäëïöüÄËÏÖÜñÑ\s]/g, "").slice(0, LIMITS[name]);
                break;

            case "telefono":
                // Solo dígitos, máximo 10
                filteredValue = value.replace(/\D/g, "").slice(0, LIMITS.telefono);
                break;

            case "email":
                // Limitar caracteres máximos
                filteredValue = value.slice(0, LIMITS.email);
                break;

            default:
                break;
        }

        setFormData((prev) => ({ ...prev, [name]: filteredValue }));

        // Limpiar error al escribir (se re-validará al perder el foco)
        if (errors[name]) {
            clearFieldError(name);
        }
    };

    // ══════════════════════════════════════
    // MANEJADOR DEL BLUR (onBlur)
    // ══════════════════════════════════════
    const handleBlur = (e) => {
        const { name, value } = e.target;
        validateField(name, value);
    };

    // ══════════════════════════════════════
    // MÉTODO PÚBLICO: Validar todo el formulario
    // (será llamado por el componente padre cuando
    //  se implemente el botón de "Confirmar inscripción")
    // ══════════════════════════════════════
    /**
     * Puedes exportar esta función o llamarla desde un ref
     * para validar todo antes del envío final.
     */

    // ════════════════════════════════════════
    // RENDER: Formulario
    // ════════════════════════════════════════
    return (
        <section className="form-datos">
            <div className="form-datos__inner">
                <h2 className="form-datos__title">Datos del beneficiario</h2>
                <p className="form-datos__subtitle">
                    Ingresa los datos de quien hará uso del gimnasio. Estos datos se usarán
                    para registrar la membresía y verificar el acceso.
                </p>

                <div className="form-datos__card">
                    {/* Fila 1: Cédula (ancho completo) */}
                    <div className="form-datos__row form-datos__row--full">
                        <div className="form-group">
                            <label className="form-group__label form-group__label--required" htmlFor="cedula">
                                Número de cédula
                            </label>
                            <input
                                id="cedula"
                                name="cedula"
                                type="text"
                                inputMode="numeric"
                                placeholder="Ejemplo: 1712345678"
                                className={`form-group__input ${errors.cedula ? "form-group__input--error" : ""}`}
                                value={formData.cedula}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={LIMITS.cedula}
                                autoComplete="off"
                            />
                            {errors.cedula && <p className="form-group__error">{errors.cedula}</p>}
                        </div>
                    </div>

                    {/* Fila 2: Nombres + Apellidos */}
                    <div className="form-datos__row">
                        <div className="form-group">
                            <label className="form-group__label form-group__label--required" htmlFor="nombres">
                                Nombres
                            </label>
                            <input
                                id="nombres"
                                name="nombres"
                                type="text"
                                placeholder="Ejemplo: Carlos Andrés"
                                className={`form-group__input ${errors.nombres ? "form-group__input--error" : ""}`}
                                value={formData.nombres}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={LIMITS.nombres}
                                autoComplete="given-name"
                            />
                            {errors.nombres && <p className="form-group__error">{errors.nombres}</p>}
                        </div>
                        <div className="form-group">
                            <label className="form-group__label form-group__label--required" htmlFor="apellidos">
                                Apellidos
                            </label>
                            <input
                                id="apellidos"
                                name="apellidos"
                                type="text"
                                placeholder="Ejemplo: Gómez Torres"
                                className={`form-group__input ${errors.apellidos ? "form-group__input--error" : ""}`}
                                value={formData.apellidos}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={LIMITS.apellidos}
                                autoComplete="family-name"
                            />
                            {errors.apellidos && <p className="form-group__error">{errors.apellidos}</p>}
                        </div>
                    </div>

                    {/* Fila 3: Teléfono + Email */}
                    <div className="form-datos__row">
                        <div className="form-group">
                            <label className="form-group__label form-group__label--required" htmlFor="telefono">
                                Teléfono
                            </label>
                            <input
                                id="telefono"
                                name="telefono"
                                type="tel"
                                inputMode="numeric"
                                placeholder="Ejemplo: 0991234567"
                                className={`form-group__input ${errors.telefono ? "form-group__input--error" : ""}`}
                                value={formData.telefono}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={LIMITS.telefono}
                                autoComplete="tel"
                            />
                            {errors.telefono && <p className="form-group__error">{errors.telefono}</p>}
                        </div>
                        <div className="form-group">
                            <label className="form-group__label" htmlFor="email">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="Ejemplo: carlos@gmail.com"
                                className={`form-group__input ${errors.email ? "form-group__input--error" : ""}`}
                                value={formData.email}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                maxLength={LIMITS.email}
                                autoComplete="email"
                            />
                            {errors.email && <p className="form-group__error">{errors.email}</p>}
                        </div>
                    </div>

                    {/* El botón de "Confirmar inscripción" se añadirá después,
                        cuando estén listos los formularios de fechas y comprobante de pago */}
                </div>
            </div>
        </section>
    );
}
