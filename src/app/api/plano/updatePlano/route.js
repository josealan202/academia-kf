import { NextResponse } from 'next/server';
import pool from "@/lib/db";

export async function PUT(request) {
  try {
    const { id, quantvezesnasemana, checkins, valor } = await request.json();

    
    if (!id || !quantvezesnasemana || !checkins || !valor) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    const client = await pool.connect();

    const result = await client.query(
      `UPDATE plano 
       SET quantvezesnasemana = $1, checkins = $2, valor = $3 
       WHERE id = $4 
       RETURNING *`,
      [quantvezesnasemana, checkins, valor, id]
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
