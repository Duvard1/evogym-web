/**
 * Validaciones de lado del servidor para el formulario de inscripción.
 * Esto asegura que los datos sean correctos incluso si alguien salta las validaciones del frontend.
 */

const REGEX_CEDULA = /^\d{10}$/;
const REGEX_TELEFONO = /^\d{10}$/;
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateInscripcionData(data) {
    const errors = [];

    if (!data.plan) errors.push("El plan es obligatorio.");
    if (!REGEX_CEDULA.test(data.cedula)) errors.push("Cédula inválida.");
    if (!data.nombres || data.nombres.length < 2) errors.push("Nombres inválidos.");
    if (!data.apellidos || data.apellidos.length < 2) errors.push("Apellidos inválidos.");
    if (!REGEX_TELEFONO.test(data.telefono)) errors.push("Teléfono inválido.");
    if (data.email && !REGEX_EMAIL.test(data.email)) errors.push("Email inválido.");
    if (!data.comprobante) errors.push("El número de comprobante es obligatorio.");

    return {
        isValid: errors.length === 0,
        errors
    };
}
