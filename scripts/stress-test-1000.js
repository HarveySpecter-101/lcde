/**
 * Massive Stress Test: 1,000 Candidate Form Submissions
 * Simulates 1,000 simultaneous students applying to Le Club Des Experts.
 * Uses a sliding worker pool (high concurrency) to test serverless autoscaling,
 * database connection pooling, latency under load, and error rates.
 */

const FIRST_NAMES = [
  "Yassine", "Sara", "Mehdi", "Imane", "Hamza", "Kenza", "Omar", "Hajar", 
  "Amine", "Zineb", "Anas", "Salma", "Othmane", "Nour", "Karim", "Rim", 
  "Ayoub", "Fatima-Zahra", "Youssef", "Ghita", "Ismail", "Meriem", "Walid", 
  "Houda", "Adil", "Chaimae", "Mohamed", "Khadija", "Tarik", "Najat", 
  "Reda", "Asmaa", "Badr", "Laila", "Soufiane", "Mona", "Bilal", "Malak", 
  "Zakaria", "Wiam", "Nabil", "Rania", "Driss", "Safae", "Sami", "Dounia", 
  "Hicham", "Nisrine", "Ilyas", "Kaoutar", "Anouar", "Salima", "Jalal", "Bouchra"
];

const LAST_NAMES = [
  "El Amrani", "Bennani", "Alaoui", "Berrada", "Tazi", "Chraibi", "El Idrissi", 
  "Kabbaj", "Tahiri", "Mansouri", "Fassi Fihri", "Zouiten", "Slaoui", "Bouzid", 
  "El Fassi", "Benjelloun", "Belkhadir", "Ouazzani", "Hassani", "Rochdi", 
  "El Khalfi", "Kadiri", "Lahlou", "Senhaji", "Gharbi", "Cherkaoui", "Amrani", 
  "El Harti", "Benkirane", "Mouline", "Alami", "Naciri", "Daoudi", "Boussaid"
];

const SCHOOLS = [
  "ENCG Casablanca", "ISCAE Casablanca", "HEM Business School", 
  "Université Hassan II - FSJES Ain Chock", "ENCG Settat", "EMSI Casablanca", 
  "Al Akhawayn University", "Toulouse Business School (TBS)", 
  "ESCA Ecole de Management", "Université Cadi Ayyad Marrakech", 
  "ENCG Tanger", "Université Mohammed V Rabat", "ENCG Agadir", "Mundiapolis"
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
  const rand = Math.floor(1000 + Math.random() * 9000);
  const email = `${cleanFirst}.${cleanLast}${rand}@test-etudiant.ma`;
  
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
    message: `Test de charge massif #${index + 1} - 1000 étudiants`
  };
}

async function submitOne(candidate, index) {
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

    if (res.ok && data?.ok) {
      return { success: true, index, id: data.id, duration, status: res.status };
    } else {
      return { success: false, index, duration, status: res.status, error: data?.error || res.statusText };
    }
  } catch (err) {
    const duration = Date.now() - start;
    return { success: false, index, duration, status: 0, error: err.message };
  }
}

async function main() {
  const TOTAL = 1000;
  const CONCURRENCY = 25; // 25 requêtes simultanées en continu

  console.log(`========================================================`);
  console.log(`🔥 TEST DE CHARGE MASSIF : 1,000 CANDIDATURES D'ÉLÈVES`);
  console.log(`Cible : https://le-club-des-experts.vercel.app/api/contact`);
  console.log(`Concurrence continue : ${CONCURRENCY} requêtes en parallèle`);
  console.log(`========================================================\n`);

  const candidates = Array.from({ length: TOTAL }, (_, i) => generateCandidate(i));
  const results = [];
  let currentIndex = 0;
  let activeWorkers = 0;
  const startTime = Date.now();

  return new Promise((resolve) => {
    function next() {
      if (currentIndex >= TOTAL) {
        if (activeWorkers === 0) {
          resolve(printReport(results, startTime, TOTAL));
        }
        return;
      }

      const index = currentIndex++;
      activeWorkers++;

      submitOne(candidates[index], index).then((result) => {
        results.push(result);
        activeWorkers--;

        if (results.length % 25 === 0 || results.length === TOTAL) {
          const successes = results.filter(r => r.success).length;
          const fails = results.filter(r => !r.success).length;
          const recentDurations = results.slice(-25).map(r => r.duration);
          const recentAvg = Math.round(recentDurations.reduce((a, b) => a + b, 0) / recentDurations.length);
          const elapsedSec = ((Date.now() - startTime) / 1000).toFixed(1);
          const rps = (results.length / Math.max(1, (Date.now() - startTime) / 1000)).toFixed(1);

          process.stdout.write(
            `\rProgression : [${results.length}/${TOTAL}] (${Math.round(results.length / TOTAL * 100)}%) | ✅ ${successes} | ❌ ${fails} | Rép: ~${recentAvg}ms | Débit: ${rps} req/s | ${elapsedSec}s`
          );
        }

        next();
      });
    }

    // Lancer les N workers initiaux
    for (let w = 0; w < CONCURRENCY; w++) {
      next();
    }
  });
}

function printReport(results, startTime, total) {
  const totalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  const successes = results.filter(r => r.success);
  const fails = results.filter(r => !r.success);
  const durations = results.map(r => r.duration).sort((a, b) => a - b);
  
  const avgDuration = Math.round(durations.reduce((a, b) => a + b, 0) / durations.length);
  const minDuration = durations[0];
  const maxDuration = durations[durations.length - 1];
  const p50 = durations[Math.floor(durations.length * 0.5)];
  const p90 = durations[Math.floor(durations.length * 0.9)];
  const p95 = durations[Math.floor(durations.length * 0.95)];
  const p99 = durations[Math.floor(durations.length * 0.99)];
  const throughput = (results.length / totalTime).toFixed(2);

  console.log(`\n\n========================================================`);
  console.log(`📊 BILAN COMPLET DU TEST MASSIF (1,000 CANDIDATURES)`);
  console.log(`========================================================`);
  console.log(`Temps total d'exécution : ${totalTime} s`);
  console.log(`Débit moyen              : ${throughput} requêtes / seconde`);
  console.log(`Total candidatures       : ${total}`);
  console.log(`✅ Succès (200 OK)       : ${successes.length} (${(successes.length / total * 100).toFixed(1)}%)`);
  console.log(`❌ Échecs                : ${fails.length}`);
  console.log(`--------------------------------------------------------`);
  console.log(`Latence min              : ${minDuration} ms`);
  console.log(`Latence moyenne          : ${avgDuration} ms`);
  console.log(`Latence médiane (p50)    : ${p50} ms`);
  console.log(`Latence 90e centile (p90): ${p90} ms`);
  console.log(`Latence 95e centile (p95): ${p95} ms`);
  console.log(`Latence 99e centile (p99): ${p99} ms`);
  console.log(`Latence max              : ${maxDuration} ms`);
  console.log(`========================================================`);

  if (fails.length > 0) {
    console.log(`\nErreurs rencontrées :`);
    const errorSummary = {};
    fails.forEach(f => {
      const k = `Status ${f.status}: ${f.error}`;
      errorSummary[k] = (errorSummary[k] || 0) + 1;
    });
    Object.entries(errorSummary).forEach(([msg, count]) => {
      console.log(` - ${count}x -> ${msg}`);
    });
  } else {
    console.log(`\n🎉 PERFORMANCE PARFAITE : 1,000 / 1,000 requêtes traitées avec succès sans aucune interruption !`);
  }
}

main().catch(console.error);
