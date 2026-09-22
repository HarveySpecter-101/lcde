import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

export const metadata = {
  title: "Mentions Légales | LCDE",
  description: "Mentions légales du Club Des Experts (LCDE).",
};

export default function MentionsLegales() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 font-serif text-3xl font-bold text-navy md:text-4xl">
            Mentions Légales
          </h1>
          
          <div className="prose prose-navy max-w-none text-navy/80 space-y-4">
            <h2 className="text-xl font-bold text-navy mt-8 mb-2">1. Éditeur du site</h2>
            <p>
              Le site <strong>Le Club Des Experts (LCDE)</strong> est édité par la direction du programme LCDE.
            </p>
            <p>
              <strong>Email :</strong> contact@leclubdesexperts.com<br />
              <strong>WhatsApp :</strong> +212 6 22 25 24 00
            </p>

            <h2 className="text-xl font-bold text-navy mt-8 mb-2">2. Propriété intellectuelle</h2>
            <p>
              L'ensemble de ce site relève de la législation marocaine et internationale sur le droit d'auteur et la propriété intellectuelle. Tous les droits de reproduction sont réservés, y compris pour les documents téléchargeables et les représentations iconographiques et photographiques.
            </p>
            <p>
              La reproduction de tout ou partie de ce site sur un support électronique quel qu'il soit est formellement interdite sauf autorisation expresse du directeur de la publication.
            </p>

            <h2 className="text-xl font-bold text-navy mt-8 mb-2">3. Protection des données personnelles</h2>
            <p>
              Les informations recueillies sur ce site sont enregistrées dans un fichier informatisé par LCDE pour la gestion de nos inscrits et prospects. Conformément à la loi n° 09-08 promulguée par le Dahir 1-09-15 du 18 février 2009, relative à la protection des personnes physiques à l'égard du traitement des données à caractère personnel, vous bénéficiez d'un droit d'accès et de rectification aux informations qui vous concernent.
            </p>

            <h2 className="text-xl font-bold text-navy mt-8 mb-2">4. Limitation de responsabilité</h2>
            <p>
              L'éditeur ne saurait être tenu responsable des erreurs matérielles qui se seraient glissées dans les documents présents sur le site, malgré tout le soin apporté à leur publication.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
