"use client";

import React, { useState } from "react";
import Image from "next/image";
import "./MetodoPago.css";

/**
 * ═══════════════════════════════════════════════════════════════════
 * MetodoPago — Método de Pago + Modal de Confirmación + Resultado
 * ═══════════════════════════════════════════════════════════════════
 *
 * Props:
 *   - selectedPlan (string): Plan seleccionado
 *   - formDatosData (object): { cedula, nombres, apellidos, telefono, email }
 *   - formDatosValid (boolean): true si FormDatos no tiene errores
 *   - formFechasData (object): { fechaCompra, fechaAsistencia, fechaFin }
 *   - formFechasValid (boolean): true si FormFechas no tiene errores
 *
 * Backend (Futuro):
 *   POST /api/inscripcion → Google Apps Script
 *     ├── Google Sheets (estado: Pendiente)
 *     └── Telegram (notificación con botones)
 * ═══════════════════════════════════════════════════════════════════
 */

// ── Datos bancarios (configurables) ──
const DATOS_BANCARIOS = {
    banco: "Banco Pichincha",
    tipoCuenta: "Ahorros",
    numeroCuenta: "2200XXXXXXXX",
    cedulaTitular: "17XXXXXXXX",
    titular: "EVO GYM",
};

// ── Nombres legibles para los planes ──
const PLAN_LABELS = {
    diario: "Pase Diario",
    mensual: "Mensual",
    trimestral: "Trimestral",
    semestral: "Semestral",
    anual: "Anual",
};

// URL del endpoint (se configurará cuando se implemente el backend)
const API_ENDPOINT = "/api/inscripcion";

// ── Regex: permitir letras, números, guiones, # — sin símbolos peligrosos ──
const REGEX_COMPROBANTE = /^[a-zA-Z0-9\-#\s]+$/;

// Icono de advertencia (triángulo amarillo)
const WarningIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 9V13M12 17H12.01M10.29 3.86L1.82 18A2 2 0 0 0 3.54 21H20.46A2 2 0 0 0 22.18 18L13.71 3.86A2 2 0 0 0 10.29 3.86Z"
            stroke="#e6a817" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
);

export default function MetodoPago({
    selectedPlan,
    formDatosData,
    formDatosValid,
    formFechasData,
    formFechasValid,
}) {
    // ── Estado del tab activo ──
    const [activeTab, setActiveTab] = useState("qr");

    // ── Estado del comprobante ──
    const [comprobante, setComprobante] = useState("");
    const [comprobanteError, setComprobanteError] = useState("");

    // ── Modal ──
    const [showModal, setShowModal] = useState(false);

    // ── Submit ──
    const [isSubmitting, setIsSubmitting] = useState(false);

    // ── Resultado final ──
    const [resultado, setResultado] = useState(null); // { success, message }

    // ── Seguridad (Honeypot & Bloqueo 2 mins) ──
    const [honeypot, setHoneypot] = useState("");
    const [cooldownRestante, setCooldownRestante] = useState(0); 
    const [lockoutMsg, setLockoutMsg] = useState("");

    // ══════════════════════════════════════
    // Temporizador Robusto (Contra Throttling)
    // ══════════════════════════════════════
    React.useEffect(() => {
        const updateCooldown = () => {
            const lastTx = localStorage.getItem("evogym_last_submit");
            if (lastTx) {
                const timePassed = Date.now() - parseInt(lastTx, 10);
                if (timePassed < 120000) {
                    setCooldownRestante(120000 - timePassed);
                } else {
                    setCooldownRestante(0);
                }
            }
        };

        // Ejecutar inmediatamente al montar
        updateCooldown();

        // Este intervalo calculará la hora *exacta* matemáticamente. 
        // No importa si la pestaña se duerme o pasas de página, es inmune a retrasos.
        const interval = setInterval(updateCooldown, 1000);
        return () => clearInterval(interval);
    }, []);

    // ══════════════════════════════════════
    // Validación del comprobante
    // ══════════════════════════════════════
    const validateComprobante = (value) => {
        const trimmed = value.trim();
        if (!trimmed) {
            setComprobanteError("El número de comprobante es obligatorio.");
            return false;
        }
        if (!REGEX_COMPROBANTE.test(trimmed)) {
            setComprobanteError("Solo se permiten letras, números, guiones (-) y #.");
            return false;
        }
        if (trimmed.length < 3) {
            setComprobanteError("El comprobante debe tener al menos 3 caracteres.");
            return false;
        }
        setComprobanteError("");
        return true;
    };

    const handleComprobanteChange = (e) => {
        const value = e.target.value.slice(0, 50);
        setComprobante(value);
        if (comprobanteError) setComprobanteError("");
    };

    const handleComprobanteBlur = () => {
        validateComprobante(comprobante);
    };

    // ══════════════════════════════════════
    // ¿Formulario completo y válido?
    // ══════════════════════════════════════
    const comprobanteValido = comprobante.trim().length >= 3 && REGEX_COMPROBANTE.test(comprobante.trim());
    const isAllValid = formDatosValid && formFechasValid && comprobanteValido && selectedPlan;

    // ══════════════════════════════════════
    // Abrir Modal
    // ══════════════════════════════════════
    const handleOpenModal = () => {
        // Validación absoluta al hacer clic
        if (cooldownRestante > 0) {
            setLockoutMsg("Por favor, espera que el temporizador termine antes de reenviar.");
            return;
        }

        setLockoutMsg("");

        // Validar comprobante antes de abrir
        if (!validateComprobante(comprobante)) return;
        if (!isAllValid) return;
        setShowModal(true);
    };

    // ══════════════════════════════════════
    // Confirmar Inscripción (Submit)
    // ══════════════════════════════════════
    const handleConfirm = async () => {
        setIsSubmitting(true);

        const payload = {
            plan: selectedPlan,
            planNombre: PLAN_LABELS[selectedPlan] || selectedPlan,
            cedula: formDatosData.cedula,
            nombres: formDatosData.nombres,
            apellidos: formDatosData.apellidos,
            telefono: formDatosData.telefono,
            email: formDatosData.email,
            fechaCompra: formFechasData.fechaCompra,
            fechaAsistencia: formFechasData.fechaAsistencia,
            fechaFin: formFechasData.fechaFin,
            comprobante: comprobante.trim(),
            metodoPago: activeTab === "qr" ? "QR Deuna" : "Transferencia Bancaria",
            honeypot: honeypot, // Se envía al servidor para verificar si es un bot
        };

        try {
            const response = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || "Error al procesar la inscripción.");
            }

            // Guardar tiempo exacto de este envío (Límite 2 mins absoluto)
            localStorage.setItem("evogym_last_submit", Date.now().toString());
            setCooldownRestante(120000); // Dar feedback visual inmediato

            setShowModal(false);
            setResultado({
                success: true,
                message: "Tu inscripción quedará en estado pendiente hasta que el gimnasio verifique tu pago (máx. 24 horas hábiles).",
            });
        } catch (error) {
            setShowModal(false);
            setResultado({
                success: false,
                message: error.message || "Ocurrió un error inesperado. Por favor, intenta nuevamente o contáctanos por WhatsApp.",
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // ════════════════════════════════════════
    // RENDER: Sección principal
    // ════════════════════════════════════════
    return (
        <>
            <section className="metodo-pago">
                <div className="metodo-pago__inner">
                    <h2 className="metodo-pago__title">Método de pago</h2>
                    <p className="metodo-pago__subtitle">
                        Realiza la transferencia únicamente a los datos mostrados abajo.
                        Verifica bien el nombre y número de cuenta antes de transferir.
                    </p>

                    {/* ── Tabs ── */}
                    <div className="metodo-pago__tabs">
                        <button
                            className={`metodo-pago__tab ${activeTab === "qr" ? "metodo-pago__tab--active" : ""}`}
                            onClick={() => setActiveTab("qr")}
                        >
                            QR Deuna
                        </button>
                        <button
                            className={`metodo-pago__tab ${activeTab === "transferencia" ? "metodo-pago__tab--active" : ""}`}
                            onClick={() => setActiveTab("transferencia")}
                        >
                            Transferencia Bancaria
                        </button>
                    </div>

                    {/* ── Contenido del Tab ── */}
                    <div className="metodo-pago__tab-content">

                        {activeTab === "qr" && (
                            <>
                                {/* QR Code */}
                                <div className="metodo-pago__qr-box">
                                    <Image
                                        src="/images/pago/qr-deuna.webp"
                                        alt="Código QR para pago con Deuna"
                                        width={200}
                                        height={200}
                                        className="metodo-pago__qr-img"
                                    />
                                </div>
                                <p className="metodo-pago__qr-instructions">
                                    Abre la app De Una o Banca Móvil, selecciona &quot;Pagar con QR&quot;,
                                    escanea este código e ingresa el monto exacto de tu membresía.
                                </p>
                            </>
                        )}

                        {activeTab === "transferencia" && (
                            <div className="metodo-pago__bank-card">
                                <div className="metodo-pago__bank-row">
                                    <div className="bank-field">
                                        <span className="bank-field__label">Banco</span>
                                        <p className="bank-field__value">{DATOS_BANCARIOS.banco}</p>
                                    </div>
                                    <div className="bank-field">
                                        <span className="bank-field__label">Tipo de cuenta</span>
                                        <p className="bank-field__value">{DATOS_BANCARIOS.tipoCuenta}</p>
                                    </div>
                                </div>
                                <div className="metodo-pago__bank-row">
                                    <div className="bank-field">
                                        <span className="bank-field__label">Numero de cuenta</span>
                                        <p className="bank-field__value">{DATOS_BANCARIOS.numeroCuenta}</p>
                                    </div>
                                    <div className="bank-field">
                                        <span className="bank-field__label">Cédula del titular</span>
                                        <p className="bank-field__value">{DATOS_BANCARIOS.cedulaTitular}</p>
                                    </div>
                                </div>
                                <div className="metodo-pago__bank-row metodo-pago__bank-row--full">
                                    <div className="bank-field">
                                        <span className="bank-field__label">Titular de la cuenta</span>
                                        <p className="bank-field__value">{DATOS_BANCARIOS.titular}</p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ── Alerta ── */}
                    <div className="metodo-pago__alert">
                        <div className="alert-icon-warning">
                            <WarningIcon />
                        </div>
                        <p className="metodo-pago__alert-text">
                            {activeTab === "qr" ? (
                                <>
                                    Verifica que el nombre del receptor sea <strong>EVO GYM</strong> antes de
                                    confirmar el pago. No nos hacemos responsables por transferencias a cuentas incorrectas.
                                </>
                            ) : (
                                <>
                                    Confirma que el <strong>nombre del titular</strong> y el <strong>número de cuenta</strong> son
                                    correctos antes de transferir. Si tienes dudas, contáctanos por WhatsApp antes de realizar el pago.
                                </>
                            )}
                        </p>
                    </div>

                    {/* ── HONEYPOT (Invisible para humanos) ── */}
                    <div style={{ display: "none" }} aria-hidden="true">
                        <label>Si eres humano, no llenes esto:</label>
                        <input
                            type="text"
                            name="_bot_trap"
                            value={honeypot}
                            onChange={(e) => setHoneypot(e.target.value)}
                            tabIndex="-1"
                            autoComplete="off"
                        />
                    </div>

                    {/* ── Comprobante ── */}
                    <div className="metodo-pago__comprobante-card">
                        <p className="metodo-pago__comprobante-label">No. Comprobante</p>
                        <input
                            type="text"
                            placeholder="Ejemplo: 21354789"
                            className={`metodo-pago__comprobante-input ${comprobanteError ? "metodo-pago__comprobante-input--error" : ""}`}
                            value={comprobante}
                            onChange={handleComprobanteChange}
                            onBlur={handleComprobanteBlur}
                            maxLength={50}
                            autoComplete="off"
                        />
                        {comprobanteError ? (
                            <p className="metodo-pago__comprobante-error">{comprobanteError}</p>
                        ) : (
                            <p className="metodo-pago__comprobante-hint">
                                📋 Encuentra este código en el comprobante de pago de la app De Una, Banca movil o
                                en el correo de confirmación de tu banco. Cópialo exactamente como aparece.
                            </p>
                        )}
                    </div>

                    {/* ── Botón ── */}
                    {lockoutMsg && cooldownRestante <= 0 && (
                        <p style={{ color: "#e6a817", textAlign: "center", marginTop: "1rem", fontSize: "0.9rem" }}>
                            {lockoutMsg}
                        </p>
                    )}
                    <button
                        className="metodo-pago__submit-btn"
                        disabled={!isAllValid || cooldownRestante > 0}
                        onClick={handleOpenModal}
                    >
                        {cooldownRestante > 0
                            ? `Espera ${Math.ceil(cooldownRestante / 1000)}s para reintentar`
                            : "Revisar y Confirmar Inscripción"}
                    </button>
                </div>
            </section>

            {/* ══════════════════════════════════════
                MODAL DE CONFIRMACIÓN
            ══════════════════════════════════════ */}
            {showModal && (
                <div className="modal-overlay" onClick={() => !isSubmitting && setShowModal(false)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="modal__title">Confirma tu inscripción</h2>
                        <p className="modal__subtitle">Revisa que todos los datos sean correctos antes de enviar.</p>

                        {/* Membresía */}
                        <div className="modal__section">
                            <h3 className="modal__section-title">Membresía</h3>
                            <div className="modal__row">
                                <span className="modal__label">Plan</span>
                                <span className="modal__value">{PLAN_LABELS[selectedPlan] || selectedPlan}</span>
                            </div>
                        </div>

                        {/* Datos personales */}
                        <div className="modal__section">
                            <h3 className="modal__section-title">Datos del beneficiario</h3>
                            <div className="modal__row">
                                <span className="modal__label">Cédula</span>
                                <span className="modal__value">{formDatosData?.cedula}</span>
                            </div>
                            <div className="modal__row">
                                <span className="modal__label">Nombres</span>
                                <span className="modal__value">{formDatosData?.nombres}</span>
                            </div>
                            <div className="modal__row">
                                <span className="modal__label">Apellidos</span>
                                <span className="modal__value">{formDatosData?.apellidos}</span>
                            </div>
                            <div className="modal__row">
                                <span className="modal__label">Teléfono</span>
                                <span className="modal__value">{formDatosData?.telefono}</span>
                            </div>
                            {formDatosData?.email && (
                                <div className="modal__row">
                                    <span className="modal__label">Email</span>
                                    <span className="modal__value">{formDatosData?.email}</span>
                                </div>
                            )}
                        </div>

                        {/* Fechas */}
                        <div className="modal__section">
                            <h3 className="modal__section-title">Fechas</h3>
                            <div className="modal__row">
                                <span className="modal__label">Fecha de compra</span>
                                <span className="modal__value">{formFechasData?.fechaCompra}</span>
                            </div>
                            <div className="modal__row">
                                <span className="modal__label">Inicio de asistencia</span>
                                <span className="modal__value">{formFechasData?.fechaAsistencia}</span>
                            </div>
                            <div className="modal__row">
                                <span className="modal__label">Fin de membresía</span>
                                <span className="modal__value">{formFechasData?.fechaFin}</span>
                            </div>
                        </div>

                        {/* Pago */}
                        <div className="modal__section">
                            <h3 className="modal__section-title">Pago</h3>
                            <div className="modal__row">
                                <span className="modal__label">Método</span>
                                <span className="modal__value">
                                    {activeTab === "qr" ? "QR Deuna" : "Transferencia Bancaria"}
                                </span>
                            </div>
                            <div className="modal__row">
                                <span className="modal__label">No. Comprobante</span>
                                <span className="modal__value">{comprobante.trim()}</span>
                            </div>
                        </div>

                        {/* Botones */}
                        <div className="modal__buttons">
                            <button
                                className="modal__btn modal__btn--cancel"
                                onClick={() => setShowModal(false)}
                                disabled={isSubmitting}
                            >
                                Cancelar
                            </button>
                            <button
                                className="modal__btn modal__btn--confirm"
                                onClick={handleConfirm}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <span className="modal__spinner" />
                                        Enviando...
                                    </>
                                ) : (
                                    "Confirmar inscripción"
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* ══════════════════════════════════════
                MODAL DE RESULTADO
            ══════════════════════════════════════ */}
            {resultado && (
                <div className="modal-overlay">
                    <div className="modal-content resultado-modal">
                        <div className={`resultado__icon ${resultado.success ? "resultado__icon--success" : "resultado__icon--error"}`}>
                            {resultado.success ? (
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 13L9 17L19 7" stroke="#60DB00" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M18 6L6 18M6 18L18 6" stroke="#ff4444" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            )}
                        </div>
                        <h2 className={`resultado__title ${resultado.success ? "resultado__title--success" : "resultado__title--error"}`}>
                            {resultado.success ? "¡Inscripción enviada!" : "Error en la inscripción"}
                        </h2>
                        <p className="resultado__msg">{resultado.message}</p>
                        <a href="/" className="resultado__btn">Volver al inicio</a>
                    </div>
                </div>
            )}
        </>
    );
}
