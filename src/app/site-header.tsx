"use client";

import { useState } from "react";
import ThemeToggle from "./theme-toggle";

const links = [
  ["Home", "#home"],
  ["Skills", "#skills"],
  ["Experience", "#experience"],
  ["Projects", "#projects"],
  ["Education", "#education"],
] as const;

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  return (
    <header className="topbar">
      <a className="wordmark" href="#home" onClick={closeMenu}>Divyanshu Sharma</a>
      <div className="header-end">
        <nav id="primary-navigation" className={`nav-links${open ? " is-open" : ""}`} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={href} href={href} onClick={closeMenu}>{label}</a>)}
          <a className="nav-cta" href="#contact" onClick={closeMenu}>Let&apos;s talk</a>
        </nav>
        <div className="header-controls">
          <ThemeToggle />
          <button
            className={`mobile-menu-toggle${open ? " is-open" : ""}`}
            type="button"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="primary-navigation"
            onClick={() => setOpen((current) => !current)}
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  );
}
