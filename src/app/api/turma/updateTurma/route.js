import { NextResponse } from 'next/server';
import pool from "@/lib/db";

export async function PUT(request) {
  try {
    const { id, nome, horario } = await request.json();

    
    if (!id || !nome || !horario) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    const result = await client.query(
      `UPDATE turma 
       SET nome = $1, horario = $2 
       WHERE id = $3 
       RETURNING *`,
      [nome, horario, id]
    );

    client.release();

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: 'Plano não encontrado' },
        { status: 404 }
      );
    }

    return NextResponse.json(result.rows[0], { status: 200 });
  } catch (error) {
    console.error('Erro ao atualizar plano:', error);
    return NextResponse.json(
      { error: 'Erro interno no servidor' },
      { status: 500 }
    );
  }
}
