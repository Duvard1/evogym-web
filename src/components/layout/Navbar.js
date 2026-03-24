"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Instalaciones", href: "#instalaciones" },
  { label: "Suplementos", href: "#suplementos" },
  { label: "Ubicación", href: "#ubicacion" },
  { label: "Membresías", href: "#membresias", highlight: true },
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
              src="/images/logo/evogym-logo.png"
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
                <a
                  href={href}
                  className={`evogym-nav__link${highlight ? " evogym-nav__link--highlight" : ""}`}
                >
                  {label}
                </a>
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
              <a
                href={href}
                className={`evogym-nav__drawer-link${highlight ? " evogym-nav__link--highlight" : ""}`}
                onClick={closeMenu}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* ── Overlay (closes drawer on click outside) ── */}
      {menuOpen && (
        <div
          className="evogym-nav__overlay"
          onClick={closeMenu}
          aria-hidden="true"
        />
      )}

      <style>{`
        /* ─── Tokens ─── */
        :root {
          --nav-height: 64px;
        }

        /* ─── Navbar shell ─── */
        .evogym-nav {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          height: var(--nav-height);

          /* Glassmorphism */
          background: rgba(18, 18, 18, 0.55);
          backdrop-filter: blur(14px) saturate(160%);
          -webkit-backdrop-filter: blur(14px) saturate(160%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        .evogym-nav--scrolled {
          background: rgba(12, 12, 12, 0.78);
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.45);
        }

        /* ─── Inner container ─── */
        .evogym-nav__inner {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          max-width: 1280px;
          margin: 0 auto;
          height: 100%;
          padding: 0 2rem;
        }

        /* ─── Logo ─── */
        .evogym-nav__logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          user-select: none;
          flex-shrink: 0;
        }

        .evogym-nav__logo-img {
          display: block;
          width: auto;
          height: 36px;
          object-fit: contain;
          transition: opacity 0.2s ease;
        }

        .evogym-nav__logo:hover .evogym-nav__logo-img {
          opacity: 0.85;
        }

        /* ─── Desktop link list ─── */
        .evogym-nav__links {
          display: flex;
          align-items: center;
          gap: 2.25rem;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        /* ─── Individual link ─── */
        .evogym-nav__link {
          font-family: var(--font-montserrat), 'Montserrat', system-ui, sans-serif;
          font-size: 0.875rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.82);
          text-decoration: none;
          letter-spacing: 0.02em;
          position: relative;
          transition: color 0.25s ease;
        }

        .evogym-nav__link::after {
          content: "";
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--color-brand, #60DB00);
          border-radius: 2px;
          transition: width 0.28s ease;
        }

        .evogym-nav__link:hover {
          color: #ffffff;
        }

        .evogym-nav__link:hover::after {
          width: 100%;
        }

        /* ─── Highlighted link (Membresías) ─── */
        .evogym-nav__link--highlight {
          color: var(--color-brand, #60DB00) !important;
          font-weight: 600;
        }

        .evogym-nav__link--highlight::after {
          background: var(--color-brand, #60DB00);
        }

        .evogym-nav__link--highlight:hover {
          color: #7ef520 !important;
          text-shadow: 0 0 12px rgba(96, 219, 0, 0.45);
        }

        /* ─── Hamburger button ─── */
        .evogym-nav__hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 38px;
          height: 38px;
          background: transparent;
          border: none;
          cursor: pointer;
          padding: 4px;
          border-radius: 6px;
          transition: background 0.2s;
        }

        .evogym-nav__hamburger:hover {
          background: rgba(255,255,255,0.08);
        }

        .evogym-nav__hamburger span {
          display: block;
          width: 22px;
          height: 2px;
          background: #fff;
          border-radius: 2px;
          transform-origin: center;
          transition: transform 0.3s ease, opacity 0.3s ease, width 0.3s ease;
        }

        /* Animate to × */
        .evogym-nav__hamburger.is-open span:nth-child(1) {
          transform: translateY(7px) rotate(45deg);
        }
        .evogym-nav__hamburger.is-open span:nth-child(2) {
          opacity: 0;
          width: 0;
        }
        .evogym-nav__hamburger.is-open span:nth-child(3) {
          transform: translateY(-7px) rotate(-45deg);
        }

        /* ─── Mobile drawer ─── */
        .evogym-nav__drawer {
          position: fixed;
          top: var(--nav-height);
          left: 0;
          width: 100%;
          z-index: 999;

          background: rgba(12, 12, 12, 0.92);
          backdrop-filter: blur(18px) saturate(150%);
          -webkit-backdrop-filter: blur(18px) saturate(150%);
          border-bottom: 1px solid rgba(255,255,255,0.07);

          max-height: 0;
          overflow: hidden;
          transition: max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1),
                      padding 0.38s ease;
          padding: 0 2rem;
        }

        .evogym-nav__drawer.is-open {
          max-height: 420px;
          padding: 1.25rem 2rem 1.75rem;
        }

        .evogym-nav__drawer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
          margin: 0;
          padding: 0;
        }

        .evogym-nav__drawer-link {
          display: block;
          font-family: var(--font-montserrat), 'Montserrat', system-ui, sans-serif;
          font-size: 1rem;
          font-weight: 500;
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          padding: 0.75rem 0.25rem;
          border-bottom: 1px solid rgba(255,255,255,0.06);
          letter-spacing: 0.02em;
          transition: color 0.2s, padding-left 0.2s;
        }

        .evogym-nav__drawer-link:hover {
          color: #fff;
          padding-left: 0.6rem;
        }

        /* ─── Overlay (mobile) ─── */
        .evogym-nav__overlay {
          position: fixed;
          inset: 0;
          top: var(--nav-height);
          z-index: 998;
          background: rgba(0,0,0,0.3);
        }

        /* ─── Responsive breakpoint ─── */
        @media (max-width: 768px) {
          .evogym-nav__links {
            display: none;
          }

          .evogym-nav__hamburger {
            display: flex;
          }
        }
      `}</style>
    </>
  );
}
