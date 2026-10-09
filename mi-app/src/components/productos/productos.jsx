import { useState, useEffect } from "react";
import Card from "../card/card";
import Paginator from "../paginator/paginator";
import "./productos.css";

const apiUrl = import.meta.env.VITE_API_URL;


const filtrosIniciales = {
  categoria: "",
  precio: 100000,
  orden: "relevancia",
};

const mostrarPrecio = (valor) => `$${valor.toLocaleString("es-AR")}`;

function Productos() {
  const [filtros, setFiltros] = useState(filtrosIniciales);
  const [filtrosAplicados, setFiltrosAplicados] = useState(filtrosIniciales);
  const [filtrosAbiertos, setFiltrosAbiertos] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [total, setTotal] = useState(null);
  const [reinicio, setReinicio] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarCategorias() {
      try {
        // Las opciones de categorías se cargan independientemente de la página de productos.
        let todos = [];
        let pagina = 1;
        let totalPaginas = 1;

        do {
          const respuesta = await fetch(`${apiUrl}/categorias?page=${pagina}`, {
            signal: controller.signal,
          });
          if (!respuesta.ok) throw new Error("No se pudieron cargar las categorías.");
          const resultado = await respuesta.json();
          todos = [...todos, ...resultado.datos];
          totalPaginas = resultado.totalPaginas;
          pagina++;
        } while (pagina <= totalPaginas);

        setCategorias(todos);
      } catch (err) {
        if (err.name !== "AbortError") setError(err.message);
      }
    }

    cargarCategorias();
    return () => controller.abort();
  }, []);

  const aplicarFiltros = (event) => {
    event.preventDefault();
    setFiltrosAplicados({ ...filtros });
    setTotal(null);
    setReinicio((actual) => actual + 1);
    setFiltrosAbiertos(false);
  };

  const limpiarFiltros = () => {
    setFiltros(filtrosIniciales);
    setFiltrosAplicados(filtrosIniciales);
    setTotal(null);
    setReinicio((actual) => actual + 1);
    setFiltrosAbiertos(false);
  };

  const parametros = new URLSearchParams({
    precioMaximo: String(filtrosAplicados.precio),
    orden: filtrosAplicados.orden,
  });
  if (filtrosAplicados.categoria) {
    parametros.set("categoriaId", filtrosAplicados.categoria);
  }
  const url = `${apiUrl}/productos?${parametros}`;

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
            {total === null ? "Cargando productos..." : `${total} ${total === 1 ? "producto encontrado" : "productos encontrados"}`}
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

            {error && <p role="alert">{error}</p>}
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
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>{categoria.nombre}</option>
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
            <Paginator
              key={`${url}-${reinicio}`}
              url={url}
              onTotal={setTotal}
              mensajeVacio={
                <div className="productos-vacio">
                  <h2>No encontramos productos</h2>
                  <p>Probá cambiar los filtros.</p>
                  <button type="button" onClick={limpiarFiltros}>Limpiar filtros</button>
                </div>
              }
            >
              {(productos) => (
                <div className="product-list">
                  {productos.map((producto) => (
                    <Card
                      key={producto.id}
                      id={producto.id}
                      name={producto.nombre}
                      description={producto.descripcion}
                      price={mostrarPrecio(Number(producto.precio))}
                      category={producto.categoria?.nombre}
                      label="NUTRAX"
                    />
                  ))}
                </div>
              )}
            </Paginator>
          </section>
        </div>
      </div>
    </main>
  );
}

export default Productos;
