// Un "contexto" es una forma de compartir datos entre componentes sin pasarlos
// de uno en uno por props. Acá lo usamos para que el detalle del producto y la
// página del carrito vean el mismo carrito.
import { createContext, useContext, useEffect, useState } from "react";

const CarritoContext = createContext(null);

// El Provider envuelve la app (ver main.jsx): todo lo que esté adentro puede usar el carrito.
export function CarritoProvider({ children }) {
  // items: lista de productos del carrito. Arranca con lo que haya guardado en el navegador.
  const [items, setItems] = useState(() => JSON.parse(localStorage.getItem("carrito")) ?? []);

  // Cada vez que cambia el carrito lo guardamos en localStorage,
  // así no se pierde al recargar la página.
  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(items));
  }, [items]);

  // Agrega un producto. Si ya estaba, le suma la cantidad (sin pasarse del stock).
  const agregar = (producto, cantidad) => {
    const existente = items.find((item) => item.id === producto.id);

    if (existente) {
      const nuevaCantidad = Math.min(existente.cantidad + cantidad, producto.stock);
      setItems(items.map((item) =>
        item.id === producto.id ? { ...item, cantidad: nuevaCantidad } : item,
      ));
    } else {
      // Guardamos solo los datos que necesita el carrito.
      setItems([
        ...items,
        {
          id: producto.id,
          nombre: producto.nombre,
          categoria: producto.categoria?.nombre,
          precio: Number(producto.precio),
          stock: producto.stock,
          cantidad,
        },
      ]);
    }
  };

  // Suma o resta unidades (cambio = 1 o -1) respetando el mínimo 1 y el stock.
  const cambiarCantidad = (id, cambio) => {
    setItems(items.map((item) =>
      item.id === id
        ? { ...item, cantidad: Math.min(item.stock, Math.max(1, item.cantidad + cambio)) }
        : item,
    ));
  };

  // Saca un producto del carrito.
  const quitar = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  // Deja el carrito vacío (se usa después de crear el pedido).
  const vaciar = () => {
    setItems([]);
  };

  // Todo lo que expone el contexto a los demás componentes.
  return (
    <CarritoContext.Provider value={{ items, agregar, cambiarCantidad, quitar, vaciar }}>
      {children}
    </CarritoContext.Provider>
  );
}

// Hook para usar el carrito: const { items, agregar } = useCarrito();
// eslint-disable-next-line react-refresh/only-export-components
export const useCarrito = () => useContext(CarritoContext);
