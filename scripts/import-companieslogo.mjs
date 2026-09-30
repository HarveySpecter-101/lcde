import fs from "node:fs/promises";
import path from "node:path";

const destination = path.resolve("public/logos/companieslogo");
const logos = [
  { name: "AXA", file: "axa.svg", url: "https://www.companieslogo.com/img/orig/CS.PA-c5886b7b.svg?t=1720244491&download=true" },
  { name: "Crédit Agricole", file: "credit-agricole.svg", url: "https://www.companieslogo.com/img/orig/ACA.PA-11909ad3.svg?t=1720244490&download=true" },
  { name: "Danone", file: "danone.svg", url: "https://www.companieslogo.com/img/orig/BN.PA_BIG-c50f78fd.svg?t=1720244491&download=true" },
  { name: "Nestlé", file: "nestle.svg", url: "https://www.companieslogo.com/img/orig/NESN.SW_BIG-51c075e5.svg?t=1720244493&download=true" },
  { name: "Safran", file: "safran.svg", url: "https://www.companieslogo.com/img/orig/SAF.PA_BIG-77e1ac11.svg?t=1720244493&download=true" },
  { name: "Sanofi", file: "sanofi.svg", url: "https://www.companieslogo.com/img/orig/SNY_BIG-a5228e7d.svg?t=1720244494&download=true" },
  { name: "TAQA Morocco", file: "taqa-morocco.svg", url: "https://www.companieslogo.com/img/orig/TAQA.AE-35947137.svg?t=1720244494&download=true" },
  { name: "TotalEnergies", file: "totalenergies.svg", url: "https://www.companieslogo.com/img/orig/TTE_BIG-1bc9f6be.svg?t=1720244494&download=true" },
];

await fs.mkdir(destination, { recursive: true });

for (const logo of logos) {
  const response = await fetch(logo.url);
  if (!response.ok) throw new Error(`Unable to download ${logo.name}: ${response.status}`);
  await fs.writeFile(path.join(destination, logo.file), Buffer.from(await response.arrayBuffer()));
}

console.log(`Imported ${logos.length} CompaniesLogo SVG files into ${path.relative(process.cwd(), destination)}`);
