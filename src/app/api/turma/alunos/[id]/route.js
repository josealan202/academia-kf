import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function GET(req, {params}) {
  const id = await params.id;
  try {
    const client = await pool.connect()
    const turmas = await client.query(
      'SELECT * FROM usuario where id_turma = '+id
    )
    client.release()
    return NextResponse.json({data:turmas.rows},{ status: 201 })
  } catch (error) {
    console.error('Error adding usuário:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


export async function PUT(req, { params }) {
  const { id } = await params;  // Espera a resolução do `params`
  const alunoId = id;
  const { id_turma } = await req.json();

  if (!id_turma) {
    return NextResponse.json(
      { error: "id_turma é obrigatório" },
      { status: 400 }
    );
  }

  try {
    const client = await pool.connect();

    await client.query(
      "UPDATE usuario SET id_turma = $1 WHERE id = $2",
      [id_turma, alunoId]
    );

    client.release();

    return NextResponse.json(
      { message: "Aluno inserido na turma com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao inserir aluno na turma:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
