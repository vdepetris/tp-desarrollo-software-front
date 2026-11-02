import { Link, NavLink } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import "./Header.css";
function Header() {
  const [usuario, setUsuario] = useState(null);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const headerRef = useRef(null);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuAbierto) return;

    function cerrarAfuera(event) {
      if (!headerRef.current?.contains(event.target)) setMenuAbierto(false);
    }
    function cerrarConEscape(event) {
      if (event.key === "Escape") {
        setMenuAbierto(false);
        menuRef.current?.focus();
      }
    }
    const pantalla = window.matchMedia("(min-width: 768px)");
    function cerrarEnEscritorio(event) {
      if (event.matches) setMenuAbierto(false);
    }
    document.addEventListener("pointerdown", cerrarAfuera);
    document.addEventListener("keydown", cerrarConEscape);
    pantalla.addEventListener("change", cerrarEnEscritorio);
    return () => {
      document.removeEventListener("pointerdown", cerrarAfuera);
      document.removeEventListener("keydown", cerrarConEscape);
      pantalla.removeEventListener("change", cerrarEnEscritorio);
    };
  }, [menuAbierto]);

  useEffect(() => {
    const controller = new AbortController();

    async function consultarSesion() {
      try {
        // La cookie identifica la sesión; el backend confirma el usuario conectado.
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/usuarios/sesion`, {
          credentials: "include",
          signal: controller.signal,
        });
        if (respuesta.ok) setUsuario(await respuesta.json());
      } catch (error) {
        if (error.name !== "AbortError") setUsuario(null);
      }
    }

    consultarSesion();
    return () => controller.abort();
  }, []);

  return (
    <header className="header" ref={headerRef}>
      <div className="header__container">

        <div className="header__logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 800 260"
            className="header__logo-svg"
            aria-label="NUTRAX Suplementos"
            role="img"
          >
            <defs>
              <style>
                {`
                  .text-nutra {
                    font-family: 'Arial Black', 'Impact', 'Helvetica Neue', sans-serif;
                    font-weight: 900;
                    font-style: italic;
                    fill: #FFFFFF;
                    font-size: 112px;
                    letter-spacing: -2px;
                  }

                  .text-x {
                    font-family: 'Arial Black', 'Impact', 'Helvetica Neue', sans-serif;
                    font-weight: 900;
                    font-style: italic;
                    fill: #A6DF00;
                    font-size: 112px;
                    letter-spacing: -2px;
                  }

                  .text-supplements {
                    font-family: 'Arial', 'Helvetica Neue', sans-serif;
                    font-weight: bold;
                    fill: #A0A0A0;
                    font-size: 34px;
                    letter-spacing: 11px;
                  }
                `}
              </style>
            </defs>

            <g transform="skewX(-8) translate(40, 0)">
              <text x="70" y="145" className="text-nutra">NUTRA</text>
              <text x="545" y="145" className="text-x">X</text>
            </g>

            <g>
              <text x="155" y="205" className="text-supplements">SUPLEMENTOS</text>
            </g>
          </svg>
        </div>

        <nav
          id="header-navigation"
          aria-label="Navegación principal"
          className={`header__nav${menuAbierto ? " header__nav--open" : ""}`}
          onClick={(event) => {
            if (event.target.closest("a")) setMenuAbierto(false);
          }}
        >
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Inicio
          </NavLink>

          <NavLink
            to="/productos"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Productos
          </NavLink>

          <NavLink
            to="/contacto"
            className={({ isActive }) => isActive ? "active" : ""}
          >
            Contacto
          </NavLink>
          <Link className="button header__mobile-account" to={usuario ? "/dashboard" : "/login"} onClick={() => setMenuAbierto(false)}>
            {usuario ? "Mi cuenta" : "Ingresar"}
          </Link>
        </nav>

        <div className="header__user">
          <div>
            <a href="/carrito" className="header__cart" aria-label="Carrito">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="8" cy="21" r="1" />
                <circle cx="19" cy="21" r="1" />
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
              </svg>
            </a>
          </div>
          <div className="header__desktop-account">
            <a className="button" href={usuario ? "/dashboard" : "/login"}>
              {usuario ? "Mi cuenta" : "Ingresar"}

              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M20 21a8 8 0 0 0-16 0" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </a>
          </div>
          <button
            ref={menuRef}
            type="button"
            className={`header__toggle${menuAbierto ? " header__toggle--open" : ""}`}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            aria-controls="header-navigation"
            onClick={() => setMenuAbierto((abierto) => !abierto)}
          >
            <span /><span /><span />
          </button>
        </div>

      </div>
      
    </header>
  );
}


export default Header;
