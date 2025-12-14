import db from "@/lib/db";
import Card from "@/components/Card";
import style from "./page.module.css";

export default async function Planos() {
  const plano = await db.query("SELECT * FROM plano");

  return (
    <>
      <h1 className={style.plano}>Escolha um plano</h1>
      <div className={style.container}>
        {plano.rows.map(u => (
          <Card
            key={u.id}
            id={u.id}
            titulo={u.quantvezesnasemana}
            checkins={u.checkins}
            valor={u.valor}
          />
        ))}
      </div>
    </>
  );
}
