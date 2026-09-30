"use client";

import Image from "next/image";
import { Reveal } from "@/components/site/reveal";
import { SectionDecor } from "@/components/site/section-decor";

const LOGOS = [
  { name: "Deloitte", src: "/logos/deloitte.svg" },
  { name: "KPMG", src: "/logos/kpmg.svg" },
  { name: "PwC", src: "/logos/pwc.svg" },
  { name: "EY", src: "/logos/ey.svg" },
  { name: "BDO", src: "/logos/bdo.svg" },
  { name: "Grant Thornton", src: "/logos/grant-thornton.svg" },
  { name: "Danone", src: "/logos/companieslogo/danone.svg" },
  { name: "Royal Air Maroc", src: "/logos/royal-air-maroc.svg" },
  { name: "Coca-Cola", src: "/logos/coca-cola.svg" },
  { name: ",;b", src: "/logos/entreprises/,;b.png" },
  { name: "bgfgn", src: "/logos/entreprises/bgfgn.png" },
  { name: "cd", src: "/logos/entreprises/cd.png" },
  { name: "csdhjkjch", src: "/logos/entreprises/csdhjkjch.jpg" },
  { name: "dfnj", src: "/logos/entreprises/dfnj.png" },
  { name: "dfrfyjyu", src: "/logos/entreprises/dfrfyjyu.jpg" },
  { name: "djhs", src: "/logos/entreprises/djhs.jpg" },
  { name: "download", src: "/logos/entreprises/download.jpg" },
  { name: "Nestlé", src: "/logos/companieslogo/nestle.svg" },
  { name: "Banque Populaire", src: "/logos/user-partners/banque-populaire.jpeg" },
  { name: "ONCF", src: "/logos/user-partners/oncf.jpeg" },
  { name: "LabelVie", src: "/logos/user-partners/label-vie.jpeg" },
  { name: "Marjane", src: "/logos/user-partners/marjane.jpeg" },
  { name: "LafargeHolcim", src: "/logos/user-partners/lafarge-holcim.jpeg" },
  { name: "El Maguiri", src: "/logos/user-partners/el-maguiri.webp" },
  { name: "OmniPact", src: "/logos/user-partners/omnipact.jpeg" },
  { name: "Moore Stephens", src: "/logos/user-partners/moore.jpeg" },
  { name: "Coopers Audit Maroc", src: "/logos/user-partners/coopers-audit.png" },
  { name: "SGTM", src: "/logos/user-partners/sgtm.jpeg" },
  { name: "Bontaz", src: "/logos/user-partners/bontaz.jpeg" },
  { name: "BMCI", src: "/logos/user-partners/bmci.jpeg" },
  { name: "CIH", src: "/logos/user-partners/cih.jpeg" },
  { name: "Afriquia", src: "/logos/user-partners/afriquia.jpeg" },
  { name: "Bank of Africa / BMCE", src: "/logos/user-partners/bank-of-africa.jpeg" },
  { name: "Maghreb Steel", src: "/logos/user-partners/maghreb-steel.jpeg" },
  { name: "Parker Russell", src: "/logos/user-partners/parker-russell.png" },
  { name: "Upsilon Consulting", src: "/logos/user-partners/upsilon.png" },
  { name: "Vivo Energy", src: "/logos/user-partners/vivo-energy.png" },
  { name: "Valoris", src: "/logos/user-partners/valoris.jpeg" },
  { name: "dv", src: "/logos/entreprises/dv.png" },
  { name: "edhn", src: "/logos/entreprises/edhn.jpg" },
  { name: "fghdyj", src: "/logos/entreprises/fghdyj.png" },
  { name: "fidaroc", src: "/logos/entreprises/fidaroc.jpeg" },
  { name: "fvsgbg", src: "/logos/entreprises/fvsgbg.jpg" },
  { name: "fvvv", src: "/logos/entreprises/fvvv.png" },
  { name: "TAQA Morocco", src: "/logos/companieslogo/taqa-morocco.svg" },
  { name: "gh", src: "/logos/entreprises/gh.png" },
  { name: "hgv", src: "/logos/entreprises/hgv.jpg" },
  { name: "hn;jk", src: "/logos/entreprises/hn;jk.png" },
  { name: "hvn;", src: "/logos/entreprises/hvn;.jpg" },
  { name: "images", src: "/logos/entreprises/images.png" },
  { name: "j,f,", src: "/logos/entreprises/j,f,.png" },
  { name: "j", src: "/logos/entreprises/j.png" },
  { name: "jghk", src: "/logos/entreprises/jghk.png" },
  { name: "jield", src: "/logos/entreprises/jield.jpg" },
  { name: "jknfvx", src: "/logos/entreprises/jknfvx.jpg" },
  { name: "jnhf", src: "/logos/entreprises/jnhf.jpg" },
  { name: "k", src: "/logos/entreprises/k.png" },
  { name: "kdjch", src: "/logos/entreprises/kdjch.png" },
  { name: "khcd", src: "/logos/entreprises/khcd.jpg" },
  { name: "kjd", src: "/logos/entreprises/kjd.jpg" },
  { name: "kjfv", src: "/logos/entreprises/kjfv.jpg" },
  { name: "kjhd", src: "/logos/entreprises/kjhd.jpg" },
  { name: "kjhde", src: "/logos/entreprises/kjhde.png" },
  { name: "kjhfv", src: "/logos/entreprises/kjhfv.png" },
  { name: "kjhlfd", src: "/logos/entreprises/kjhlfd.png" },
  { name: "kjhlv", src: "/logos/entreprises/kjhlv.png" },
  { name: "kjhsd", src: "/logos/entreprises/kjhsd.png" },
  { name: "kjhvf", src: "/logos/entreprises/kjhvf.jpg" },
  { name: "kjsfvsldvnk", src: "/logos/entreprises/kjsfvsldvnk.jpg" },
  { name: "kjvhn", src: "/logos/entreprises/kjvhn.png" },
  { name: "klhfs", src: "/logos/entreprises/klhfs.jpg" },
  { name: "kuhflqs", src: "/logos/entreprises/kuhflqs.png" },
  { name: "leji", src: "/logos/entreprises/leji.png" },
  { name: "lfhnk", src: "/logos/entreprises/lfhnk.png" },
  { name: "lfvndl", src: "/logos/entreprises/lfvndl.jpg" },
  { name: "ljhfv", src: "/logos/entreprises/ljhfv.png" },
  { name: "ljhfvs", src: "/logos/entreprises/ljhfvs.png" },
  { name: "lsjnksld", src: "/logos/entreprises/lsjnksld.png" },
  { name: "Maphar", src: "/logos/entreprises/Maphar.jpg" },
  { name: "ndf", src: "/logos/entreprises/ndf.png" },
  { name: "ndh,", src: "/logos/entreprises/ndh,.png" },
  { name: "ndhn", src: "/logos/entreprises/ndhn.png" },
  { name: "ocp", src: "/logos/entreprises/ocp.jpeg" },
  { name: "Sanofi", src: "/logos/companieslogo/sanofi.svg" },
  { name: "AXA Assurance", src: "/logos/companieslogo/axa.svg" },
  { name: "TotalEnergies", src: "/logos/companieslogo/totalenergies.svg" },
  { name: "Safran", src: "/logos/companieslogo/safran.svg" },
  { name: "Crédit Agricole du Maroc", src: "/logos/companieslogo/credit-agricole.svg" },
  { name: "sdfyj", src: "/logos/entreprises/sdfyj.png" },
  { name: "sfndhgn,", src: "/logos/entreprises/sfndhgn,.png" },
  { name: "vcefq", src: "/logos/entreprises/vcefq.png" },
  { name: "Viseo", src: "/logos/user-partners/viseo.png" },
];

function normalizedLogoSrc(src: string) {
  const withoutExtension = src.replace(/\.[^.]+$/, "");
  return `/logos/normalized/${withoutExtension.replace(/^\//, "").replaceAll("/", "-")}.webp`;
}

export function CertifiedPartners() {
  return (
    <section id="certifications" className="relative overflow-hidden bg-white py-4 md:py-6">
      {/* Background decoration */}
      <SectionDecor variant="light" pos="A" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:max-w-5xl lg:px-8 xl:max-w-6xl">
        <Reveal>
          <h2 className="font-serif text-3xl font-bold leading-[1.25] tracking-tight text-navy sm:text-4xl md:text-5xl lg:text-[2.6rem] xl:text-[2.85rem]">
            Formation{" "}
            <span className="text-gold-gradient font-extrabold drop-shadow-sm">
              certifiée et reconnue
            </span>{" "}
            <br className="hidden md:inline" />
            auprès de nos partenaires professionnels{" "}
            <br className="hidden md:inline" />
            sur le marché d'emploi marocain et international.
          </h2>
        </Reveal>
      </div>

      {/* Logos Marquee Ribbon */}
      <div className="mt-8 sm:mt-6 overflow-hidden bg-soft/60 py-6 sm:py-8 border-y border-navy/5 relative max-w-[100vw]">
        {/* Gradients to fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent z-10 sm:w-28" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent z-10 sm:w-28" />

        <div className="flex w-max animate-marquee items-center">
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div
              key={i}
              className="flex h-28 w-[288px] shrink-0 items-center justify-center px-6 sm:px-10"
            >
              {/* Fixed frame: every logo gets the same visual area while keeping its proportions. */}
              <div className="relative h-20 w-56 transition-transform duration-300 hover:scale-110 sm:h-24 sm:w-64">
                  <Image
                  src={normalizedLogoSrc(logo.src)}
                  alt={logo.name}
                  fill
                  loading="eager"
                  sizes="(min-width: 640px) 256px, 224px"
                  className="object-contain mix-blend-multiply"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
