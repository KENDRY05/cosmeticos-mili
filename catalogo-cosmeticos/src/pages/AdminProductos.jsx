import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  obtenerProductos,
  agregarProducto,
    actualizarProducto,
  eliminarProducto,
} from "../services/productosService";

import { obtenerCategorias } from "../services/categoriasService";
import { obtenerMarcas } from "../services/marcasService";

import "./AdminProductos.css";

function AdminProductos() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
const navigate = useNavigate();
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioUnitario, setPrecioUnitario] = useState("");
const [precioMayorista, setPrecioMayorista] = useState("");
  const [imagenUrl, setImagenUrl] = useState("");
  const [codigoBarras, setCodigoBarras] = useState("");
  const [categoriaId, setCategoriaId] = useState("");
  const [marcaId, setMarcaId] = useState("");
const [productoEditando, setProductoEditando] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const editarProducto = (producto) => {
  setProductoEditando(producto.id);

  setNombre(producto.nombre ?? "");
  setDescripcion(producto.descripcion ?? "");
  setImagenUrl(producto.imagenUrl ?? "");
  setCodigoBarras(producto.codigoBarras ?? "");
  setCategoriaId(producto.categoriaId ?? "");
  setMarcaId(producto.marcaId ?? "");

  setPrecioUnitario(
    producto.precioUnitario ?? producto.precio ?? ""
  );

  setPrecioMayorista(producto.precioMayorista ?? "");
};
  const cargarDatos = async () => {
    try {
      const [productosData, categoriasData, marcasData] =
        await Promise.all([
          obtenerProductos(),
          obtenerCategorias(),
          obtenerMarcas(),
        ]);

      setProductos(productosData);
      setCategorias(categoriasData);
      setMarcas(marcasData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
      setMensaje("No se pudieron cargar los datos.");
    }
  };

  useEffect(() => {
    cargarDatos();
  }, []);

  
  const guardarProducto = async (e) => {
    e.preventDefault();

    if (!categoriaId || !marcaId) {
      setMensaje("Selecciona una categoría y una marca.");
      return;
    }

    try {
      const datosProducto = {
        nombre: nombre.trim(),
        descripcion: descripcion.trim(),
        precio: Number(precioUnitario),
        precioUnitario: Number(precioUnitario),
        precioMayorista: Number(precioMayorista),
        imagenUrl: imagenUrl.trim(),
        codigoBarras: codigoBarras.trim(),
        categoriaId,
        marcaId,
      };

      if (productoEditando) {
        await actualizarProducto(productoEditando, datosProducto);
        setMensaje("Producto actualizado correctamente.");
      } else {
        await agregarProducto({
          ...datosProducto,
          createdAt: new Date(),
        });
        setMensaje("Producto agregado correctamente.");
      }

      setProductoEditando(null);
      setNombre("");
      setDescripcion("");
      setPrecioUnitario("");
      setPrecioMayorista("");
      setImagenUrl("");
      setCodigoBarras("");
      setCategoriaId("");
      setMarcaId("");

      await cargarDatos();
    } catch (error) {
      console.error("Error al guardar producto:", error);
      setMensaje("Ocurrió un error al guardar el producto.");
    }
  };


  const borrarProducto = async (id) => {
    const confirmar = window.confirm(
      "¿Seguro que deseas eliminar este producto?"
    );

    if (!confirmar) return;

    try {
      await eliminarProducto(id);
      await cargarDatos();
      setMensaje("Producto eliminado correctamente.");
    } catch (error) {
      console.error("Error al eliminar producto:", error);
      setMensaje("No se pudo eliminar el producto.");
    }
  };

  return (
    <main className="admin-productos">
      <h1>Administrar productos</h1>

      <section className="producto-form-container">
<h2>
  {productoEditando ? "Editar producto" : "Agregar producto"}
</h2>
        <form onSubmit={guardarProducto}>
          <label htmlFor="producto-nombre">Nombre</label>
          <input
            id="producto-nombre"
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej. Labial Mate"
            required
          />

          <label htmlFor="producto-descripcion">Descripción</label>
          <textarea
            id="producto-descripcion"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            placeholder="Descripción del producto"
            required
          />

         
<label htmlFor="producto-precio-unitario">
  Precio unitario (C$)
</label>
<input
  id="producto-precio-unitario"
  type="number"
  min="0"
  step="0.01"
  value={precioUnitario}
  onChange={(e) => setPrecioUnitario(e.target.value)}
  placeholder="250"
  required
/>

<label htmlFor="producto-precio-mayorista">
  Precio mayorista (C$)
</label>
<input
  id="producto-precio-mayorista"
  type="number"
  min="0"
  step="0.01"
  value={precioMayorista}
  onChange={(e) => setPrecioMayorista(e.target.value)}
  placeholder="200"
  required
/>


          <label htmlFor="producto-imagen">URL de imagen</label>
          <input
            id="producto-imagen"
            type="url"
            value={imagenUrl}
            onChange={(e) => setImagenUrl(e.target.value)}
            placeholder="https://ejemplo.com/imagen.jpg"
            required
          />

          <label htmlFor="producto-codigo">Código de barras</label>
          <input
            id="producto-codigo"
            type="text"
            value={codigoBarras}
            onChange={(e) => setCodigoBarras(e.target.value)}
            placeholder="123456789"
          />

          <label htmlFor="producto-categoria">Categoría</label>
          <select
            id="producto-categoria"
            value={categoriaId}
            onChange={(e) => setCategoriaId(e.target.value)}
            required
          >
            <option value="">Selecciona una categoría</option>
            {categorias.map((categoria) => (
              <option key={categoria.id} value={categoria.id}>
                {categoria.nombre}
              </option>
            ))}
          </select>

          <label htmlFor="producto-marca">Marca</label>
          <select
            id="producto-marca"
            value={marcaId}
            onChange={(e) => setMarcaId(e.target.value)}
            required
          >
            <option value="">Selecciona una marca</option>
            {marcas.map((marca) => (
              <option key={marca.id} value={marca.id}>
                {marca.Nombre}
              </option>
            ))}
          </select>
            <button
  type="button"
  onClick={() => navigate("/admin")}
  className="btn-volver-panel"
>
  ← Volver al panel
</button>
<button type="submit">
  {productoEditando ? "GUARDAR CAMBIOS" : "AGREGAR PRODUCTO"}
</button>    

  {productoEditando && (
    <button
      type="button"
      onClick={() => {
        setProductoEditando(null);
        setNombre("");
        setDescripcion("");
        setPrecioUnitario("");
        setPrecioMayorista("");
        setImagenUrl("");
        setCodigoBarras("");
        setCategoriaId("");
        setMarcaId("");
        setMensaje("");
      }}
    >
      CANCELAR EDICIÓN
    </button>
  )}

    </form>

        {mensaje && (
          <p className="producto-mensaje" role="status">
            {mensaje}
          </p>
        )}
      </section>

      <section className="productos-admin">
        <h2>Productos registrados</h2>

        <div className="productos-admin-grid">
          {productos.map((producto) => {
            const categoria = categorias.find(
              (item) => item.id === producto.categoriaId
            );

            const marca = marcas.find(
              (item) => item.id === producto.marcaId
            );

            return (
              <article
                className="producto-admin-card"
                key={producto.id}
              >
                <img
                  src={producto.imagenUrl}
                  alt={producto.nombre}
                />

                <div>
                  <h3>{producto.nombre}</h3>
                  <p>{producto.descripcion}</p>
                  <p>
  Precio unitario: <strong>C$ {producto.precioUnitario ?? producto.precio}</strong>
</p>

<p>
  Precio mayorista: <strong>C$ {producto.precioMayorista ?? "No definido"}</strong>
</p>

                  <p>
                    Categoría: {categoria?.nombre || "Sin categoría"}
                  </p>

                  <p>
                    Marca: {marca?.Nombre || "Sin marca"}
                  </p>

                  <p>
                    Código: {producto.codigoBarras || "Sin código"}
                  </p>

                  <button
                    type="button"
                    onClick={() => borrarProducto(producto.id)}
                  >
                    ELIMINAR
                  </button>
                  <button
  type="button"
  onClick={() => editarProducto(producto)}
>
  Editar
</button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
}

export default AdminProductos;
