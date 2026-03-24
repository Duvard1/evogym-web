import Image from "next/image";
import Link from "next/link";

/* ─── Horario de atención ─── */
const SCHEDULE = [
    {
        time: "06:20 AM – 12:00 PM",
        shift: "Turno Mañana",
        days: "Lunes – Viernes",
    },
    {
        time: "03:00 PM – 09:00 PM",
        shift: "Turno Tarde",
        days: "Lunes – Viernes",
    },
    {
        time: "08:00 AM – 12:00 PM",
        shift: "Turno Mañana",
        days: "Sábados",
    },
    {
        time: "Cerrado",
        shift: null,
        days: "Domingos",
        closed: true,
    },
];

/* ─── Nav links ─── */
const NAV_LINKS = [
    { label: "Servicios", href: "#servicios" },
    { label: "Instalaciones", href: "#instalaciones" },
    { label: "Membresías", href: "#membresias" },
    { label: "Suplementos", href: "#suplementos" },
];

/* ─── Social links
   Add your SVG/img files to  public/icons/
   Name them: facebook.svg | instagram.svg | tiktok.svg
   ─── */
const SOCIAL_LINKS = [
    {
        id: "facebook",
        href: "https://www.facebook.com/p/Evogym-61558127704452/",
        label: "Facebook",
        iconSrc: "/icons/facebook.svg",
    },
    {
        id: "instagram",
        href: "https://www.instagram.com/evogym8",
        label: "Instagram",
        iconSrc: "/icons/instagram.svg",
    },
    {
        id: "tiktok",
        href: "https://www.tiktok.com/@evogym25",
        label: "TikTok",
        iconSrc: "/icons/tiktok.svg",
    },
];

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
            {/* ════════════════════════════════════
                SECCIÓN VISÍTANOS
            ════════════════════════════════════ */}
            <section id="ubicacion" className="footer-visit">
                <div className="footer-visit__inner">
                    <h2 className="footer-visit__title">Visítanos</h2>

                    <div className="footer-visit__grid">
                        {/* Mapa */}
                        <div className="footer-map-wrapper">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d498.71482645908156!2d-78.546053194618!3d-0.4050684679006502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d5a5f978e1fb29%3A0xca3269186358800c!2sEVOGYM!5e0!3m2!1ses!2sec!4v1774389873391!5m2!1ses!2sec"
                                title="Ubicación EvoGym en Google Maps"
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                                className="footer-map"
                            />
                        </div>

                        {/* Horario */}
                        <div className="footer-schedule">
                            <h3 className="footer-schedule__heading">Horario de atención</h3>

                            <table className="footer-schedule__table">
                                <tbody>
                                    {SCHEDULE.map(({ time, shift, days, closed }, i) => (
                                        <tr key={i} className={`footer-schedule__row${closed ? " footer-schedule__row--closed" : ""}`}>
                                            <td className="footer-schedule__time">{time}</td>
                                            <td className="footer-schedule__info">
                                                {shift && (
                                                    <span className="footer-schedule__shift">{shift}</span>
                                                )}
                                                <span className="footer-schedule__days">{days}</span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* ════════════════════════════════════
                FOOTER PRINCIPAL
            ════════════════════════════════════ */}
            <footer className="footer-main">
                <div className="footer-main__inner">

                    {/* Divisor superior */}
                    <div className="footer-divider" />

                    {/* ── Logo + información ── */}
                    <div className="footer-brand">
                        {/*
                          LOGO IMAGE
                          Coloca tu imagen en: public/images/logo/evogym-logo.png
                          (o .svg / .webp — ajusta el src abajo)
                          Tamaño recomendado: 160 × 48 px
                        */}
                        <div className="footer-brand__logo-wrapper">
                            <Image
                                src="/images/logo/evogym-logo.png"
                                alt="EvoGym logo"
                                width={160}
                                height={48}
                                className="footer-brand__logo-img"
                                priority={false}
                            />
                        </div>

                        <p className="footer-brand__phone">098 460 5235</p>
                        <p className="footer-brand__tagline">&ldquo;Sé parte de la evolución&rdquo;</p>
                    </div>

                    {/* Divisor */}
                    <div className="footer-divider" />

                    {/* ── Redes sociales ── */}
                    <div className="footer-social">
                        <h4 className="footer-social__title">Síguenos</h4>
                        <div className="footer-social__icons">
                            {SOCIAL_LINKS.map(({ id, href, label, iconSrc }) => (
                                <a
                                    key={id}
                                    id={`social-${id}`}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="footer-social__btn"
                                >
                                    {/*
                                      Agrega el ícono en: public/icons/{id}.svg
                                      Si no existe aún, verás un círculo vacío.
                                    */}
                                    <img
                                        src={iconSrc}
                                        alt={label}
                                        width={20}
                                        height={20}
                                        className="footer-social__icon"
                                    />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Divisor */}
                    <div className="footer-divider" />

                    {/* ── Navegación ── */}
                    <nav className="footer-nav" aria-label="Navegación en el pie de página">
                        <h4 className="footer-nav__title">Navegación</h4>
                        <ul className="footer-nav__list">
                            {NAV_LINKS.map(({ label, href }) => (
                                <li key={label}>
                                    <a href={href} className="footer-nav__link">{label}</a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </footer>

            {/* ════════════════════════════════════
                ESTILOS
            ════════════════════════════════════ */}
            <style>{`

                /* ── Visítanos section ── */
                .footer-visit {
                    background: #0a0a0a;
                    padding: 4rem 0 3.5rem;
                }

                .footer-visit__inner {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                .footer-visit__title {
                    font-family: var(--font-red-rose), cursive;
                    font-size: clamp(2rem, 4vw, 2.75rem);
                    font-weight: 700;
                    color: #ffffff;
                    margin-bottom: 2rem;
                }

                /* map + schedule side by side */
                .footer-visit__grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 0;
                    border: 1px solid rgba(255,255,255,0.10);
                    border-radius: 10px;
                    overflow: hidden;
                }

                /* ── Map ── */
                .footer-map-wrapper {
                    position: relative;
                    width: 100%;
                    min-height: 280px;
                }

                .footer-map {
                    display: block;
                    width: 100%;
                    height: 100%;
                    min-height: 280px;
                    border: 0;
                }

                /* ── Schedule ── */
                .footer-schedule {
                    background: #111111;
                    padding: 2rem 2rem 2rem 2.25rem;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .footer-schedule__heading {
                    font-family: var(--font-montserrat), system-ui, sans-serif;
                    font-size: 1.1rem;
                    font-weight: 600;
                    color: #ffffff;
                    letter-spacing: 0.03em;
                    margin-bottom: 1.5rem;
                    text-align: center;
                }

                .footer-schedule__table {
                    width: 100%;
                    border-collapse: collapse;
                }

                .footer-schedule__row {
                    border-bottom: 1px solid rgba(255,255,255,0.08);
                }

                .footer-schedule__row:last-child {
                    border-bottom: none;
                }

                .footer-schedule__time,
                .footer-schedule__info {
                    padding: 0.85rem 0.5rem;
                    font-family: var(--font-montserrat), system-ui, sans-serif;
                    font-size: 0.82rem;
                    vertical-align: middle;
                }

                .footer-schedule__time {
                    color: rgba(255,255,255,0.80);
                    font-weight: 400;
                    white-space: nowrap;
                    padding-right: 1rem;
                }

                .footer-schedule__row--closed .footer-schedule__time {
                    color: var(--color-text-secondary, #777);
                }

                .footer-schedule__info {
                    display: flex;
                    flex-direction: column;
                    gap: 2px;
                    text-align: right;
                }

                .footer-schedule__shift {
                    color: #ffffff;
                    font-weight: 600;
                    font-size: 0.82rem;
                }

                .footer-schedule__days {
                    color: var(--color-brand, #60DB00);
                    font-size: 0.76rem;
                    font-weight: 400;
                }

                .footer-schedule__row--closed .footer-schedule__days {
                    color: var(--color-text-secondary, #777);
                }

                /* ── Footer main ── */
                .footer-main {
                    background: #0a0a0a;
                    padding-bottom: 2rem;
                }

                .footer-main__inner {
                    max-width: 860px;
                    margin: 0 auto;
                    padding: 0 2rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0;
                }

                /* ── Divider ── */
                .footer-divider {
                    width: 100%;
                    height: 1px;
                    background: rgba(255,255,255,0.10);
                    margin: 1.75rem 0;
                }

                /* ── Brand ── */
                .footer-brand {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.55rem;
                    padding-top: 0.5rem;
                }

                .footer-brand__logo-wrapper {
                    width: 160px;
                    height: 48px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .footer-brand__logo-img {
                    object-fit: contain;
                    width: 100%;
                    height: 100%;
                }

                .footer-brand__phone {
                    font-family: var(--font-montserrat), system-ui, sans-serif;
                    font-size: 0.875rem;
                    color: var(--color-text-secondary, #777);
                    letter-spacing: 0.04em;
                }

                .footer-brand__tagline {
                    font-family: var(--font-montserrat), system-ui, sans-serif;
                    font-size: 0.85rem;
                    color: var(--color-text-secondary, #777);
                    font-style: italic;
                }

                /* ── Social ── */
                .footer-social {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1.1rem;
                }

                .footer-social__title {
                    font-family: var(--font-red-rose), cursive;
                    font-size: 1.35rem;
                    font-weight: 600;
                    color: #ffffff;
                    letter-spacing: 0.02em;
                }

                .footer-social__icons {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .footer-social__btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 50%;
                    border: 1px solid rgba(255,255,255,0.18);
                    background: rgba(255,255,255,0.04);
                    transition: border-color 0.25s, background 0.25s, transform 0.2s;
                    text-decoration: none;
                }

                .footer-social__btn:hover {
                    border-color: var(--color-brand, #60DB00);
                    background: rgba(96, 219, 0, 0.10);
                    transform: translateY(-2px);
                }

                .footer-social__icon {
                    width: 18px;
                    height: 18px;
                    object-fit: contain;
                    filter: brightness(0) invert(1);
                    transition: filter 0.25s;
                }

                .footer-social__btn:hover .footer-social__icon {
                    filter: brightness(0) saturate(100%) invert(72%) sepia(80%)
                            saturate(500%) hue-rotate(60deg) brightness(105%);
                }

                /* ── Navegación ── */
                .footer-nav {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }

                .footer-nav__title {
                    font-family: var(--font-red-rose), cursive;
                    font-size: 1.35rem;
                    font-weight: 600;
                    color: #ffffff;
                    letter-spacing: 0.02em;
                }

                .footer-nav__list {
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: center;
                    gap: 0.5rem 2rem;
                    list-style: none;
                    margin: 0;
                    padding: 0;
                }

                .footer-nav__link {
                    font-family: var(--font-montserrat), system-ui, sans-serif;
                    font-size: 0.82rem;
                    color: var(--color-text-secondary, #777);
                    text-decoration: none;
                    transition: color 0.22s;
                    letter-spacing: 0.02em;
                }

                .footer-nav__link:hover {
                    color: #ffffff;
                }

                /* ── Copyright ── */
                .footer-copy {
                    font-family: var(--font-montserrat), system-ui, sans-serif;
                    font-size: 0.75rem;
                    color: rgba(255,255,255,0.25);
                    text-align: center;
                    letter-spacing: 0.03em;
                    padding-bottom: 0.5rem;
                }

                /* ════════════════════
                   RESPONSIVE
                ════════════════════ */

                /* Tablet / pequeño */
                @media (max-width: 768px) {
                    .footer-visit__grid {
                        grid-template-columns: 1fr;
                    }

                    .footer-map-wrapper {
                        min-height: 240px;
                    }

                    .footer-map {
                        min-height: 240px;
                    }

                    .footer-schedule {
                        padding: 1.5rem;
                    }

                    .footer-schedule__heading {
                        font-size: 1rem;
                        margin-bottom: 1rem;
                    }
                }

                /* Móvil */
                @media (max-width: 480px) {
                    .footer-visit__title {
                        font-size: 1.75rem;
                    }

                    .footer-schedule__time,
                    .footer-schedule__info {
                        font-size: 0.78rem;
                        padding: 0.7rem 0.25rem;
                    }

                    .footer-nav__list {
                        gap: 0.4rem 1.25rem;
                    }
                }
            `}</style>
        </>
    );
}
