"use client";
import { useState, useEffect } from "react";
import { firebaseApi } from "@/shared/api/firebase-api";
import { CompanyBlock, CompanySectionContent } from "@/shared/types";

export function useCompanyInfo() {
  const [blocks, setBlocks] = useState<CompanyBlock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  const loadCompanyInfo = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await firebaseApi.getDocument<CompanySectionContent>(
        "sections",
        "company"
      );
      if (response.data?.blocks) {
        setBlocks(response.data.blocks);
      } else {
        // Если документа нет, инициализируем пустым массивом
        setBlocks([]);
        // Создаем начальную запись с пустым массивом
        await firebaseApi.saveDocument("sections", "company", { blocks: [] });
      }
    } catch (err) {
      setError("Ошибка загрузки информации о компании");
      console.error("Error loading company info:", err);
    } finally {
      setLoading(false);
    }
  };

  const saveCompanyInfo = async (newBlocks: CompanyBlock[]) => {
    setLoading(true);
    try {
      // Убедимся, что все поля определены (заменяем undefined на null или пустую строку)
      const sanitizedBlocks = newBlocks.map((block) => ({
        ...block,
        imageUrl: block.imageUrl || "", // заменяем undefined на пустую строку
      }));

      await firebaseApi.saveDocument("sections", "company", {
        blocks: sanitizedBlocks,
      });
      setBlocks(sanitizedBlocks);
      return true;
    } catch (err) {
      setError("Ошибка сохранения информации");
      console.error("Error saving company info:", err);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const addBlock = async (block: Omit<CompanyBlock, "id" | "order">) => {
    const newBlock: CompanyBlock = {
      ...block,
      id: Date.now().toString(),
      order: blocks.length,
      imageUrl: block.imageUrl || "", // заменяем undefined на пустую строку
    };
    const newBlocks = [...blocks, newBlock];
    const success = await saveCompanyInfo(newBlocks);
    return success ? newBlock : null;
  };

  const updateBlock = async (id: string, updates: Partial<CompanyBlock>) => {
    const newBlocks = blocks.map((block) =>
      block.id === id
        ? {
            ...block,
            ...updates,
            imageUrl: updates.imageUrl || block.imageUrl || "", // сохраняем существующее или ставим пустую строку
          }
        : block
    );
    return await saveCompanyInfo(newBlocks);
  };

  const deleteBlock = async (id: string) => {
    const newBlocks = blocks.filter((block) => block.id !== id);
    // Обновляем порядок оставшихся блоков
    const reorderedBlocks = newBlocks.map((block, index) => ({
      ...block,
      order: index,
    }));
    return await saveCompanyInfo(reorderedBlocks);
  };

  const reorderBlocks = async (newOrder: CompanyBlock[]) => {
    const reorderedBlocks = newOrder.map((block, index) => ({
      ...block,
      order: index,
    }));
    return await saveCompanyInfo(reorderedBlocks);
  };

  useEffect(() => {
    loadCompanyInfo();
  }, []);

  return {
    blocks,
    loading,
    error,
    loadCompanyInfo,
    saveCompanyInfo,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
  };
}
