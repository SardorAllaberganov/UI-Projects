import {
  LayoutDashboard,
  BarChart3,
  FileText,
  Users,
  UserCheck,
  Shield,
  User,
  Briefcase,
  Building2,
  Send,
  Settings,
  type LucideIcon,
} from "lucide-react";

export interface NavItem {
  key: string;
  label: string;
  icon: LucideIcon;
  path: string;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { key: "dashboard", label: "Дашборд", icon: LayoutDashboard, path: "/" },
  { key: "analytics", label: "Аналитика", icon: BarChart3, path: "/analytics" },
  {
    key: "applications",
    label: "Заявки",
    icon: FileText,
    path: "/applications",
    badge: "unreadApplications",
  },
  { key: "users", label: "Пользователи", icon: Users, path: "/users" },
  {
    key: "userStatuses",
    label: "Статусы",
    icon: UserCheck,
    path: "/user-statuses",
  },
  { key: "roles", label: "Роли", icon: Shield, path: "/roles" },
  { key: "clients", label: "Клиенты", icon: User, path: "/clients" },
  { key: "partners", label: "Партнёры", icon: Briefcase, path: "/partners" },
  { key: "branches", label: "Филиалы", icon: Building2, path: "/branches" },
  { key: "telegram", label: "Telegram", icon: Send, path: "/telegram" },
];

export const SECONDARY_NAV: NavItem[] = [
  { key: "settings", label: "Настройки", icon: Settings, path: "/settings" },
];
