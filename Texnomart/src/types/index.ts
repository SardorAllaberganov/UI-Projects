import type {
  ApplicationStatus,
  Role,
  UserStatus,
} from "@/lib/constants/enums";

export type Locale = "ru" | "uz";
export type Theme = "light" | "dark" | "system";

export interface Client {
  id: string;
  fullName: string;
  phone: string;
  pinfl: string;
  birthDate: string;
  city: string;
  createdAt: string;
}

export interface Partner {
  id: string;
  name: string;
  shortName: string;
  enabledTermsMonths: number[];
  minAmount: number;
  maxAmount: number;
  baseInterestRate: number;
  approvalRate: number;
  active: boolean;
  createdAt: string;
}

export interface BranchPartnerConfig {
  partnerId: string;
  priority: number;
  enabled: boolean;
}

export interface Branch {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  managerName: string;
  partners: BranchPartnerConfig[];
  createdAt: string;
}

export interface SystemUser {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: Role;
  status: UserStatus;
  branchId: string | null;
  lastSeenAt: string | null;
  createdAt: string;
}

export interface CreditApplication {
  id: string;
  number: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  clientPinfl: string;
  amount: number;
  termMonths: number;
  partnerId: string;
  partnerName: string;
  branchId: string;
  branchName: string;
  agentId: string;
  agentName: string;
  status: ApplicationStatus;
  scoringScore: number | null;
  rejectionReason: string | null;
  createdAt: string;
  updatedAt: string;
  productName: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  createdAt: string;
  read: boolean;
  href?: string;
}

export interface ReportItem {
  id: string;
  name: string;
  kind: "applications" | "partners" | "agents" | "branches";
  rangeFrom: string;
  rangeTo: string;
  generatedAt: string;
  generatedBy: string;
  fileSize: number;
}
