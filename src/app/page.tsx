import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { CertifiedPartners } from "@/components/site/certified-partners";
import { HiringCompanies } from "@/components/site/hiring-companies";
import { PracticeSection } from "@/components/site/practice-section";
import { Modules } from "@/components/site/modules";
import { WhatYouGain } from "@/components/site/what-you-gain";
import { Intervenants } from "@/components/site/intervenants";
import { Founders } from "@/components/site/founders";
import { BeforeAfter } from "@/components/site/before-after";
import { SuccessStories } from "@/components/site/success-stories";
import { Contact } from "@/components/site/contact";
import { Footer } from "@/components/site/footer";
import { ScrollProgress } from "@/components/site/scroll-progress";
import { SectionDivider } from "@/components/site/section-divider";
import { BackToTop } from "@/components/site/back-to-top";
import { PersistentCtaBar } from "@/components/site/persistent-cta-bar";
import { GlobalCanvas } from "@/components/site/global-canvas";

import { SiteTracker } from "@/components/site/tracker";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden">
      {/* ── Invisible visitor tracker ── */}
      <SiteTracker />
      {/* ── Global interactive background — fixed, z:-1, full page ── */}
      <GlobalCanvas />
      <ScrollProgress />
      <Header />
      <main className="flex-1">
        <Hero />
        <SectionDivider variant="soft-to-light" />
        <CertifiedPartners />
        <SectionDivider variant="light-to-soft" />
        <HiringCompanies />
        <SectionDivider variant="soft-to-light" />
        <PracticeSection />
        <SectionDivider variant="light-to-navy" />
        <Modules />
        <SectionDivider variant="navy-to-soft" />
        <WhatYouGain />
        <SectionDivider variant="soft-to-light" />
        <Intervenants />
        <SectionDivider variant="light-to-soft" />
        <BeforeAfter />
        <SuccessStories />
        <SectionDivider variant="light-to-navy" />
        <Founders />
        <Contact />
      </main>
      <Footer />
      <PersistentCtaBar />
      <BackToTop />
    </div>
  );
}
