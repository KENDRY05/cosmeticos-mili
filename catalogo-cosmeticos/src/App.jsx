import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import AdminLogin from "./pages/AdminLogin";
import Admin from "./pages/Admin";
import AdminProductos from "./pages/AdminProductos";
import AdminCategorias from "./pages/AdminCategorias";
import AdminMarcas from "./pages/AdminMarcas";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/catalogo" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route
          path="/login/admin"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/productos"
          element={
            <ProtectedRoute>
              <AdminProductos />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/categorias"
          element={
            <ProtectedRoute>
              <AdminCategorias />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/marcas"
          element={
            <ProtectedRoute>
              <AdminMarcas />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<Navigate to="/" replace />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
