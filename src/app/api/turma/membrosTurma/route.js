import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect()
    const usuarios = await client.query(
      'SELECT * FROM usuario'
    )
    client.release()
    return NextResponse.json({data:usuarios.rows},{ status: 201 })
  } catch (error) {
    console.error('Error adding usuário:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}