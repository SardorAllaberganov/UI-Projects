import { format, formatDistanceToNow } from "date-fns";
import { ru } from "date-fns/locale/ru";

export const formatUZS = (amount: number): string =>
  `${new Intl.NumberFormat("ru-RU").format(amount)} сум`;

export const formatNumber = (value: number): string =>
  new Intl.NumberFormat("ru-RU").format(value);

export const formatPhone = (raw: string): string => {
  const digits = raw.replace(/\D/g, "");
  if (digits.length !== 12) return raw;
  return `+${digits.slice(0, 3)} ${digits.slice(3, 5)} ${digits.slice(5, 8)} ${digits.slice(8, 10)} ${digits.slice(10, 12)}`;
};

export const formatPinfl = (pinfl: string): string => pinfl;

export const formatDate = (
  date: Date | string,
  pattern = "d MMM yyyy, HH:mm",
): string =>
  format(typeof date === "string" ? new Date(date) : date, pattern, {
    locale: ru,
  });

export const formatRelative = (date: Date | string): string =>
  formatDistanceToNow(typeof date === "string" ? new Date(date) : date, {
    addSuffix: true,
    locale: ru,
  });

export const formatPercent = (value: number, fractionDigits = 1): string =>
  new Intl.NumberFormat("ru-RU", {
    style: "percent",
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value / 100);
