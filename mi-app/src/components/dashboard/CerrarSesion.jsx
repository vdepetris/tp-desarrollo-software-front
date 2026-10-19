import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CerrarSesion() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [saliendo, setSaliendo] = useState(false);

  async function salir() {
    setSaliendo(true);
    setError("");
    try {
      // Destruye la sesión del servidor antes de volver al login.
      const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/logout`, {
        method: "POST", credentials: "include",
      });
      if (!respuesta.ok) throw new Error("No se pudo cerrar la sesión");
      navigate("/login", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setSaliendo(false);
    }
  }

  return <>
    <button className="dashboard__logout" onClick={salir} disabled={saliendo}>
      {saliendo ? "Cerrando sesión…" : "Cerrar sesión"}
    </button>
    {error && <p role="alert">{error}</p>}
  </>;
}
