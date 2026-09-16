/**
 * Stress Test: 100 Candidate Submissions
 * Simulates 100 diverse students applying to Le Club Des Experts.
 * Sends requests with concurrency to verify database, API resilience and latency.
 */

const FIRST_NAMES = [
  "Yassine", "Sara", "Mehdi", "Imane", "Hamza", "Kenza", "Omar", "Hajar", 
  "Amine", "Zineb", "Anas", "Salma", "Othmane", "Nour", "Karim", "Rim", 
  "Ayoub", "Fatima-Zahra", "Youssef", "Ghita", "Ismail", "Meriem", "Walid", 
  "Houda", "Adil", "Chaimae", "Mohamed", "Khadija", "Tarik", "Najat", 
  "Reda", "Asmaa", "Badr", "Laila", "Soufiane", "Mona", "Bilal", "Malak", 
  "Zakaria", "Wiam", "Nabil", "Rania", "Driss", "Safae", "Sami", "Dounia", 
  "Hicham", "Nisrine", "Ilyas", "Kaoutar"
];

const LAST_NAMES = [
  "El Amrani", "Bennani", "Alaoui", "Berrada", "Tazi", "Chraibi", "El Idrissi", 
  "Kabbaj", "Tahiri", "Mansouri", "Fassi Fihri", "Zouiten", "Slaoui", "Bouzid", 
  "El Fassi", "Benjelloun", "Belkhadir", "Ouazzani", "Hassani", "Rochdi", 
  "El Khalfi", "Kadiri", "Lahlou", "Senhaji", "Gharbi", "Cherkaoui", "Amrani", 
  "El Harti", "Benkirane", "Mouline"
];

const SCHOOLS = [
  "ENCG Casablanca",
  "ISCAE Casablanca",
  "HEM Business School",
  "Université Hassan II - FSJES Ain Chock",
  "ENCG Settat",
  "EMSI Casablanca",
  "Al Akhawayn University",
  "Toulouse Business School (TBS Casa)",
  "ESCA Ecole de Management",
  "Université Cadi Ayyad Marrakech",
  "ENCG Tanger",
  "Université Mohammed V Rabat"
];

const LEVELS = [
  "Bac+3 (Licence Pro Finance)",
  "Bac+4 (Master 1 CCA)",
  "Bac+5 (Master 2 Audit & Contrôle de Gestion)",
  "Bac+5 (Diplôme Grande École - Option Finance)",
  "Jeune Diplômé / Lauréat (Recherche CDI)",
  "Professionnel Junior (Comptable / Auditeur Junior)"
];

const OBJECTIVES = [
  "Décrocher un CDI en Big 4 (Audit Financier)",
  "Maîtriser la consolidation et les normes IFRS",
  "Devenir Consultant M&A et Transaction Services",
  "Acquérir une pratique 100% opérationnelle en fiscalité marocaine",
  "Préparer les tests techniques des cabinets d'audit",
  "Accélérer mon évolution vers un poste de Responsable Financier"
];

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCandidate(index) {
  const firstName = pick(FIRST_NAMES);
  const lastName = pick(LAST_NAMES);
  const fullName = `${firstName} ${lastName}`;
  const cleanFirst = firstName.toLowerCase().replace(/[^a-z]/g, "");
  const cleanLast = lastName.toLowerCase().replace(/[^a-z]/g, "");
  const randNum = Math.floor(100 + Math.random() * 900);
  const email = `${cleanFirst}.${cleanLast}${randNum}@test-etudiant.ma`;
  
  // Numéro marocain réaliste
  const prefix = Math.random() > 0.5 ? "06" : "07";
  const phoneDigits = Math.floor(10000000 + Math.random() * 90000000);
  const phone = `${prefix}${phoneDigits}`;

  return {
    name: fullName,
    email,
    phone,
    level: pick(LEVELS),
    school: pick(SCHOOLS),
    profile: Math.random() > 0.2 ? "student" : "graduate",
    objective: pick(OBJECTIVES),
    source: "contact",
    message: `Candidature de test stress #${index + 1} - Souhait de rejoindre la promotion LCDE.`
  };
}

async function submitCandidate(candidate, index, total) {
  const url = "https://le-club-des-experts.vercel.app/api/contact";
  const start = Date.now();
  
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(candidate),
    });
    
    const duration = Date.now() - start;
    const data = await res.json().catch(() => null);

    if (res.ok && data && data.ok) {
      return { success: true, index, id: data.id, duration, name: candidate.name, status: res.status };
    } else {
      return { success: false, index, duration, name: candidate.name, status: res.status, error: data?.error || res.statusText };
    }
  } catch (err) {
    const duration = Date.now() - start;
    return { success: false, index, duration, name: candidate.name, status: 0, error: err.message };
  }
}

async function runStressTest() {
  const TOTAL = 100;
  const CONCURRENCY = 5; // 5 requêtes simultanées en continu
  console.log(`====================================================`);
  console.log(`🚀 DÉMARRAGE DU TEST DE CHARGE : 100 CANDIDATS LCDE`);
  console.log(`Cible : https://le-club-des-experts.vercel.app/api/contact`);
  console.log(`Concurrency : ${CONCURRENCY} requêtes simultanées`);
  console.log(`====================================================\n`);

  const candidates = Array.from({ length: TOTAL }, (_, i) => generateCandidate(i));
  const results = [];
  const startTime = Date.now();

  // Exécution par lots concurrents
  for (let i = 0; i < TOTAL; i += CONCURRENCY) {
    const batch = candidates.slice(i, i + CONCURRENCY);
    const batchPromises = batch.map((cand, batchIdx) => 
      submitCandidate(cand, i + batchIdx, TOTAL)
    );

    const batchResults = await Promise.all(batchPromises);
    results.push(...batchResults);

    const successfulSoFar = results.filter(r => r.success).length;
    const failedSoFar = results.filter(r => !r.success).length;
    const latestBatchAvgTime = Math.round(batchResults.reduce((sum, r) => sum + r.duration, 0) / batchResults.length);

    process.stdout.write(
      `\rProgression : [${results.length}/${TOTAL}] | Succès : ${successfulSoFar} | Échecs : ${failedSoFar} | Temps rép. moyen : ${latestBatchAvgTime}ms`
    );
  }

  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  const avgDuration = Math.round(results.reduce((sum, r) => sum + r.duration, 0) / results.length);
  const minDuration = Math.min(...results.map(r => r.duration));
  const maxDuration = Math.max(...results.map(r => r.duration));

  console.log(`\n\n====================================================`);
  console.log(`📊 BILAN DU TEST DE CHARGE (100 ÉTUDIANTS)`);
  console.log(`====================================================`);
  console.log(`Temps total d'exécution : ${totalTime} secondes`);
  console.log(`Total envoyés           : ${TOTAL}`);
  console.log(`✅ Succès (200 OK)       : ${successful.length} (${(successful.length / TOTAL * 100)}%)`);
  console.log(`❌ Échecs                : ${failed.length}`);
  console.log(`Temps de réponse moyen  : ${avgDuration} ms`);
  console.log(`Temps de réponse min    : ${minDuration} ms`);
  console.log(`Temps de réponse max    : ${maxDuration} ms`);

  if (failed.length > 0) {
    console.log(`\nDétail des erreurs :`);
    failed.forEach(f => console.log(` - Candidat #${f.index + 1} (${f.name}) : Status ${f.status} - ${f.error}`));
  } else {
    console.log(`\n🎉 AUCUN BUG ! Les 100 candidatures ont été enregistrées avec succès sans aucune erreur.`);
  }
}

runStressTest().catch(console.error);
