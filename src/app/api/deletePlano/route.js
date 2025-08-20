import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function DELETE(request, { params }) {
  try {
    const { id } = params; 
    const client = await pool.connect();

    await client.query(
      "DELETE FROM plano WHERE id = $1",
      [id]
    );

    client.release();

    return NextResponse.json({ message: "Plano deletado com sucesso" }, { status: 200 });
  } catch (error) {
    console.error("Erro ao deletar plano:", error);
    return NextResponse.json({ error: "Erro interno do servidor" }, { status: 500 });
  }
}
