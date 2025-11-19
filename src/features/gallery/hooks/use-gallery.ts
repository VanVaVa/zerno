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
    }
  };

  const addItem = async (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    };
    const newItems = [...items, newItem];
    const success = await saveGallery(newItems);
    return success ? newItem : null;
  };

  const addMultipleItems = async (newItemsData: Omit<GalleryItem, "id">[]) => {
    const newItems: GalleryItem[] = newItemsData.map((item) => ({
      ...item,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
    }));

    const updatedItems = [...items, ...newItems];
    const success = await saveGallery(updatedItems);
    return success ? newItems : null;
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
    addMultipleItems,
    updateItem,
    deleteItem,
    reorderItems,
  };
}
