import "./productos.css";
import Card from "../card/card";
import Paginator from "../paginator/paginator";

function Productos() {


  return (
    <main>
      <section>
        <h1>Productos</h1>
        <div className="productos-container">
          <aside className="filtros">
            <h2>Filtros</h2>

            <div className="filtro-grupo">
              <label htmlFor="categoria">Categoría</label>
              <select id="categoria" name="categoria">
                <option value="">Todas</option>
                <option value="proteinas">Proteínas</option>
                <option value="creatinas">Creatinas</option>
                <option value="vitaminas">Vitaminas</option>
                <option value="accesorios">Accesorios</option>
              </select>
            </div>

            <div className="filtro-grupo">
              <label htmlFor="precio">Precio máximo</label>
              <input
                type="range"
                id="precio"
                name="precio"
                min="0"
                max="100000"
                step="5000"
              />
            </div>

            <div className="filtro-grupo">
              <label>Marca</label>

              <label className="checkbox">
                <input type="checkbox" name="marca" value="ena" />
                ENA
              </label>

              <label className="checkbox">
                <input type="checkbox" name="marca" value="star" />
                Star Nutrition
              </label>

              <label className="checkbox">
                <input type="checkbox" name="marca" value="gold" />
                Gold Nutrition
              </label>
            </div>

            <div className="filtro-grupo">
              <label>Ordenar por</label>
              <select name="orden">
                <option value="">Relevancia</option>
                <option value="menor-precio">Menor precio</option>
                <option value="mayor-precio">Mayor precio</option>
                <option value="nombre">Nombre</option>
              </select>
            </div>

            <button className="btn-filtrar">Aplicar filtros</button>
          </aside>
          <div className="list-and-paginator">
            <div className="product-list">
              <Card
                name="Whey Protein"
                description="Proteína de suero de leche de alta calidad"
                price="$49.990"
              />
              <Card
                name="Whey Protein"
                description="Proteína de suero de leche de alta calidad"
                price="$49.990"
              />
              <Card
                name="Whey Protein"
                description="Proteína de suero de leche de alta calidad"
                price="$49.990"
              />
              <Card
                name="Whey Protein"
                description="Proteína de suero de leche de alta calidad"
                price="$49.990"
              />
              <Card
                name="Whey Protein"
                description="Proteína de suero de leche de alta calidad"
                price="$49.990"
              />
              <Card
                name="Whey Protein"
                description="Proteína de suero de leche de alta calidad"
                price="$49.990"
              />
              <Card
                name="Whey Protein"
                description="Proteína de suero de leche de alta calidad"
                price="$49.990"
              />
              <Card
                name="Whey Protein"
                description="Proteína de suero de leche de alta calidad"
                price="$49.990"
              />
            </div>
            <div>
              <Paginator />
            </div>
          </div>
        </div>

      </section>
    </main>
  );
}

export default Productos;