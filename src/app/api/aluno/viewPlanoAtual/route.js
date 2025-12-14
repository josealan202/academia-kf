import { NextResponse } from "next/server";
import db from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const result = await db.query(
    `
    SELECT p.id, p.quantvezesnasemana, p.checkins, p.valor
    FROM usuario u
    JOIN plano p ON p.id = u.id_plano
    WHERE u.id = $1
    `,
    [session.user.id]
  );

  if (result.rowCount === 0) {
    return NextResponse.json({ plano: null });
  }

  return NextResponse.json({ plano: result.rows[0] });
}
