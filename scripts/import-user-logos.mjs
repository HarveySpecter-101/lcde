import fs from "node:fs/promises";
import path from "node:path";

const downloads = path.resolve("..", "");
const destination = path.resolve("public/logos/user-partners");
const logos = [
  ["(44) Offres d’Emploi chez Banque Populaire.jpeg", "banque-populaire.jpeg"],
  ["viseo.png", "viseo.png"],
  ["Concours de Recrutement ONCF 2023 (4 Postes).jpeg", "oncf.jpeg"],
  ["Label’Vie recrute Plusieurs Profils 2023.jpeg", "label-vie.jpeg"],
  ["Marjane recrute des Superviseurs Hygiène, Qualité et Sécurité Alimentaire.jpeg", "marjane.jpeg"],
  ["TotalEnergies - Wikipedia.jpeg", "totalenergies.jpeg"],
  ["Lafarge-Holcim - Alomgir Hossain.jpeg", "lafarge-holcim.jpeg"],
  ["maguiri.webp", "el-maguiri.webp"],
  ["omnipact.jpeg", "omnipact.jpeg"],
  ["First Moore Global Thrive Index Shows Mid-Market___.jpeg", "moore.jpeg"],
  ["coopers audit.png", "coopers-audit.png"],
  ["SGTM recrute Plusieurs Profils - Dreamjob_ma.jpeg", "sgtm.jpeg"],
  ["Bontaz Maroc recrute plusieurs profils.jpeg", "bontaz.jpeg"],
  ["Carrières chez BNP Paribas_ Analyste Back Office et Plus.jpeg", "bmci.jpeg"],
  ["CIH Bank recrute_ des opportunités à saisir dans plusieurs villes.jpeg", "cih.jpeg"],
  ["Afriquia Logo PNG Vector (SVG) Free Download.jpeg", "afriquia.jpeg"],
  ["BMCE BANK OF AFRICA Recrute des Conseillers Clientèles - Jadid Alwadifa.jpeg", "bank-of-africa.jpeg"],
  ["Maghreb Steel recrute Plusieurs Profils 2023.jpeg", "maghreb-steel.jpeg"],
  ["parker russel.png", "parker-russell.png"],
  ["logo-upsilon-1-png.png", "upsilon.png"],
  ["vivo.png", "vivo-energy.png"],
  ["vzloris.jpeg", "valoris.jpeg"],
  ["Nestlé _ Company Overview & News.jpeg", "nestle.jpeg"],
];

await fs.mkdir(destination, { recursive: true });

for (const [source, filename] of logos) {
  await fs.copyFile(path.join(downloads, source), path.join(destination, filename));
}

console.log(`Imported ${logos.length} user-provided partner logos into ${path.relative(process.cwd(), destination)}`);
