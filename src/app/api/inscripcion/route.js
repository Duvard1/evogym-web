import { NextResponse } from "next/server";
import { validateInscripcionData } from "@/lib/validations/inscripcion";
import { sendToGoogleScript } from "@/services/google-apps-script";

/**
 * Endpoint POST /api/inscripcion
 * Recibe todos los datos de la membresía y los envía a Google.
 */

export async function POST(req) {
    try {
        const body = await req.json();

        // ── Capa 3 de Seguridad: HONEYPOT (Contra bots) ──
        if (body.honeypot && body.honeypot.length > 0) {
            // Rechazo silencioso (fingimos éxito para confundir al bot)
            console.log("⚠️ Bot detectado y bloqueado por Honeypot.");
            return NextResponse.json({ message: "Inscripción recibida." }, { status: 200 });
        }

        // ── 1. Validar servidor-side por seguridad ──
        const validation = validateInscripcionData(body);
        if (!validation.isValid) {
            return NextResponse.json(
                { message: "Datos de formulario inválidos.", errors: validation.errors },
                { status: 400 }
            );
        }

        // ── 2. Enviar a Google Apps Script (Sheets + Telegram) ──
        const result = await sendToGoogleScript(body);

        if (!result.success) {
            return NextResponse.json(
                { message: result.message || "Error al procesar la inscripción." },
                { status: 502 }
            );
        }

        // ── 3. Todo OK ──
        return NextResponse.json(
            { message: "Inscripción en estado pendiente." },
            { status: 200 }
        );

    } catch (error) {
        console.error("❌ API Error [Inscripcion]:", error);
        return NextResponse.json(
            { message: "Error interno del servidor." },
            { status: 500 }
        );
    }
}
