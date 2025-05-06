import db from "@/lib/db";
import './style.css';


export default async () => {
    const mensalidades = await db.query("select * from mensalidade")
 return (<>
    <br></br>
    <h1>Mensalidade</h1>
    <br></br>
    <div class="container">
        <div class="box">
        {mensalidades.rows[0].mes}
      
      </div>
        <div class="box">

        
        </div>
        <div class="box">

        
        </div>
    </div>
 </>);
}