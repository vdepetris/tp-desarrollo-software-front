import { useState } from "react";
import "./dashboard.css";

import Inicio from "./vistas/Inicio";
import Productos from "./vistas/Productos";
import Pedidos from "./vistas/Pedidos";
import Categorias from "./vistas/Categorias";

const sidebarIcons = {
  inicio: <><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-8H9v8H4a1 1 0 0 1-1-1Z" /></>,
  productos: <><path d="m12 3 9 5v8l-9 5-9-5V8Z" /><path d="m3 8 9 5 9-5M12 13v8M7.5 5.5l9 5" /></>,
  categorias: <><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></>,
  pedidos: <><path d="M8 5H5a1 1 0 0 0-1 1v14a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1h-3" /><rect x="8" y="3" width="8" height="4" rx="1" /><path d="M8 12h8M8 16h5" /></>,
  salir: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M9 12h12m-4-4 4 4-4 4" /></>,
};

function SidebarIcon({ name }) {
  return (
    <svg className="dashboard__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {sidebarIcons[name]}
    </svg>
  );
}

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
            <SidebarIcon name="inicio" />
            Inicio
          </button>

          <button
            className={vistaActual === "productos" ? "active" : ""}
            onClick={() => setVistaActual("productos")}
          >
            <SidebarIcon name="productos" />
            Productos
          </button>

          <button
            className={vistaActual === "categorias" ? "active" : ""}
            onClick={() => setVistaActual("categorias")}
          >
            <SidebarIcon name="categorias" />
            Categorías
          </button>

          <button
            className={vistaActual === "pedidos" ? "active" : ""}
            onClick={() => setVistaActual("pedidos")}
          >
            <SidebarIcon name="pedidos" />
            Pedidos
          </button>
        </nav>

        <a className="dashboard__logout" href="/login">
          <SidebarIcon name="salir" />
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
