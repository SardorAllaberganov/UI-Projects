import type { SystemUser } from "@/types";
import type { Role, UserStatus } from "@/lib/constants/enums";
import { pick } from "./_helpers";
import { branches } from "./branches";

const NAMES = [
  "Алишер Каримов",
  "Дилнура Хасанова",
  "Бахтиёр Юлдашев",
  "Зарина Абдуллаева",
  "Шерзод Рахимов",
  "Нилуфар Каримова",
  "Жасур Турсунов",
  "Малика Назарова",
  "Отабек Усманов",
  "Гулнора Ибрагимова",
  "Фаррух Эргашев",
  "Камола Хайдарова",
  "Бекзод Иргашев",
  "Севара Махмудова",
  "Тимур Сулайманов",
  "Лола Тошматова",
  "Рустам Мансуров",
  "Шахноза Юсупова",
  "Улугбек Рузиев",
  "Манзура Сатторова",
  "Зафар Турғунов",
  "Барно Мирзаева",
  "Ислом Каримов",
  "Гулсара Норматова",
  "Хусан Кодиров",
  "Феруза Алиева",
  "Нодир Жураев",
  "Рано Бабаджанова",
  "Мурад Хакимов",
  "Сабина Ахмедова",
];

const ROLE_ROTATION: Role[] = [
  "superadmin",
  "admin",
  "admin",
  "admin",
  "operator",
  "operator",
  "operator",
  "operator",
  "operator",
  "agent",
  "agent",
  "agent",
  "agent",
  "agent",
];

const STATUS_ROTATION: UserStatus[] = [
  "active",
  "active",
  "active",
  "active",
  "active",
  "active",
  "active",
  "active",
  "invited",
  "suspended",
];

function translit(s: string): string {
  const map: Record<string, string> = {
    А: "A",
    Б: "B",
    В: "V",
    Г: "G",
    Д: "D",
    Е: "E",
    Ё: "Yo",
    Ж: "Zh",
    З: "Z",
    И: "I",
    Й: "Y",
    К: "K",
    Л: "L",
    М: "M",
    Н: "N",
    О: "O",
    П: "P",
    Р: "R",
    С: "S",
    Т: "T",
    У: "U",
    Ф: "F",
    Х: "Kh",
    Ц: "Ts",
    Ч: "Ch",
    Ш: "Sh",
    Щ: "Sh",
    Ъ: "",
    Ы: "Y",
    Ь: "",
    Э: "E",
    Ю: "Yu",
    Я: "Ya",
    а: "a",
    б: "b",
    в: "v",
    г: "g",
    д: "d",
    е: "e",
    ё: "yo",
    ж: "zh",
    з: "z",
    и: "i",
    й: "y",
    к: "k",
    л: "l",
    м: "m",
    н: "n",
    о: "o",
    п: "p",
    р: "r",
    с: "s",
    т: "t",
    у: "u",
    ф: "f",
    х: "kh",
    ц: "ts",
    ч: "ch",
    ш: "sh",
    щ: "sh",
    ъ: "",
    ы: "y",
    ь: "",
    э: "e",
    ю: "yu",
    я: "ya",
    "ў": "o",
    "Ў": "O",
    "ғ": "g",
    "Ғ": "G",
    "қ": "q",
    "Қ": "Q",
    "ҳ": "h",
    "Ҳ": "H",
  };
  return s
    .split("")
    .map((c) => map[c] ?? c)
    .join("");
}

function emailFromName(name: string, i: number): string {
  const [first, last] = name.split(" ");
  const f = translit(first ?? "").toLowerCase();
  const l = translit(last ?? "").toLowerCase();
  return `${f}.${l}${i % 4 === 0 ? i : ""}@texnomart.uz`;
}

const PREFIXES = ["90", "91", "93", "94", "97", "98", "99", "33", "55", "88"];

function phone(seed: number): string {
  const prefix = PREFIXES[seed % PREFIXES.length];
  const a = String(100 + ((seed * 31) % 900));
  const b = String(10 + ((seed * 13) % 90));
  const c = String(10 + ((seed * 47) % 90));
  return `998${prefix}${a}${b}${c}`;
}

export const users: SystemUser[] = NAMES.map((fullName, i) => {
  const role = pick(ROLE_ROTATION, i);
  const status = pick(STATUS_ROTATION, i + 3);
  const branch = role === "agent" ? pick(branches, i) : null;
  return {
    id: `usr_${String(i + 1).padStart(3, "0")}`,
    fullName,
    email: emailFromName(fullName, i),
    phone: phone(i + 41),
    role,
    status,
    branchId: branch?.id ?? null,
    lastSeenAt:
      status === "invited"
        ? null
        : new Date(Date.now() - (i + 1) * 3_600_000).toISOString(),
    createdAt: new Date(Date.now() - (i + 1) * 7 * 86_400_000).toISOString(),
  };
});
