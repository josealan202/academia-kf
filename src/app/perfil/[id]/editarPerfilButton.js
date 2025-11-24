"use client";

import { useRouter } from "next/navigation";
import style from "./page.module.css";

export default function EditarPerfilButton({ id }) {
  const router = useRouter();

  return (
    <button
      className={style.button}
      onClick={() => router.push(`/botaoperfiledit/${id}`)}
    >
      Editar Perfil
    </button>
  );
}
