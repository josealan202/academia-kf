import db from "../../../lib/db.js";
import style from "./page.module.css"

export default async ({params}) => {
    const usuario = await db.query(
        "select * from usuario where id = "+params.id
    );
    return (
        <>
            <h1>Página do usuario: 
                {usuario.rows[0].nome}
            </h1>
            <p>O usuario faz parte do projeto 
                {usuario.rows[0].email}
            </p>
            <p>O usuario faz parte do projeto 
                {usuario.rows[0].senha}
            </p>
            <p>O usuario faz parte do projeto 
                {usuario.rows[0].sexo}
            </p>
            <p>O usuario faz parte do projeto 
                {usuario.rows[0].periododopagamento.toLocaleString()}
            </p>
        </>
    )
}