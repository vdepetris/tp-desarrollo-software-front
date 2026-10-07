import { useEffect, useRef, useState } from "react";
import "./crear-producto.css";
import "./eliminar-producto.css";

const apiUrl = import.meta.env.VITE_API_URL;

function EliminarProducto({ producto, onCerrar, onEliminado }) {
  const modal = useRef(null);
  const [eliminando, setEliminando] = useState(false);
  const [error, setError] = useState("");

  // Abrimos el popup al montar el componente y lo cerramos al desmontarlo.
  useEffect(() => {
    const dialogo = modal.current;
    dialogo.showModal();
    return () => dialogo.close();
  }, []);

  async function eliminarProducto() {
    setEliminando(true);
    setError("");

    try {
      const respuesta = await fetch(`${apiUrl}/productos/${producto.id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        const datos = await respuesta.json();
        throw new Error(datos.error ?? "No se pudo eliminar el producto");
      }

      // El DELETE exitoso no devuelve JSON. Avisamos al padre para quitar la fila.
      onEliminado(producto.id);
    } catch (err) {
      setError(err.message);
    } finally {
      setEliminando(false);
    }
  }

  return (
    <dialog
      ref={modal}
      className="crear-producto eliminar-producto"
      aria-labelledby="eliminar-producto-titulo"
      aria-describedby="eliminar-producto-descripcion"
      onCancel={(event) => {
        // Escape cancela, salvo que la eliminación ya esté en curso.
        event.preventDefault();
        if (!eliminando) onCerrar();
      }}
    >
      <h2 id="eliminar-producto-titulo">Eliminar producto</h2>
      <p id="eliminar-producto-descripcion">
        ¿Querés eliminar <strong>“{producto.nombre}”</strong>?
      </p>
      <p className="eliminar-producto__aviso">Esta acción no se puede deshacer.</p>
      {error && <p className="crear-producto__error" role="alert">{error}</p>}
      <div className="crear-producto__acciones">
        <button type="button" className="btn btn--secondary" onClick={onCerrar} disabled={eliminando} autoFocus>
          Cancelar
        </button>
        <button type="button" className="btn btn--secondary eliminar-producto__confirmar" onClick={eliminarProducto} disabled={eliminando}>
          {eliminando ? "Eliminando…" : "Eliminar"}
        </button>
      </div>
    </dialog>
  );
}

export default EliminarProducto;
