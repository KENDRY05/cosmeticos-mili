import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import CategoryCard from "../components/CategoryCard";
import { obtenerProductos } from "../services/productosService";
import { obtenerCategorias } from "../services/categoriasService";
import { obtenerMarcas } from "../services/marcasService";
import "./Home.css";

function Home() {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);

  const [busqueda, setBusqueda] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [marcaSeleccionada, setMarcaSeleccionada] = useState("");

  useEffect(() => {
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
      }
    };

    cargarDatos();
  }, []);

  const productosFiltrados = productos.filter((producto) => {
    const coincideNombre = (producto.nombre || "")
      .toLowerCase()
      .includes(busqueda.trim().toLowerCase());

    const coincideCategoria =
      !categoriaSeleccionada ||
      producto.categoriaId === categoriaSeleccionada;

    const coincideMarca =
      !marcaSeleccionada ||
      producto.marcaId === marcaSeleccionada;

    return coincideNombre && coincideCategoria && coincideMarca;
  });

  const limpiarFiltros = () => {
    setBusqueda("");
    setCategoriaSeleccionada("");
    setMarcaSeleccionada("");
  };

  return (
    <>
      <Header busqueda={busqueda} setBusqueda={setBusqueda} />

      <main>
        <section id="inicio" className="hero">
          <div className="hero-content">
            <p className="hero-subtitle">
              BELLEZA · ESTILO · ELEGANCIA
            </p>
            <h1>Descubre tu mejor versión</h1>
            <p className="hero-description">
              Explora nuestra colección de cosméticos y accesorios.
            </p>
            <a href="#catalogo" className="hero-button">
              VER CATÁLOGO
            </a>
          </div>
        </section>

        <section id="categorias">
          <h2>Categorías</h2>
          <div className="categorias-grid">
            {categorias.map((categoria) => (
              <CategoryCard
                key={categoria.id}
                categoria={categoria}
              />
            ))}
          </div>
        </section>

        <section id="catalogo">
          <h2>Catálogo de productos</h2>

          <div className="filtros-catalogo">
            <select
              aria-label="Filtrar por categoría"
              value={categoriaSeleccionada}
              onChange={(e) =>
                setCategoriaSeleccionada(e.target.value)
              }
            >
              <option value="">Todas las categorías</option>
              {categorias.map((categoria) => (
                <option key={categoria.id} value={categoria.id}>
                  {categoria.nombre}
                </option>
              ))}
            </select>

            <select
              aria-label="Filtrar por marca"
              value={marcaSeleccionada}
              onChange={(e) => setMarcaSeleccionada(e.target.value)}
            >
              <option value="">Todas las marcas</option>
              {marcas.map((marca) => (
                <option key={marca.id} value={marca.id}>
                  {marca.Nombre}
                </option>
              ))}
            </select>

            {(busqueda ||
              categoriaSeleccionada ||
              marcaSeleccionada) && (
              <button
                type="button"
                className="limpiar-filtros"
                onClick={limpiarFiltros}
              >
                Limpiar filtros
              </button>
            )}
          </div>

          {(busqueda.trim() ||
            categoriaSeleccionada ||
            marcaSeleccionada) && (
            <p className="resultado-busqueda">
              {productosFiltrados.length === 1
                ? "Se encontró 1 producto"
                : `Se encontraron ${productosFiltrados.length} productos`}
            </p>
          )}

          {productosFiltrados.length > 0 ? (
            <div className="productos-grid">
              {productosFiltrados.map((producto) => (
                <ProductCard
                  key={producto.id}
                  producto={producto}
                />
              ))}
            </div>
          ) : (
            <div className="sin-resultados">
              <span className="sin-resultados-icono">⌕</span>
              <h3>No encontramos productos</h3>
              <p>
                Prueba otra búsqueda o cambia los filtros seleccionados.
              </p>
              <button type="button" onClick={limpiarFiltros}>
                Ver todos los productos
              </button>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default Home;
