import "./Main.css";
import { useEffect, useState } from "react";
import Card from "../card/card";
import { Link } from "react-router-dom";

function Main() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    async function cargarProductos() {
      try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/productos?orden=recientes`, {
          credentials: "include",
          signal: controller.signal,
        });
        if (!respuesta.ok) throw new Error("No se pudieron cargar los últimos productos.");
        const resultado = await respuesta.json();
        if (!controller.signal.aborted) setProductos(resultado.datos.slice(0, 4));
      } catch (err) {
        if (!controller.signal.aborted) setError(err.message);
      } finally {
        if (!controller.signal.aborted) setCargando(false);
      }
    }
    cargarProductos();
    return () => controller.abort();
  }, []);

    return (
    <main className="main">
      <section className="hero">
        <div className="hero__left">
          <span className="hero__eyebrow">Suplementos de alto rendimiento</span>
          <h1 className="hero__title">Tu próximo nivel<br /><span>empieza acá.</span></h1>
          <p className="hero__text">
            Encontrá en Nutrax los suplementos y elementos de gimnasio para acompañar cada entrenamiento y alcanzar tus objetivos.
          </p>
          <div className="hero__actions">
            <Link className="btn btn--primary" to="/productos">Explorar productos <span aria-hidden="true">↗</span></Link>
            <Link className="btn btn--secondary" to="/contacto">Contactanos</Link>
          </div>
          <ul className="hero__benefits">
            <li>Envíos a todo el país</li>
            <li>Calidad premium</li>
            <li>Para tu rutina</li>
          </ul>
        </div>
        <div className="hero__right">
          <div className="hero__showcase">
            <span className="hero__showcase-kicker">NUTRAX / SUPLEMENTOS</span>
            <div className="hero__halo" aria-hidden="true" />
            <div className="hero__envases" aria-hidden="true">
              <div className="product-card__visual hero__envase hero__envase--small">
                <small>NUTRAX</small><span>CREATINA</span><small>MONOHIDRATADA</small>
              </div>
              <div className="product-card__visual hero__envase hero__envase--large">
                <small>NUTRAX</small><span>WHEY</span><small>PROTEIN</small>
              </div>
            </div>
            <div className="hero__showcase-caption">
              <span>Constancia. Fuerza. Nutrax.</span>
              <small>Todo para acompañar tu entrenamiento.</small>
            </div>
          </div>
          <div className="hero__note">
            <span aria-hidden="true">↗</span>
            <div><strong>Un objetivo, muchas posibilidades.</strong><small>Elegí lo que mejor acompaña tu rutina.</small></div>
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="section-header">
          <span>Explorá el catálogo</span>
          <h2>Últimos productos</h2>
          <p>Una selección para sumar a tu entrenamiento.</p>
        </div>
        {cargando && <p role="status">Cargando productos...</p>}
        {error && <p role="alert">{error} <Link to="/productos">Ver catálogo</Link></p>}
        {!cargando && !error && productos.length === 0 && <p>Todavía no hay productos disponibles.</p>}
        <div className="product-grid">
          {productos.map((product) => (
            <Card
              key={product.id}
              id={product.id}
              name={product.nombre}
              description={product.descripcion}
              price={Number(product.precio).toLocaleString("es-AR", { style: "currency", currency: "ARS" })}
              category={product.categoria?.nombre}
              label="NUTRAX"
            />
          ))}
        </div>
      </section>
    </main>
);
}

export default Main;

