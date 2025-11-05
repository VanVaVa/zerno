import {
  Build,
  Business,
  Cloud,
  Code,
  Computer,
  Construction,
  DesignServices,
  Engineering,
  HomeRepairService,
  Settings,
  Support,
  Web,
  Architecture,
  Brush,
  Palette,
  CameraAlt,
  Videocam,
  Analytics,
  Storage,
  Security,
  PhoneAndroid,
  Laptop,
  Smartphone,
  TrendingUp,
  Group,
  Public,
  Psychology,
  AutoAwesome,
  CheckCircle,
  Star,
  Bolt,
  Lightbulb,
  RocketLaunch,
  Speed,
  PrecisionManufacturing,
  Handyman,
} from "@mui/icons-material";
import { ReactNode } from "react";

// Объект с доступными иконками
export const availableIcons = {
  Build,
  Business,
  Cloud,
  Code,
  Computer,
  Construction,
  DesignServices,
  Engineering,
  HomeRepairService,
  Settings,
  Support,
  Web,
  Architecture,
  Brush,
  Palette,
  CameraAlt,
  Videocam,
  Analytics,
  Storage,
  Security,
  PhoneAndroid,
  Laptop,
  Smartphone,
  TrendingUp,
  Group,
  Public,
  Psychology,
  AutoAwesome,
  CheckCircle,
  Star,
  Bolt,
  Lightbulb,
  RocketLaunch,
  Speed,
  PrecisionManufacturing,
  Handyman,
} as const;

// Тип для названий иконок
export type IconName = keyof typeof availableIcons;

// Интерфейс для опции иконки
export interface IconOption {
  name: IconName;
  label: string;
  component: React.ComponentType<{ component: ReactNode }>;
}

// Список иконок с человеко-читаемыми названиями
export const iconOptions: IconOption[] = [
  { name: "Build", label: "Строительство", component: Build },
  { name: "Business", label: "Бизнес", component: Business },
  { name: "Cloud", label: "Облако", component: Cloud },
  { name: "Code", label: "Разработка", component: Code },
  { name: "Computer", label: "Компьютер", component: Computer },
  { name: "Construction", label: "Конструкция", component: Construction },
  { name: "DesignServices", label: "Дизайн", component: DesignServices },
  { name: "Engineering", label: "Инженерия", component: Engineering },
  { name: "HomeRepairService", label: "Ремонт", component: HomeRepairService },
  { name: "Settings", label: "Настройки", component: Settings },
  { name: "Support", label: "Поддержка", component: Support },
  { name: "Web", label: "Веб", component: Web },
  { name: "Architecture", label: "Архитектура", component: Architecture },
  { name: "Brush", label: "Кисть", component: Brush },
  { name: "Palette", label: "Палитра", component: Palette },
  { name: "CameraAlt", label: "Фото", component: CameraAlt },
  { name: "Videocam", label: "Видео", component: Videocam },
  { name: "Analytics", label: "Аналитика", component: Analytics },
  { name: "Storage", label: "Хранилище", component: Storage },
  { name: "Security", label: "Безопасность", component: Security },
  { name: "PhoneAndroid", label: "Android", component: PhoneAndroid },
  { name: "Laptop", label: "Ноутбук", component: Laptop },
  { name: "Smartphone", label: "Смартфон", component: Smartphone },
  { name: "TrendingUp", label: "Рост", component: TrendingUp },
  { name: "Group", label: "Команда", component: Group },
  { name: "Public", label: "Глобус", component: Public },
  { name: "Psychology", label: "Психология", component: Psychology },
  { name: "AutoAwesome", label: "Автоматизация", component: AutoAwesome },
  { name: "CheckCircle", label: "Галочка", component: CheckCircle },
  { name: "Star", label: "Звезда", component: Star },
  { name: "Bolt", label: "Молния", component: Bolt },
  { name: "Lightbulb", label: "Идея", component: Lightbulb },
  { name: "RocketLaunch", label: "Ракета", component: RocketLaunch },
  { name: "Speed", label: "Скорость", component: Speed },
  {
    name: "PrecisionManufacturing",
    label: "Производство",
    component: PrecisionManufacturing,
  },
  { name: "Handyman", label: "Инструменты", component: Handyman },
];

// Функция для получения компонента иконки по имени
export const getIconComponent = (iconName: IconName) => {
  return availableIcons[iconName];
};

// Функция для получения отображаемого названия иконки
export const getIconLabel = (iconName: IconName) => {
  const option = iconOptions.find((opt) => opt.name === iconName);
  return option ? option.label : iconName;
};
