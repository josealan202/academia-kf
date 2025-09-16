import style from "./page.module.css"

export default ({titulo, horario, turno}) => (
    <>
        <div className={style.box}>
                <div className={style.nome}> 
                  {titulo}
               </div>
               <div className={style.horario}>
                    Horário: {horario}
               </div>
                <div className={style.turno}>
                    Turno: {turno}
               </div>
               <div className={style.botao}>
                    <a href="./formadepagamento"><button className={style.button}>Entrar</button></a>
               </div>
            </div>
    </>
)