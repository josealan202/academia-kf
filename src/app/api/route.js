import { NextResponse } from 'next/server'
import pool from "../../lib/db.js";

export async function POST(request) {
  try {
    const { name, project, startDate } = await request.json()
    const client = await pool.connect()
    await client.query(
      'INSERT INTO usuario (nome, email, senha, sexo, peridodopagamento) VALUES ($1, $2, $3, $4, $5)',
      [name, project, startDate]
    )
    client.release()
    return NextResponse.json({ status: 201 })
  } catch (error) {
    console.error('Error adding aluno:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}