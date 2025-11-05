import { useState, useEffect } from "react";
import { firebaseApi } from "@/shared/api/firebase-api";
import { ContactsContent } from "@/shared/types";

export function useContacts() {
  const [contacts, setContacts] = useState<ContactsContent>({
    phone: "",
    email: "",
    address: "",
    mapLink: "",
    website: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const loadContacts = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await firebaseApi.getDocument<ContactsContent>(
        "sections",
        "contacts"
      );
      if (response.data) {
        setContacts(response.data);
      } else {
        // Создаем начальную запись с пустыми полями
        const initialContacts = {
          phone: "",
          email: "",
          address: "",
          mapLink: "",
          website: "",
        };
        setContacts(initialContacts);
        await firebaseApi.saveDocument("sections", "contacts", initialContacts);
      }
    } catch (err) {
      setError("Ошибка загрузки контактов");
      console.error("Error loading contacts:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveContacts = async (newContacts: ContactsContent) => {
    setLoading(true);
    try {
      await firebaseApi.saveDocument("sections", "contacts", newContacts);
      setContacts(newContacts);
      return true;
    } catch (err) {
      setError("Ошибка сохранения контактов");
      console.error("Error saving contacts:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateContacts = async (updates: Partial<ContactsContent>) => {
    const newContacts = { ...contacts, ...updates };
    return await saveContacts(newContacts);
  };

  useEffect(() => {
    loadContacts();
  }, []);

  return {
    contacts,
    loadingContacts: loading,
    errorContacts: error,
    loadContacts,
    saveContacts,
    updateContacts,
  };
}
