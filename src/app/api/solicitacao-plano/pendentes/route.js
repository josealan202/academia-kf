import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function GET() {
  const result = await db.query(`
    SELECT sp.id, u.nome, p.quantvezesnasemana, p.valor
    FROM solicitacao_plano sp
    JOIN usuario u ON u.id = sp.id_usuario
    JOIN plano p ON p.id = sp.id_plano
    WHERE sp.status = 'pendente'
  `);

  return NextResponse.json(result.rows);
}
