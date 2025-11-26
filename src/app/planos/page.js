import db from "@/lib/db";
import Card from "@/components/Card";
import style from "./page.module.css"

export default async () => {
    const plano = await db.query("select * from plano")
 return (<>
    <br></br>
    <h1 className={style.plano}>Escolha um plano</h1>
    <div className={style.container}>
        {
        plano.rows.map( 
            u => (
               <Card key={u.id} titulo={u.quantvezesnasemana} checkins={u.checkins} valor={u.valor}/>
            )
         )
        }
    </div>
 </>);
}