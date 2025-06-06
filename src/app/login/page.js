'use client'
import style from './page.module.css';

export default function Login() {
  return (
    <>
        <br></br>
        <body>
            <div className={style.container}>
            <h2 className={style.title}>Login</h2>
            <form>
                <label htmlFor="email" className={style.label}>Email:</label>
                <input type="email" id="email" name="email" className={style.input} required />

                <label htmlFor="senha" className={style.label}>Senha:</label>
            <div className={style.senhaContainer}>
                <input type="password" id="senha" name="senha" className={style.input} required />
                <button type="button" className={style.verSenha} onClick={
            function toggleSenha() {
                const senhaInput = document.getElementById("senha");
                senhaInput.type = senhaInput.type === "password" ? "text" : "password";
            }
        }><img src="olhoSenha.png" height="25px" width="25px" className={style.olhoSenha}></img></button>
            </div>

            <label className={style.checkbox}>
            <input type="checkbox" id="salvarSenha" name="salvarSenha" />
                Salvar senha
            </label>

                <button type="submit" className={style.button}>Entrar</button>
            </form>
            </div>
        </body>
    </>
  );
}
