import Image from "next/image";
import Link from "next/link";
import "./Footer.css";
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
    { label: "Servicios", href: "/#servicios" },
    { label: "Instalaciones", href: "/#instalaciones" },
    { label: "Membresías", href: "/#membresias" },
    { label: "Suplementos", href: "/#suplementos" },
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

                        <div className="footer-brand__logo-wrapper">
                            <Image
                                src="/images/logo/evogym-logo.webp"
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
                                    <Link href={href} className="footer-nav__link">{label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
            </footer>
        </>
    );
}
