import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Preloader from "./Preloader";
import ScrollToTop from "./ScrollToTop";
import CustomCursor from "../ui/CustomCursor";
import PageTransition from "../ui/PageTransition";
import ScrollProgress from "../ui/ScrollProgress";
import SectionDivider from "../ui/SectionDivider";
import RouteFallback from "../ui/RouteFallback";
import styles from "./Layout.module.css";

export default function Layout() {
  return (
    <div className={styles.shell}>
      <Preloader />
      <ScrollProgress />
      <CustomCursor />
      <ScrollToTop />
      <Navbar />
      <main className={styles.main}>
        <PageTransition>
          <Suspense fallback={<RouteFallback />}>
            <Outlet />
          </Suspense>
        </PageTransition>
      </main>
      <SectionDivider
        from="var(--cream)"
        to="var(--navy)"
        variant="torn"
        height={72}
      />
      <Footer />
    </div>
  );
}
