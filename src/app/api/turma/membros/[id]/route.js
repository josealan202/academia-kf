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