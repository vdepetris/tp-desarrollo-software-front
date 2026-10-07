import { useEffect, useRef, useState } from "react";
import "../productos/crear-producto.css";
import "../productos/eliminar-producto.css";

const apiUrl = import.meta.env.VITE_API_URL;

function EliminarCategoria({ categoria, onCerrar, onEliminado }) {
  // Guardamos el error y bloqueamos los controles mientras el servidor responde.
  const modal = useRef(null);
  const [eliminando, setEliminando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // El diálogo se abre al montar y se cierra al desmontar el componente.
    const dialogo = modal.current;
    dialogo.showModal();
    return () => dialogo.close();
  }, []);

  async function eliminarCategoria() {
    // Solo se ejecuta al confirmar; abrir o cancelar el popup no elimina nada.
    if (eliminando) return;
    setEliminando(true);
    setError("");

    try {
      const respuesta = await fetch(`${apiUrl}/categorias/${categoria.id}`, {
        method: "DELETE",
      });

      if (!respuesta.ok) {
        // El backend rechaza categorías con productos; mostramos su mensaje sin quitar la fila.
        const datos = await respuesta.json();
        throw new Error(datos.error ?? "No se pudo eliminar la categoría");
      }

      // El DELETE exitoso responde 204, sin cuerpo JSON.
      onEliminado(categoria.id);
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
      aria-labelledby="eliminar-categoria-titulo"
      aria-describedby="eliminar-categoria-descripcion"
      onCancel={(event) => {
        // Escape cierra el popup, salvo que el DELETE ya esté en curso.
        event.preventDefault();
        if (!eliminando) onCerrar();
      }}
    >
      <h2 id="eliminar-categoria-titulo">Eliminar categoría</h2>
      <p id="eliminar-categoria-descripcion">
        ¿Querés eliminar <strong>“{categoria.nombre}”</strong>?
      </p>
      <p className="eliminar-producto__aviso">
        Esta acción no se puede deshacer.
        Las categorías con productos asociados no se pueden eliminar.
      </p>
      {error && <p className="crear-producto__error" role="alert">{error}</p>}
      <div className="crear-producto__acciones">
        <button type="button" className="btn btn--secondary" onClick={onCerrar} disabled={eliminando} autoFocus>
          Cancelar
        </button>
        <button type="button" className="btn btn--secondary eliminar-producto__confirmar" onClick={eliminarCategoria} disabled={eliminando}>
          {eliminando ? "Eliminando…" : "Eliminar"}
        </button>
      </div>
    </dialog>
  );
}

export default EliminarCategoria;
