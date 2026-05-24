import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Providers } from '../src/components/providers';
import { createMetadata, siteUrl } from '../src/lib/seo';

const inter = Inter({ subsets: ['latin'] });
const googleAnalyticsId = 'G-T22TWK5BFJ';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  ...createMetadata(),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <head>
        <meta
          name="facebook-domain-verification"
          content="7j2h86vkfcjmbkewvy2f1rmkmbcwoh"
        />
      </head>

      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}');
        `}
      </Script>

      <body className={inter.className} suppressHydrationWarning>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}