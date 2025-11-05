import { useState } from "react";
import { firebaseApi } from "@/shared/api/firebase-api";
import { SectionContent } from "@/shared/types";

interface UseSectionsReturn {
  sections: Record<string, SectionContent>;
  loading: boolean;
  error: string;
  loadSection: (sectionId: string) => Promise<void>;
  saveSection: (sectionId: string, data: SectionContent) => Promise<boolean>;
}

export function useSections(): UseSectionsReturn {
  const [sections, setSections] = useState<Record<string, SectionContent>>({});
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const loadSection = async (sectionId: string): Promise<void> => {
    setLoading(true);
    try {
      const response = await firebaseApi.getDocument<SectionContent>(
        "sections",
        sectionId
      );
      if (response.data) {
        setSections((prev) => ({
          ...prev,
          [sectionId]: response.data as SectionContent,
        }));
      } else if (response.error) {
        setError("Ошибка загрузки данных");
      }
    } catch (err) {
      setError("Ошибка загрузки данных");
      console.error("Error loading section:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (
    sectionId: string,
    data: SectionContent
  ): Promise<boolean> => {
    setLoading(true);
    try {
      // Преобразуем в DocumentData для совместимости с Firestore
      const firestoreData = data as Record<string, unknown>;
      const response = await firebaseApi.saveDocument(
        "sections",
        sectionId,
        firestoreData
      );
      if (!response.error) {
        setSections((prev) => ({
          ...prev,
          [sectionId]: data,
        }));
        return true;
      } else {
        setError("Ошибка сохранения");
        return false;
      }
    } catch (err) {
      setError("Ошибка сохранения");
      console.error("Error saving section:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    sections,
    loading,
    error,
    loadSection,
    saveSection,
  };
}
