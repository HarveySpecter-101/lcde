import { Header } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Stats } from "@/components/site/stats";
import { HiringCompanies } from "@/components/site/hiring-companies";
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
        <HiringCompanies />
        <SectionDivider variant="light-to-navy" />
        <Modules />
        <FormationStats />
        <Intervenants />
        <SectionDivider variant="light-to-navy" />
        <Founders />
        <SectionDivider variant="navy-to-light" />
        <BeforeAfter />
        <SectionDivider className="text-[#e6f2ff] dark:text-[#14182a]" />
        <SuccessStories />
        <SectionDivider variant="light-to-soft" className="bg-[#ffebf0] dark:bg-transparent" />
        <Resources />
        <SectionDivider variant="soft-to-navy" />
        <Contact />
      </main>
      <Footer />
      <PersistentCtaBar />
      <BackToTop />
    </div>
  );
}
