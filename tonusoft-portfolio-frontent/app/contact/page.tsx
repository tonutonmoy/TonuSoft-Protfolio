import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - TonuSoft',
  description: 'Get in touch with TonuSoft. We would love to hear from you.',
};

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24">
      <div className="mx-auto max-w-4xl px-6">
        <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
        <p className="text-lg text-muted-foreground mb-8">
          Have a project in mind? We would love to hear from you.
        </p>
        
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Email</h3>
                <a href="mailto:info@tonusoft.com" className="text-primary hover:text-primary/80">
                  info@tonusoft.com
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                <a href="tel:+880" className="text-primary hover:text-primary/80">
                  +880 XXX XXX XXXX
                </a>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Location</h3>
                <p className="text-muted-foreground">Bangladesh</p>
              </div>
            </div>
          </div>
          
          <div>
            <h2 className="text-2xl font-semibold mb-6">Send us a Message</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  className="w-full px-4 py-2 rounded-lg border border-border bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={4}
                  placeholder="Your message"
                />
              </div>
              <button
                type="submit"
                className="w-full gradient-primary text-primary-foreground font-semibold py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
