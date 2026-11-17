
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WhatsAppFlotante from "../components/WhatsAppFlotante";
import "../styles/Header.css";

function Header({ busqueda, setBusqueda }) {
  const navigate = useNavigate();
  const [mostrarBusqueda, setMostrarBusqueda] = useState(false);

  const alternarBusqueda = () => {
    if (mostrarBusqueda) {
      setBusqueda("");
    }

    setMostrarBusqueda(!mostrarBusqueda);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div
          className="logo"
          onClick={() => navigate("/")}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") navigate("/");
          }}
        >
          <span>COSMETICOS Y ACCESORIOS</span>
          <strong>MILY</strong>
        </div>

        <nav className="nav">
          <a href="/#inicio">Inicio</a>
          <a href="/#catalogo">Catálogo</a>
          <a href="/#categorias">Categorías</a>
        </nav>

        <div className="header-actions">
          {mostrarBusqueda && (
            <input
              type="search"
              className="search-input"
              placeholder="Buscar producto..."
              aria-label="Buscar productos por nombre"
              value={busqueda}
              onChange={(e) => setBusqueda(e.target.value)}
              autoFocus
            />
          )}

          <button
            className="search-button"
            type="button"
            aria-label={
              mostrarBusqueda ? "Cerrar búsqueda" : "Buscar productos"
            }
            onClick={alternarBusqueda}
          >
            {mostrarBusqueda ? "×" : "⌕"}
          </button>

          <button
            className="admin-button"
            type="button"
            onClick={() => navigate("/login/admin")}
          >
            Administrador
          </button>
          <WhatsAppFlotante />
        </div>
      </div>
    </header>
  );
}

export default Header;
