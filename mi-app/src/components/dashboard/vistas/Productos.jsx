
import { useState } from "react";
import "./productos-dashboard.css";
import FormularioProducto from "./productos/FormularioProducto";
import EliminarProducto from "./productos/EliminarProducto";

import Paginator from "../../paginator/paginator";

const apiUrl = import.meta.env.VITE_API_URL;

function Productos() {

  const [recargar, setRecargar] = useState(0);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [productoAEditar, setProductoAEditar] = useState(null);
  const [productoAEliminar, setProductoAEliminar] = useState(null);

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
          onGuardado={() => {
            setMostrarFormulario(false);
            setProductoAEditar(null);
            setRecargar((actual) => actual + 1);
          }}
        />
      )}

      {productoAEliminar && (
        <EliminarProducto
          producto={productoAEliminar}
          onCerrar={() => setProductoAEliminar(null)}
          onEliminado={() => {
            setProductoAEliminar(null);
            setRecargar((actual) => actual + 1);
          }}
        />
      )}

      <Paginator url={`${apiUrl}/productos`} recargar={recargar}>
        {(productos) => (
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
        )}
      </Paginator>
    </div>
  );

}

export default Productos;
