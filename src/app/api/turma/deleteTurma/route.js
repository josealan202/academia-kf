import { NextResponse } from 'next/server';
import pool from '@/lib/db';

export async function DELETE(request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID é obrigatório' }, { status: 400 });
    }

    const client = await pool.connect();
    await client.query('DELETE FROM turma WHERE id = $1', [id]);
    client.release();

    return NextResponse.json({ message: 'Plano deletado com sucesso' }, { status: 200 });
  } catch (error) {
    console.error('Erro ao deletar turma:', error);
    return NextResponse.json({ error: 'Erro interno no servidor' }, { status: 500 });
  }
}

