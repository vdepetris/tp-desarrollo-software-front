import "./paginator.css";

function Paginator() {
  return (
    <nav className="paginator" aria-label="Paginación de productos">
      <button className="paginator__button" type="button">
        Anterior
      </button>

      <div className="paginator__pages">
        <button className="paginator__page paginator__page--active" type="button">
          1
        </button>
        <button className="paginator__page" type="button">
          2
        </button>
        <button className="paginator__page" type="button">
          3
        </button>
      </div>

      <button className="paginator__button" type="button">
        Siguiente
      </button>
    </nav>
  );
}

export default Paginator;
