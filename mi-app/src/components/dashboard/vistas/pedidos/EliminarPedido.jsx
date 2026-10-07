import { useEffect, useRef, useState } from "react";
import "../productos/crear-producto.css";
import "../productos/eliminar-producto.css";

const apiUrl = import.meta.env.VITE_API_URL;

function EliminarPedido({ pedido, onCerrar, onEliminado }) {
  const modal = useRef(null);
  const [eliminando, setEliminando] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const dialogo = modal.current;
    dialogo.showModal();
    return () => dialogo.close();
  }, []);

  async function eliminarPedido() {
    setEliminando(true);
    setError("");

    try {
      const respuesta = await fetch(`${apiUrl}/pedidos/${pedido.id}`, { method: "DELETE" });

      if (!respuesta.ok) {
        const datos = await respuesta.json();
        throw new Error(datos.error ?? "No se pudo eliminar el pedido");
      }

      // El DELETE exitoso no devuelve JSON. Avisamos al padre para quitar la fila.
      onEliminado(pedido.id);
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
      aria-labelledby="eliminar-pedido-titulo"
      aria-describedby="eliminar-pedido-descripcion"
      onCancel={(event) => {
        event.preventDefault();
        if (!eliminando) onCerrar();
      }}
    >
      <h2 id="eliminar-pedido-titulo">Eliminar pedido</h2>
      <p id="eliminar-pedido-descripcion">
        ¿Querés eliminar el pedido <strong>#{pedido.id}</strong> de <strong>{pedido.usuario?.nombre}</strong>?
      </p>
      <p className="eliminar-producto__aviso">Esta acción no se puede deshacer.</p>
      {error && <p className="crear-producto__error" role="alert">{error}</p>}
      <div className="crear-producto__acciones">
        <button type="button" className="btn btn--secondary" onClick={onCerrar} disabled={eliminando} autoFocus>
          Cancelar
        </button>
        <button type="button" className="btn btn--secondary eliminar-producto__confirmar" onClick={eliminarPedido} disabled={eliminando}>
          {eliminando ? "Eliminando…" : "Eliminar"}
        </button>
      </div>
    </dialog>
  );
}

export default EliminarPedido;
