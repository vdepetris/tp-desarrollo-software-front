import "./categorias.css";
import { useState } from "react";
import FormularioMarca from "./marcas/FormularioMarca";
import EliminarMarca from "./marcas/EliminarMarca";
import Paginator from "../../paginator/paginator";

const apiUrl = import.meta.env.VITE_API_URL;

function Marcas() {
  // Cambiar recargar vuelve a consultar la página después de guardar o eliminar.
  const [recargar, setRecargar] = useState(0);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [marcaAEditar, setMarcaAEditar] = useState(null);
  const [marcaAEliminar, setMarcaAEliminar] = useState(null);

  return (
    <div className="categorias-dashboard">
      <div className="categorias__titulo">
        <h1>Marcas</h1>
        <button type="button" className="btn btn--primary" onClick={() => {
          // Sin marca inicial, el formulario se abre en modo creación.
          setMarcaAEditar(null);
          setMostrarFormulario(true);
        }}>
          + Nueva marca
        </button>
      </div>

      {mostrarFormulario && (
        <FormularioMarca
          marcaInicial={marcaAEditar}
          onCerrar={() => setMostrarFormulario(false)}
          onGuardado={() => {
            setMostrarFormulario(false);
            setMarcaAEditar(null);
            setRecargar((actual) => actual + 1);
          }}
        />
      )}

      {marcaAEliminar && (
        <EliminarMarca
          marca={marcaAEliminar}
          onCerrar={() => setMarcaAEliminar(null)}
          onEliminado={() => {
            setMarcaAEliminar(null);
            setRecargar((actual) => actual + 1);
          }}
        />
      )}

      <Paginator url={`${apiUrl}/marcas`} recargar={recargar}>
        {(marcasData) => (
          <div className="categorias__tabla">
            <table>
              <thead>
                <tr>
                  <th>Marca</th>
                  <th>Productos</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {marcasData.map((marca) => (
                  <tr key={marca.id}>
                    <td><strong>{marca.nombre}</strong></td>
                    <td>{marca.cantidadProductos}</td>
                    <td>
                      {/* El estado del backend determina el texto y el color de la etiqueta. */}
                      <span className={`categorias__estado categorias__estado--${marca.estado}`}>
                        {marca.estado === "activo" ? "Activo" : marca.estado === "inactivo" ? "Inactivo" : "Sin estado"}
                      </span>
                    </td>
                    <td>
                      <div className="categorias__acciones">
                        <button type="button" className="btn btn--secondary" aria-label={`Editar ${marca.nombre}`} onClick={() => {
                          // Pasamos los datos actuales para precargar nombre y estado en el popup.
                          setMarcaAEditar(marca);
                          setMostrarFormulario(true);
                        }}>Editar</button>
                        <button type="button" className="btn btn--secondary categorias__eliminar" aria-label={`Eliminar ${marca.nombre}`} onClick={() => setMarcaAEliminar(marca)}>Eliminar</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Paginator>
    </div>
  );
}

export default Marcas;
