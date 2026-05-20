export const APPLICATION_STATUSES = [
  "draft",
  "submitted",
  "scoring",
  "partner_review",
  "approved",
  "contract_signed",
  "disbursed",
  "closed",
  "rejected",
  "cancelled",
] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUSES)[number];

export const APPLICATION_STATUS_LABELS_RU: Record<ApplicationStatus, string> = {
  draft: "Черновик",
  submitted: "Отправлена",
  scoring: "Скоринг",
  partner_review: "У партнёра",
  approved: "Одобрена",
  contract_signed: "Договор",
  disbursed: "Выдана",
  closed: "Закрыта",
  rejected: "Отказ",
  cancelled: "Отменена",
};

export type StatusVariant =
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

export const APPLICATION_STATUS_VARIANTS: Record<
  ApplicationStatus,
  StatusVariant
> = {
  draft: "neutral",
  submitted: "info",
  scoring: "info",
  partner_review: "warning",
  approved: "success",
  contract_signed: "success",
  disbursed: "success",
  closed: "neutral",
  rejected: "danger",
  cancelled: "neutral",
};

export const ROLES = ["superadmin", "admin", "operator", "agent"] as const;
export type Role = (typeof ROLES)[number];

export const ROLE_LABELS_RU: Record<Role, string> = {
  superadmin: "Супер-админ",
  admin: "Администратор",
  operator: "Оператор",
  agent: "Агент",
};

export const CREDIT_TERMS_MONTHS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 18, 24, 36,
] as const;

export const USER_STATUSES = ["active", "suspended", "invited"] as const;
export type UserStatus = (typeof USER_STATUSES)[number];

export const USER_STATUS_LABELS_RU: Record<UserStatus, string> = {
  active: "Активен",
  suspended: "Приостановлен",
  invited: "Приглашён",
};

export const USER_STATUS_VARIANTS: Record<UserStatus, StatusVariant> = {
  active: "success",
  suspended: "warning",
  invited: "info",
};
