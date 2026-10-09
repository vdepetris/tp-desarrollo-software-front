import { useState } from "react";
import { Link } from "react-router-dom";
import { useCarrito } from "../../context/CarritoContext";
import "./carrito.css";

// Dirección del backend, configurada en el archivo .env.
const apiUrl = import.meta.env.VITE_API_URL;

// TODO: cuando esté el login, el usuario sale de la sesión y no de una constante.
const USUARIO_ID = 1;

const mostrarPrecio = (valor) => `$${valor.toLocaleString("es-AR")}`;

function Carrito() {
  const { items: productos, cambiarCantidad, quitar, vaciar } = useCarrito();

  // mensaje: resultado de la compra (error o confirmación). enviando: evita doble click.
  const [mensaje, setMensaje] = useState("");
  const [enviando, setEnviando] = useState(false);

  const cantidadTotal = productos.reduce((total, producto) => total + producto.cantidad, 0);
  const subtotal = productos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0,
  );

  // POST /pedidos: manda al backend los productos y cantidades del carrito.
  // El precio no se envía: el backend lo toma de la base de datos.
  async function finalizarCompra() {
    setMensaje("");
    setEnviando(true);

    try {
      const respuesta = await fetch(`${apiUrl}/pedidos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          usuarioId: USUARIO_ID,
          items: productos.map((p) => ({ productoId: p.id, cantidad: p.cantidad })),
        }),
      });
      const datos = await respuesta.json();
      // Si el backend rechaza el pedido (por ejemplo sin stock) mostramos su mensaje.
      if (!respuesta.ok) throw new Error(datos.error ?? "No se pudo crear el pedido");

      // Pedido creado: vaciamos el carrito y avisamos al usuario.
      vaciar();
      setMensaje(`¡Pedido #${datos.id} creado con éxito!`);
    } catch (err) {
      setMensaje(err.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="carrito">
      <div className="carrito__cabecera">
        <span className="carrito__eyebrow">Tu selección</span>
        <h1>Tu carrito</h1>
        <p>Revisá tus productos antes de finalizar la compra.</p>
      </div>

      <div className="carrito__container">
        <section className="productos-carrito-container" aria-label="Productos en el carrito">
          <div className="carrito__lista-encabezado">
            <h2>Productos</h2>
            <span>{cantidadTotal} {cantidadTotal === 1 ? "unidad" : "unidades"}</span>
          </div>

          {productos.length === 0 && (
            <p>Tu carrito está vacío. <Link to="/productos">Ver productos</Link></p>
          )}

          {productos.map((producto) => (
            <article className="producto" key={producto.id}>
              <div className="producto__imagen" aria-hidden="true">
                <div className="producto__envase">
                  <span>{producto.categoria?.slice(0, 5).toUpperCase()}</span>
                  <small>NUTRAX</small>
                </div>
              </div>

              <div className="producto__info">
                <span className="producto__tipo">{producto.categoria}</span>
                <h3>{producto.nombre}</h3>
                <button type="button" onClick={() => quitar(producto.id)}>Quitar</button>
                <span className="producto__precio-unitario">
                  {mostrarPrecio(producto.precio)} c/u
                </span>
              </div>

              <div className="producto__acciones">
                <div className="stock-container" aria-label={`Cantidad de ${producto.nombre}`}>
                  <button
                    type="button"
                    aria-label={`Quitar una unidad de ${producto.nombre}`}
                    disabled={producto.cantidad === 1}
                    onClick={() => cambiarCantidad(producto.id, -1)}
                  >
                    −
                  </button>
                  <span aria-live="polite">{producto.cantidad}</span>
                  <button
                    type="button"
                    aria-label={`Agregar una unidad de ${producto.nombre}`}
                    disabled={producto.cantidad >= producto.stock}
                    onClick={() => cambiarCantidad(producto.id, 1)}
                  >
                    +
                  </button>
                </div>
                <div className="producto__subtotal">
                  <small>Subtotal</small>
                  <strong>{mostrarPrecio(producto.precio * producto.cantidad)}</strong>
                </div>
              </div>
            </article>
          ))}
        </section>

        <aside className="carrito-resumen" aria-label="Resumen de compra">
          <span className="resumen-eyebrow">Resumen</span>
          <h2>Resumen de compra</h2>

          <div className="resumen-detalle">
            <div>
              <span>Productos ({cantidadTotal})</span>
              <strong>{mostrarPrecio(subtotal)}</strong>
            </div>
            <div>
              <span>Envío</span>
              <strong className="envio-gratis">Gratis</strong>
            </div>
          </div>

          <div className="resumen-total">
            <span>Total</span>
            <div>
              <strong>{mostrarPrecio(subtotal)}</strong>
              <small>Impuestos incluidos</small>
            </div>
          </div>

          <button
            type="button"
            className="boton-pagar"
            disabled={productos.length === 0 || enviando}
            onClick={finalizarCompra}
          >
            {enviando ? "Procesando..." : "Finalizar compra"}
          </button>
          {mensaje && <p role="status">{mensaje}</p>}

          <ul className="resumen-beneficios">
            <li>Compra segura y protegida</li>
            <li>Envíos a todo el país</li>
          </ul>
        </aside>
      </div>
    </main>
  );
}

export default Carrito;
