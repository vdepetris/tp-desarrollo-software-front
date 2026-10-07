import { useState, useEffect } from "react";
import Card from "../card/card";
import "./productos.css";

const apiUrl = import.meta.env.VITE_API_URL;


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
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    async function cargarProductos() {
      const respuesta = await fetch(`${apiUrl}/productos`);
      const datos = await respuesta.json();

      setProductos(datos);

    }

    cargarProductos();
  }, []);
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
            {productos.length > 0 ? (
              <div className="product-list">
                {productos.map((producto) => (
                  <Card
                    key={producto.id}
                    variant="catalog"
                    name={producto.nombre}
                    description={producto.descripcion}
                    price={mostrarPrecio(Number(producto.precio))}
                    category={producto.categoria?.nombre}
                  />
                ))}
              </div>
            ) : (
              <div className="productos-vacio">
                <h2>No encontramos productos</h2>
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

export default Productos;
