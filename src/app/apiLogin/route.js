import { NextResponse } from 'next/server'
import pool from "../../lib/db.js"

export async function POST(request) {
  try {
    const { emailLog, senhaLog } = await request.json()
    const client = await pool.connect()
    const result = await client.query(
      'SELECT * FROM usuario WHERE email = $1 AND senha = $2',
      [emailLog, senhaLog]
    )

    const id = result.rows[0].id
    client.release()

    return NextResponse.json({ message: 'Usuário logado com sucesso', id }, { status: 201 })
  } catch (error) {
    console.error('Erro ao logar usuário:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}