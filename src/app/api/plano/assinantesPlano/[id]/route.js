import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET(req, { params }) {
  const id_plano = params.id;

  const result = await db.query(`
    SELECT u.id, u.nome, u.email
    FROM usuario u
    WHERE u.id_plano = $1
  `, [id_plano]);

  return NextResponse.json({
    data: result.rows
  });
}
