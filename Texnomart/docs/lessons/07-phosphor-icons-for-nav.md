# 07. Phosphor Icons для навигации (filled bold вариант)

## Цель
Сделать иконку активного пункта сайдбара **визуально жирной и залитой**, а не только утолщённой обводкой.

## Контекст
До этого иконки сайдбара брались из `lucide-react`. На активном пункте мы выставляли `strokeWidth={2.5}` + `text-brand`. Это даёт «обводку поярче», но не выглядит как «filled bold» — у `lucide-react` принципиально нет filled-вариантов, только stroke. Регулировать «жирность» можно только толщиной обводки, что даёт ограниченный эффект, особенно в свёрнутом icon-only сайдбаре.

Пользователь хотел чёткий двусостоянный вид: тонкая outline-иконка вне фокуса → плотная **залитая** иконка на активном пункте.

## Решение
### Установка
```bash
npm install @phosphor-icons/react
```

Phosphor — это иконочный набор с поддержкой `weight` пропа: `thin / light / regular / bold / fill / duotone`. `fill` рендерит ту же иконку, но как сплошную фигуру. Идеально под наш сценарий.

### Где переключили — только навигация
Поменяли иконки **только в** [`src/lib/constants/navigation.ts`](../../src/lib/constants/navigation.ts) и в рендере `NavLinkRow` внутри [`src/components/layout/AppSidebar.tsx`](../../src/components/layout/AppSidebar.tsx). Всё остальное (TopBar, KPICard, Placeholder, NotificationsMenu, статус-бейджи и т.п.) осталось на `lucide-react`.

### Mapping lucide → Phosphor
| Раньше (`lucide-react`) | Сейчас (`@phosphor-icons/react`) |
|--------------------------|----------------------------------|
| `LayoutDashboard` | `SquaresFour` |
| `BarChart3` | `ChartBar` |
| `FileText` | `FileText` |
| `Users` | `Users` |
| `UserCheck` | `IdentificationBadge` |
| `Shield` | `Shield` |
| `User` | `User` |
| `Briefcase` | `Briefcase` |
| `Building2` | `Buildings` |
| `Send` | `PaperPlaneTilt` |
| `Settings` | `Gear` |

### Рендер активного состояния
```tsx
import type { Icon as PhosphorIcon } from "@phosphor-icons/react";

<Icon
  size={18}
  weight={isActive ? "fill" : "regular"}
  className={cn("shrink-0 transition-colors", isActive ? "text-brand" : "text-current")}
/>
```

`size={18}` равен `h-4 w-4` визуально (тонкая разница в padding-боксе у Phosphor). `weight="regular"` — тонкая обводка по умолчанию для всех неактивных пунктов; `"fill"` — сплошная заливка для активного. Цвет наследуется через `currentColor`, поэтому `text-brand` красит залитую форму в фирменный жёлтый.

Тип компонента в проп интерфейсе `NavLinkRow` тоже сменился: `LucideIcon` → `PhosphorIcon` (импорт типа из `@phosphor-icons/react`).

## Принципы
- **Иконочный набор подбирается под сценарий, а не наоборот**. lucide-react шикарен для тонких outline-иконок; Phosphor — для двусостоянных navigation rail / tab bar; для duotone и иллюстраций — снова Phosphor с `weight="duotone"`. Не пытаться «выжать» эффект из неподходящего набора через CSS-хаки
- **Не мешать наборы в одном элементе**. Сайдбар целиком на Phosphor; всё остальное — lucide. Иначе оптические веса будут плясать между соседними блоками
- **`weight` — это пропс компонента, не CSS**. Все Phosphor-обвязки должны принимать `weight` явно из родителя, не пытаться выставить его через `data-*` или `className`
- **`size` в Phosphor задаётся числом (px)**, не утилитой Tailwind. У них собственное масштабирование стейка обводки от размера; навязывать `h-4 w-4` через класс рискованно — иконка станет квадратом со сжатой пропорцией обводки

## Чего не делать
- ❌ Использовать Phosphor вне сайдбара. Сразу разойдётся визуальный язык — у TopBar-иконок Lucide-овский «штрих 2px» очень узнаваем
- ❌ Пытаться залить lucide-иконку через CSS `fill: currentColor` — у многих lucide-иконок `fill="none"` забит атрибутом, и получится либо ничего, либо мешанина из пересечений
- ❌ Менять `weight` через `data-active` + CSS. У Phosphor `weight` — это **разные SVG-пути**, не одна форма с обводкой. CSS не переключит контур
- ❌ Брать Phosphor `weight="bold"` для активного. `bold` — это утолщённая outline, не fill. Активный пункт в нашем дизайне должен явно «залиться»: `fill` обязателен
