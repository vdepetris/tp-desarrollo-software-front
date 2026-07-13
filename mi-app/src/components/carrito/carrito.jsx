import { useState } from "react";
import { Link } from "react-router-dom";
import "./carrito.css";
const productosIniciales = [
  {
    id: 1,
    name: "Whey Protein Ultra Premium",
    description: "Chocolate · 1 kg",
    price: 49990,
    quantity: 1,
    label: "WHEY",
  },
  {
    id: 2,
    name: "Creatina Monohidratada",
    description: "Sin sabor · 300 g",
    price: 24990,
    quantity: 2,
    label: "CREA",
  },
  {
    id: 3,
    name: "Multivitamínico Daily",
    description: "60 cápsulas",
    price: 19990,
    quantity: 1,
    label: "MULTI",
  },
];


function Carrito() {
 
  return (
    <main className="carrito">
      <section className="carrito__container">

        <div className="productos-carrito-container">

          <div className="producto">
            <div className="imagen-container">
              <img src="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg" alt="Producto" />
            </div>
            <div className="titulo-container">
              <h3>Whey Protein Ultra Premium</h3>
              <p>Chocolate · 1 kg</p>
            </div>
            <div className="button-stock-container">
              <div className="stock-container">
                <button className="stock-button">-</button>
                <span className="stock-quantity">1</span>
                <button className="stock-button">+</button>
              </div>
              <div className="precio-container">
                <span className="precio">$49,990</span>
              </div>
            </div>
          </div>
         <div className="producto">
            <div className="imagen-container">
              <img src="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg" alt="Producto" />
            </div>
            <div className="titulo-container">
              <h3>Whey Protein Ultra Premium</h3>
              <p>Chocolate · 1 kg</p>
            </div>
            <div className="button-stock-container">
              <div className="stock-container">
                <button className="stock-button">-</button>
                <span className="stock-quantity">1</span>
                <button className="stock-button">+</button>
              </div>
              <div className="precio-container">
                <span className="precio">$49,990</span>
              </div>
            </div>
          </div>
         <div className="producto">
            <div className="imagen-container">
              <img src="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg" alt="Producto" />
            </div>
            <div className="titulo-container">
              <h3>Whey Protein Ultra Premium</h3>
              <p>Chocolate · 1 kg</p>
            </div>
            <div className="button-stock-container">
              <div className="stock-container">
                <button className="stock-button">-</button>
                <span className="stock-quantity">1</span>
                <button className="stock-button">+</button>
              </div>
              <div className="precio-container">
                <span className="precio">$49,990</span>
              </div>
            </div>
          </div>
         <div className="producto">
            <div className="imagen-container">
              <img src="https://community.softr.io/uploads/db9110/original/2X/7/74e6e7e382d0ff5d7773ca9a87e6f6f8817a68a6.jpeg" alt="Producto" />
            </div>
            <div className="titulo-container">
              <h3>Whey Protein Ultra Premium</h3>
              <p>Chocolate · 1 kg</p>
            </div>
            <div className="button-stock-container">
              <div className="stock-container">
                <button className="stock-button">-</button>
                <span className="stock-quantity">1</span>
                <button className="stock-button">+</button>
              </div>
              <div className="precio-container">
                <span className="precio">$49,990</span>
              </div>
            </div>
          </div>
        </div>

        <div className="carrito-resumen">
          <span className="resumen-eyebrow">Resumen</span>
          <h2>Resumen de compra</h2>

          <div className="resumen-detalle">
            <div>
              <span>Productos (4)</span>
              <span>$199.960</span>
            </div>

            <div>
              <span>Envío</span>
              <strong className="envio-gratis">Gratis</strong>
            </div>
          </div>


          <div className="resumen-total">
            <span>Total</span>

            <div>
              <strong>$199.960</strong>
              <small>Impuestos incluidos</small>
            </div>
          </div>

          <button type="button" className="boton-pagar">
            Finalizar compra
          </button>

          <ul className="resumen-beneficios">
            <li>Compra segura y protegida</li>
            <li>Envíos a todo el país</li>
          </ul>
        </div>

      </section>
    </main>
  );
}

export default Carrito;