import HomeCTA from "../home/HomeCTA";
import Seo from "../seo/Seo";
import { site } from "../../data/content";
import ServiceHero from "./ServiceHero";
import {
  FeatureGrid,
  ProcessSection,
  ServiceStory,
  TestimonialsBand,
} from "./ServiceSections";

export default function ServiceLanding({
  service,
  group,
  visual,
  tags = [],
  accent = "blue",
  features = [],
  featureEyebrow,
  featureTitle,
  featureDescription,
  subServices = [],
}) {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    serviceType: group.title,
    description: service.excerpt,
    url: `${site.url}${service.route}`,
    provider: { "@id": `${site.url}/#organization` },
    areaServed: { "@type": "City", name: site.address.city },
  };

  return (
    <>
      <Seo
        title={service.title}
        description={service.excerpt}
        path={service.route}
        jsonLd={serviceSchema}
      />
      <ServiceHero
        service={service}
        group={group}
        visual={visual}
        tags={tags}
        accent={accent}
      />
      <ServiceStory service={service} subServices={subServices} />
      {features.length ? (
        <FeatureGrid
          eyebrow={featureEyebrow}
          title={featureTitle}
          description={featureDescription}
          items={features}
        />
      ) : null}
      <ProcessSection />
      <TestimonialsBand />
      <HomeCTA />
    </>
  );
}
