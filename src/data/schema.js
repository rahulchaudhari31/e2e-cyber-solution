import { site } from "./content";

export const DEFAULT_IMAGE = "/og-image.png";

export function absoluteUrl(value) {
  if (/^https?:\/\//i.test(value)) return value;
  return `${site.url}${value.startsWith("/") ? value : `/${value}`}`;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${site.url}/#organization`,
  name: site.name,
  url: site.url,
  logo: absoluteUrl("/favicon.png"),
  image: absoluteUrl(DEFAULT_IMAGE),
  description: site.description,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.line1,
    addressLocality: site.address.city,
    postalCode: site.address.postcode,
    addressCountry: "GB",
  },
  areaServed: {
    "@type": "City",
    name: site.address.city,
  },
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.description,
  publisher: { "@id": `${site.url}/#organization` },
  inLanguage: "en-GB",
};
