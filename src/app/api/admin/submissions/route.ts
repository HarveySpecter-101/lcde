import { NextResponse } from "next/server";
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
    const rawSubmissions = await db.contactSubmission.findMany({
      orderBy: { createdAt: "desc" },
    });

    const formatted = rawSubmissions.map((s) => {
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

      return {
        id: s.id,
        name: s.name,
        email: s.email,
        phone: s.phone || "Non renseigné",
        level,
        school,
        createdAt: s.createdAt.toISOString(),
      };
    });

    return NextResponse.json({
      ok: true,
      submissions: formatted,
    });
  } catch (error) {
    console.error("[Admin Submissions Error]:", error);
    return NextResponse.json(
      { ok: false, error: "Erreur lors de la récupération des données" },
      { status: 500 }
    );
  }
}
