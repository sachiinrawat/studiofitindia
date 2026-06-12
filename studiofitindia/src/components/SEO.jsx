import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function SEO({ title, description, keywords = [], schema = null }) {
  const siteName = "Studio FIT India";
  const siteUrl = "https://studiofitindia.com";
  const defaultImg = `${siteUrl}/assets/og-image.jpg`;

  const fullTitle = title
      ? `${title} | ${siteName}`
      : `${siteName} — Online Fitness Studio India`;

  const metaDesc =
      description ||
      "Join Studio FIT India — India's leading online live fitness studio. Expert-led Yoga, HIIT, Zumba, Strength Training & more. Live classes daily. Book a trial at just ₹1 today!";

  const keywordStr =
      keywords.length > 0
          ? keywords.join(", ")
          : "online fitness studio, online gym India, online yoga classes, fitness classes India, live workout classes, Studio FIT India";

  // strip query params and trailing slash (except root "/")
  const rawUrl = typeof window !== 'undefined' ? window.location.href.split("?")[0] : siteUrl;
  const canonicalUrl = rawUrl.length > 1 ? rawUrl.replace(/\/+$/, '') : rawUrl;

  const finalSchema = schema || {
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: fullTitle,
      description: metaDesc,
      url: canonicalUrl,
      publisher: {
          "@type": "Organization",
          name: siteName,
          url: siteUrl,
          logo: {
              "@type": "ImageObject",
              url: "https://res.cloudinary.com/dvrwadsfh/image/upload/v1777445549/image_ks0v7p.png",
          },
      },
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={metaDesc} />
      <meta name='keywords' content={keywordStr} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content={siteName} />

      {/* Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph tags */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:image" content={defaultImg} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_IN" />
      
      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={defaultImg} />
      <meta name="twitter:site" content="@StudioFITIndia" />

      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(finalSchema)}
      </script>
    </Helmet>
  );
}
