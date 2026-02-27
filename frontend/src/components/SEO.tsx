// ============================================================
// SEO Component - UNIMAXX Soluções em Tecnologia
// Main SEO component for managing all meta tags and schemas
// Uses react-helmet-async for SSR-compatible head management
//
// Usage:
//   import { SEO } from '../components/SEO/SEO';
//   <SEO title="Minha Página" description="..." />
// ============================================================

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { SEO_CONFIG } from '../../config/seo.config';
import { SEOProps } from './types';
import { generateOrganizationSchema } from './schemas/Organization';
import { generateLocalBusinessSchema } from './schemas/LocalBusiness';
import { generateBreadcrumbSchema, breadcrumbsFromPath } from './schemas/Breadcrumb';
import { useLocation } from 'react-router-dom';

interface SEOComponentProps extends SEOProps {
  includeOrganization?: boolean;
  includeLocalBusiness?: boolean;
  includeWebsite?: boolean;
}

export const SEO: React.FC<SEOComponentProps> = ({
  title,
  description,
  keywords,
  canonical,
  noIndex = false,
  noFollow = false,
  ogTitle,
  ogDescription,
  ogImage,
  ogType = 'website',
  ogUrl,
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage,
  schema,
  breadcrumbs,
  hreflang,
  publishedTime,
  modifiedTime,
  author,
  section,
  tags,
  includeOrganization = false,
  includeLocalBusiness = false,
  includeWebsite = false,
}) => {
  const location = useLocation();
  const currentUrl = `${SEO_CONFIG.siteUrl}${location.pathname}`;

  // Build title: truncate to 60 chars with brand suffix
  const pageTitle = title
    ? title.length <= 60
      ? title
      : title.substring(0, 57) + '...'
    : SEO_CONFIG.defaultTitle;

  // Build description: truncate to 160 chars
  const pageDescription = description
    ? description.length <= 160
      ? description
      : description.substring(0, 157) + '...'
    : SEO_CONFIG.defaultDescription;

  const pageKeywords = keywords || SEO_CONFIG.defaultKeywords;
  const pageCanonical = canonical || currentUrl;
  const pageOgImage = ogImage || SEO_CONFIG.og.image;
  const pageOgUrl = ogUrl || currentUrl;

  // Build robots meta content
  const robotsContent = [
    noIndex ? 'noindex' : 'index',
    noFollow ? 'nofollow' : 'follow',
    `max-snippet:${SEO_CONFIG.robots.maxSnippet}`,
    `max-image-preview:${SEO_CONFIG.robots.maxImagePreview}`,
    `max-video-preview:${SEO_CONFIG.robots.maxVideoPreview}`,
  ].join(', ');

  // Build schemas array
  const schemas: object[] = [];

  if (includeOrganization) schemas.push(generateOrganizationSchema());
  if (includeLocalBusiness) schemas.push(generateLocalBusinessSchema());
  if (includeWebsite) {
    schemas.push({
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${SEO_CONFIG.siteUrl}/#website`,
      name: SEO_CONFIG.siteName,
      url: SEO_CONFIG.siteUrl,
      description: SEO_CONFIG.defaultDescription,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SEO_CONFIG.siteUrl}/busca?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    });
  }

  // Add breadcrumbs schema
  const bcItems = breadcrumbs || breadcrumbsFromPath(location.pathname);
  if (bcItems.length > 0) {
    schemas.push(generateBreadcrumbSchema(bcItems));
  }

  // Add custom schemas
  if (schema) {
    if (Array.isArray(schema)) {
      schemas.push(...schema.map((s) => ({ '@context': 'https://schema.org', ...s })));
    } else {
      schemas.push({ '@context': 'https://schema.org', ...schema });
    }
  }

  const activeHreflang = hreflang || SEO_CONFIG.hreflang;

  return (
    <Helmet>
      {/* ===== Primary Meta Tags ===== */}
      <html lang="pt-BR" />
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={pageKeywords.join(', ')} />
      <meta name="robots" content={robotsContent} />
      <meta name="googlebot" content={robotsContent} />
      <meta name="author" content={author || SEO_CONFIG.company.name} />
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="Portuguese" />
      <meta name="revisit-after" content="7 days" />
      <meta name="generator" content="UNIMAXX Platform" />

      {/* ===== Canonical ===== */}
      <link rel="canonical" href={pageCanonical} />

      {/* ===== Hreflang ===== */}
      {activeHreflang.map(({ lang, href }) => (
        <link key={lang} rel="alternate" hrefLang={lang} href={href} />
      ))}

      {/* ===== Open Graph ===== */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={pageOgUrl} />
      <meta property="og:title" content={ogTitle || pageTitle} />
      <meta property="og:description" content={ogDescription || pageDescription} />
      <meta property="og:image" content={pageOgImage} />
      <meta property="og:image:width" content={String(SEO_CONFIG.og.imageWidth)} />
      <meta property="og:image:height" content={String(SEO_CONFIG.og.imageHeight)} />
      <meta property="og:image:alt" content={SEO_CONFIG.og.imageAlt} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content={SEO_CONFIG.og.locale} />

      {/* Article-specific OG tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {section && <meta property="article:section" content={section} />}
      {tags && tags.map((tag) => <meta key={tag} property="article:tag" content={tag} />)}

      {/* ===== Twitter Card ===== */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content={SEO_CONFIG.twitter.site} />
      <meta name="twitter:creator" content={SEO_CONFIG.twitter.creator} />
      <meta name="twitter:url" content={pageOgUrl} />
      <meta name="twitter:title" content={twitterTitle || pageTitle} />
      <meta name="twitter:description" content={twitterDescription || pageDescription} />
      <meta name="twitter:image" content={twitterImage || pageOgImage} />

      {/* ===== Performance hints ===== */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link rel="preconnect" href="https://www.google-analytics.com" />
      <link rel="preconnect" href="https://www.googletagmanager.com" />
      <link rel="dns-prefetch" href="https://maps.googleapis.com" />

      {/* ===== Favicons ===== */}
      <link rel="icon" type="image/x-icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta name="theme-color" content="#1a1a2e" />
      <meta name="msapplication-TileColor" content="#1a1a2e" />

      {/* ===== JSON-LD Schemas ===== */}
      {schemas.map((schema, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(schema, null, 0)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEO;
