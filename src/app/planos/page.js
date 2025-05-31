import db from "@/lib/db";
import Card from "@/components/Card";
import style from "./page.module.css"

export default async () => {
    const planos = await db.query("select * from planos")
 return (<>
    <br></br>
    <h1 className={style.planos}>Escolha um plano</h1>
    <div className={style.container}>
        {
        planos.rows.map( 
            u => (
               <Card key={u.id} titulo={u.nome} checkins={u.checkins} valor={u.valor}/>
            )
         )
        }
    </div>
 </>);
}