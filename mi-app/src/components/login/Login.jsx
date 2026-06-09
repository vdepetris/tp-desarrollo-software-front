import "./login.css";

function Login() {
  return (
    <main className="login">
        <div className="login-imagen">
            Imagen
        </div>
        <div className="login-form">
            <h2>Iniciar sesión</h2>
            <h3>Accede a tu cuenta</h3>
            <div className="login-form-inputs">
              <input type="text" placeholder="Usuario" />
              <input type="password" placeholder="Contraseña" />
              <div className="login-form-remember">
                <input type="checkbox" id="remember" />
                <label htmlFor="remember">Recordarme</label>
              </div>
              <a href="">Olvide mi contraseña</a>
              <button>Iniciar sesión</button>
              <a href="">Crear cuenta</a>
            </div>
        </div>  
    </main>
  );
}

export default Login;