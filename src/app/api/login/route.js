import { NextResponse } from "next/server";
import pool from "../../../lib/db.js";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { emailLog, senhaLog } = await request.json();

    const client = await pool.connect();

    // 1️⃣ Busca o usuário APENAS pelo email
    const result = await client.query(
      "SELECT * FROM usuario WHERE email = $1",
      [emailLog]
    );

    if (result.rows.length === 0) {
      client.release();
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    const usuario = result.rows[0];

    // 2️⃣ Compara a senha digitada com a senha criptografada
    const senhaCorreta = await bcrypt.compare(
      senhaLog,
      usuario.senha
    );

    if (!senhaCorreta) {
      client.release();
      return NextResponse.json(
        { error: "Credenciais inválidas" },
        { status: 401 }
      );
    }

    client.release();

    // 3️⃣ Login OK
    return NextResponse.json(
      { message: "Usuário logado com sucesso", id: usuario.id },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erro ao logar usuário:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
