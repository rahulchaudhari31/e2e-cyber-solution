import { LayoutGrid, MonitorSmartphone, Palette } from "lucide-react";
import ServiceLanding from "../components/inner/ServiceLanding";
import { BrowserMockup } from "../components/inner/ServiceVisuals";
import { getGroupBySlug, getServiceBySlug } from "../data/content";
import { placeholderImages } from "../data/placeholders";

const service = getServiceBySlug("web-design");
const group = getGroupBySlug(service.group);

const features = [
  {
    title: service.highlights[0],
    text: "A good website design has two pillars—branding, and consumers. The visual direction starts with your brand.",
    icon: Palette,
  },
  {
    title: service.highlights[1],
    text: "Our web design facilitates the user-journey with a design that is functional and easy on the eyes.",
    icon: LayoutGrid,
  },
  {
    title: service.highlights[2],
    text: "Responsive to all screen sizes, so every visitor gets the same considered experience.",
    icon: MonitorSmartphone,
  },
];

export default function WebDesign() {
  return (
    <ServiceLanding
      service={service}
      group={group}
      visual={<BrowserMockup image={placeholderImages.webDesignMockup} />}
      tags={["Responsive design", "UX & UI", "Brand-led"]}
      features={features}
      featureEyebrow="Design principles"
      featureTitle="A website with two pillars: branding and consumers."
      featureDescription="Creative passion and razor-sharp focus across every digital aspect of your brand."
    />
  );
}
