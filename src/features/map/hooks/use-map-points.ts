import { useState, useEffect } from "react";
import { firebaseApi } from "@/shared/api/firebase-api";

export interface MapPoint {
  id: string;
  coordinates: [number, number]; // [lng, lat]
  name?: string;
}

export function useMapPoints() {
  const [points, setPoints] = useState<MapPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const loadPoints = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await firebaseApi.getDocument<{ points: MapPoint[] }>(
        "sections",
        "map"
      );
      if (response.data?.points) {
        setPoints(response.data.points);
      } else {
        // Если документа нет, создаем пустой массив
        setPoints([]);
      }
    } catch (err) {
      setError("Ошибка загрузки точек");
      console.error("Error loading points:", err);
    } finally {
      setLoading(false);
    }
  };

  const savePoints = async (newPoints: MapPoint[]) => {
    setLoading(true);
    try {
      await firebaseApi.saveDocument("sections", "map", { points: newPoints });
      setPoints(newPoints);
      return true;
    } catch (err) {
      setError("Ошибка сохранения точек");
      console.error("Error saving points:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addPoint = async (point: Omit<MapPoint, "id">) => {
    const newPoint: MapPoint = {
      ...point,
      id: Date.now().toString(),
    };
    const newPoints = [...points, newPoint];
    const success = await savePoints(newPoints);
    return success ? newPoint : null;
  };

  const deletePoint = async (id: string) => {
    const newPoints = points.filter((point) => point.id !== id);
    return await savePoints(newPoints);
  };

  // Загружаем точки при монтировании
  useEffect(() => {
    loadPoints();
  }, []);

  return {
    points,
    loading,
    error,
    loadPoints,
    savePoints,
    addPoint,
    deletePoint,
  };
}
