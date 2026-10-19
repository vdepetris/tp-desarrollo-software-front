import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import loginImg from "../../assets/imagenIniSes.png";

const apiUrl = import.meta.env.VITE_API_URL;

// Un servidor desactualizado puede responder HTML: evita intentar leerlo como JSON.
async function leerRespuesta(respuesta) {
  if (!respuesta.headers.get("content-type")?.includes("application/json")) {
    throw new Error(
      respuesta.status === 404
        ? "La ruta no existe en el servidor. Reiniciá el backend e intentá de nuevo."
        : "El servidor devolvió una respuesta inesperada. Verificá la API."
    );
  }
  return respuesta.json();
}

function Login() {
  const navigate = useNavigate();
  const [esRegistro, setEsRegistro] = useState(false);
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [guardando, setGuardando] = useState(false);

  async function iniciarSesion(event) {
    // Permite enviar con Enter y bloquea los envíos duplicados.
    event.preventDefault();
    if (guardando) return;

    const formulario = new FormData(event.currentTarget);
    setError("");
    setMensaje("");
    setGuardando(true);

    try {
      const respuesta = await fetch(`${apiUrl}/usuarios/login`, { credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: String(formulario.get("email") ?? "").trim(),
          password: String(formulario.get("password") ?? ""),
          // El backend decide la duración de la cookie según esta opción.
          recordar: formulario.get("recordar") === "on",
        }),
      });
      const datos = await leerRespuesta(respuesta);

      if (!respuesta.ok) {
        throw new Error(datos.error ?? "No se pudo iniciar sesión");
      }

      // La cookie de sesión ya está guardada; el dashboard consulta el rol al entrar.
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  async function registrarUsuario(event) {
    // Evita recargar la página y repetir el envío mientras se crea la cuenta.
    event.preventDefault();
    if (!esRegistro || guardando) return;

    const form = event.currentTarget;
    const datos = new FormData(form);
    const usuario = {
      nombre: String(datos.get("nombre") ?? "").trim(),
      email: String(datos.get("email") ?? "").trim(),
      // La contraseña conserva sus espacios, igual que en el backend.
      password: String(datos.get("password") ?? ""),
    };

    setError("");
    setMensaje("");
    setGuardando(true);

    try {
      // Reutiliza el endpoint de usuarios: valida los datos y asigna el rol cliente.
      const respuesta = await fetch(`${apiUrl}/usuarios`, { credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(usuario),
      });
      const datos = await leerRespuesta(respuesta);

      if (!respuesta.ok) {
        throw new Error(datos.error ?? "No se pudo crear la cuenta");
      }

      // Crear la cuenta no inicia sesión: limpia los campos y vuelve al acceso.
      form.reset();
      setEsRegistro(false);
      setMensaje("Cuenta creada. Ya podés iniciar sesión.");
    } catch (err) {
      setError(err.message);
    } finally {
      setGuardando(false);
    }
  }

  return (
    <main className="login">
      <div className="login-imagen">
        <img src={loginImg} alt="Login" />
      </div>

      <div className="login-form">
        <div className="login-card">
          <h2>{esRegistro ? "Crear cuenta" : "Iniciar sesión"}</h2>
          <h3>{esRegistro ? "Registrate para comenzar" : "Accede a tu cuenta"}</h3>

          <form className="login-form-inputs" onSubmit={esRegistro ? registrarUsuario : iniciarSesion}>
            {/* El nombre se pide solo al registrar; el acceso usa el email único. */}
            {esRegistro && (
            <input
              name="nombre"
              type="text"
              placeholder="Nombre"
              aria-label="Nombre"
              required
              disabled={guardando}
            />
            )}
              <input
                name="email"
                type="email"
                placeholder="Correo electrónico"
                aria-label="Correo electrónico"
                required
                disabled={guardando}
              />
            <input
              name="password"
              type="password"
              placeholder="Contraseña"
              aria-label="Contraseña"
              minLength={esRegistro ? 6 : undefined}
              required
              disabled={guardando}
            />

            {!esRegistro && (
              <>
                <div className="login-form-remember">
                  <input type="checkbox" id="remember" name="recordar" disabled={guardando} />
                  <label htmlFor="remember">Recordarme</label>
                </div>
              </>
            )}

            {error && <p role="alert">{error}</p>}
            {mensaje && <p role="status">{mensaje}</p>}

            <button type="submit" disabled={guardando}>
              {guardando ? "Procesando…" : esRegistro ? "Registrarse" : "Iniciar sesión"}
            </button>
            <button
              type="button"
              className="login-toggle"
              disabled={guardando}
              onClick={() => {
                setEsRegistro(!esRegistro);
                setError("");
                setMensaje("");
              }}
            >
              {esRegistro ? "Ya tengo cuenta. Iniciar sesión" : "Crear cuenta"}
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Login;
