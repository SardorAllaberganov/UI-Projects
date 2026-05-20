import type { Branch } from "@/types";
import { partners } from "./partners";

const CITIES_AND_BRANCHES: Array<{ city: string; name: string }> = [
  { city: "Тошкент", name: "Юнусобод" },
  { city: "Тошкент", name: "Чилонзор" },
  { city: "Тошкент", name: "Мирзо Улугбек" },
  { city: "Самарканд", name: "Центральный" },
  { city: "Бухара", name: "Центральный" },
  { city: "Андижан", name: "Центральный" },
  { city: "Фергана", name: "Центральный" },
  { city: "Наманган", name: "Центральный" },
  { city: "Карши", name: "Центральный" },
  { city: "Нукус", name: "Центральный" },
  { city: "Ургенч", name: "Центральный" },
  { city: "Джизак", name: "Центральный" },
];

export const branches: Branch[] = CITIES_AND_BRANCHES.map((item, i) => {
  const priorityOrder = [...partners]
    .sort((a, b) => ((i * 31 + a.id.length) % 13) - ((i * 17 + b.id.length) % 13))
    .filter((p) => p.active);

  return {
    id: `brn_${String(i + 1).padStart(3, "0")}`,
    name: `Texnomart ${item.name}`,
    city: item.city,
    address: `г. ${item.city}, ул. ${["Амира Темура", "Бунёдкор", "Шахрисабз", "Афросиаб", "Беруни", "Навои"][i % 6]}, ${10 + i * 7}`,
    phone: `+998 7${i % 5 === 0 ? "1" : "8"} ${String(200 + i * 13).slice(0, 3)} ${String(1000 + i * 87).slice(0, 4)}`,
    managerName: [
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
    ][i] ?? "Алишер Каримов",
    partners: priorityOrder.map((p, idx) => ({
      partnerId: p.id,
      priority: idx + 1,
      enabled: idx < 5,
    })),
    createdAt: new Date(2024, i % 12, ((i * 5) % 27) + 1).toISOString(),
  };
});
