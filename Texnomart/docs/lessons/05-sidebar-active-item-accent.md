# 05. Усиление акцента на активном пункте меню

> ⚠️ Часть этого урока (про `strokeWidth` у lucide-иконок) была заменена позже. Финальное решение для иконки активного пункта — Phosphor Icons с `weight="fill"`. См. [07-phosphor-icons-for-nav.md](./07-phosphor-icons-for-nav.md). Остальные правила (левая полоска, цвет, вес шрифта, бейдж) — актуальны.

## Цель
Сделать активный пункт сайдбара заметнее, в том числе — «утолстить» его иконку.

## Контекст
По брендбуку Texnomart жёлтый `#FBC100` — это сильный акцент, и его нельзя использовать как фон активного пункта (см. правило в первоначальном промпте: «left border indicator + text color, **not full background**»). Значит, акцент собирается из:
- ширины и формы левой полоски,
- цвета иконки,
- толщины обводки иконки,
- веса шрифта.

## Решение
### `src/components/layout/AppSidebar.tsx`
В `NavLinkRow` для активного состояния:
- Левая полоска: `2px` → `3px`, `inset-y-1.5` → `inset-y-1` (чуть выше и ниже), плюс `box-shadow: 0 0 0 1px hsl(var(--brand)/0.25)` — лёгкое свечение для глубины.
- Иконка: `text-brand` + `strokeWidth={2.5}` (по умолчанию у `lucide-react` — `2`). Это и есть «жирная иконка» — у Lucide нет отдельных filled-вариантов, регулируется именно `strokeWidth`.
- Текст: `font-semibold` (был дефолт, после `data-[active=true]:font-medium` у shadcn).
- Бейдж непрочитанных (заявок): добавлено `ring-1 ring-brand/40` когда пункт активен, чтобы цифра «жила» в паре с полоской.

Неактивное состояние:
- `text-muted-foreground`, `font-normal`, обычный `strokeWidth=2`.
- `hover:text-foreground` — лёгкое осветление при наведении, без жёлтого.

```tsx
<NavLink
  className={cn(
    "relative flex items-center gap-2 transition-colors",
    isActive
      ? "font-semibold text-foreground before:absolute before:inset-y-1 before:left-0 before:w-[3px] before:rounded-r-full before:bg-brand before:shadow-[0_0_0_1px_hsl(var(--brand)/0.25)]"
      : "font-normal text-muted-foreground hover:text-foreground",
  )}
>
  <Icon
    className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-brand" : "text-current")}
    strokeWidth={isActive ? 2.5 : 2}
  />
  <span className={cn(collapsed && "sr-only")}>{label}</span>
</NavLink>
```

## Принципы
- В `lucide-react` нет filled-вариантов. «Жирная иконка» = `strokeWidth` 2 → 2.5. Дальше 2.75 становится слишком чанково, 3+ — лого-стиль.
- При свёрнутом сайдбаре икон-онли пункт виден только по иконке и полоске. Цвет иконки бренд + полоска бренд = двойной сигнал, который не теряется в icon-only.
- `before:` псевдоэлемент с `inset-y-1` + `rounded-r-full` рисует капсульную полоску, не уходящую за фон строки.
- Не забывай `transition-colors` и на ссылке, и на иконке — без неё переход кажется дёрганным.

## Чего не делать
- Не делай полный жёлтый фон активного пункта (`bg-brand` или плотный `bg-brand-soft`) — это спорит с правилом «brand — recognition color, не для покрытий».
- Не делай ещё и `text-brand` для лейбла. Иконка уже жёлтая, текст должен оставаться нейтральным `foreground`, иначе строка превращается в неон.
- Не выставляй `strokeWidth` через CSS — у lucide это пропс компонента.
