"use client";

import Head from "next/head";

interface SEOProps {
  title?: string;
  description?: string;
  structuredData?: object;
}

export function SEO({ title, description, structuredData }: SEOProps) {
  return (
    <Head>
      {title && <title>{title}</title>}
      {description && <meta name="description" content={description} />}
      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      )}
    </Head>
  );
}