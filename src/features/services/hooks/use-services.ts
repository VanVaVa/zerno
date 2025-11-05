import { useState, useEffect } from "react";
import { firebaseApi } from "@/shared/api/firebase-api";
import { ServiceContent, ServicesSectionContent } from "@/shared/types";

export function useServices() {
  const [services, setServices] = useState<ServiceContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const loadServices = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await firebaseApi.getDocument<ServicesSectionContent>(
        "sections",
        "services"
      );
      if (response.data?.services) {
        setServices(response.data.services);
      } else {
        setServices([]);
        // Создаем начальную запись с пустым массивом
        await firebaseApi.saveDocument("sections", "services", {
          services: [],
        });
      }
    } catch (err) {
      setError("Ошибка загрузки услуг");
      console.error("Error loading services:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveServices = async (newServices: ServiceContent[]) => {
    setLoading(true);
    try {
      await firebaseApi.saveDocument("sections", "services", {
        services: newServices,
      });
      setServices(newServices);
      return true;
    } catch (err) {
      setError("Ошибка сохранения услуг");
      console.error("Error saving services:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addService = async (service: Omit<ServiceContent, "id">) => {
    const newService: ServiceContent = {
      ...service,
      id: Date.now().toString(),
      // Убедимся, что у всех фич есть iconName по умолчанию
      features: service.features.map((feature) => ({
        ...feature,
        iconName: feature.iconName || "Build", // иконка по умолчанию
      })),
    };
    const newServices = [...services, newService];
    const success = await saveServices(newServices);
    return success ? newService : null;
  };

  const updateService = async (
    id: string,
    updates: Partial<ServiceContent>
  ) => {
    const newServices = services.map((service) =>
      service.id === id
        ? {
            ...service,
            ...updates,
            // Обновляем фичи, если они есть в updates
            features: updates.features
              ? updates.features.map((feature) => ({
                  ...feature,
                  iconName: feature.iconName || "Build",
                }))
              : service.features,
          }
        : service
    );
    return await saveServices(newServices);
  };

  const deleteService = async (id: string) => {
    const newServices = services.filter((service) => service.id !== id);
    return await saveServices(newServices);
  };

  useEffect(() => {
    loadServices();
  }, []);

  return {
    services,
    loading,
    error,
    loadServices,
    saveServices,
    addService,
    updateService,
    deleteService,
  };
}
