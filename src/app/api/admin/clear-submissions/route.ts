import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isUserAdmin } from "@/lib/admin-auth";

const ADMIN_SECRET = "AdminLCDE2026!";

export async function POST(req: Request) {
  const authHeader = req.headers.get("x-admin-key");
  const isAdmin = (await isUserAdmin()) || authHeader === ADMIN_SECRET;

  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Non autorisé" }, { status: 401 });
  }

  try {
    await db.contactSubmission.deleteMany({});
    await db.siteVisit.deleteMany({});
    
    return NextResponse.json({
      ok: true,
      message: "Toutes les données (candidatures et visites) ont été supprimées avec succès."
    });
  } catch (error: any) {
    console.error("[Clear Data Error]:", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}

