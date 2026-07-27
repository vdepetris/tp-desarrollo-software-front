import "./categorias.css";

const categorias = [
  { nombre: "Proteínas", descripcion: "Suplementos para recuperación muscular", productos: 28 },
  { nombre: "Aminoácidos", descripcion: "Productos para mejorar el rendimiento", productos: 18 },
  { nombre: "Pre Entreno", descripcion: "Fórmulas para aumentar la energía", productos: 15 },
  { nombre: "Accesorios", descripcion: "Elementos para tu entrenamiento", productos: 22 },
];

function Categorias() {
  return (
    <div className="categorias-dashboard">
      <div className="categorias__titulo">
        <h1>Categorías</h1>
        <button type="button">+ Nueva categoría</button>
      </div>

      <input
        className="categorias__buscar"
        type="search"
        placeholder="Buscar categoría..."
      />

      <div className="categorias__tabla">
        <table>
          <thead>
            <tr>
              <th>Categoría</th>
              <th>Descripción</th>
              <th>Productos</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categorias.map((categoria) => (
              <tr key={categoria.nombre}>
                <td><strong>{categoria.nombre}</strong></td>
                <td>{categoria.descripcion}</td>
                <td>{categoria.productos}</td>
                <td><span className="categorias__estado">Activo</span></td>
                <td className="categorias__acciones">
                  <button type="button" aria-label={`Editar ${categoria.nombre}`}>✎</button>
                  <button type="button" aria-label={`Eliminar ${categoria.nombre}`}>⌫</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Categorias;
