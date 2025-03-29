import { seoConfig } from "./seo-config";

// Generate LocalBusiness structured data for rich search results
export const generateLocalBusinessSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FoodService",
    name: "Chef Valerio Carlos",
    description: seoConfig.defaultDescription,
    image: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
    url: seoConfig.siteUrl,
    telephone: "+33 1 23 45 67 89",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Paris",
      addressCountry: "FR",
    },
    priceRange: "€€€",
    servesCuisine: "Brazilian",
    areaServed: "Paris",
    sameAs: [
      "https://instagram.com/chefvaleriocarlos",
      // Add other social media profiles here
    ],
  };
};

// Generate Person structured data
export const generatePersonSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Valerio Carlos",
    jobTitle: "Chef",
    worksFor: {
      "@type": "Organization",
      name: "Chef Valerio Carlos",
    },
    description:
      "Brazilian chef specialized in authentic South American cuisine.",
    image: `${seoConfig.siteUrl}${seoConfig.defaultImage}`,
    nationality: {
      "@type": "Country",
      name: "Brazil",
    },
    knowsLanguage: ["Portuguese", "English", "French"],
  };
};

// Generate FoodEstablishment schema
export const generateFoodEstablishmentSchema = () => {
  return {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: "Chef Valerio Carlos",
    servesCuisine: "Brazilian",
    menu: `${seoConfig.siteUrl}/#menu`,
    hasMenu: {
      "@type": "Menu",
      description: "Authentic Brazilian cuisine by Chef Valerio Carlos",
      hasMenuSection: [
        {
          "@type": "MenuSection",
          name: "Main Dishes",
          hasMenuItem: [
            {
              "@type": "MenuItem",
              name: "Feijoada",
              description: "Traditional black bean stew with pork and beef",
            },
            {
              "@type": "MenuItem",
              name: "Moqueca",
              description:
                "Seafood stew with coconut milk, tomatoes, and spices",
            },
          ],
        },
      ],
    },
  };
};
