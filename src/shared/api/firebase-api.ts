import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  DocumentData,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { db, storage } from "../lib/firebase";
import { ApiResponse } from "../types";

// Упрощаем типы - используем DocumentData для Firestore
export const firebaseApi = {
  // Получить все документы из коллекции
  async getCollection<T = DocumentData>(
    collectionName: string
  ): Promise<ApiResponse<T[]>> {
    try {
      const querySnapshot = await getDocs(collection(db, collectionName));
      const data = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];

      return { data, error: null, loading: false };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      };
    }
  },

  // Получить конкретный документ
  async getDocument<T = DocumentData>(
    collectionName: string,
    docId: string
  ): Promise<ApiResponse<T>> {
    try {
      const docRef = doc(db, collectionName, docId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() } as T;
        return { data, error: null, loading: false };
      } else {
        return { data: null, error: "Document not found", loading: false };
      }
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      };
    }
  },

  // Сохранить документ - упрощаем типы
  async saveDocument(
    collectionName: string,
    docId: string,
    data: DocumentData
  ): Promise<ApiResponse<void>> {
    try {
      const docRef = doc(db, collectionName, docId);
      await setDoc(docRef, data);
      return { data: undefined, error: null, loading: false };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      };
    }
  },

  // Обновить документ - упрощаем типы
  async updateDocument(
    collectionName: string,
    docId: string,
    data: DocumentData
  ): Promise<ApiResponse<void>> {
    try {
      const docRef = doc(db, collectionName, docId);
      await updateDoc(docRef, data);
      return { data: undefined, error: null, loading: false };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      };
    }
  },

  // Удалить документ
  async deleteDocument(
    collectionName: string,
    docId: string
  ): Promise<ApiResponse<void>> {
    try {
      const docRef = doc(db, collectionName, docId);
      await deleteDoc(docRef);
      return { data: undefined, error: null, loading: false };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      };
    }
  },

  // Загрузить файл
  async uploadFile(file: File, path: string): Promise<ApiResponse<string>> {
    try {
      const storageRef = ref(storage, path);
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return { data: downloadURL, error: null, loading: false };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      };
    }
  },

  // Удалить файл
  async deleteFile(path: string): Promise<ApiResponse<void>> {
    try {
      const storageRef = ref(storage, path);
      await deleteObject(storageRef);
      return { data: undefined, error: null, loading: false };
    } catch (error) {
      return {
        data: null,
        error: error instanceof Error ? error.message : "Unknown error",
        loading: false,
      };
    }
  },
};
