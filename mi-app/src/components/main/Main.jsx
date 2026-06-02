import "./Main.css";
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
          <h1 className="hero__title">Bienvenido a Nutrax</h1>
          <p className="hero__text">
            Suplementos y elementos de gimnasio para alcanzar tus objetivos con calidad premiun y resultados reales.
          </p>
          <div className="hero__actions">
            <button className="btn btn--primary">Ver productos</button>
            <button className="btn btn--secondary">Contacto</button>
          </div>
          <ul className="hero__benefits">
            <li>Envíos a todo el país</li>
            <li>Calidad premium</li>
            <li>Resultados reales</li>
          </ul>
        </div>
        <div className="hero__right">
          <div className="hero__card hero__card--large">
            <span className="hero__product-label">Whey Protein</span>
            
          </div>
          <div className="hero__card hero__card--small hero__card--left">
            <span>Creatine</span>
          </div>
          <div className="hero__card hero__card--small hero__card--right">
            <span>Multivitamínico</span>
          </div>
        </div>
      </section>

      <section className="featured">
        <div className="section-header">
          <span>Productos destacados</span>
          <h2>en tendencia</h2>
        </div>
        <div className="product-grid">
          {featuredProducts.map((product) => (
            <article key={product.name} className="product-card">
              <div className="product-card__image" />
              <div className="product-card__body">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <strong>{product.price}</strong>
                <button className="btn btn--small">Ver más</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
);
}

export default Main;


