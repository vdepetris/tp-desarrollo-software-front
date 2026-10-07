import { useEffect, useState } from "react";
import "./pedidos.css";
import EditarPedido from "./pedidos/EditarPedido";
import EliminarPedido from "./pedidos/EliminarPedido";

const apiUrl = import.meta.env.VITE_API_URL;

function Pedidos() {
  const [pedidos, setPedidos] = useState([]);
  const [busqueda, setBusqueda] = useState("");
  const [error, setError] = useState("");
  const [pedidoAEditar, setPedidoAEditar] = useState(null);
  const [pedidoAEliminar, setPedidoAEliminar] = useState(null);

  useEffect(() => {
    async function cargarPedidos() {
      try {
        const respuesta = await fetch(`${apiUrl}/pedidos`);
        if (!respuesta.ok) throw new Error("No se pudieron cargar los pedidos");
        setPedidos(await respuesta.json());
      } catch (err) {
        setError(err.message);
      }
    }

    cargarPedidos();
  }, []);

  // Filtra por número de pedido o nombre del cliente.
  const texto = busqueda.trim().toLowerCase();
  const pedidosVisibles = pedidos.filter(
    (pedido) =>
      String(pedido.id).includes(texto) ||
      pedido.usuario?.nombre.toLowerCase().includes(texto)
  );

  return (
    <div className="pedidos-dashboard">
      <div className="pedidos__titulo">
        <h1>Pedidos</h1>
      </div>

      <input
        className="pedidos__buscar"
        type="search"
        placeholder="Buscar por número o cliente..."
        value={busqueda}
        onChange={(event) => setBusqueda(event.target.value)}
      />

      {error && <p role="alert">{error}</p>}

      {pedidoAEditar && (
        <EditarPedido
          pedido={pedidoAEditar}
          onCerrar={() => setPedidoAEditar(null)}
          onGuardado={(pedido) => {
            setPedidos((actuales) => actuales.map((actual) => actual.id === pedido.id ? pedido : actual));
            setPedidoAEditar(null);
          }}
        />
      )}

      {pedidoAEliminar && (
        <EliminarPedido
          pedido={pedidoAEliminar}
          onCerrar={() => setPedidoAEliminar(null)}
          onEliminado={(id) => {
            setPedidos((actuales) => actuales.filter((pedido) => pedido.id !== id));
            setPedidoAEliminar(null);
          }}
        />
      )}

      <div className="pedidos__tabla">
        <table>
          <thead>
            <tr>
              <th>N° Pedido</th>
              <th>Cliente</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pedidosVisibles.map((pedido) => (
              <tr key={pedido.id}>
                <td><strong>#{pedido.id}</strong></td>
                <td>{pedido.usuario?.nombre}</td>
                <td>{new Date(pedido.fecha).toLocaleDateString("es-AR")}</td>
                <td>${Number(pedido.total).toLocaleString("es-AR")}</td>
                <td>
                  <span className={`pedidos__estado pedidos__estado--${pedido.estado}`}>
                    {pedido.estado}
                  </span>
                </td>
                <td className="pedidos__acciones">
                  <button type="button" aria-label={`Editar pedido ${pedido.id}`} onClick={() => setPedidoAEditar(pedido)}>✎</button>
                  <button type="button" aria-label={`Eliminar pedido ${pedido.id}`} onClick={() => setPedidoAEliminar(pedido)}>⌫</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Pedidos;
