import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import CerrarSesion from "./CerrarSesion";
import "./dashboard.css";

export default function DashboardCliente({ usuario }) {
  const [vista, setVista] = useState("cuenta");
  const [pedidos, setPedidos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function cargar() {
      try {
        // El backend filtra por el usuario autenticado, sin aceptar IDs del navegador.
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/pedidos`, {
          credentials: "include", signal: controller.signal,
        });
        const datos = await respuesta.json();
        if (!respuesta.ok) throw new Error(datos.error ?? "No se pudieron cargar tus pedidos");
        setPedidos(datos);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }
    cargar();
    return () => controller.abort();
  }, []);

  return (
    <main className="dashboard">
      <aside className="dashboard__sidebar">
        <Link className="dashboard__logo" to="/">NUTRA<span>X</span></Link>
        <nav className="dashboard__nav" aria-label="Panel del cliente">
          <button className={vista === "cuenta" ? "active" : ""} onClick={() => setVista("cuenta")}>Mi cuenta</button>
          <button className={vista === "pedidos" ? "active" : ""} onClick={() => setVista("pedidos")}>Mis pedidos</button>
          <Link className="dashboard__logout" to="/productos">Ver productos</Link>
        </nav>
        <CerrarSesion />
      </aside>
      <section className="dashboard__content">
        <h1>Hola, {usuario.nombre}</h1>
        {vista === "cuenta" ? (
          <section className="dashboard__cliente-card">
            <h2>Mi cuenta</h2>
            <p>Nombre: {usuario.nombre}</p>
            <p>Email: {usuario.email}</p>
          </section>
        ) : (
          <section>
            <h2>Mis pedidos</h2>
            {cargando && <p role="status">Cargando pedidos…</p>}
            {error && <p role="alert">{error}</p>}
            {!cargando && !error && pedidos.length === 0 && <p>Todavía no tenés pedidos.</p>}
            {pedidos.map(pedido => (
              <article className="dashboard__cliente-card" key={pedido.id}>
                <h3>Pedido #{pedido.id}</h3>
                <p>{new Date(pedido.fecha).toLocaleDateString("es-AR")} · {pedido.estado}</p>
                <ul>{pedido.items.map(item => <li key={item.id}>{item.producto.nombre} × {item.cantidad}</li>)}</ul>
                <strong>Total: {Number(pedido.total).toLocaleString("es-AR", { style: "currency", currency: "ARS" })}</strong>
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  );
}
