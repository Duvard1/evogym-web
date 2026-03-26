/**
 * Servicio encargado de la comunicación externa con Google Apps Script.
 * Encapsula la llamada al Web App URL que maneja Sheets y Telegram.
 */

const GAS_URL = process.env.GOOGLE_SCRIPT_URL;

export async function sendToGoogleScript(data) {
    if (!GAS_URL) {
        console.warn("⚠️ Advertencia: No se ha configurado la variable de entorno COOGLE_SCRIPT_URL.");
        // Simulamos éxito en desarrollo si no hay URL para no bloquear al usuario
        return { success: true, message: "Modo Desarrollo: Datos recibidos correctamente (sin Google)." };
    }

    try {
        const response = await fetch(GAS_URL, {
            method: "POST",
            body: JSON.stringify({
                ...data,
                timestamp: new Date().toISOString(),
                estado: "Pendiente"
            }),
            headers: {
                "Content-Type": "text/plain;charset=utf-8",
            }
        });

        // Consumir la respuesta para liberar la conexión en Node.js
        await response.text();
        return { success: true };

    } catch (error) {
        console.error("❌ Error en sendToGoogleScript:", error);
        return { success: false, message: "Error al conectar con el servidor de inscripciones." };
    }
}
