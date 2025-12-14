import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(req, { params }) {
  const { status } = await req.json();

  if (!["aprovado", "recusado"].includes(status)) {
    return NextResponse.json({ error: "Status inválido" }, { status: 400 });
  }

  if (status === "aprovado") {
    // 1. Atualiza o plano do usuário
    await db.query(`
      UPDATE usuario u
      SET id_plano = sp.id_plano
      FROM solicitacao_plano sp
      WHERE sp.id = $1
      AND u.id = sp.id_usuario
    `, [params.id]);

    // 2. Busca a quantidade de check-ins do plano e atualiza o usuário
    await db.query(`
      UPDATE usuario u
      SET checkins = u.checkins + p.checkins
      FROM solicitacao_plano sp
      JOIN plano p ON p.id = sp.id_plano
      WHERE sp.id = $1
      AND u.id = sp.id_usuario
    `, [params.id]);
  }

  // Atualiza o status da solicitação
  await db.query(
    "UPDATE solicitacao_plano SET status = $1 WHERE id = $2",
    [status, params.id]
  );

  return NextResponse.json({ success: true });
}
