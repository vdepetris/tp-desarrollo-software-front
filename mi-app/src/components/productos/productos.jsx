import { useState } from "react";
import Card from "../card/card";
import "./productos.css";

const productos = [
  { id: 1, name: "Whey Protein Ultra Premium", description: "Chocolate · 1 kg", price: 49990, category: "proteinas", brand: "ENA", label: "WHEY" },
  { id: 2, name: "Creatina Monohidratada", description: "Sin sabor · 300 g", price: 24990, category: "creatinas", brand: "Star Nutrition", label: "CREA" },
  { id: 3, name: "Multivitamínico Daily", description: "60 cápsulas", price: 19990, category: "vitaminas", brand: "Gold Nutrition", label: "MULTI" },
  { id: 4, name: "Whey Protein Isolate", description: "Vainilla · 900 g", price: 67990, category: "proteinas", brand: "Star Nutrition", label: "WHEY" },
  { id: 5, name: "Creatina Micronizada", description: "Sin sabor · 300 g", price: 31990, category: "creatinas", brand: "ENA", label: "CREA" },
  { id: 6, name: "Shaker Pro", description: "Botella mezcladora · 700 ml", price: 12990, category: "accesorios", brand: "Gold Nutrition", label: "SHAKE" },
  { id: 7, name: "Omega 3 Premium", description: "90 cápsulas", price: 28990, category: "vitaminas", brand: "ENA", label: "OMEGA" },
  { id: 8, name: "Barra Proteica Box", description: "Pack de 12 unidades", price: 39990, category: "proteinas", brand: "Gold Nutrition", label: "BAR" },
];

const categorias = {
  proteinas: "Proteínas",
  creatinas: "Creatinas",
  vitaminas: "Vitaminas",
  accesorios: "Accesorios",
};

const filtrosIniciales = {
  categoria: "",
  precio: 100000,
  marcas: [],
  orden: "relevancia",
};

const mostrarPrecio = (valor) => `$${valor.toLocaleString("es-AR")}`;

function Productos() {
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [filtrosAplicados, setFiltrosAplicados] = useState(filtrosIniciales);
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);

  const cambiarMarca = (marca) => {
    setFiltros((actuales) => ({
      ...actuales,
      marcas: actuales.marcas.includes(marca)
        ? actuales.marcas.filter((item) => item !== marca)
        : [...actuales.marcas, marca],
    }));
  };

  const aplicarFiltros = (event) => {
    event.preventDefault();
    setFiltrosAplicados({ ...filtros, marcas: [...filtros.marcas] });
    setFiltrosAbiertos(false);
  };

  const limpiarFiltros = () => {
    setFiltros(filtrosIniciales);
    setFiltrosAplicados(filtrosIniciales);
    setFiltrosAbiertos(false);
  };

  const productosVisibles = productos
    .filter((producto) =>
      (!filtrosAplicados.categoria || producto.category === filtrosAplicados.categoria) &&
      producto.price <= filtrosAplicados.precio &&
      (filtrosAplicados.marcas.length === 0 || filtrosAplicados.marcas.includes(producto.brand)),
    )
    .sort((a, b) => {
      switch (filtrosAplicados.orden) {
        case "menor-precio": return a.price - b.price;
        case "mayor-precio": return b.price - a.price;
        case "nombre": return a.name.localeCompare(b.name, "es");
        default: return a.id - b.id;
      }
    });

  return (
    <main className="productos-pagina">
      <div className="productos-pagina__contenedor">
        <div className="productos-pagina__cabecera">
          <div>
            <span className="productos-pagina__eyebrow">Explorá nuestra selección</span>
            <h1>Productos</h1>
            <p>Encontrá lo que necesitás para acompañar tu rutina.</p>
          </div>
          <span className="productos-pagina__contador">
            {productosVisibles.length} {productosVisibles.length === 1 ? "producto encontrado" : "productos encontrados"}
          </span>
        </div>

        <button
          className="productos-pagina__abrir-filtros"
          type="button"
          aria-expanded={filtrosAbiertos}
          aria-controls="panel-filtros"
          onClick={() => setFiltrosAbiertos((abiertos) => !abiertos)}
        >
          Filtros <span aria-hidden="true">{filtrosAbiertos ? "−" : "+"}</span>
        </button>

        <div className="productos-container">
          <aside id="panel-filtros" className={`filtros ${filtrosAbiertos ? "filtros--abiertos" : ""}`}>
            <div className="filtros__cabecera">
              <h2>Filtros</h2>
              <button type="button" onClick={limpiarFiltros}>Limpiar</button>
            </div>

            <form onSubmit={aplicarFiltros}>
              <div className="filtro-grupo">
                <label htmlFor="categoria">Categoría</label>
                <select
                  id="categoria"
                  name="categoria"
                  value={filtros.categoria}
                  onChange={(event) => setFiltros({ ...filtros, categoria: event.target.value })}
                >
                  <option value="">Todas</option>
                  {Object.entries(categorias).map(([valor, etiqueta]) => (
                    <option key={valor} value={valor}>{etiqueta}</option>
                  ))}
                </select>
              </div>

              <div className="filtro-grupo">
                <div className="filtro-grupo__fila">
                  <label htmlFor="precio">Precio máximo</label>
                  <output htmlFor="precio">{mostrarPrecio(filtros.precio)}</output>
                </div>
                <input
                  type="range"
                  id="precio"
                  name="precio"
                  min="0"
                  max="100000"
                  step="5000"
                  value={filtros.precio}
                  onChange={(event) => setFiltros({ ...filtros, precio: Number(event.target.value) })}
                />
              </div>

              <fieldset className="filtro-grupo filtro-grupo--marcas">
                <legend>Marca</legend>
                {["ENA", "Star Nutrition", "Gold Nutrition"].map((marca) => (
                  <label className="filtro-checkbox" key={marca}>
                    <input
                      type="checkbox"
                      name="marca"
                      value={marca}
                      checked={filtros.marcas.includes(marca)}
                      onChange={() => cambiarMarca(marca)}
                    />
                    {marca}
                  </label>
                ))}
              </fieldset>

              <div className="filtro-grupo">
                <label htmlFor="orden">Ordenar por</label>
                <select
                  id="orden"
                  name="orden"
                  value={filtros.orden}
                  onChange={(event) => setFiltros({ ...filtros, orden: event.target.value })}
                >
                  <option value="relevancia">Relevancia</option>
                  <option value="menor-precio">Menor precio</option>
                  <option value="mayor-precio">Mayor precio</option>
                  <option value="nombre">Nombre</option>
                </select>
              </div>

              <button className="btn-filtrar" type="submit">Aplicar filtros</button>
            </form>
          </aside>

          <section className="productos-resultados" aria-label="Catálogo de productos">
            {productosVisibles.length > 0 ? (
              <div className="product-list">
                {productosVisibles.map((producto) => (
                  <Card
                    key={producto.id}
                    variant="catalog"
                    name={producto.name}
                    description={producto.description}
                    price={mostrarPrecio(producto.price)}
                    category={categorias[producto.category]}
                    categoryKey={producto.category}
                    brand={producto.brand}
                    label={producto.label}
                  />
                ))}
              </div>
            ) : (
              <div className="productos-vacio">
                <h2>No encontramos productos</h2>
                <p>Probá con otra categoría, marca o precio máximo.</p>
                <button type="button" onClick={limpiarFiltros}>Limpiar filtros</button>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Productos;
