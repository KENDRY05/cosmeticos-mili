
import { useEffect, useState } from "react";

import {
  obtenerMarcas,
  agregarMarca,
  actualizarMarca,
  eliminarMarca,
} from "../services/marcasService";

import "./AdminMarcas.css";

function AdminMarcas() {
  const [marcas, setMarcas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarMarcas = async () => {
    try {
      const datos = await obtenerMarcas();
      setMarcas(datos);
    } catch (error) {
      console.error("Error al cargar marcas:", error);
      setMensaje("No se pudieron cargar las marcas.");
    }
  };

  useEffect(() => {
    cargarMarcas();
  }, []);

  const guardarMarca = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) return;

    try {
      await agregarMarca(nombre);
      setNombre("");
      setMensaje("Marca agregada correctamente.");
      await cargarMarcas();
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo guardar la marca.");
    }
  };

  const comenzarEdicion = (marca) => {
    setEditandoId(marca.id);
    setNombreEditado(marca.Nombre || "");
    setMensaje("");
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombreEditado("");
  };

  const guardarEdicion = async (e, id) => {
    e.preventDefault();

    if (!nombreEditado.trim()) {
      setMensaje("Escribe el nombre de la marca.");
      return;
    }

    try {
      await actualizarMarca(id, nombreEditado);
      cancelarEdicion();
      setMensaje("Marca actualizada correctamente.");
      await cargarMarcas();
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo actualizar la marca.");
    }
  };

  const borrarMarca = async (marca) => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar la marca "${marca.Nombre}"?`
    );

    if (!confirmar) return;

    try {
      await eliminarMarca(marca.id);

      if (editandoId === marca.id) {
        cancelarEdicion();
      }

      setMensaje("Marca eliminada.");
      await cargarMarcas();
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo eliminar la marca.");
    }
  };

  return (
    <main className="admin-entidad">
      <button type="button" onClick={() => window.history.back()}>
        ← Volver
      </button>

      <h1>Administrar marcas</h1>

      <form onSubmit={guardarMarca} className="entidad-form">
        <label htmlFor="nombre-marca">Nombre de la marca</label>

        <input
          id="nombre-marca"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Revlon"
          required
        />

        <button type="submit">AGREGAR MARCA</button>
      </form>

      {mensaje && (
        <p className="entidad-mensaje" role="status">
          {mensaje}
        </p>
      )}

      <section className="entidad-lista">
        <h2>Marcas registradas</h2>

        {marcas.length === 0 ? (
          <p>Aún no hay marcas registradas.</p>
        ) : (
          <ul className="categorias-admin-lista">
            {marcas.map((marca) => (
              <li key={marca.id} className="categoria-admin-item">
                {editandoId === marca.id ? (
                  <form
                    className="categoria-edicion"
                    onSubmit={(e) => guardarEdicion(e, marca.id)}
                  >
                    <input
                      aria-label="Editar nombre de marca"
                      value={nombreEditado}
                      onChange={(e) => setNombreEditado(e.target.value)}
                      required
                      autoFocus
                    />

                    <button type="submit">GUARDAR</button>

                    <button type="button" onClick={cancelarEdicion}>
                      CANCELAR
                    </button>
                  </form>
                ) : (
                  <>
                    <span>{marca.Nombre}</span>

                    <div className="categoria-acciones">
                      <button
                        type="button"
                        onClick={() => comenzarEdicion(marca)}
                      >
                        EDITAR
                      </button>

                      <button
                        type="button"
                        className="categoria-eliminar"
                        onClick={() => borrarMarca(marca)}
                      >
                        ELIMINAR
                      </button>
                    </div>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}

export default AdminMarcas;