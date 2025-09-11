import { NextResponse } from 'next/server'
import pool from "@/lib/db";

export async function GET() {
  try {
    const client = await pool.connect()
    const plano = await client.query(
      'SELECT * FROM plano'
    )
    client.release()
    return NextResponse.json({data:plano.rows},{ status: 201 })
  } catch (error) {
    console.error('Error adding usuário:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}