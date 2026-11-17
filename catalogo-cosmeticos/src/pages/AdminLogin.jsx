import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../services/firebase";
import "./AdminLogin.css";

function AdminLogin() {
  const navigate = useNavigate();

  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const iniciarSesion = async (e) => {
    e.preventDefault();

    setError("");
    setCargando(true);

    try {
      await signInWithEmailAndPassword(
        auth,
        correo,
        password
      );

      navigate("/admin");
    } catch (error) {
      console.error(error);

      setError("Correo o contraseña incorrectos.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <main className="admin-login-page">
      <div className="admin-login-card">

        <h1>INICIAR SESIÓN</h1>

        <p className="admin-login-subtitle">
          Acceso para administrador
        </p>

        <form onSubmit={iniciarSesion}>

          <label>
            Correo electrónico
          </label>

          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="correo@ejemplo.com"
            required
          />

          <label>
            Contraseña
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          {error && (
            <p className="login-error">
              {error}
            </p>
          )}

          <button type="submit" disabled={cargando}>
            {cargando ? "INGRESANDO..." : "INGRESAR"}
          </button>

        </form>

        <button
          className="volver-button"
          onClick={() => navigate("/login")}
        >
          ← Volver
        </button>

      </div>
    </main>
  );
}

export default AdminLogin;