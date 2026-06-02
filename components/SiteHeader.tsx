"use client";

import { Mail, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  { label: "Profile", href: "#profile" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Featured", href: "#featured" },
  { label: "Reflection", href: "#reflection" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader({ email }: { email: string }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-bg-secondary/95 backdrop-blur">
      <nav
        className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6"
        aria-label="Primary"
      >
        <a
          href="#profile"
          className="font-display text-2xl font-bold text-accent"
          aria-label="Kelechi Uba profile"
          onClick={() => setIsOpen(false)}
        >
          KU
        </a>

        <ul className="hidden items-center gap-5 lg:flex">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="text-sm text-text-secondary transition-colors hover:text-text-primary"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${email}`}
            aria-label="Email Kelechi Uba"
            className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-bg-primary transition-colors hover:bg-accent-dim sm:h-auto sm:w-auto sm:gap-2 sm:px-3 sm:py-2 sm:text-sm sm:font-semibold"
          >
            <Mail size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Contact</span>
          </a>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-bg-card text-text-primary transition-colors hover:border-border-bright lg:hidden"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-controls="mobile-navigation"
            aria-expanded={isOpen}
            onClick={() => setIsOpen((open) => !open)}
          >
            {isOpen ? (
              <X size={18} aria-hidden="true" />
            ) : (
              <Menu size={18} aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <div
        id="mobile-navigation"
        className={`border-t border-border bg-bg-secondary lg:hidden ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul className="mx-auto grid max-w-6xl grid-cols-2 gap-2 px-6 py-3">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="block rounded-md border border-border bg-bg-card px-3 py-2 text-sm text-text-secondary transition-colors hover:border-border-bright hover:text-text-primary"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
