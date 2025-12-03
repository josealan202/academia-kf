import { NextResponse } from 'next/server';
import pool from "../../../lib/db.js";
import bcrypt from "bcryptjs";

export async function POST(request) {
  try {
    const { nome, email, senha, sexo, periododopagamento, role = "admin" } = await request.json();
    console.log("Recebi do frontend:", nome, email, senha, sexo, periododopagamento);

    //validação de segurança(campos vazios)
    if (!nome || !email || !senha || !sexo ) {
      return NextResponse.json({ error: "Dados inválidos" }, { status: 400 });
    }

    const client = await pool.connect();

    //validação de segurança(ususário já existente)
    const existe = await client.query(
      "SELECT id FROM usuario WHERE email = $1",
      [email]
    );
    if (existe.rowCount > 0) {
      client.release();
      return NextResponse.json({ error: "E-mail já cadastrado" }, { status: 409 });
    }

    //Criptografia da senha 
    const senhaHash = await bcrypt.hash(senha, 12); // custo 12 é bom, como visto anteriormente

    await client.query(
      "INSERT INTO usuario (nome, email, senha, sexo, role) VALUES ($1, $2, $3, $4, $5)",
      [nome, email, senhaHash, sexo, role]
    );
    client.release();

    return NextResponse.json({ message: "Usuário criado com sucesso!" }, { status: 201 });
  } catch (error) {
    console.error("Erro ao adicionar consumidor:", error.message, error.stack);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET() {
  try {
    const client = await pool.connect()
    const result = await client.query('SELECT * FROM usuario')
    client.release()
    return NextResponse.json(result.rows)
  } catch (error) {
    console.error('Erro listando consumidores:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}