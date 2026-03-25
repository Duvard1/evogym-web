"use client";

import { useState } from "react";
import Image from "next/image";
import "./Suplementos.css";

/* -- Icono SVG simple de WhatsApp para el botón -- */
const WhatsAppIcon = () => (
    <svg className="whatsapp-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.888-.788-1.489-1.761-1.663-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.513-18.397A11.96 11.96 0 0 0 12.052 0C5.432 0 .045 5.385.043 12.005c0 2.116.553 4.183 1.6 6.004l-1.642 6 6.137-1.611a11.95 11.95 0 0 0 5.912 1.564h.005c6.621 0 12.008-5.385 12.01-12.005a11.95 11.95 0 0 0-3.501-8.49" />
    </svg>
);

/* -- Componente interno de una Tarjeta de Producto -- */
function SuplementoCard({ item }) {
    // Estados interactivos
    const [tipo, setTipo] = useState("completo"); // "completo" | "scoop"
    const [cantidad, setCantidad] = useState(1);

    // Ajuste seguro por cambios de Scoop a Completo
    const maxCant = tipo === "completo" ? item.maxCantidadBase : item.maxCantidadScoop;

    const incrementar = () => {
        if (cantidad < maxCant) setCantidad(cantidad + 1);
    };

    const decrementar = () => {
        if (cantidad > 1) setCantidad(cantidad - 1);
    };

    const seleccionarTipo = (nuevoTipo) => {
        setTipo(nuevoTipo);
        setCantidad(1); // Reiniciar a 1 al cambiar el modo
    };

    // Cálculos
    const precioActual = tipo === "completo" ? item.precioBase : item.precioScoop;
    const total = (precioActual * cantidad).toFixed(2);

    // Manejador del botón de WhatsApp (Abre API de WhatsApp con el pedido pre-formateado)
    const enviarPorWhatsApp = () => {
        /* Configura AQUÍ tú número de WhatsApp. Debe incluir código de país sin el símbolo '+', ej: 593984605235 */
        const NUMERO_WHATSAPP = "593984605235";

        const modo = tipo === "completo" ? "Envases completos" : "Scoops individuales";
        const mensaje = `Hola EvoGym! Me gustaría pedir el siguiente suplemento:\n\n*Producto:* ${item.nombre}\n*Modalidad:* ${modo}\n*Cantidad:* ${cantidad}\n*Total:* $${total}\n\nQuedo atento para coordinar la entrega.`;

        const whatsappUrl = `https://wa.me/${NUMERO_WHATSAPP}?text=${encodeURIComponent(mensaje)}`;
        window.open(whatsappUrl, "_blank");
    };

    return (
        <article className="product-card">
            {/* Foto */}
            <div className="product-card__img-wrapper">
                <Image
                    src={item.imagePath}
                    alt={item.nombre}
                    fill
                    className="product-card__img"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />
            </div>

            {/* Encabezado: Categoría y Precio Base Fijo a la vista */}
            <div className="product-card__header">
                <span className="product-card__badge">{item.categoria}</span>
                <p className="product-card__base-price">${item.precioBase.toFixed(2)}</p>
            </div>

            {/* Textos */}
            <h3 className="product-card__title">{item.nombre}</h3>
            <p className="product-card__desc">{item.descripcion}</p>

            {/* Opciones solo si el producto permite comprar por scoop */}
            {item.permiteScoop && (
                <>
                    <h4 className="product-card__options-title">¿Como lo quieres?</h4>
                    <div className="product-card__options">
                        <button
                            className={`product-card__option-btn ${tipo === "completo" ? "is-active" : ""}`}
                            onClick={() => seleccionarTipo("completo")}
                        >
                            <span className="product-option__name">Completo</span>
                            <span className="product-option__detail">{item.detalleBase} - ${item.precioBase.toFixed(1)}</span>
                        </button>
                        <button
                            className={`product-card__option-btn ${tipo === "scoop" ? "is-active" : ""}`}
                            onClick={() => seleccionarTipo("scoop")}
                        >
                            <span className="product-option__name">Por Scoop</span>
                            <span className="product-option__detail">{item.detalleScoop} - ${item.precioScoop.toFixed(2)}</span>
                        </button>
                    </div>
                </>
            )}

            {/* Selector de Cantidad */}
            <div className="product-card__quantity-section">
                <h4 className="product-card__quantity-label">
                    Cantidad ({tipo === "completo" ? "envases" : "scoops"})
                </h4>
                <div className="product-card__quantity-controls">
                    <button className="quantity-btn" onClick={decrementar} disabled={cantidad <= 1}>-</button>
                    <span className="quantity-display">{cantidad}</span>
                    <button className="quantity-btn" onClick={incrementar} disabled={cantidad >= maxCant}>+</button>
                    <span className="quantity-max">máx. {maxCant}</span>
                </div>
            </div>

            {/* Resumen Total y Botón */}
            <div className="product-card__footer">
                <div className="product-card__total">
                    <span>Total</span>
                    <span className="product-card__total-price">${total}</span>
                </div>
                <button className="product-card__whatsapp-btn" onClick={enviarPorWhatsApp}>
                    <WhatsAppIcon />
                    Pedir por WhatsApp
                </button>
            </div>
        </article>
    );
}


/* -- Main Component Exportado -- */
export default function Suplementos() {

    /* 
      Actualmente hay 8 productos (placeholders). 
      Puedes editar o añadir más copiando la estructura de estos objetos.
    */
    const BASE_DATA = [
        {
            id: "sup-1",
            categoria: "CREATINA",
            nombre: "Mutant Creatine 100% Monohydrate",
            descripcion: "Creatina pura para maximizar tu fuerza, volumen y resistencia. (300 gr)",
            imagePath: "/images/productos/suplemento-1.webp",
            precioBase: 28.00,
            detalleBase: "1 envase",
            maxCantidadBase: 2,
            permiteScoop: true,
            precioScoop: 0.50,
            detalleScoop: "5 gr",
            maxCantidadScoop: 30
        },
        {
            id: "sup-2",
            categoria: "CREATINA",
            nombre: "Nutrex Creatine Monohydrate",
            descripcion: "Aumenta tu rendimiento físico y acelera la recuperación muscular. (300 gr)",
            imagePath: "/images/productos/suplemento-2.webp",
            precioBase: 22.00,
            detalleBase: "1 envase",
            maxCantidadBase: 2,
            permiteScoop: true,
            precioScoop: 0.40,
            detalleScoop: "5 gr",
            maxCantidadScoop: 30
        },
        {
            id: "sup-3",
            categoria: "PROTEÍNA",
            nombre: "RED REX Beef Protein Isolate",
            descripcion: "Proteína premium sin lactosa, ideal para desarrollar masa muscular magra. (6 lb)",
            imagePath: "/images/productos/suplemento-3.webp",
            precioBase: 95.00,
            detalleBase: "1 envase",
            maxCantidadBase: 2,
            permiteScoop: true,
            precioScoop: 1.30,
            detalleScoop: "35 gr",
            maxCantidadScoop: 30
        },
        {
            id: "sup-4",
            categoria: "PROTEÍNA",
            nombre: "IntegralMedica Barra de Proteína Crujiente",
            descripcion: "Prácticas y deliciosas para cumplir tus requerimientos de proteína en cualquier lugar. (12 unidades)",
            imagePath: "/images/productos/suplemento-4.webp",
            precioBase: 33.00,
            detalleBase: "1 caja",
            maxCantidadBase: 2,
            permiteScoop: true,
            precioScoop: 3.00,
            detalleScoop: "1 unidad",
            maxCantidadScoop: 12
        },
        {
            id: "sup-5",
            categoria: "PRE-ENTRENO",
            nombre: "Insane Labz Psychotic Black",
            descripcion: "Energía y concentración sostenida para entrenar, sin exceso de nerviosismo. (220g)",
            imagePath: "/images/productos/suplemento-5.webp",
            precioBase: 42.00,
            detalleBase: "1 envase",
            maxCantidadBase: 2,
            permiteScoop: true,
            precioScoop: 1.25,
            detalleScoop: "6.2 gr",
            maxCantidadScoop: 30
        },
        {
            id: "sup-6",
            categoria: "PRE-ENTRENO",
            nombre: "Insane Labz Psychotic Saw",
            descripcion: "Máxima estimulación y enfoque mental solo para usuarios avanzados. (220)",
            imagePath: "/images/productos/suplemento-6.webp",
            precioBase: 53.00,
            detalleBase: "1 envase",
            maxCantidadBase: 2,
            permiteScoop: true,
            precioScoop: 1.85,
            detalleScoop: "7.3 gr",
            maxCantidadScoop: 30
        },
        {
            id: "sup-7",
            categoria: "RECUPERACIÓN",
            nombre: "Insane Labz Psychotic Saw",
            descripcion: "Potencia la vasodilatación (bombeo muscular) y acelera tu recuperación. (186 gr)",
            imagePath: "/images/productos/suplemento-7.webp",
            precioBase: 27.00,
            detalleBase: "1 envase",
            maxCantidadBase: 2,
            permiteScoop: true,
            precioScoop: 0.45,
            detalleScoop: "3 gr",
            maxCantidadScoop: 30
        },
        {
            id: "sup-8",
            categoria: "DETOX",
            nombre: "FA Wellness Line Super Green Detox",
            descripcion: "Suplemento verde que cuida tu digestión y ayuda a reducir grasa corporal. (270g)",
            imagePath: "/images/productos/suplemento-8.webp",
            precioBase: 24.00,
            detalleBase: "1 envase",
            maxCantidadBase: 2,
            permiteScoop: true,
            precioScoop: 0.85,
            detalleScoop: "9 gr",
            maxCantidadScoop: 30
        }
    ];

    return (
        <section id="catalogo-suplementos" className="shop">
            <h2 className="shop__title">Suplementos</h2>

            <div className="shop__inner">
                <div className="shop__grid">
                    {BASE_DATA.map((producto) => (
                        <SuplementoCard key={producto.id} item={producto} />
                    ))}
                </div>
            </div>
        </section>
    );
}
