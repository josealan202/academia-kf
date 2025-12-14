import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const alunos = await db.query(
    `
    SELECT id, nome, checkins
    FROM usuario
    WHERE id_plano IS NOT NULL
    ORDER BY nome
    `
  );

  return NextResponse.json({ data: alunos.rows });
}
