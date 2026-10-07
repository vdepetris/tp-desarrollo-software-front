// Hooks de React: efectos, referencias a elementos HTML y estados del componente.
import { useEffect, useRef, useState } from "react";
import "./crear-producto.css";

// Dirección del backend configurada en el archivo .env del frontend.
const apiUrl = import.meta.env.VITE_API_URL;

// Si recibimos productoInicial editamos sus datos; si no, creamos un producto.
// onCerrar oculta el popup; onGuardado actualiza la tabla y lo cierra.
function FormularioProducto({ productoInicial, onCerrar, onGuardado }) {
  // La referencia permite acceder al <dialog> y usar sus métodos de abrir/cerrar.
  const modal = useRef(null);
  // Guardamos las categorías del selector, el mensaje de error y si hay un envío en curso.
  const [categorias, setCategorias] = useState([]);
  // Conservamos la selección mientras llegan las opciones del backend.
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(productoInicial?.categoriaId ?? "");
  const [error, setError] = useState("");
  const [guardando, setGuardando] = useState(false);

  // Al montar el componente abrimos el popup y pedimos las categorías al backend.
  // [] evita repetir este efecto con cada cambio de estado.
  useEffect(() => {
    const dialogo = modal.current;
    dialogo.showModal();

    // GET /categorias: obtenemos la lista y actualizamos las opciones del selector.
    async function cargarCategorias() {
      try {
        const respuesta = await fetch(`${apiUrl}/categorias`);
        if (!respuesta.ok) throw new Error("No se pudieron cargar las categorías");
        setCategorias(await respuesta.json());
      } catch (err) {
        // Si falla la petición, guardamos el mensaje para mostrarlo en el formulario.
        setError(err.message);
      }
    }

    // Declarar la función no la ejecuta: esta llamada inicia el GET.
    cargarCategorias();
    // Limpieza del efecto: cerramos el diálogo al desmontar el componente.
    // React también ejecuta esta limpieza en el ciclo adicional de StrictMode en desarrollo.
    return () => dialogo.close();
  }, []);

  // Se ejecuta al enviar el formulario con el botón Guardar o con Enter.
  async function guardarProducto(event) {
    // Evitamos que el envío normal del formulario recargue la página.
    event.preventDefault();
    // FormData lee los campos del formulario usando sus atributos name.
    const formulario = new FormData(event.currentTarget);
    // Armamos el objeto que espera el backend. Los valores del formulario son texto,
    // por eso convertimos precio, stock y categoriaId a números.
    const producto = {
      nombre: formulario.get("nombre"),
      descripcion: formulario.get("descripcion"),
      precio: Number(formulario.get("precio")),
      stock: Number(formulario.get("stock")),
      categoriaId: Number(formulario.get("categoriaId")),
    };

    // Limpiamos el error anterior y deshabilitamos los botones mientras se guarda.
    setError("");
    setGuardando(true);

    try {
      // POST /productos crea; PUT /productos/:id modifica el producto elegido.
      // El header indica que enviamos JSON
      // y JSON.stringify convierte el objeto de JavaScript en texto JSON.
      const url = productoInicial
        ? `${apiUrl}/productos/${productoInicial.id}`
        : `${apiUrl}/productos`;
      const respuesta = await fetch(url, {
        method: productoInicial ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(producto),
      });
      // Leemos la respuesta. Si el servidor rechaza el producto, usamos su mensaje de error.
      const datos = await respuesta.json();
      if (!respuesta.ok) throw new Error(datos.error ?? "No se pudo guardar el producto");

      // Las respuestas de crear y editar no incluyen la categoría completa de la tabla.
      // ...datos copia sus campos y find busca la categoría elegida en la lista cargada.
      // Avisamos al padre para que actualice la tabla y cierre el popup.
      onGuardado({
        ...datos,
        categoria: categorias.find((categoria) => categoria.id === producto.categoriaId),
      });
    } catch (err) {
      // Capturamos errores de conexión o del backend para mostrarlos al usuario.
      setError(err.message);
    } finally {
      // Se ejecuta tanto si se guardó correctamente como si hubo un error.
      setGuardando(false);
    }
  }

  // JSX del popup. ref conecta el <dialog> con modal.current.
  // onCancel permite cerrar con Escape; aria-labelledby lo identifica por su título.
  return (
    <dialog ref={modal} className="crear-producto" aria-labelledby="crear-producto-titulo" onCancel={onCerrar}>
      <h2 id="crear-producto-titulo">{productoInicial ? "Editar producto" : "Agregar producto"}</h2>
      {/* onSubmit conecta el envío del formulario con la función que hace el POST. */}
      <form onSubmit={guardarProducto}>
        {/* required exige un nombre; autoFocus coloca el cursor en este campo. */}
        <label>
          Nombre
          <input name="nombre" defaultValue={productoInicial?.nombre ?? ""} required autoFocus />
        </label>
        {/* La descripción es opcional porque no lleva required. */}
        <label>
          Descripción (opcional)
          <textarea name="descripcion" rows="3" defaultValue={productoInicial?.descripcion ?? ""} />
        </label>
        {/* Precio positivo con hasta dos decimales; stock entero desde cero. */}
        <label>
          Precio
          <input name="precio" type="number" min="0.01" step="0.01" defaultValue={productoInicial?.precio ?? ""} required />
        </label>
        <label>
          Stock
          <input name="stock" type="number" min="0" step="1" defaultValue={productoInicial?.stock ?? 0} required />
        </label>
        {/* map genera una opción por categoría. Se muestra el nombre y se envía su ID. */}
        <label>
          Categoría
          <select name="categoriaId" value={categoriaSeleccionada} onChange={(event) => setCategoriaSeleccionada(event.target.value)} required>
            <option value="" disabled>Seleccioná una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
            ))}
          </select>
        </label>
        {/* Solo mostramos este mensaje cuando error tiene contenido. */}
        {error && <p className="crear-producto__error" role="alert">{error}</p>}
        {/* Cancelar llama al padre sin enviar el formulario. Guardar dispara onSubmit.
            No permitimos guardar durante el envío o si no hay categorías disponibles. */}
        <div className="crear-producto__acciones">
          <button type="button" className="btn btn--secondary" onClick={onCerrar} disabled={guardando}>Cancelar</button>
          <button type="submit" className="btn btn--primary" disabled={guardando || categorias.length === 0}>
            {guardando ? "Guardando…" : "Guardar"}
          </button>
        </div>
      </form>
    </dialog>
  );
}

// Permite importar este componente desde Productos.jsx.
export default FormularioProducto;
