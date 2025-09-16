import db from "@/lib/db";
import CardTurma from "@/components/CardTurma";
import style from "./page.module.css"

export default async () => {
    const turma = await db.query("select * from turma")
 return (<>
    <br></br>
    <h1 className={style.turma}>Escolha uma turma</h1>
    <div className={style.container}>
        {
        turma.rows.map( 
            u => (
               <CardTurma key={u.id} titulo={u.nome} horario={u.horario} turno={u.turno}/>
            )
         )
        }
    </div>
 </>);
}