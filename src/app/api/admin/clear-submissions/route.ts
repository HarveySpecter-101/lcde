import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { isUserAdmin } from "@/lib/admin-auth";

export async function POST(req: Request) {
  const isAdmin = await isUserAdmin();

  if (!isAdmin) {
    return NextResponse.json({ ok: false, error: "Non autorisé" }, { status: 401 });
  }

  try {
    await db.contactSubmission.deleteMany({});
    
    return NextResponse.json({
      ok: true,
      message: "Toutes les candidatures ont été supprimées avec succès."
    });
  } catch (error: any) {
    console.error("[Clear Submissions Error]:", error);
    return NextResponse.json(
      { ok: false, error: error.message || "Erreur lors de la suppression" },
      { status: 500 }
    );
  }
}

