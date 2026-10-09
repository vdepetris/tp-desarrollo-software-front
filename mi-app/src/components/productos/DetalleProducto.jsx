import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import "../card/card.css";
import "./detalle-producto.css";

const apiUrl = import.meta.env.VITE_API_URL;

function DetalleProducto() {
  const { id } = useParams();
  // agregar: función del contexto que mete el producto en el carrito.
  const { agregar } = useCarrito();
  const [resultado, setResultado] = useState(null);
  // cantidad: unidades elegidas. agregado: para mostrar el aviso al agregar.
  const [cantidad, setCantidad] = useState(1);
  const [agregado, setAgregado] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function cargarProducto() {
      try {
        const respuesta = await fetch(`${apiUrl}/productos/${id}`, {
          signal: controller.signal,
        });

        if (respuesta.status === 404) {
          throw new Error("Producto no encontrado.");
        }
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar el producto.");
        }

        const producto = await respuesta.json();
        if (!controller.signal.aborted) {
          setResultado({ id, producto, error: "" });
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setResultado({ id, producto: null, error: error.message });
        }
      }
    }

    cargarProducto();
    return () => controller.abort();
  }, [id]);

  // Evita mostrar el producto anterior cuando cambia la URL.
  const cargando = resultado?.id !== id;
  const producto = cargando ? null : resultado.producto;
  const error = cargando ? "" : resultado.error;

  // Agrega al carrito la cantidad elegida (sin pasarse del stock) y muestra el aviso.
  const agregarAlCarrito = () => {
    agregar(producto, Math.min(cantidad, producto.stock));
    setAgregado(true);
  };

  return (
    <main className="detalle-producto">
      <div className="detalle-producto__contenedor">
        <Link className="detalle-producto__volver" to="/productos">← Volver a productos</Link>

        {cargando && <p role="status">Cargando producto...</p>}
        {error && <p role="alert">{error}</p>}

        {producto && (
          <>
            <section className="detalle-producto__principal" aria-labelledby="producto-titulo">
              <div className="detalle-producto__imagen" aria-hidden="true">
                <div className="product-card__visual">
                  <span>NUTRAX</span>
                  <small>{producto.categoria?.nombre}</small>
                </div>
              </div>

              <div className="detalle-producto__informacion">
                <span className="detalle-producto__categoria">{producto.categoria?.nombre}</span>
                <h1 id="producto-titulo">{producto.nombre}</h1>
                <strong className="detalle-producto__precio">
                  {Number(producto.precio).toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
                </strong>

                <div className="detalle-producto__compra">
                  <div className="detalle-producto__cantidad">
                    <label htmlFor="cantidad-producto">Cantidad</label>
                    <input
                      id="cantidad-producto"
                      type="number"
                      min="1"
                      max={producto.stock}
                      step="1"
                      value={cantidad}
                      onChange={(event) => setCantidad(Math.max(1, Number(event.target.value) || 1))}
                    />
                  </div>
                  <button
                    className="detalle-producto__agregar"
                    type="button"
                    disabled={producto.stock <= 0}
                    onClick={agregarAlCarrito}
                  >
                    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <circle cx="9" cy="21" r="1" />
                      <circle cx="20" cy="21" r="1" />
                      <path d="M1 1h4l2.68 13.39A2 2 0 0 0 9.64 16h9.72a2 2 0 0 0 1.96-1.61L23 6H6" />
                    </svg>
                    Añadir al carrito
                  </button>
                </div>

                {agregado && (
                  <p role="status">
                    Producto agregado. <Link to="/carrito">Ver carrito</Link>
                  </p>
                )}

                <h2>Detalles del producto</h2>
                <dl className="detalle-producto__datos">
                  <div>
                    <dt>Categoría</dt>
                    <dd>{producto.categoria?.nombre}</dd>
                  </div>
                  <div>
                    <dt>Stock</dt>
                    <dd>{producto.stock} unidades</dd>
                  </div>
                  <div>
                    <dt>Disponibilidad</dt>
                    <dd>{producto.stock > 0 ? "Disponible" : "Sin stock"}</dd>
                  </div>
                </dl>
              </div>
            </section>

            <section className="detalle-producto__descripcion" aria-labelledby="descripcion-titulo">
              <h2 id="descripcion-titulo">Información general</h2>
              <p>{producto.descripcion?.trim() || "Este producto no tiene una descripción disponible."}</p>
            </section>
          </>
        )}
      </div>
    </main>
  );
}

export default DetalleProducto;
