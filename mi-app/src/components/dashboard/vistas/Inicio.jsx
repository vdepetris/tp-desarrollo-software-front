import "./inicio.css";

function Inicio() {
  return (
    <div className="inicio-dashboard">
      <h1>Inicio</h1>

      <div className="actividad-card">
        <div className="actividad-card__header">
          <h2>Actividad reciente</h2>
          <a href="#pedidos">Ver todos los pedidos →</a>
        </div>

        <div className="actividad-card__tabla">
          <table>
            <thead>
              <tr>
                <th>Pedido</th>
                <th>Fecha</th>
                <th>Total</th>
                <th>Estado</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>#1003</strong></td>
                <td>28 May, 2025 — 14:32</td>
                <td>$59.990</td>
                <td><span className="estado">Entregado</span></td>
              </tr>
              <tr>
                <td><strong>#1002</strong></td>
                <td>28 May, 2025 — 11:15</td>
                <td>$39.990</td>
                <td><span className="estado">Enviado</span></td>
              </tr>
              <tr>
                <td><strong>#1001</strong></td>
                <td>27 May, 2025 — 18:45</td>
                <td>$69.990</td>
                <td><span className="estado">Pendiente</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
