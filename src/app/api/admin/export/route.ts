import { NextResponse } from "next/server";
import XLSX from "xlsx-js-style";
import { db } from "@/lib/db";
import { isUserAdmin } from "@/lib/admin-auth";

function extractFromText(text: string | null | undefined, prefix: string): string | null {
  if (!text) return null;
  const lines = text.split("\n");
  for (const line of lines) {
    if (line.toLowerCase().includes(prefix.toLowerCase())) {
      const parts = line.split(":");
      if (parts.length > 1) {
        return parts.slice(1).join(":").trim();
      }
    }
  }
  return null;
}

export async function GET() {
  const isAdmin = await isUserAdmin();
  if (!isAdmin) {
    return NextResponse.json(
      { ok: false, error: "Non autorisé" },
      { status: 401 }
    );
  }

  try {
    const submissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    const headers = [
      "N°",
      "Date & Heure",
      "Nom complet",
      "Téléphone / WhatsApp",
      "Email",
      "Niveau actuel",
      "École",
    ];

    const rows = submissions.map((s, idx) => {
      const level =
        s.level ||
        extractFromText(s.message, "Niveau actuel") ||
        extractFromText(s.objective, "Niveau") ||
        "Non spécifié";

      const school =
        s.school ||
        extractFromText(s.message, "École") ||
        extractFromText(s.objective, "École") ||
        "Non spécifié";

      const dateStr = new Date(s.createdAt).toLocaleString("fr-FR", {
        timeZone: "Africa/Casablanca",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

      return [
        idx + 1,
        dateStr,
        s.name,
        s.phone || "Non renseigné",
        s.email,
        level,
        school,
      ];
    });

    const ws = XLSX.utils.aoa_to_sheet([headers, ...rows]);

    // Couleurs vives et élégantes pour chaque colonne d'en-tête
    const headerColors = [
      "334155", // N° : Ardoise
      "1E3A8A", // Date : Bleu Marine
      "0A2647", // Nom complet : Bleu LCDE Brand
      "059669", // Téléphone : Vert Émeraude
      "0284C7", // Email : Bleu Ciel
      "D97706", // Niveau actuel : Ambre / Or
      "4F46E5", // École : Indigo / Violet
    ];

    const cols = ["A", "B", "C", "D", "E", "F", "G"];

    // 1. Style des en-têtes (Ligne 1)
    cols.forEach((col, idx) => {
      const cellRef = col + "1";
      if (ws[cellRef]) {
        ws[cellRef].s = {
          fill: { fgColor: { rgb: headerColors[idx] } },
          font: {
            name: "Calibri",
            sz: 11,
            bold: true,
            color: { rgb: "FFFFFF" },
          },
          alignment: {
            horizontal: "center",
            vertical: "center",
            wrapText: true,
          },
          border: {
            top: { style: "medium", color: { rgb: "0A2647" } },
            bottom: { style: "medium", color: { rgb: "0A2647" } },
            left: { style: "thin", color: { rgb: "E2E8F0" } },
            right: { style: "thin", color: { rgb: "E2E8F0" } },
          },
        };
      }
    });

    // 2. Style des lignes de données
    rows.forEach((_, rowIdx) => {
      const rowNum = rowIdx + 2;
      const isEven = rowIdx % 2 === 1;
      const bgRgb = isEven ? "F8FAFC" : "FFFFFF";

      cols.forEach((col) => {
        const cellRef = col + rowNum;
        if (ws[cellRef]) {
          const isCenter = ["A", "B", "D", "F"].includes(col);
          ws[cellRef].s = {
            fill: { fgColor: { rgb: bgRgb } },
            font: {
              name: "Calibri",
              sz: 10,
              color: { rgb: "1E293B" },
            },
            alignment: {
              horizontal: isCenter ? "center" : "left",
              vertical: "center",
            },
            border: {
              top: { style: "thin", color: { rgb: "E2E8F0" } },
              bottom: { style: "thin", color: { rgb: "E2E8F0" } },
              left: { style: "thin", color: { rgb: "E2E8F0" } },
              right: { style: "thin", color: { rgb: "E2E8F0" } },
            },
          };
        }
      });
    });

    // Largeurs de colonnes confortables
    ws["!cols"] = [
      { wch: 6 },
      { wch: 22 },
      { wch: 28 },
      { wch: 24 },
      { wch: 32 },
      { wch: 26 },
      { wch: 28 },
    ];

    // Hauteur de ligne d'en-tête
    ws["!rows"] = [{ hpt: 28 }];

    const wb = XLSX.utils.book_new();
    wb.Props = {
      Title: "Candidatures LCDE",
      Subject: "Export officiel des candidatures",
      Author: "Le Club Des Experts",
      CreatedDate: new Date(),
    };

    XLSX.utils.book_append_sheet(wb, ws, "Candidatures LCDE");

    const buffer = XLSX.write(wb, {
      type: "buffer",
      bookType: "xlsx",
      compression: true,
      cellStyles: true,
    });

    const today = new Date().toISOString().split("T")[0];
    const filename = `Candidatures_LCDE_${today}.xlsx`;

    return new Response(buffer, {
      status: 200,
      headers: {
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": buffer.length.toString(),
        "Cache-Control": "no-store, no-cache, must-revalidate",
        "Pragma": "no-cache",
      },
    });
  } catch (error) {
    console.error("[Export Excel Error]:", error);
    return NextResponse.json(
      { ok: false, error: "Erreur lors de la génération du fichier Excel" },
      { status: 500 }
    );
  }
}
