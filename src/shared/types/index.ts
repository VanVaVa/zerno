import { DocumentData } from "firebase/firestore";

// Firebase типы
export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  logout: () => Promise<void>;
}

// Типы для секций контента - наследуем от DocumentData для совместимости
export interface SectionContent extends DocumentData {
  [key: string]: string | number | boolean | null | undefined | unknown[];
}

export interface SectionConfig {
  id: string;
  title: string;
  description: string;
  fields: Record<string, FieldConfig>;
}

export interface FieldConfig {
  label: string;
  type: "text" | "textarea" | "number" | "image" | "email" | "url" | "boolean";
  rows?: number;
  required?: boolean;
}

// API типы
export interface ApiResponse<T> {
  data: T | null;
  error: string | null;
  loading: boolean;
}

// Типы для форм
export interface LoginFormData {
  email: string;
  password: string;
}

// Типы для уведомлений
export interface NotificationState {
  open: boolean;
  message: string;
  severity: "success" | "error" | "warning" | "info";
}

// Добавляем типы для карты и проектов
export interface MapProject {
  id: string;
  name: string;
  coordinates: [number, number]; // [lng, lat]
  description?: string;
  address?: string;
  type?: "commercial" | "residential" | "public";
  status?: "completed" | "in-progress" | "planned";
}

export interface MapSectionContent extends SectionContent {
  center?: [number, number];
  zoom?: number;
  projects: MapProject[];
}

export interface CompanyBlock {
  id: string;
  text: string;
  imageUrl?: string;
  order: number;
}

export interface CompanySectionContent {
  blocks: CompanyBlock[];
}

// Типы для услуг
export interface ServiceFeature {
  id: string;
  title: string;
  text: string;
  iconName: string;
}

export interface ServiceContent {
  id: string;
  name: string; // Название услуги
  subtitle: string; // Подзаголовок услуги
  headerTitle: string; // Заголовок услуги

  // Левая часть
  leftParagraph1: string;
  leftParagraph2: string;
  leftList: string[];
  leftParagraph3: string;

  // Правая часть - коллекция особенностей
  features: ServiceFeature[];

  // Галерея изображений
  gallery: string[];
}

export interface ServicesSectionContent {
  services: ServiceContent[];
}

// Типы для галереи изображений
export interface GalleryItem {
  id: string;
  imageUrl: string[];
  caption: string;
}

export interface GallerySectionContent {
  items: GalleryItem[];
}

export interface WowParkContent {
  images: string[];
}

// Типы для контактов
export interface ContactsContent {
  phone: string;
  email: string;
  address: string;
  mapLink: string;
  website: string;
}
