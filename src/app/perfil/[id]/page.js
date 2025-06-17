import db from "../../../lib/db.js";
import style from "./page.module.css";

export default async ({ params }) => {
  const usuario = await db.query("select * from usuario where id = " + params.id);

  const sexoFormatado =
    String(usuario.rows[0].sexo) === "1"
      ? "Masculino"
      : String(usuario.rows[0].sexo) === "2"
      ? "Feminino"
      : "";

  const dataFormatada = usuario.rows[0].periododopagamento.toLocaleDateString('pt-BR');

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
              <span>{sexoFormatado}</span>
            </div>
            <div className={style.infoItem}>
              <strong>Período do pagamento:</strong>
              <span>{dataFormatada}</span>
            </div>
          </div>
          <button className={style.button}>Editar Perfil</button>
        </div>
      </div>
    </div>
  );
};
