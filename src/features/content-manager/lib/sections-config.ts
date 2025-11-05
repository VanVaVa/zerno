import { SectionConfig } from "@/shared/types";

export const sectionsConfig: Record<string, SectionConfig> = {
  hero: {
    id: "hero",
    title: "Главный баннер",
    description: "Редактирование заголовка и описания",
    fields: {
      title: { label: "Заголовок", type: "text", required: true },
      subtitle: { label: "Подзаголовок", type: "textarea", rows: 3 },
      buttonText: { label: "Текст кнопки", type: "text" },
    },
  },
  features: {
    id: "features",
    title: "Преимущества",
    description: "Управление списком преимуществ",
    fields: {
      sectionTitle: { label: "Заголовок секции", type: "text" },
      feature1Title: { label: "Преимущество 1 - Заголовок", type: "text" },
      feature1Desc: { label: "Преимущество 1 - Описание", type: "textarea" },
      feature2Title: { label: "Преимущество 2 - Заголовок", type: "text" },
      feature2Desc: { label: "Преимущество 2 - Описание", type: "textarea" },
      feature3Title: { label: "Преимущество 3 - Заголовок", type: "text" },
      feature3Desc: { label: "Преимущество 3 - Описание", type: "textarea" },
    },
  },
} as const;

export type SectionId = keyof typeof sectionsConfig;
