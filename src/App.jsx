import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./pages/About"));
const Services = lazy(() => import("./pages/Services"));
const ServiceDetail = lazy(() => import("./pages/ServiceDetail"));
const WebDesign = lazy(() => import("./pages/WebDesign"));
const MobileApps = lazy(() => import("./pages/MobileApps"));
const DigitalMarketing = lazy(() => import("./pages/DigitalMarketing"));
const Videos = lazy(() => import("./pages/Videos"));
const Portfolio = lazy(() => import("./pages/Portfolio"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services/:slug" element={<ServiceDetail />} />
        <Route path="/web-design" element={<WebDesign />} />
        <Route path="/mobile-apps" element={<MobileApps />} />
        <Route path="/digital-marketing" element={<DigitalMarketing />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
