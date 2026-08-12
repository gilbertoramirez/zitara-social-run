import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import Hero from "@/components/landing/hero";
import RoutesSection from "@/components/landing/routes-section";
import ScheduleSection from "@/components/landing/schedule-section";
import AmenitiesSection from "@/components/landing/amenities-section";
import CtaSection from "@/components/landing/cta-section";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <RoutesSection />
        <ScheduleSection />
        <AmenitiesSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  );
}
