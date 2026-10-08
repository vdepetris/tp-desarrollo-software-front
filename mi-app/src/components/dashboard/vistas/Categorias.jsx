import "./categorias.css";
import { useState } from "react";
import FormularioCategoria from "./categorias/FormularioCategoria";
import EliminarCategoria from "./categorias/EliminarCategoria";
import Paginator from "../../paginator/paginator";

const apiUrl = import.meta.env.VITE_API_URL;

function Categorias() {
  // Cambiar recargar vuelve a consultar la página después de guardar o eliminar.
  const [recargar, setRecargar] = useState(0);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [categoriaAEditar, setCategoriaAEditar] = useState(null);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  return (
    <div className="categorias-dashboard">
      <div className="categorias__titulo">
        <h1>Categorías</h1>
        <button type="button" className="btn btn--primary" onClick={() => {
          // Sin categoría inicial, el formulario se abre en modo creación.
          setCategoriaAEditar(null);
          setMostrarFormulario(true);
        }}>
          + Nueva categoría
        </button>
      </div>

      {mostrarFormulario && (
        <FormularioCategoria
          categoriaInicial={categoriaAEditar}
          onCerrar={() => setMostrarFormulario(false)}
          onGuardado={() => {
            setMostrarFormulario(false);
            setCategoriaAEditar(null);
            setRecargar((actual) => actual + 1);
          }}
        />
      )}

      {categoriaAEliminar && (
        <EliminarCategoria
          categoria={categoriaAEliminar}
          onCerrar={() => setCategoriaAEliminar(null)}
          onEliminado={() => {
            setCategoriaAEliminar(null);
            setRecargar((actual) => actual + 1);
          }}
        />
      )}

      <input
        className="categorias__buscar"
        type="search"
        placeholder="Buscar categoría..."
      />

      <Paginator url={`${apiUrl}/categorias`} recargar={recargar}>
        {(categoriasData) => (
          <div className="categorias__tabla">
            <table>
              <thead>
                <tr>
                  <th>Categoría</th>
                  <th>Productos</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {categoriasData.map((categoria) => (
                  <tr key={categoria.id}>
                    <td><strong>{categoria.nombre}</strong></td>
                    <td>{categoria.cantidadProductos}</td>
                    <td>
                      {/* El estado del backend determina el texto y el color de la etiqueta. */}
                      <span className={`categorias__estado categorias__estado--${categoria.estado}`}>
                        {categoria.estado === "activo" ? "Activo" : categoria.estado === "inactivo" ? "Inactivo" : "Sin estado"}
                      </span>
                    </td>
                    <td>
                      <div className="categorias__acciones">
                        <button type="button" className="btn btn--secondary" aria-label={`Editar ${categoria.nombre}`} onClick={() => {
                          // Pasamos los datos actuales para precargar nombre y estado en el popup.
                          setCategoriaAEditar(categoria);
                          setMostrarFormulario(true);
                        }}>Editar</button>
                        <button type="button" className="btn btn--secondary categorias__eliminar" aria-label={`Eliminar ${categoria.nombre}`} onClick={() => setCategoriaAEliminar(categoria)}>Eliminar</button>
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

export default Categorias;
