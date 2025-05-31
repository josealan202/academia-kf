import db from "@/lib/db"
export default async () => {
   let plano1 = "('alan', 'branco');"
    const usuarios = await db.query(`insert into usuario (nome, cor) values ${plano1}`);
 return (<>
    <br></br>
    <h1>Lista de usuários</h1>
    <br></br>
    <div>
      {
         usuarios.rows.map( 
            u => (
               <div>
                  {u.nome} é {u.cor}.
               </div>
            ) 
         )
      }
   </div>
 </>);
}