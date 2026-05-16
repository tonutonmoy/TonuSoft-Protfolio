"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, MessageCircle, Phone, Send } from "lucide-react";
import { useState } from "react";

export function Contact() {
  const [sent, setSent] = useState(false);
  return (
    <section id="contact" className="relative py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 text-center">
          <div className="font-mono text-xs uppercase tracking-[0.3em] text-primary">Contact</div>
          <h2 className="mt-3 font-display text-4xl font-bold md:text-5xl">
            Let's build <span className="text-gradient">something great</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground">
            Tell us about your project. We typically respond within a few hours.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-5">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-4"
          >
            {[
              { icon: Mail, label: "Email", value: "tonutonmoy12@gmail.com" },
              { icon: Phone, label: "Phone", value: "+880 1732-159683" },
              { icon: MessageCircle, label: "WhatsApp", value: "+880 1732-159683" },
              { icon: MapPin, label: "Location", value: "Satkhira, Khulna, Bangladesh · Munshipara" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="glass flex items-center gap-4 rounded-2xl p-5">
                  <span className="grid h-11 w-11 place-items-center rounded-xl gradient-primary text-primary-foreground shadow-glow">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-muted-foreground">{c.label}</div>
                    <div className="font-medium">{c.value}</div>
                  </div>
                </div>
              );
            })}

            <div className="glass overflow-hidden rounded-2xl">
              <iframe
                title="Map"
                className="h-48 w-full"
                loading="lazy"
                src="https://www.openstreetmap.org/export/embed.html?bbox=88.8,22.3,89.2,22.8&layer=mapnik&marker=22.7,89.0"
              />
            </div>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onSubmit={(e) => {
              e.preventDefault();
              setSent(true);
            }}
            className="md:col-span-3 glass rounded-3xl p-6 md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Your name" type="text" name="name" />
              <Field label="Email" type="email" name="email" />
            </div>
            <div className="mt-4">
              <Field label="Subject" type="text" name="subject" />
            </div>
            <div className="mt-4">
              <label className="block text-xs uppercase tracking-widest text-muted-foreground">Message</label>
              <textarea
                rows={5}
                className="mt-2 w-full resize-none rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
                placeholder="Tell us about your project…"
              />
            </div>
            <button
              type="submit"
              className="mt-6 inline-flex items-center gap-2 rounded-full gradient-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow transition-transform hover:scale-[1.03]"
            >
              {sent ? "Sent — we'll be in touch" : "Send message"}
              <Send className="h-4 w-4" />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

function Field({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="block">
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <input
        {...props}
        className="mt-2 w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none transition-all focus:border-primary focus:ring-2 focus:ring-primary/30"
      />
    </label>
  );
}