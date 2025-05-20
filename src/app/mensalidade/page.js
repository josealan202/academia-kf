import db from "@/lib/db";
import './style.css';
import Card from "@/components/Card";

export default async () => {
    const mensalidades = await db.query("select * from mensalidade")
 return (<>
    <br></br>
    <h1 className="men">Mensalidade</h1>
    <br></br>
    <div className="container">
        {
        mensalidades.rows.map( 
            u => (
               <Card key={u.id} titulo={u.mes} status={u.status}/>
            )
         )
        }
        
    </div>
 </>);
}