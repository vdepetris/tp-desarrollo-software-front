import { useState } from "react";
import "./dashboard.css";

import Inicio from "./vistas/Inicio";
import Productos from "./vistas/Productos";
import Pedidos from "./vistas/Pedidos";
import Categorias from "./vistas/Categorias";

function Dashboard() {
  const [vistaActual, setVistaActual] = useState("inicio");

  return (
    <main className="dashboard">
      <aside className="dashboard__sidebar">
        <a className="dashboard__logo" href="/">
          NUTRA<span>X</span>
        </a>

        <nav className="dashboard__nav">
          <button
            className={vistaActual === "inicio" ? "active" : ""}
            onClick={() => setVistaActual("inicio")}
          >
            <span>⌂</span>
            Inicio
          </button>

          <button
            className={vistaActual === "productos" ? "active" : ""}
            onClick={() => setVistaActual("productos")}
          >
            <span>◇</span>
            Productos
          </button>

          <button
            className={vistaActual === "categorias" ? "active" : ""}
            onClick={() => setVistaActual("categorias")}
          >
            <span>◇</span>
            Categorías
          </button>

          <button
            className={vistaActual === "pedidos" ? "active" : ""}
            onClick={() => setVistaActual("pedidos")}
          >
            <span>▤</span>
            Pedidos
          </button>
        </nav>

        <a className="dashboard__logout" href="/login">
          <span>↪</span>
          Cerrar sesión
        </a>
      </aside>

      <section className="dashboard__content">
        {vistaActual === "inicio" && <Inicio />}
        {vistaActual === "productos" && <Productos />}
        {vistaActual === "categorias" && <Categorias />}
        {vistaActual === "pedidos" && <Pedidos />}
      </section>
    </main>
  );
}

export default Dashboard;