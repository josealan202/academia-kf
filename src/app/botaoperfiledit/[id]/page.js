import db from "@/lib/db";
import DadosPessoaisEditaveis from "./DadosPessoaisEditaveis";

export default async function Page({ params }) {
  const { id } = await params;

  const result = await db.query(
    "SELECT id, nome, senha, periododopagamento FROM usuario WHERE id = $1",
    [id]
  );

  const usuario = result.rows[0];

  return <DadosPessoaisEditaveis dadosClientes={usuario} />;
}
