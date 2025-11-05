import db from "../../../lib/db.js";
/*
export default async ({ params }) => {
  const {id} = await params;
  const usuario = await db.query("select * from usuario where id = " + id);

  return (
    <div className={style.pageContainer}>
      <div className={style.profileBox}>
        <img src="/iva.jpg" alt="Imagem do perfil" className={style.profileImage} />

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
              <strong>Senha:</strong>
              <span>{usuario.rows[0].senha}</span>
            </div>
            <div className={style.infoItem}>
              <strong>Sexo:</strong>
              <span>{usuario.rows[0].sexo}</span>
            </div>
            <div className={style.infoItem}>
              <strong>Período do pagamento:</strong>
              <span>Do dia {usuario.rows[0].periododopagamento}</span>
            </div>
          </div>
          <button className={style.button}>Editar Perfil</button>
        </div>
      </div>
    </div>
  );
};
*/

import style from "./page.module.css"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route.js";


export default async function Perfil({params}) {

  const {id} = await params;
  const sessao = await getServerSession(authOptions)
  const user = sessao.user;
  console.log(JSON.stringify(user))


  return (
    <div className={style.pageContainer}>
      <div className={style.profileBox}>
        <img src="/iva.jpg" alt="Imagem do perfil" className={style.profileImage} />

        <div className={style.profileContent}>
          <h2 className={style.title}>Perfil do Aluno</h2>
          <div className={style.info}>
            <div className={style.infoItem}>
              <strong>Nome:</strong>
              <span>{user.nome}</span>
            </div>
            <div className={style.infoItem}>
              <strong>Email:</strong>
              <span>{user.email}</span>
            </div>
            <div className={style.infoItem}>
              <strong>Senha:</strong>
              <span>{user.senha}</span>
            </div>
            <div className={style.infoItem}>
              <strong>Sexo:</strong>
              <span>{user.sexo}</span>
            </div>
            <div className={style.infoItem}>
              <strong>Período do pagamento:</strong>
              <span>Do dia {user.periododopagamento}</span>
            </div>
          </div>
          <button className={style.button}>Editar Perfil</button>
        </div>
      </div>
    </div>
  );
}
