import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const seleccionarAdmin = () => {
    navigate("/login/admin");
  };

  const seleccionarCliente = () => {
    navigate("/catalogo");
  };

  return (
    <main className="login-page">
      <div className="login-container">

        <h1>INICIAR SESIÓN</h1>

        <div className="user-options">

          {/* ADMINISTRADOR */}
          <section className="user-option admin-option">
            <div className="user-icon">
              👨‍💼
            </div>

            <h2>ADMINISTRADOR</h2>

            <p>
              Acceso total al sistema y
              <br />
              panel de control.
            </p>

            <button onClick={seleccionarAdmin}>
              SELECCIONAR ADMIN
            </button>
          </section>

          {/* CLIENTE */}
          <section className="user-option client-option">
            <div className="user-icon">
              👤
            </div>

            <h2>CLIENTE</h2>

            <p>
              Acceso libre al catálogo
              <br />
              de productos.
            </p>

            <button onClick={seleccionarCliente}>
              VER CATÁLOGO
            </button>
          </section>

        </div>

        <div className="login-footer">
          POR FAVOR, SELECCIONE SU TIPO DE USUARIO
        </div>

      </div>
    </main>
  );
}

export default Login;