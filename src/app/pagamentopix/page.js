import React from "react";
import style from "./page.module.css";

export default function Pagamento() {
  const chavePix = "123e4567-e89b-12d3-a456-426614174000";

  return (
    <div className={style.container}>
      <h2 className={style.title}>Pagamento via PIX</h2>

      <div className={style.pixInfo}>
        <p className={style.label}>Chave PIX: {chavePix}</p>
      </div>

      <div className={style.pixQRCode}>
        {/* Aqui pode entrar um QR Code, mas vou deixar só texto */}
        <p>Escaneie o QR Code abaixo para pagar via PIX:</p>
        <div className={style.qrPlaceholder}>[QR Code PIX]</div>
      </div>
    </div>
  );
}
