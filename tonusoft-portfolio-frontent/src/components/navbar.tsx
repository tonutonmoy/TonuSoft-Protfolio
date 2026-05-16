"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "./theme-provider";
import { useAuth } from "./auth-provider";

const links = [
  { href: "/services", label: "Services" },
  { href: "/products", label: "Products" },
  { href: "/projects", label: "Projects" },
  { href: "/pricing", label: "Pricing" },
  { href: "/technology", label: "Technology" },
  { href: "/blog", label: "Blog" },
  { href: "/career", label: "Career" },
];

export function Navbar() {
  const { theme, toggle } = useTheme();
  const { user, isAdmin, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav
        className={`flex w-full max-w-7xl items-center justify-between rounded-full border px-4 py-2.5 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-soft" : "glass"
        }`}
      >
        <Link href="/" className="flex items-center pl-2">
          <span className="font-display text-lg font-bold tracking-tight">
            Tonu<span className="text-gradient">Soft</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className="rounded-full px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="relative grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-foreground transition-transform hover:scale-105"
          >
            <motion.span
              key={theme}
              initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
              animate={{ rotate: 0, opacity: 1, scale: 1 }}
              transition={{ duration: 0.35 }}
            >
              {theme === "dark" ? "Light" : "Dark"}
            </motion.span>
          </button>

          {user ? (
            <>
              {isAdmin && (
                <Link
                  href="/dashboard"
                  className="hidden items-center gap-1.5 rounded-full border border-primary/40 px-3 py-2 text-sm font-semibold text-foreground hover:bg-accent sm:inline-flex"
                >
                  Dashboard
                </Link>
              )}
              <button
                onClick={() => signOut()}
                className="hidden items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow sm:inline-flex"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="hidden items-center gap-1.5 rounded-full gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03] sm:inline-flex"
            >
              Login
            </Link>
          )}

          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full border border-border lg:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute left-4 right-4 top-20 rounded-2xl glass-strong p-3 lg:hidden"
        >
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-sm hover:bg-accent"
                >
                  {l.label}
                </Link>
              </li>
            ))}
            <li className="mt-2 border-t border-border pt-2">
              {user ? (
                <>
                  {isAdmin && (
                    <Link href="/dashboard" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm hover:bg-accent">
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => { setOpen(false); signOut(); }}
                    className="block w-full rounded-xl px-4 py-3 text-left text-sm hover:bg-accent"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link href="/login" onClick={() => setOpen(false)} className="block rounded-xl px-4 py-3 text-sm hover:bg-accent">
                  Login
                </Link>
              )}
            </li>
          </ul>
        </motion.div>
      )}
    </motion.header>
  );
}
