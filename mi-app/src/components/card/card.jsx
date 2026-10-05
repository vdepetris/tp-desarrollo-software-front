import "./card.css";

function Card({ name, description, price, variant, category, categoryKey, brand, label }) {
  if (variant === "catalog") {
    return (
      <article className="product-card product-card--catalog">
        <div className={`product-card__image product-card__image--${categoryKey}`} aria-hidden="true">
          <div className="product-card__visual">
            <span>{label}</span>
            <small>NUTRAX</small>
          </div>
        </div>
        <div className="product-card__body">
          <span className="product-card__category">{category}</span>
          <h3>{name}</h3>
          <p>{description}</p>
          <strong>{price}</strong>
          <details className="product-card__details">
            <summary>Ver producto</summary>
            <div>
              <span>Marca: {brand}</span>
              <span>Categoría: {category}</span>
            </div>
          </details>
        </div>
      </article>
    );
  }

  return (
    <article className="product-card">
      <div className="product-card__image" />
      <div className="product-card__body">
        <h3>{name}</h3>
        <p>{description}</p>
        <strong>{price}</strong>
        <button className="btn btn--small">Ver más</button>
      </div>
    </article>
  );
}

export default Card;
