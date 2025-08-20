import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function POST(request) {
  try {
    const {nome, checkins, valor} = await request.json()
    const client = await pool.connect()
    await client.query(
      'INSERT INTO planos (nome, checkins, valor) VALUES ($1, $2, $3)',
      [nome, checkins, valor]
    )
    client.release()
    return NextResponse.json({ status: 201 })
  } catch (error) {
    console.error('Error adding usuário:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}