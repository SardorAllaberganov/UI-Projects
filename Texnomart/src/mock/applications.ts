import type { CreditApplication } from "@/types";
import {
  APPLICATION_STATUSES,
  CREDIT_TERMS_MONTHS,
  type ApplicationStatus,
} from "@/lib/constants/enums";
import { pick, pickWeighted } from "./_helpers";
import { clients } from "./clients";
import { partners } from "./partners";
import { branches } from "./branches";
import { users } from "./users";

const STATUS_WEIGHTS: Record<ApplicationStatus, number> = {
  draft: 6,
  submitted: 10,
  scoring: 10,
  partner_review: 12,
  approved: 18,
  contract_signed: 9,
  disbursed: 22,
  closed: 5,
  rejected: 6,
  cancelled: 2,
};

const REJECTION_REASONS = [
  "Низкий скоринговый балл",
  "Высокая долговая нагрузка",
  "Недостаточно подтверждённого дохода",
  "Клиент не прошёл проверку службы безопасности",
  "Запрошенная сумма превышает лимит",
];

const PRODUCTS = [
  "Потребительский кредит",
  "Рассрочка 0%",
  "Кредит на технику",
  "Кредит на смартфон",
  "Образовательный кредит",
];

const COUNT = 200;
const agents = users.filter((u) => u.role === "agent");
const agentPool = agents.length > 0 ? agents : users;

function clampAmount(seed: number, minA: number, maxA: number): number {
  const span = maxA - minA;
  const ratio = ((seed * 9301 + 49297) % 1000) / 1000;
  return Math.round((minA + ratio * span) / 100_000) * 100_000;
}

export const applications: CreditApplication[] = Array.from(
  { length: COUNT },
  (_, i) => {
    const client = pick(clients, i + 1);
    const partner = pick(partners.filter((p) => p.active), i + 7);
    const branch = pick(branches, i + 3);
    const agent = pick(agentPool, i + 11);
    const status = pickWeighted(STATUS_WEIGHTS, i * 11 + 5);
    const term = pick(
      partner.enabledTermsMonths.filter((t) =>
        CREDIT_TERMS_MONTHS.includes(t as (typeof CREDIT_TERMS_MONTHS)[number]),
      ),
      i + 2,
    );
    const amount = clampAmount(i + 17, partner.minAmount, partner.maxAmount);

    const createdMs = Date.now() - (i + 1) * 1000 * 60 * 47;
    const updatedMs = createdMs + (i % 8) * 3_600_000;

    const scoring = ["approved", "contract_signed", "disbursed", "closed"].includes(
      status,
    )
      ? 700 + ((i * 13) % 200)
      : status === "rejected"
        ? 400 + ((i * 17) % 200)
        : status === "scoring" || status === "partner_review"
          ? 600 + ((i * 7) % 200)
          : null;

    return {
      id: `app_${String(i + 1).padStart(5, "0")}`,
      number: `TM-${new Date(createdMs).getFullYear()}-${String(i + 1).padStart(5, "0")}`,
      clientId: client.id,
      clientName: client.fullName,
      clientPhone: client.phone,
      clientPinfl: client.pinfl,
      amount,
      termMonths: term,
      partnerId: partner.id,
      partnerName: partner.name,
      branchId: branch.id,
      branchName: branch.name,
      agentId: agent.id,
      agentName: agent.fullName,
      status,
      scoringScore: scoring,
      rejectionReason:
        status === "rejected" ? pick(REJECTION_REASONS, i) : null,
      createdAt: new Date(createdMs).toISOString(),
      updatedAt: new Date(updatedMs).toISOString(),
      productName: pick(PRODUCTS, i),
    };
  },
);

export const applicationStatusCounts = APPLICATION_STATUSES.reduce(
  (acc, s) => {
    acc[s] = applications.filter((a) => a.status === s).length;
    return acc;
  },
  {} as Record<ApplicationStatus, number>,
);
