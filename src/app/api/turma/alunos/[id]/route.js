import { NextResponse } from "next/server";
import pool from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export async function GET(req, { params }) {
  const { id } = await params; // id da turma

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json(
      { error: "Não autenticado" },
      { status: 401 }
    );
  }

  const alunoId = session.user.id;

  try {
    const client = await pool.connect();

    const result = await client.query(
      "SELECT id_turma FROM usuario WHERE id = $1",
      [alunoId]
    );

    client.release();

    return NextResponse.json({
      jaInscrito: result.rows[0]?.id_turma === Number(id)
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function PUT(req, { params }) {
  const { id } = await params; // id da turma

  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Não autenticado" }, { status: 401 });
  }

  const alunoId = session.user.id;

  try {
    const client = await pool.connect();

    const check = await client.query(
      "SELECT id_turma FROM usuario WHERE id = $1",
      [alunoId]
    );

    if (check.rows[0]?.id_turma) {
      client.release();
      return NextResponse.json(
        { error: "Usuário já está em uma turma" },
        { status: 400 }
      );
    }

    await client.query(
      "UPDATE usuario SET id_turma = $1 WHERE id = $2",
      [id, alunoId]
    );

    client.release();

    return NextResponse.json(
      { message: "Aluno inserido na turma com sucesso" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}


export async function DELETE(req, { params }) {
  
  await params;

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Não autenticado" },
      { status: 401 }
    );
  }

  const idUsuario = session.user.id;

  try {
    const client = await pool.connect();

    await client.query(
      "UPDATE usuario SET id_turma = NULL WHERE id = $1",
      [idUsuario]
    );

    client.release();

    return NextResponse.json(
      { message: "Usuário saiu da turma" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erro ao sair da turma:", error);
    return NextResponse.json(
      { error: "Erro interno" },
      { status: 500 }
    );
  }
}
