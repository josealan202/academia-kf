import db from "@/lib/db"
export default async () => {
    const usuarios = await db.query("select * from usuario")
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