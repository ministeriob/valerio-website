import { Helmet } from "react-helmet-async";
import { seoConfig } from "../lib/seo-config";
import {
  generateLocalBusinessSchema,
  generatePersonSchema,
  generateFoodEstablishmentSchema,
} from "../lib/structured-data";

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  section?: "home" | "about" | "services" | "menu" | "contact";
}

export default function SEO({
  title = seoConfig.defaultTitle,
  description = seoConfig.defaultDescription,
  image = seoConfig.defaultImage,
  url = seoConfig.siteUrl,
  type = "website",
  section,
}: SEOProps) {
  // If a section is specified, use its specific SEO config
  const seoTitle = section
    ? `${seoConfig.defaultTitle} | ${
        section.charAt(0).toUpperCase() + section.slice(1)
      }`
    : title;

  // Get the full image URL
  const imageUrl = image.startsWith("http")
    ? image
    : `${seoConfig.siteUrl}${image}`;

  // For canonical URL
  const canonicalUrl = `${seoConfig.siteUrl}${section ? `/#${section}` : ""}`;

  // Generate structured data based on the section
  const getStructuredData = () => {
    // Default structured data for all pages
    const schemas = [generateLocalBusinessSchema()];

    // Add schema based on section
    if (section === "about") {
      schemas.push(generatePersonSchema());
    } else if (section === "menu") {
      schemas.push(generateFoodEstablishmentSchema());
    }

    return schemas.map((schema, index) => (
      <script
        key={`structured-data-${index}`}
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    ));
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{seoTitle}</title>
      <meta name="title" content={seoTitle} />
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:locale" content={seoConfig.locale} />
      <meta
        property="og:site_name"
        content={seoConfig.defaultTitle.split(" - ")[0]}
      />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={seoTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      {seoConfig.twitterHandle && (
        <meta property="twitter:creator" content={seoConfig.twitterHandle} />
      )}

      {/* Structured Data */}
      {getStructuredData()}
    </Helmet>
  );
}
