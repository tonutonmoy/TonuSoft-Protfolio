import Link from "next/link";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";

export function SiteFooter() {
  return (
    <footer className="relative mt-24 border-t border-border">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 md:grid-cols-4">
        <div className="md:col-span-2">
          <span className="font-display text-2xl font-bold">
            Tonu<span className="text-gradient">Soft</span>
          </span>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Building future-ready software for ambitious teams. CRM, POS, SaaS, mobile and AI
            automation — engineered to scale.
          </p>
          <div className="mt-5 flex gap-2">
            {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="grid h-10 w-10 place-items-center rounded-full border border-border bg-surface transition-colors hover:bg-accent"
                aria-label="social"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold">Company</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li><Link href="/" className="hover:text-foreground">Home</Link></li>
            <li><Link href="/about" className="hover:text-foreground">About</Link></li>
            <li><Link href="/services" className="hover:text-foreground">Services</Link></li>
            <li><Link href="/products" className="hover:text-foreground">Products</Link></li>
            <li><Link href="/blog" className="hover:text-foreground">Blog</Link></li>
            <li><Link href="/career" className="hover:text-foreground">Career</Link></li>
            <li><Link href="/contact" className="hover:text-foreground">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-display text-sm font-semibold">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>www.tonutonmoy12@gmail.com</li>
            <li>+880 1732-159683</li>
            <li>Satkhira, Khulna, Bangladesh</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-6 py-5 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} TonuSoft. All rights reserved.</span>
          <span className="font-mono">Crafted with precision · v1.0</span>
        </div>
      </div>
    </footer>
  );
}
