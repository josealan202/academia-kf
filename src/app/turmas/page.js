import db from "@/lib/db";
import CardTurma from "@/components/CardTurma";
import style from "./page.module.css"

export const dynamic = "force-dynamic";

export default async function Turma() {
   const turma = await db.query("select * from turma")
   return (<>
      <br></br>
      <h1 className={style.turma}>Escolha uma turma</h1>
      <div className={style.container}>
         {
            turma.rows.map(
               u => (
                  <CardTurma key={u.id} id={u.id} titulo={u.nome} horario={u.horario} />
               )
            )
         }
      </div>
   </>);
}