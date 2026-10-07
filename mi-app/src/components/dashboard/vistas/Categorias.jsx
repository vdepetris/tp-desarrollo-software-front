import "./categorias.css";
import { useState, useEffect } from "react";
import FormularioCategoria from "./categorias/FormularioCategoria";
import EliminarCategoria from "./categorias/EliminarCategoria";

const apiUrl = import.meta.env.VITE_API_URL;


function Categorias() {
  // La lista alimenta la tabla; los otros estados indican qué popup abrir y para qué fila.
  const [categoriasData, setCategoriasData] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [categoriaAEditar, setCategoriaAEditar] = useState(null);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  useEffect(() => {
    // Al entrar a la vista, traemos nombre, estado y cantidad de productos desde el backend.
    async function cargarCategorias() {
      const respuesta = await fetch(`${apiUrl}/categorias`);
      const datos = await respuesta.json();
      setCategoriasData(datos);
    }

    cargarCategorias();
  }, []);

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
          onGuardado={(categoria) => {
            // Editar reemplaza la fila por id; crear agrega una fila al final.
            // Usamos la respuesta del servidor para reflejar también el nuevo estado.
            setCategoriasData((actuales) => categoriaAEditar
              ? actuales.map((actual) => actual.id === categoria.id ? categoria : actual)
              : [...actuales, categoria]);
            setMostrarFormulario(false);
            setCategoriaAEditar(null);
          }}
        />
      )}

      {categoriaAEliminar && (
        <EliminarCategoria
          categoria={categoriaAEliminar}
          onCerrar={() => setCategoriaAEliminar(null)}
          onEliminado={(id) => {
            // Quitamos la fila solo después de que el servidor confirme la eliminación.
            setCategoriasData((actuales) => actuales.filter((categoria) => categoria.id !== id));
            setCategoriaAEliminar(null);
          }}
        />
      )}

      <input
        className="categorias__buscar"
        type="search"
        placeholder="Buscar categoría..."
      />

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
    </div>
  );
}

export default Categorias;
