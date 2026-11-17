
import { useEffect, useState } from "react";

import {
  obtenerCategorias,
  agregarCategoria,
  actualizarCategoria,
  eliminarCategoria,
} from "../services/categoriasService";

import "./AdminCategorias.css";

function AdminCategorias() {
  const [categorias, setCategorias] = useState([]);
  const [nombre, setNombre] = useState("");
  const [editandoId, setEditandoId] = useState(null);
  const [nombreEditado, setNombreEditado] = useState("");
  const [mensaje, setMensaje] = useState("");

  const cargarCategorias = async () => {
    try {
      const datos = await obtenerCategorias();
      setCategorias(datos);
    } catch (error) {
      console.error("Error al cargar categorías:", error);
      setMensaje("No se pudieron cargar las categorías.");
    }
  };

  useEffect(() => {
    cargarCategorias();
  }, []);

  const guardarCategoria = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) return;

    try {
      await agregarCategoria(nombre);
      setNombre("");
      setMensaje("Categoría agregada correctamente.");
      await cargarCategorias();
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo guardar la categoría.");
    }
  };

  const comenzarEdicion = (categoria) => {
    setEditandoId(categoria.id);
    setNombreEditado(categoria.nombre || "");
    setMensaje("");
  };

  const cancelarEdicion = () => {
    setEditandoId(null);
    setNombreEditado("");
  };

  const guardarEdicion = async (e, id) => {
    e.preventDefault();

    if (!nombreEditado.trim()) {
      setMensaje("Escribe el nombre de la categoría.");
      return;
    }

    try {
      await actualizarCategoria(id, nombreEditado);
      cancelarEdicion();
      setMensaje("Categoría actualizada correctamente.");
      await cargarCategorias();
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo actualizar la categoría.");
    }
  };

  const borrarCategoria = async (categoria) => {
    const confirmar = window.confirm(
      `¿Seguro que deseas eliminar la categoría "${categoria.nombre}"?`
    );

    if (!confirmar) return;

    try {
      await eliminarCategoria(categoria.id);

      if (editandoId === categoria.id) {
        cancelarEdicion();
      }

      setMensaje("Categoría eliminada.");
      await cargarCategorias();
    } catch (error) {
      console.error(error);
      setMensaje("No se pudo eliminar la categoría.");
    }
  };

  return (
    <main className="admin-entidad">
      <button type="button" onClick={() => window.history.back()}>
        ← Volver
      </button>

      <h1>Administrar categorías</h1>

      <form onSubmit={guardarCategoria} className="entidad-form">
        <label htmlFor="nombre-categoria">
          Nombre de la categoría
        </label>

        <input
          id="nombre-categoria"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          placeholder="Ej. Labiales"
          required
        />

        <button type="submit">AGREGAR CATEGORÍA</button>
      </form>

      {mensaje && (
        <p className="entidad-mensaje" role="status">
          {mensaje}
        </p>
      )}

      <section className="entidad-lista">
        <h2>Categorías registradas</h2>

        {categorias.length === 0 ? (
          <p>Aún no hay categorías registradas.</p>
        ) : (
          <ul className="categorias-admin-lista">
            {categorias.map((categoria) => (
              <li key={categoria.id} className="categoria-admin-item">
                {editandoId === categoria.id ? (
                  <form
                    className="categoria-edicion"
                    onSubmit={(e) => guardarEdicion(e, categoria.id)}
                  >
                    <input
                      aria-label="Editar nombre de categoría"
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
                    <span>{categoria.nombre}</span>

                    <div className="categoria-acciones">
                      <button
                        type="button"
                        onClick={() => comenzarEdicion(categoria)}
                      >
                        EDITAR
                      </button>

                      <button
                        type="button"
                        className="categoria-eliminar"
                        onClick={() => borrarCategoria(categoria)}
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

export default AdminCategorias;
