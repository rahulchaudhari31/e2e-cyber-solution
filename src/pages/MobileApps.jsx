import { AppWindow, Layers3, Smartphone, Sparkles } from "lucide-react";
import ServiceLanding from "../components/inner/ServiceLanding";
import { PhoneMockup } from "../components/inner/ServiceVisuals";
import { getGroupBySlug, getServiceBySlug } from "../data/content";
import { placeholderImages } from "../data/placeholders";

const service = getServiceBySlug("mobile-apps");
const group = getGroupBySlug(service.group);

const features = [
  {
    title: "Native mobile apps",
    text: "Designed to be native to one platform and optimised for the best possible user experience.",
    icon: Smartphone,
  },
  {
    title: "iPhone Apps",
    text: "A considered iOS experience that feels at home on the device and the people using it.",
    icon: AppWindow,
  },
  {
    title: "Android Apps",
    text: "A dedicated Android build shaped around your business, your audience and their needs.",
    icon: Layers3,
  },
  {
    title: "Hybrid mobile apps",
    text: "Built with HTML5 and ideal for businesses that mainly deal in content.",
    icon: Sparkles,
  },
];

export default function MobileApps() {
  return (
    <ServiceLanding
      service={service}
      group={group}
      visual={
        <PhoneMockup
          primary={placeholderImages.mobileAppPrimary}
          secondary={placeholderImages.mobileAppSecondary}
        />
      }
      tags={["Native", "iPhone", "Android", "Hybrid"]}
      accent="meadow"
      features={features}
      featureEyebrow="App capabilities"
      featureTitle="Functional, intensively-tested apps."
      featureDescription="Your app and your website, working as one connected digital experience."
    />
  );
}
