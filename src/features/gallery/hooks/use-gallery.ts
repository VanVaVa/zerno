import { useState, useEffect } from "react";
import { firebaseApi } from "@/shared/api/firebase-api";
import { GalleryItem, GallerySectionContent } from "@/shared/types";

export function useGallery() {
  const [items, setItems] = useState<GalleryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const loadGallery = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await firebaseApi.getDocument<GallerySectionContent>(
        "sections",
        "gallery"
      );
      if (response.data?.items) {
        setItems(response.data.items);
      } else {
        setItems([]);
        // Создаем начальную запись с пустым массивом
        await firebaseApi.saveDocument("sections", "gallery", { items: [] });
      }
    } catch (err) {
      setError("Ошибка загрузки галереи");
      console.error("Error loading gallery:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveGallery = async (newItems: GalleryItem[]) => {
    setLoading(true);
    try {
      await firebaseApi.saveDocument("sections", "gallery", {
        items: newItems,
      });
      setItems(newItems);
      return true;
    } catch (err) {
      setError("Ошибка сохранения галереи");
      console.error("Error saving gallery:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...item,
      id: Date.now().toString(),
    };
    const newItems = [...items, newItem];
    const success = await saveGallery(newItems);
    return success ? newItem : null;
  };

  const updateItem = async (id: string, updates: Partial<GalleryItem>) => {
    const newItems = items.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    return await saveGallery(newItems);
  };

  const deleteItem = async (id: string) => {
    const newItems = items.filter((item) => item.id !== id);
    return await saveGallery(newItems);
  };

  const reorderItems = async (newOrder: GalleryItem[]) => {
    return await saveGallery(newOrder);
  };

  useEffect(() => {
    loadGallery();
  }, []);

  return {
    items,
    loading,
    error,
    loadGallery,
    saveGallery,
    addItem,
    updateItem,
    deleteItem,
    reorderItems,
  };
}
