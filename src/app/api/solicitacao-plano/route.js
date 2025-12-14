import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Não autorizado" },
      { status: 401 }
    );
  }

  const { id_plano } = await req.json();

  const userResult = await db.query(
    "SELECT id, id_plano FROM usuario WHERE email = $1",
    [session.user.email]
  );

  if (userResult.rows.length === 0) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  const id_usuario = userResult.rows[0].id;

  if (userResult.rows[0].id_plano) {
    return NextResponse.json(
      { error: "Você já possui um plano ativo" },
      { status: 400 }
    );
  }

  const solicitacaoExistente = await db.query(
    "SELECT id FROM solicitacao_plano WHERE id_usuario = $1",
    [id_usuario]
  );

  if (solicitacaoExistente.rowCount > 0) {
    await db.query(
      `
      UPDATE solicitacao_plano
      SET id_plano = $1,
          status = 'pendente'
      WHERE id_usuario = $2
      `,
      [id_plano, id_usuario]
    );

    return NextResponse.json({
      success: true,
      updated: true,
    });
  }

  await db.query(
    `
    INSERT INTO solicitacao_plano (id_usuario, id_plano, status)
    VALUES ($1, $2, 'pendente')
    `,
    [id_usuario, id_plano]
  );

  return NextResponse.json({
    success: true,
    created: true,
  });
}
