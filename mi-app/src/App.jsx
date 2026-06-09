import { Routes, Route } from "react-router-dom";
import Header from "./components/header/Header";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import Login from "./components/login/Login";
import Productos from "./components/productos/productos";
import Contacto from "./components/contacto/contacto";
import Carrito from "./components/carrito/carrito";

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <Header />
            <Main />
            <Footer />
          </>
        }
      />

      <Route
        path="/productos"
        element={
          <>
            <Header />
            <Productos />
            <Footer />
          </>
        }
      />

      <Route
        path="/contacto"
        element={
          <>
            <Header />
            <Contacto />
            <Footer />
          </>
        }
      />
      <Route
        path="/carrito"
        element={
          <>
            <Header />
            <Carrito />
            <Footer />
          </>
        }
      />

      <Route
        path="/login"
        element={
          <>
            <Header />
            <Login />
            <Footer />
          </>
        }
      />

    </Routes>
  );
}

export default App;
