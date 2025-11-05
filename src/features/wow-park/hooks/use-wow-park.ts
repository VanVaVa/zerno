import { useState, useEffect } from "react";
import { firebaseApi } from "@/shared/api/firebase-api";
import { WowParkContent } from "@/shared/types";

export function useWowPark() {
  const [images, setImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const loadWowPark = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await firebaseApi.getDocument<WowParkContent>(
        "sections",
        "wow-park"
      );
      if (response.data?.images) {
        setImages(response.data.images);
      } else {
        setImages([]);
        // Создаем начальную запись с пустым массивом
        await firebaseApi.saveDocument("sections", "wow-park", { images: [] });
      }
    } catch (err) {
      setError("Ошибка загрузки Wow-парка");
      console.error("Error loading wow-park:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveWowPark = async (newImages: string[]) => {
    setLoading(true);
    try {
      await firebaseApi.saveDocument("sections", "wow-park", {
        images: newImages,
      });
      setImages(newImages);
      return true;
    } catch (err) {
      setError("Ошибка сохранения Wow-парка");
      console.error("Error saving wow-park:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addImage = async (imageUrl: string) => {
    const newImages = [...images, imageUrl];
    const success = await saveWowPark(newImages);
    return success;
  };

  const deleteImage = async (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    return await saveWowPark(newImages);
  };

  const reorderImages = async (newOrder: string[]) => {
    return await saveWowPark(newOrder);
  };

  useEffect(() => {
    loadWowPark();
  }, []);

  return {
    images,
    loading,
    error,
    loadWowPark,
    saveWowPark,
    addImage,
    deleteImage,
    reorderImages,
  };
}
