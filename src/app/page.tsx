import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { TrustBadges } from "@/components/site/trust-badges";
import { Modules } from "@/components/site/modules";
import { FormationStats } from "@/components/site/formation-stats";
import { Founders } from "@/components/site/founders";
import { About } from "@/components/site/about";
import { BeforeAfter } from "@/components/site/before-after";
import { Testimonials } from "@/components/site/testimonials";
import { Companies } from "@/components/site/companies";
import { Resources } from "@/components/site/resources";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { WhatsAppButton } from "@/components/site/whatsapp-button";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { SectionDivider } from "@/components/site/section-divider";
import { BackToTop } from "@/components/site/back-to-top";
import { MobileCtaBar } from "@/components/site/mobile-cta-bar";
import { CookieConsent } from "@/components/site/cookie-consent";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <Hero />
        <Stats />
        <TrustBadges />
        <Modules />
        <FormationStats />
        <SectionDivider variant="light-to-soft" />
        <Founders />
        <SectionDivider variant="soft-to-light" />
        <About />
        <SectionDivider variant="light-to-soft" />
        <BeforeAfter />
        <SectionDivider variant="soft-to-light" />
        <Testimonials />
        <Companies />
        <Resources />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
      <BackToTop />
      <MobileCtaBar />
      <CookieConsent />
    </div>
  );
}
