import db from "@/lib/db";

export default async ({params}) => {
    const usuario = await db.query("select * from usuario where id=" + params.id);
    return(
        <>
           <h1>Página do usuário: {usuario.rows[0].nome}</h1>
           <p>O usuário é de cor: {usuario.rows[0].cor}</p>
        </>
    )
}