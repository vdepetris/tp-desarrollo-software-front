import { Link } from "react-router-dom";
import "./card.css";

function Card({ id, name, description, price, category, label = "NUTRAX" }) {
  return (
    <Link
      to={id == null ? "/productos" : `/productos/${id}`}
      className="product-card__link"
      aria-label={`Ver detalles de ${name}`}
    >
      <article className="product-card">
        <div className="product-card__image" aria-hidden="true">
          <div className="product-card__visual">
            <span>{label}</span>
            <small>NUTRAX</small>
          </div>
        </div>
        <div className="product-card__body">
          {category && <span className="product-card__category">{category}</span>}
          <h3>{name}</h3>
          <p>{description}</p>
          <strong>{price}</strong>
        </div>
      </article>
    </Link>
  );
}

export default Card;
