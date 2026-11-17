import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { db } from "./firebase";

const categoriasRef = collection(db, "categorias");

export const obtenerCategorias = async () => {
  const snapshot = await getDocs(categoriasRef);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
};

export const agregarCategoria = async (nombre) => {
  const nombreLimpio = nombre.trim();

  const documento = await addDoc(categoriasRef, {
    nombre: nombreLimpio,
  });

  return {
    id: documento.id,
    nombre: nombreLimpio,
  };
};

export const actualizarCategoria = async (id, nombre) => {
  const categoriaRef = doc(db, "categorias", id);

  await updateDoc(categoriaRef, {
    nombre: nombre.trim(),
  });
};

export const eliminarCategoria = async (id) => {
  await deleteDoc(doc(db, "categorias", id));
};
