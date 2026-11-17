import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "../services/firebase";

function ProtectedRoute({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUsuario(user);
      setCargando(false);
    });

    return () => unsubscribe();
  }, []);

  if (cargando) {
    return <p>Comprobando sesión...</p>;
  }

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;