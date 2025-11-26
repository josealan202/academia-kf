import style from "./page.module.css"

export default ({titulo, checkins, valor}) => (
    <>
        <div className={style.box}>
                <div className={style.nome}> 
                  Quantidade de dias na semana: {titulo}
               </div>
               <div className={style.checkins}>
                    Quantidade: {checkins} check-ins
               </div>
                <div className={style.valor}>
                    Valor: R$ {valor} reais
               </div>
               <div className={style.botao}>
                    <a href="./formadepagamento"><button className={style.button}>Comprar</button></a>
               </div>
            </div>
    </>
)