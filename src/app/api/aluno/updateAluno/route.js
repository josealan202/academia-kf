import { NextResponse } from "next/server";
import db from "@/lib/db";
import bcrypt from "bcryptjs";

export async function PUT(req) {

  try {
    // 1️⃣ Dados vindos do frontend
    const { id, nome, senha, periododopagamento } = await req.json();

    let query;
    let values;

    // 2️⃣ Verifica se a senha foi informada
    if (senha && senha.trim() !== "") {

      const senhaHash = await bcrypt.hash(senha, 10);

      query = `
        UPDATE usuario
        SET
          nome = $1,
          senha = $2,
          periododopagamento = $3
        WHERE id = $4
      `;
      values = [nome, senhaHash, periododopagamento, id];
    } else {
      query = `
        UPDATE usuario
        SET
          nome = $1,
          periododopagamento = $2
        WHERE id = $3
      `;
      values = [nome, periododopagamento, id];
    }

    // 3️⃣ Executa a query
    await db.query(query, values);

    return NextResponse.json({
      message: "Usuário atualizado com sucesso",
    });
  } catch (error) {
    console.error("Erro ao atualizar dados do usuário:", error);

    return NextResponse.json(
      { error: "Erro ao atualizar usuário" },
      { status: 500 }
    );
  }
}
