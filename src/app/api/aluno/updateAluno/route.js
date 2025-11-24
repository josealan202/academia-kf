import db from "@/lib/db";  
export async function PUT(req) {
  try {
    
    const dados = await req.json();  

    
    const { nome, senha, periododopagamento, id } = dados;
    

    if (!nome || !periododopagamento) {
      return new Response(
        JSON.stringify({ message: "Campos obrigatórios estão faltando." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    
    const result = await db.query(
      `
        UPDATE paciente
        SET 
          nome = $1, 
          senha = $2, 
          periododopagamento = $3, 
        WHERE id = $4
        RETURNING *
      `,
      [nome || null, senha || null, periododopagamento || null, id]
    );

    if (result.rows.length === 0) {
      return new Response(JSON.stringify({ message: "Paciente não encontrado." }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    
    return new Response(JSON.stringify(result.rows[0]), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Erro ao atualizar dados do paciente:", error);
    return new Response(
      JSON.stringify({ message: "Erro ao atualizar dados do paciente." }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}