import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import ServiceLanding from "../components/inner/ServiceLanding";
import {
  AbstractServiceVisual,
  BrowserMockup,
  MarketingMockup,
  PhoneMockup,
} from "../components/inner/ServiceVisuals";
import { getGroupBySlug, getServiceBySlug } from "../data/content";
import { placeholderImages } from "../data/placeholders";
import NotFound from "./NotFound";

const accents = {
  "design-and-development": "blue",
  "digital-marketing": "clay",
  creative: "meadow",
};

function ServiceVisual({ service }) {
  if (service.group === "digital-marketing") {
    return (
      <MarketingMockup image={placeholderImages.marketingDashboard} />
    );
  }

  if (service.group === "creative") {
    const image =
      service.slug === "videos"
        ? placeholderImages.videoPosters[0]
        : placeholderImages.serviceFallbacks.creative;

    return <AbstractServiceVisual image={image} label={service.groupTitle} />;
  }

  if (service.slug === "mobile-apps") {
    return (
      <PhoneMockup
        primary={placeholderImages.mobileAppPrimary}
        secondary={placeholderImages.mobileAppSecondary}
      />
    );
  }

  return (
    <BrowserMockup
      image={
        service.slug === "design-and-development"
          ? placeholderImages.webDesignMockup
          : placeholderImages.serviceFallbacks["design-and-development"]
      }
    />
  );
}

export default function ServiceDetail({ serviceSlug }) {
  const { slug: paramSlug } = useParams();
  const slug = serviceSlug || paramSlug;
  const service = getServiceBySlug(slug);

  if (!service) {
    return <NotFound />;
  }

  const group = getGroupBySlug(service.group);
  const isGroupPage = group.slug === service.slug;

  const features = (service.highlights || []).map((highlight) => ({
    title: highlight,
    icon: CheckCircle2,
  }));

  return (
    <ServiceLanding
      service={service}
      group={group}
      visual={<ServiceVisual service={service} />}
      accent={accents[group.slug] || "blue"}
      features={features}
      featureEyebrow="What's included"
      featureTitle={service.highlightsTitle || "Built around your business."}
      subServices={isGroupPage ? group.services : []}
    />
  );
}
