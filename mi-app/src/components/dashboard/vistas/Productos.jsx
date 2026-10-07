
import { useState, useEffect } from "react";
import "./productos-dashboard.css";
import FormularioProducto from "./productos/FormularioProducto";
import EliminarProducto from "./productos/EliminarProducto";

const apiUrl = import.meta.env.VITE_API_URL;

function Productos() {

  const [productos, setProductos] = useState([]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

  useEffect(() => {
    async function cargarProductos() {
      const respuesta = await fetch(`${apiUrl}/productos`);
      const datos = await respuesta.json();

      setProductos(datos);

    }

    cargarProductos();
  }, []);


return (  

  
    <div className="inicio-dashboard">
      <div className="productos-dashboard__titulo">
        <h1>Productos</h1>
        <button
          type="button"
          className="btn btn--primary"
          onClick={() => {
            setProductoAEditar(null);
            setMostrarFormulario(true);
          }}
        >
          + Agregar producto
        </button>      
      </div>

      {mostrarFormulario && (
        <FormularioProducto
          productoInicial={productoAEditar}
          onCerrar={() => setMostrarFormulario(false)}
          onGuardado={(producto) => {
            // Editar reemplaza la fila existente; crear agrega una fila nueva.
            setProductos((actuales) => productoAEditar
              ? actuales.map((actual) => actual.id === producto.id ? producto : actual)
              : [...actuales, producto]);
            setMostrarFormulario(false);
          }}
        />
      )}

      {productoAEliminar && (
        <EliminarProducto
          producto={productoAEliminar}
          onCerrar={() => setProductoAEliminar(null)}
          onEliminado={(id) => {
            setProductos((actuales) => actuales.filter((producto) => producto.id !== id));
            setProductoAEliminar(null);
          }}
        />
      )}

      <div className="actividad-card">

        <div className="actividad-card__tabla">
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Categoria</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>

              {productos.map((producto) => (
                <tr key={producto.id}>
                  <td><strong>{producto.nombre}</strong></td>
                  <td>${Number(producto.precio).toFixed(0)}</td>
                  <td>{producto.stock}</td>
                  <td>{producto.categoria.nombre}</td>
                  <td>
                    <div className="productos-dashboard__acciones">
                      <button
                        type="button"
                        className="btn btn--secondary"
                        onClick={() => {
                          setProductoAEditar(producto);
                          setMostrarFormulario(true);
                        }}
                      >Editar</button>
                      <button
                        type="button"
                        className="btn btn--secondary productos-dashboard__eliminar"
                        onClick={() => setProductoAEliminar(producto)}
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            </tbody>

          </table>
        </div>
      </div>
    </div>
  );

}

export default Productos;
