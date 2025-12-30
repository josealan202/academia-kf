import db from "../../../lib/db.js";
import style from "./page.module.css"
import EditarPerfilButton from "./editarPerfilButton";

export default async function Perfil({ params }) {
  const {id} = await params;
  console.log("DATABASE_URL:", process.env.DATABASE_URL);
  const usuario = await db.query("SELECT * FROM usuario WHERE id = $1",
  [id]);

  return (
    <div className={style.pageContainer}>
      <div className={style.profileBox}>
        <div className={style.profileContent}>
          <h2 className={style.title}>Perfil do Aluno</h2>
          <div className={style.info}>
            <div className={style.infoItem}>
              <strong>Nome:</strong>
              <span>{usuario.rows[0].nome}</span>
            </div>
            <div className={style.infoItem}>
              <strong>Email:</strong>
              <span>{usuario.rows[0].email}</span>
            </div>
            <div className={style.infoItem}>
              <strong>Sexo:</strong>
              <span>{usuario.rows[0].sexo}</span>
            </div>
            <div className={style.infoItem}>
              <strong>Check-ins adquiridos:</strong>
              <span>{usuario.rows[0].checkins}</span>
            </div>
          </div>
          <EditarPerfilButton id={id} />
        </div>
      </div>
    </div>
  );
};