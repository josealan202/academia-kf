import db from "@/lib/db";
import './style.css';
import Card from "@/components/Card";


export default async () => {
    const mensalidades = await db.query("select * from mensalidade")
 return (<>
    <br></br>
    <h1 class="men">Mensalidade</h1>
    <br></br>
    <div class="container">
        {
        mensalidades.rows.map( 
            u => (
               <Card key={u.id} titulo={u.mes} />
            ) 
         )
        }
        
    </div>
 </>);
}