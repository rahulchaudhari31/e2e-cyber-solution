import { Helmet } from "react-helmet-async";
import { site } from "../../data/content";
import { absoluteUrl, DEFAULT_IMAGE } from "../../data/schema";

export default function Seo({
  title,
  description = site.description,
  path = "/",
  image = DEFAULT_IMAGE,
  type = "website",
  noIndex = false,
  jsonLd,
}) {
  const pageTitle = title
    ? `${title} | ${site.name}`
    : `${site.name} | ${site.title}`;
  const canonical = absoluteUrl(path);
  const imageUrl = absoluteUrl(image);
  const schema = Array.isArray(jsonLd) ? jsonLd : jsonLd ? [jsonLd] : [];

  return (
    <Helmet prioritizeSeoTags>
      <html lang="en-GB" />
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}
      />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={site.name} />
      <meta property="og:locale" content="en_GB" />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={`${site.name} — ${site.title}`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schema.map((item, index) => (
        <script key={item["@type"] || index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
}
