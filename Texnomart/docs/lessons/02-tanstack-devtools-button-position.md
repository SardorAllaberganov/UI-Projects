# 02. Перемещение кнопки TanStack Query Devtools

## Цель
Перенести значок Devtools в правый нижний угол, чтобы не пересекался с кнопкой Vite/React Refresh и с навигацией.

## Решение
### `src/app/AppProviders.tsx`
```tsx
<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
```

Допустимые значения `buttonPosition`:
- `top-left`, `top-right`
- `bottom-left`, `bottom-right`
- `relative` — если хочешь сам спозиционировать `<ReactQueryDevtools />` через CSS-обёртку.

## Принципы
- Devtools — это dev-only ассистент. Размещай его так, чтобы он не пересекался с реальными UI-элементами приложения (триггеры, FAB-кнопки, toast-уведомления).
- Если в проекте уже есть несколько dev-оверлеев (Sonner, TanStack, RHK, MSW), договорись об угле для каждого. У нас:
  - Toast (`Sonner`) — `top-right`
  - TanStack Devtools — `bottom-right`
  - Угол `bottom-left` свободен для будущих оверлеев.
