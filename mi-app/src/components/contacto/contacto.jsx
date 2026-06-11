import "./contacto.css";
import "../login/login.css"
function Contacto() {
  return (
    <main>
      <div className="title-content">
        <h1>Contactanos</h1>
        <p>Tienes alguna duda? no dudes en consultarnos!</p>
      </div>
      <div className="content">

         <form action="" className="formulario">
            <div className="login-form-inputs two-row">
              <input placeholder="Ingresa Nombre" className="" type="text" />
              <input  placeholder="Ingresa apellido" type="text" />
            </div>
            <div className="login-form-inputs two-row">
              <input placeholder="Ingresa Mail" type="email" />
              <input placeholder="Ingresa telefono" type="text" />

            </div>
            <div className="login-form-inputs">
              <select name="" id="">
                  <option value="">Selecciona asunto</option>
                  <option value="">Asunto</option>
              </select>
            </div>
            <div className="login-form-inputs">
              <textarea placeholder="Que nos quieres contar?" name="" id=""></textarea>
            </div>  
            <input className="button"  type="submit" />
         </form>

         <div className="mapa">

          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13391.473581793869!2d-60.66227300401658!3d-32.954483837903716!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95b7ab11d0eb49c3%3A0x11f1d3d54f950dd0!2sUniversidad%20Tecnol%C3%B3gica%20Nacional%20%7C%20Facultad%20Regional%20Rosario!5e0!3m2!1ses!2sar!4v1781217065417!5m2!1ses!2sar"
            width="600"
            height="450"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>

         </div>

      </div>
    </main>
  );
}

export default Contacto;
