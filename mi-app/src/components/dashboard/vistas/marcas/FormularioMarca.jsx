import { useEffect, useRef, useState } from "react";
import "../productos/crear-producto.css";

const apiUrl = import.meta.env.VITE_API_URL;

// El mismo formulario crea con POST o edita con PUT según marcaInicial.
// Los estilos se comparten con el popup de Productos.
function FormularioMarca({ marcaInicial, onCerrar, onGuardado }) {
  // La referencia controla el <dialog>; los estados muestran errores y bloquean envíos.
  const modal = useRef(null);
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  useEffect(() => {
    // Abrimos al montar y cerramos al desmontar (también funciona con StrictMode).
    const dialogo = modal.current;
    dialogo.showModal();

    return () => dialogo.close();
  }, []);

  async function guardarMarca(event) {
    // Evitamos recargar la página y enviar dos veces mientras se está guardando.
    event.preventDefault();
    if (guardando) return;

    const formulario = new FormData(event.currentTarget);
    const nombre = String(formulario.get("nombre") ?? "").trim();
    // El selector solo existe al editar. Al crear, Prisma usa el estado activo por defecto.
    const marca = marcaInicial
      ? { nombre, estado: formulario.get("estado") }
      : { nombre };

    if (!nombre) {
      setError("El nombre es obligatorio");
      return;
    }

    setError("");
    setGuardando(true);

    try {
      // En edición enviamos nombre y estado a la marca elegida por su id.
      const url = marcaInicial
        ? `${apiUrl}/marcas/${marcaInicial.id}`
        : `${apiUrl}/marcas`;
      const respuesta = await fetch(url, { credentials: "include",
        method: marcaInicial ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(marca),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error ?? "No se pudo guardar la marca");
      }

      // El PUT no incluye el conteo: conservamos el de la fila existente.
      onGuardado({ ...datos, cantidadProductos: marcaInicial?.cantidadProductos ?? 0 });
    } catch (err) {
      // Si falla la validación del servidor o la conexión, mantenemos abierto el popup.
      setError(err.message);
    } finally {
      // Habilitamos nuevamente los controles tanto si se guardó como si falló.
      setGuardando(false);
    }
  }

  return (
    <dialog
      ref={modal}
      className="crear-producto"
      aria-labelledby="crear-marca-titulo"
      onCancel={(event) => {
        event.preventDefault();
        if (!guardando) onCerrar();
      }}
    >
      <h2 id="crear-marca-titulo">
        {marcaInicial ? "Editar marca" : "Nueva marca"}
      </h2>

      <form onSubmit={guardarMarca}>
        <label>
          Nombre
          <input name="nombre" defaultValue={marcaInicial?.nombre ?? ""} required autoFocus disabled={guardando} />
        </label>

        {/* Al editar, mostramos el estado actual y permitimos elegir otro. */}
        {marcaInicial && (
          <label>
            Estado
            <select name="estado" defaultValue={marcaInicial.estado} required disabled={guardando}>
              <option value="activo">Activo</option>
              <option value="inactivo">Inactivo</option>
            </select>
          </label>
        )}

        {error && (
          <p className="crear-producto__error" role="alert">
            {error}
          </p>
        )}

        <div className="crear-producto__acciones">
          <button
            type="button"
            className="btn btn--secondary"
            onClick={onCerrar}
            disabled={guardando}
          >
            Cancelar
          </button>

          <button
            type="submit"
            className="btn btn--primary"
            disabled={guardando}
          >
            {guardando ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </form>
    </dialog>
  );
}

export default FormularioMarca;
