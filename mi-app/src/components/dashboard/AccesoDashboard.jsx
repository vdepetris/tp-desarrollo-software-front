import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import Dashboard from "./dashboard";
import DashboardCliente from "./DashboardCliente";

export default function AccesoDashboard() {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function cargar() {
      try {
        // Se consulta al servidor al entrar o recargar; el rol no sale de localStorage.
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/sesion`, {
          credentials: "include", signal: controller.signal,
        });
        if (respuesta.status === 401) return;
        if (!respuesta.ok) throw new Error("No se pudo consultar la sesión");
        setUsuario(await respuesta.json());
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }
    cargar();
    return () => controller.abort();
  }, []);

  if (cargando) return <p role="status">Cargando…</p>;
  if (error) return <p role="alert">{error}</p>;
  if (!usuario) return <Navigate to="/login" replace />;
  return usuario.rol === "admin" ? <Dashboard /> : <DashboardCliente usuario={usuario} />;
}
