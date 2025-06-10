import style from "./page.module.css";

export default () => {
  return (
    <div className={style.container}>
      <main className={style.content}>
        <div className={style.left}>
          <h2 className={style.centroh2}>
            Assine já seu <br /> pacote de treino!
          </h2>
          <p className={style.centrop}>
            Transforme seus objetivos em realidade. Cada treino é <br />
            uma batalha vencida, cada superação é um avanço <br />
            em direção ao que você quer ser. Não pare até se <br />
            orgulhar do seu progresso.
          </p>

          <button className={style.btnplanos}>Clique na aba PLANOS</button>
        </div>
        <div className={style.right}>
          <img
            className={style.centroimg}
            src="/kf-tcc.jpeg"
            alt="imagem treino"
            width={600}
            height={600}
          />
        </div>
      </main>
    </div>
  );
};