import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

import { auth } from "../services/firebase";
import "./Admin.css";

function Admin() {
  const navigate = useNavigate();

  const cerrarSesion = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <main className="admin-page">

      <header className="admin-header">
        <div>
          <span>BEAUTY</span>
          <strong>CATALOG</strong>
        </div>

        <button onClick={cerrarSesion}>
          CERRAR SESIÓN
        </button>
      </header>

      <section className="admin-content">

        <h1>Panel de Administración</h1>

        <p>
          Desde aquí podrás administrar el catálogo.
        </p>

        <div className="admin-menu">

          <button onClick={() => navigate("/admin/productos")}>
  PRODUCTOS
</button>

          <button onClick={() => navigate("/admin/categorias")}>
  CATEGORÍAS
</button>

          <button onClick={() => navigate("/admin/marcas")}>
  MARCAS
</button>

        </div>

      </section>

    </main>
  );
}

export default Admin;