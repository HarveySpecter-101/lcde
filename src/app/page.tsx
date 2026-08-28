import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { TrustBadges } from "@/components/site/trust-badges";
import { Modules } from "@/components/site/modules";
import { FormationStats } from "@/components/site/formation-stats";
import { Intervenants } from "@/components/site/intervenants";
import { Founders } from "@/components/site/founders";
import { BeforeAfter } from "@/components/site/before-after";
import { SuccessStories } from "@/components/site/success-stories";
import { Resources } from "@/components/site/resources";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { SectionDivider } from "@/components/site/section-divider";
import { BackToTop } from "@/components/site/back-to-top";
import { PersistentCtaBar } from "@/components/site/persistent-cta-bar";


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
        <Intervenants />
        <SectionDivider variant="soft-to-light" />
        <Founders />
        <SectionDivider variant="light-to-soft" />
        <BeforeAfter />
        <SectionDivider variant="soft-to-light" />
        <SuccessStories />
        <Resources />
        <Contact />
      </main>
      <Footer />
      <PersistentCtaBar />
      <BackToTop />
    </div>
  );
}
