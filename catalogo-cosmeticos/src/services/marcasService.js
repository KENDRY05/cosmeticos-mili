import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

import { db } from "./firebase";

const marcasRef = collection(db, "marcas");

export const obtenerMarcas = async () => {
  const snapshot = await getDocs(marcasRef);

  return snapshot.docs.map((documento) => ({
    id: documento.id,
    ...documento.data(),
  }));
};

export const agregarMarca = async (nombre) => {
  const nombreLimpio = nombre.trim();

  const documento = await addDoc(marcasRef, {
    Nombre: nombreLimpio,
  });

  return {
    id: documento.id,
    Nombre: nombreLimpio,
  };
};

export const eliminarMarca = async (id) => {
  await deleteDoc(doc(db, "marcas", id));
};

export const actualizarMarca = async (id, nombre) => {
  const marcaRef = doc(db, "marcas", id);

  await updateDoc(marcaRef, {
    Nombre: nombre.trim(),
  });
};