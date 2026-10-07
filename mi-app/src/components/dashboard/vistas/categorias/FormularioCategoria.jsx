import { useEffect, useRef, useState } from "react";
import "../productos/crear-producto.css";

const apiUrl = import.meta.env.VITE_API_URL;

// El mismo formulario crea con POST o edita con PUT según categoriaInicial.
// Los estilos se comparten con el popup de Productos.
function FormularioCategoria({ categoriaInicial, onCerrar, onGuardado }) {
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

  async function guardarCategoria(event) {
    // Evitamos recargar la página y enviar dos veces mientras se está guardando.
    event.preventDefault();
    if (guardando) return;

    const formulario = new FormData(event.currentTarget);
    const nombre = String(formulario.get("nombre") ?? "").trim();
    // El selector solo existe al editar. Al crear, Prisma usa el estado activo por defecto.
    const categoria = categoriaInicial
      ? { nombre, estado: formulario.get("estado") }
      : { nombre };

    if (!nombre) {
      setError("El nombre es obligatorio");
      return;
    }

    setError("");
    setGuardando(true);

    try {
      // En edición enviamos nombre y estado a la categoría elegida por su id.
      const url = categoriaInicial
        ? `${apiUrl}/categorias/${categoriaInicial.id}`
        : `${apiUrl}/categorias`;
      const respuesta = await fetch(url, {
        method: categoriaInicial ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(categoria),
      });

      const datos = await respuesta.json();

      if (!respuesta.ok) {
        throw new Error(datos.error ?? "No se pudo guardar la categoría");
      }

      // El PUT no incluye el conteo: conservamos el de la fila existente.
      onGuardado({ ...datos, cantidadProductos: categoriaInicial?.cantidadProductos ?? 0 });
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
      aria-labelledby="crear-categoria-titulo"
      onCancel={(event) => {
        event.preventDefault();
        if (!guardando) onCerrar();
      }}
    >
      <h2 id="crear-categoria-titulo">
        {categoriaInicial ? "Editar categoría" : "Nueva categoría"}
      </h2>

      <form onSubmit={guardarCategoria}>
        <label>
          Nombre
          <input name="nombre" defaultValue={categoriaInicial?.nombre ?? ""} required autoFocus disabled={guardando} />
        </label>

        {/* Al editar, mostramos el estado actual y permitimos elegir otro. */}
        {categoriaInicial && (
          <label>
            Estado
            <select name="estado" defaultValue={categoriaInicial.estado} required disabled={guardando}>
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

export default FormularioCategoria;
