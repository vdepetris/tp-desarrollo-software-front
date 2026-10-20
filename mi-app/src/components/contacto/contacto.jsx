import { useState } from "react";
import "./contacto.css";

function Contacto() {
  const [mensajeEstado, setMensajeEstado] = useState("");

  const [enviando, setEnviando] = useState(false);

  async function enviarMensaje(event) {
    event.preventDefault();
    if (enviando) return;
    const formulario = event.currentTarget;
    const datos = Object.fromEntries(new FormData(formulario));
    const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, "");
    setMensajeEstado("");
    if (!apiUrl) {
      setMensajeEstado("El servicio de contacto todavía no está disponible.");
      return;
    }
    setEnviando(true);
    try {
      const respuesta = await fetch(apiUrl + "/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos),
      });
      if (!respuesta.headers.get("content-type")?.includes("application/json")) {
        throw new Error("El servicio de contacto no está disponible. Intentá más tarde.");
      }
      const resultado = await respuesta.json();
      if (!respuesta.ok) throw new Error(resultado.mensaje || "No pudimos enviar tu consulta.");
      setMensajeEstado("Tu consulta fue enviada. Gracias por escribirnos.");
      formulario.reset();
    } catch (error) {
      setMensajeEstado(error instanceof TypeError
        ? "No pudimos conectar con el servidor. Intentá nuevamente."
        : error.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <main className="contacto">
      <div className="contacto__contenedor">
        <div className="contacto__cabecera">
          <span className="contacto__eyebrow">Estamos para ayudarte</span>
          <h1>¿Hablamos?</h1>
          <p>Contanos qué necesitás y te respondemos.</p>
        </div>

        <div className="contacto__columnas">
          <section className="contacto__tarjeta contacto__formulario" aria-labelledby="contacto-formulario-titulo">
            <div className="contacto__tarjeta-cabecera">
              <span className="contacto__numero">01 / ESCRIBINOS</span>
              <h2 id="contacto-formulario-titulo">Enviá tu consulta</h2>
              <p>Completá el formulario y envianos tu consulta desde acá.</p>
            </div>

            <form onSubmit={enviarMensaje} aria-busy={enviando}>
              <div className="contacto__campos-dobles">
                <div className="contacto__campo">
                  <label htmlFor="contacto-nombre">Nombre</label>
                  <input id="contacto-nombre" name="nombre" type="text" placeholder="Tu nombre" autoComplete="given-name" maxLength={100} disabled={enviando} required />
                </div>
                <div className="contacto__campo">
                  <label htmlFor="contacto-apellido">Apellido</label>
                  <input id="contacto-apellido" name="apellido" type="text" placeholder="Tu apellido" autoComplete="family-name" maxLength={100} disabled={enviando} required />
                </div>
              </div>

              <div className="contacto__campos-dobles">
                <div className="contacto__campo">
                  <label htmlFor="contacto-email">Correo electrónico</label>
                  <input id="contacto-email" name="email" type="email" placeholder="nombre@ejemplo.com" autoComplete="email" maxLength={254} disabled={enviando} required />
                </div>
                <div className="contacto__campo">
                  <label htmlFor="contacto-telefono">Teléfono <span>(opcional)</span></label>
                  <input id="contacto-telefono" name="telefono" type="tel" placeholder="Tu número" autoComplete="tel" maxLength={40} disabled={enviando} />
                </div>
              </div>

              <div className="contacto__campo">
                <label htmlFor="contacto-asunto">Asunto</label>
                <select id="contacto-asunto" name="asunto" defaultValue="" disabled={enviando} required>
                  <option value="" disabled>Seleccioná un asunto</option>
                  <option value="productos">Productos</option>
                  <option value="pedidos">Pedidos</option>
                  <option value="consulta">Consulta general</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div className="contacto__campo">
                <label htmlFor="contacto-mensaje">Mensaje</label>
                <textarea id="contacto-mensaje" name="mensaje" rows="5" placeholder="Contanos en qué podemos ayudarte..." maxLength={5000} disabled={enviando} required />
              </div>

              <button className="contacto__enviar" type="submit" disabled={enviando}>{enviando ? "Enviando…" : "Enviar mensaje"}</button>
              {mensajeEstado && <p className="contacto__estado" role="status">{mensajeEstado}</p>}
            </form>
          </section>

          <aside className="contacto__tarjeta contacto__ubicacion" aria-labelledby="contacto-ubicacion-titulo">
            <div className="contacto__tarjeta-cabecera">
              <span className="contacto__numero">02 / UBICACIÓN</span>
              <h2 id="contacto-ubicacion-titulo">Encontranos en Rosario</h2>
              <p>Universidad Tecnológica Nacional · Facultad Regional Rosario</p>
              <div className="contacto__direccion">
                <span className="contacto__direccion-icono" aria-hidden="true">⌖</span>
                <span>Zeballos 1341, Rosario, Santa Fe</span>
              </div>
            </div>

            <div className="contacto__mapa">
              <iframe
                title="Mapa de la Facultad Regional Rosario"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13391.473581793869!2d-60.66227300401658!3d-32.954483837903716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab11d0eb49c3%3A0x11f1d3d54f950dd0!2sUniversidad%20Tecnol%C3%B3gica%20Nacional%20%7C%20Facultad%20Regional%20Rosario!5e0!3m2!1ses!2sar!4v1781217065417!5m2!1ses!2sar"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Contacto;