import { NextResponse } from "next/server";
import db from "@/lib/db";

export async function PUT(req) {
  const { id_usuario } = await req.json();

  // 1️⃣ Buscar check-ins atuais
  const user = await db.query(
    `
    SELECT checkins, id_plano
    FROM usuario
    WHERE id = $1
    `,
    [id_usuario]
  );

  if (user.rowCount === 0) {
    return NextResponse.json(
      { error: "Usuário não encontrado" },
      { status: 404 }
    );
  }

  if (!user.rows[0].id_plano || user.rows[0].checkins <= 0) {
    return NextResponse.json(
      { error: "Usuário sem check-ins disponíveis" },
      { status: 400 }
    );
  }

  const novosCheckins = user.rows[0].checkins - 1;

  // 2️⃣ Atualiza usuário
  await db.query(
    `
    UPDATE usuario
    SET checkins = $1,
        id_plano = CASE
          WHEN $1 = 0 THEN NULL
          ELSE id_plano
        END
    WHERE id = $2
    `,
    [novosCheckins, id_usuario]
  );

  return NextResponse.json({
    success: true,
    checkins_restantes: novosCheckins,
  });
}
