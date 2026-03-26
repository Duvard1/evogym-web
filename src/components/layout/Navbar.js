"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import "./Navbar.css";
const NAV_LINKS = [
  { label: "Servicios", href: "/#servicios" },
  { label: "Instalaciones", href: "/#instalaciones" },
  { label: "Suplementos", href: "/#suplementos" },
  { label: "Ubicación", href: "/#ubicacion" },
  { label: "Membresías", href: "/#membresias", highlight: true },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  /* Shade the glass slightly on scroll */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className={`evogym-nav${scrolled ? " evogym-nav--scrolled" : ""}`}>
        <div className="evogym-nav__inner">

          {/* ── Logo ── */}
          <Link href="/" className="evogym-nav__logo" aria-label="EvoGym inicio">
            <Image
              src="/images/logo/evogym-logo.webp"
              alt="EvoGym"
              width={140}
              height={40}
              className="evogym-nav__logo-img"
              priority
            />
          </Link>

          {/* ── Desktop links ── */}
          <ul className="evogym-nav__links">
            {NAV_LINKS.map(({ label, href, highlight }) => (
              <li key={label}>
                <Link
                  href={href}
                  className={`evogym-nav__link${highlight ? " evogym-nav__link--highlight" : ""}`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>

          {/* ── Hamburger (mobile) ── */}
          <button
            id="navbar-hamburger"
            className={`evogym-nav__hamburger${menuOpen ? " is-open" : ""}`}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* ── Mobile drawer ── */}
      <div
        className={`evogym-nav__drawer${menuOpen ? " is-open" : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className="evogym-nav__drawer-links">
          {NAV_LINKS.map(({ label, href, highlight }) => (
            <li key={label}>
              <Link
                href={href}
                className={`evogym-nav__drawer-link${highlight ? " evogym-nav__link--highlight" : ""}`}
                onClick={closeMenu}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

    </>
  );
}
