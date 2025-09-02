import { NextResponse } from 'next/server'
import pool from "../../../lib/db.js"

export async function POST(request) {
  try {
    const { nome, email, senha, sexo, periododopagamento} = await request.json()
    await pool.query(
      'INSERT INTO usuario (nome, email, senha, sexo, periododopagamento) VALUES ($1, $2, $3, $4, $5)',
      [nome, email, senha, sexo, periododopagamento]
    )
    // client.release()
    return NextResponse.json({ status: 201 })
  } catch (error) {
    console.error('Error adding usuário:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}