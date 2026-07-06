import "./card.css";

function Card({ name, description, price }) {
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
