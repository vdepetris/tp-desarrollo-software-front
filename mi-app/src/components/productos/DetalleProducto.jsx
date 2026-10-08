import "../card/card.css";
import "./detalle-producto.css";

// Datos de ejemplo compartidos por todos los enlaces hasta conectar el GET por id.
const producto = {
  nombre: "Producto Nutrax",
  categoria: "Suplementos",
  precio: 45500.5,
  descripcion: "Conocé nuestra línea de suplementos y encontrá una opción para acompañar tu rutina de entrenamiento.",
  detalles: [
    { nombre: "Marca", valor: "Nutrax" },
    { nombre: "Presentación", valor: "Envase de 900 g" },
    { nombre: "Sabor", valor: "Vainilla" },
    { nombre: "Formato", valor: "Polvo" },
  ],
};

function DetalleProducto() {
  return (
    <main className="detalle-producto">
      <div className="detalle-producto__contenedor">
        <a className="detalle-producto__volver" href="/productos">← Volver a productos</a>

        <section className="detalle-producto__principal" aria-labelledby="producto-titulo">
          <div className="detalle-producto__imagen" aria-hidden="true">
            <div className="product-card__visual">
              <span>NUTRAX</span>
              <small>SUPLEMENTOS</small>
            </div>
          </div>

          <div className="detalle-producto__informacion">
            <span className="detalle-producto__categoria">{producto.categoria}</span>
            <h1 id="producto-titulo">{producto.nombre}</h1>
            <p>{producto.descripcion}</p>
            <strong className="detalle-producto__precio">
              {producto.precio.toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
            </strong>

            <h2>Detalles del producto</h2>
            <dl className="detalle-producto__datos">
              {producto.detalles.map((detalle) => (
                <div key={detalle.nombre}>
                  <dt>{detalle.nombre}</dt>
                  <dd>{detalle.valor}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="detalle-producto__descripcion" aria-labelledby="descripcion-titulo">
          <h2 id="descripcion-titulo">Información general</h2>
          <p>Este producto forma parte de la selección Nutrax. En esta sección vas a encontrar sus características, presentación y descripción completa.</p>
        </section>
      </div>
    </main>
  );
}

export default DetalleProducto;
