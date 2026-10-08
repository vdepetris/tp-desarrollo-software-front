import { useEffect, useState } from "react";
import "./paginator.css";

function Paginator({ url, recargar = 0, onTotal, mensajeVacio = "No hay registros para mostrar.", children }) {
  const [pagina, setPagina] = useState(1);
  const [datos, setDatos] = useState([]);
  const [totalPaginas, setTotalPaginas] = useState(0);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function cargarDatos() {
      setCargando(true);
      setError("");

      try {
        // Conservamos los filtros de la URL al agregar la página.
        const direccion = new URL(url, window.location.origin);
        direccion.searchParams.set("page", pagina);
        const respuesta = await fetch(direccion, {
          signal: controller.signal,
        });

        if (!respuesta.ok) {
          throw new Error("No se pudieron cargar los datos.");
        }

        const resultado = await respuesta.json();
        onTotal?.(resultado.total);
        setTotalPaginas(resultado.totalPaginas);

        // Después de eliminar, la página actual podría dejar de existir.
        const ultimaPagina = Math.max(1, resultado.totalPaginas);

        if (pagina > ultimaPagina) {
          setPagina(ultimaPagina);
          return;
        }

        setDatos(resultado.datos);
      } catch (error) {
        if (error.name !== "AbortError") {
          setError(error.message);
        }
      } finally {
        if (!controller.signal.aborted) {
          setCargando(false);
        }
      }
    }

    cargarDatos();

    return () => controller.abort();
  }, [url, pagina, recargar, onTotal]);

  return (
    <>
      {cargando ? (
        <p role="status">Cargando...</p>
      ) : error ? (
        <p role="alert">{error}</p>
      ) : datos.length === 0 ? (
        <div>{mensajeVacio}</div>
      ) : (
        children(datos)
      )}

      {!error && totalPaginas > 0 && (
        <nav className="paginator" aria-label="Paginación">
          <button
            className="paginator__button"
            type="button"
            disabled={cargando || pagina === 1}
            onClick={() => setPagina(pagina - 1)}
          >
            Anterior
          </button>

          <div className="paginator__pages">
            {Array.from({ length: totalPaginas }, (_, indice) => {
              const numero = indice + 1;

              return (
                <button
                  key={numero}
                  className={`paginator__page ${
                    numero === pagina ? "paginator__page--active" : ""
                  }`}
                  type="button"
                  disabled={cargando}
                  aria-current={numero === pagina ? "page" : undefined}
                  onClick={() => setPagina(numero)}
                >
                  {numero}
                </button>
              );
            })}
          </div>

          <button
            className="paginator__button"
            type="button"
            disabled={cargando || pagina === totalPaginas}
            onClick={() => setPagina(pagina + 1)}
          >
            Siguiente
          </button>
        </nav>
      )}
    </>
  );
}

export default Paginator;