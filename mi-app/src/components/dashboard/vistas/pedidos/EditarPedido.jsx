import { useEffect, useRef, useState } from "react";
import "../productos/crear-producto.css";

const apiUrl = import.meta.env.VITE_API_URL;

const ESTADOS = ["pendiente", "pagado", "enviado", "entregado", "cancelado"];

// El vendedor solo modifica el estado; los items y el total no se tocan.
function EditarPedido({ pedido, onCerrar, onGuardado }) {
  const modal = useRef(null);
  const [estado, setEstado] = useState(pedido.estado);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    const dialogo = modal.current;
    dialogo.showModal();
    return () => dialogo.close();
  }, []);

  async function guardarEstado(event) {
    event.preventDefault();
    setError("");
    setGuardando(true);

    try {
      // PUT /pedidos/:id
      const respuesta = await fetch(`${apiUrl}/pedidos/${pedido.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ estado }),
      });
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.error ?? "No se pudo actualizar el pedido");

      // La respuesta no trae usuario ni items: conservamos los de la fila actual.
      onGuardado({ ...pedido, ...datos });
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <dialog ref={modal} className="crear-producto" aria-labelledby="editar-pedido-titulo" onCancel={onCerrar}>
      <h2 id="editar-pedido-titulo">Editar pedido #{pedido.id}</h2>
      <form onSubmit={guardarEstado}>
        <label>
          Estado
          <select value={estado} onChange={(event) => setEstado(event.target.value)} required autoFocus>
            {ESTADOS.map((opcion) => (
              <option key={opcion} value={opcion}>{opcion}</option>
            ))}
          </select>
        </label>
        {error && <p className="crear-producto__error" role="alert">{error}</p>}
        <div className="crear-producto__acciones">
          <button type="button" className="btn btn--secondary" onClick={onCerrar} disabled={guardando}>Cancelar</button>
          <button type="submit" className="btn btn--primary" disabled={guardando}>
            {guardando ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default EditarPedido;
