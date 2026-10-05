import { useState } from "react";
import "./carrito.css";

const productosIniciales = Array.from({ length: 4 }, (_, index) => ({
  id: index + 1,
  nombre: "Whey Protein Ultra Premium",
  variante: "Chocolate · 1 kg",
  precio: 49990,
  cantidad: 1,
}));

const mostrarPrecio = (valor) => `$${valor.toLocaleString("es-AR")}`;

function Carrito() {
  const [productos, setProductos] = useState(productosIniciales);

  const cambiarCantidad = (id, cambio) => {
    setProductos((actuales) =>
      actuales.map((producto) =>
        producto.id === id
          ? { ...producto, cantidad: Math.max(1, producto.cantidad + cambio) }
          : producto,
      ),
    );
  };

  const cantidadTotal = productos.reduce((total, producto) => total + producto.cantidad, 0);
  const subtotal = productos.reduce(
    (total, producto) => total + producto.precio * producto.cantidad,
    0,
  );

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

          {productos.map((producto) => (
            <article className="producto" key={producto.id}>
              <div className="producto__imagen" aria-hidden="true">
                <div className="producto__envase">
                  <span>WHEY</span>
                  <small>PROTEIN</small>
                </div>
              </div>

              <div className="producto__info">
                <span className="producto__tipo">Suplemento deportivo</span>
                <h3>{producto.nombre}</h3>
                <p>{producto.variante}</p>
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

          <button type="button" className="boton-pagar">
            Finalizar compra
          </button>

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
