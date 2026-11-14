import {
  BarChart3,
  FileText,
  Mail,
  Palette,
  PenTool,
  Search,
  Share2,
} from "lucide-react";
import ServiceLanding from "../components/inner/ServiceLanding";
import { MarketingMockup } from "../components/inner/ServiceVisuals";
import { getGroupBySlug, getServiceBySlug } from "../data/content";
import { placeholderImages } from "../data/placeholders";

const service = getServiceBySlug("digital-marketing");
const group = getGroupBySlug(service.group);

const readService = (slug) => getServiceBySlug(slug);

const marketingServices = [
  {
    slug: "digital-strategy",
    title: "Digital Strategy",
    icon: PenTool,
  },
  { slug: "seo", title: "SEO", icon: Search },
  { slug: "social-media", title: "Social Media", icon: Share2 },
  { slug: "content-writing", title: "Content", icon: FileText },
  { slug: "email-marketing", title: "Email Marketing", icon: Mail },
  {
    slug: "analytics-or-growth-marketing",
    title: "Analytics / Growth",
    icon: BarChart3,
  },
  { slug: "graphic-design", title: "Graphic Design", icon: Palette },
];

const features = marketingServices.map((item) => {
  const detail = readService(item.slug);

  return {
    title: item.title,
    text: detail.excerpt,
    icon: item.icon,
  };
});

export default function DigitalMarketing() {
  return (
    <ServiceLanding
      service={service}
      group={group}
      visual={
        <MarketingMockup image={placeholderImages.marketingDashboard} />
      }
      tags={["Strategy", "SEO", "Social", "Content", "Email", "Analytics"]}
      accent="clay"
      features={features}
      featureEyebrow="Digital marketing services"
      featureTitle="Every channel, connected."
      featureDescription="Choose any combination of services, at any stage of your business."
    />
  );
}
