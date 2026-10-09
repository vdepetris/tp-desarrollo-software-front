import "./Main.css";
import Card from "../card/card";
import { Link } from "react-router-dom";

const featuredProducts = [
  {
    name: "Whey Protein Ultra Premium",
    price: "$49.990",
    description: "Proteína para fuerza y recuperación",
  },
  {
    name: "Creatina Monohidratada",
    price: "$24.990",
    description: "Más energía y mejor rendimiento",
  },
  {
    name: "Multivitamínico Daily Performance",
    price: "$19.990",
    description: "Vitaminas para tu entrenamiento diario",
  },
  {
    name: "BCAA 2:1:1 Recovery",
    price: "$29.990",
    description: "Recuperación muscular de alta calidad",
  },
];

function Main() {
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
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <Card
              key={product.name}
              name={product.name}
              description={product.description}
              price={product.price}
              category="Suplementos"
              label="NUTRAX"
            />
          ))}
        </div>
      </section>
    </main>
);
}

export default Main;

