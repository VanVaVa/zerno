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
  [key: string]: string | number | boolean | null | undefined;
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
