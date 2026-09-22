import { Header } from "@/components/site/header";
import { Footer } from "@/components/site/footer";

export const metadata = {
  title: "Politique de Confidentialité | LCDE",
  description: "Politique de confidentialité du Club Des Experts (LCDE).",
};

export default function Confidentialite() {
  return (
    <div className="flex min-h-screen flex-col overflow-x-hidden bg-white">
      <Header />
      <main className="flex-1 pt-24 pb-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-8 font-serif text-3xl font-bold text-navy md:text-4xl">
            Politique de Confidentialité
          </h1>
          
          <div className="prose prose-navy max-w-none text-navy/80 space-y-4">
            <p>
              La présente politique de confidentialité a pour but de vous exposer la manière dont <strong>Le Club Des Experts (LCDE)</strong> collecte, utilise et protège les données à caractère personnel que vous pouvez être amené à nous communiquer.
            </p>

            <h2 className="text-xl font-bold text-navy mt-8 mb-2">1. Données collectées</h2>
            <p>
              Nous collectons les données suivantes via nos formulaires de contact et d'inscription :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Nom complet</li>
              <li>Adresse email</li>
              <li>Numéro de téléphone (WhatsApp)</li>
              <li>Niveau d'études / École de provenance</li>
            </ul>

            <h2 className="text-xl font-bold text-navy mt-8 mb-2">2. Utilisation des données</h2>
            <p>
              Les données que nous collectons sont utilisées exclusivement dans le cadre de :
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>L'évaluation de votre candidature au programme LCDE.</li>
              <li>La prise de contact par notre équipe pour finaliser votre inscription.</li>
              <li>L'envoi d'informations relatives à nos sessions de formation et événements.</li>
            </ul>

            <h2 className="text-xl font-bold text-navy mt-8 mb-2">3. Durée de conservation</h2>
            <p>
              Vos données personnelles sont conservées pendant la durée nécessaire aux finalités pour lesquelles elles ont été collectées, dans le respect de la législation en vigueur.
            </p>

            <h2 className="text-xl font-bold text-navy mt-8 mb-2">4. Protection de vos données</h2>
            <p>
              Nous mettons en œuvre toutes les mesures de sécurité nécessaires pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisée.
            </p>

            <h2 className="text-xl font-bold text-navy mt-8 mb-2">5. Vos droits</h2>
            <p>
              Conformément à la loi 09-08, vous disposez d'un droit d'accès, de rectification, et d'opposition au traitement de vos données personnelles. Pour exercer ces droits, vous pouvez nous contacter à l'adresse suivante : <strong>contact@leclubdesexperts.com</strong>.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
