const fs = require('fs');
let data = fs.readFileSync('src/components/site/modules.tsx', 'utf8');

const startStr = '        {/* ═══════════ REALITY & RECRUITERS ═══════════ */}';
const endStr = '      {/* ═══════════ MODULE DETAIL POPUP ═══════════ */}';

const startIndex = data.indexOf(startStr);
const endIndex = data.indexOf(endStr);

if (startIndex === -1 || endIndex === -1) {
  console.log('Markers not found');
  process.exit(1);
}

const replacement = \      </div>
    </section>

    <SectionDivider variant="navy-to-light" />

    <section className="relative overflow-hidden bg-white py-12 md:py-16">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ═══════════ REALITY & RECRUITERS ═══════════ */}
        <Reveal delay={0.2}>
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Reality Block */}
            <div className="h-full flex flex-col rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm sm:p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <AlertCircle className="size-32 text-red-600" />
              </div>
              <div className="relative z-10 flex items-center gap-4 border-b border-red-200 pb-5 sm:pb-6">
                <span className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-red-600 text-white shadow-lg">
                  <XCircle className="size-6 sm:size-7" />
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-red-950 m-0">
                  La réalité du marché
                </h3>
              </div>
              
              <ul className="mt-6 sm:mt-7 space-y-4 flex-1">
                <li className="flex items-start gap-3 text-sm leading-relaxed text-red-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-200 text-red-700">
                    <XCircle className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Les bonnes notes à l'école ou une mention “Très Bien” ne suffisent pas pour décrocher les meilleures opportunités ;</span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-red-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-200 text-red-700">
                    <XCircle className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span><strong>La vérité que personne ne dit :</strong> les recruteurs ne s'intéressent pas uniquement à ta filière, et exigent, par ailleurs, des compétences de haut calibre, qui ne sont généralement pas abordées à l'école ;</span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-red-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-red-200 text-red-700">
                    <XCircle className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Les recruteurs n'évaluent pas tes connaissances académiques ;</span>
                </li>
              </ul>
            </div>

            {/* Recruiters Block */}
            <div className="h-full flex flex-col rounded-3xl border border-green-200 bg-green-50 p-6 shadow-sm sm:p-8 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
                <Target className="size-32 text-green-600" />
              </div>
              <div className="relative z-10 flex items-center gap-4 border-b border-green-200 pb-5 sm:pb-6">
                <span className="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-2xl bg-green-600 text-white shadow-lg">
                  <CheckCircle2 className="size-6 sm:size-7" />
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-green-950 m-0">
                  Ce que recherchent les recruteurs
                </h3>
              </div>

              <div className="mt-6 sm:mt-7 text-sm font-medium leading-relaxed text-green-900/90 sm:text-base mb-4 relative z-10">
                Le marché de travail cherche des praticiens rares capables de créer de la valeur dès le premier jour.
              </div>
              
              <ul className="space-y-4 relative z-10 flex-1">
                <li className="flex items-start gap-3 text-sm leading-relaxed text-green-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-200 text-green-700">
                    <CheckCircle2 className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Développer des réflexes professionnels avancés et faire preuve d’un niveau d’analyse et de raisonnement supérieur.</span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-green-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-200 text-green-700">
                    <CheckCircle2 className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Détecter les risques, en évaluer les niveaux et en mesurer les impacts.</span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-green-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-200 text-green-700">
                    <CheckCircle2 className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Proposer des solutions concrètes, pertinentes et efficaces.</span>
                </li>
                <li className="flex items-start gap-3 text-sm leading-relaxed text-green-950/85 sm:text-base">
                  <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-green-200 text-green-700">
                    <CheckCircle2 className="size-3.5" strokeWidth={2.5} />
                  </span>
                  <span>Résoudre des problématiques réelles et complexes.</span>
                </li>
              </ul>
            </div>
          </div>
        </Reveal>
      </div>

\;

data = data.substring(0, startIndex) + replacement + data.substring(endIndex);
fs.writeFileSync('src/components/site/modules.tsx', data, 'utf8');