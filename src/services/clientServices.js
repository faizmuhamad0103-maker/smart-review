import { db } from "../firebase/config";

import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  deleteDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

const CLIENT_COLLECTION = "clients";

/**
 * Tambah Client
 */
export async function addClient(data) {
  try {
    const clientRef = doc(collection(db, CLIENT_COLLECTION), data.id);

    await setDoc(clientRef, {
      ...data,
      createdAt: serverTimestamp(),
      scan: 0,
      active: true,
    });

    return {
      success: true,
      message: "Client berhasil ditambahkan",
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: error.message,
    };
  }
}

/**
 * Ambil 1 Client
 */

export async function getClient(id) {
  const clientRef = doc(db, CLIENT_COLLECTION, id);

  const snapshot = await getDoc(clientRef);

  if (!snapshot.exists()) return null;

  return snapshot.data();
}

/**
 * Ambil Semua Client
 */

export async function getAllClients() {
  const snapshot = await getDocs(collection(db, CLIENT_COLLECTION));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

/**
 * Update Client
 */

export async function updateClient(id, data) {
  const clientRef = doc(db, CLIENT_COLLECTION, id);

  await updateDoc(clientRef, data);
}

/**
 * Delete Client
 */

export async function deleteClient(id) {
  const clientRef = doc(db, CLIENT_COLLECTION, id);

  await deleteDoc(clientRef);
}