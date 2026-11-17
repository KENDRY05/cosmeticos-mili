import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

const productosRef = collection(db, "productos");

// Obtener productos
export const obtenerProductos = async () => {
  const snapshot = await getDocs(productosRef);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
};

// Agregar producto
export const agregarProducto = async (producto) => {
  const documento = await addDoc(productosRef, producto);

  return {
    id: documento.id,
    ...producto,
  };
};

// Actualizar producto
export const actualizarProducto = async (id, producto) => {
  const productoRef = doc(db, "productos", id);

  await updateDoc(productoRef, producto);
};

// Eliminar producto
export const eliminarProducto = async (id) => {
  const productoRef = doc(db, "productos", id);

  await deleteDoc(productoRef);
};