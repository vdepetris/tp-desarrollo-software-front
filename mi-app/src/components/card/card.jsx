import "./card.css";

function Card({ id, name, description, price, variant, category, categoryKey, label }) {
  if (variant === "catalog") {
    return (
      <a href={`/productos/${id ?? "detalle"}`} className="product-card__link" aria-label={`Ver detalles de ${name}`}>
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
        </div>
      </article>
      </a>
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
