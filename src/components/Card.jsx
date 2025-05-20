export default ({titulo, status}) => (
    <>
        <div className="box">
                <div className="mes"> 
                  {titulo}
               </div>
               <div className="status">
                {status}
                <br></br>
                {status === "PENDENTE" && <button className="button">Pagar</button>}
                
               </div>
            </div>
    </>
)