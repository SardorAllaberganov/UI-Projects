# 04. Удаление триггера сайдбара из навбара

## Цель
Убрать `<SidebarTrigger />` из TopBar, оставив всё управление сайдбаром в самом сайдбаре. Но при этом не сломать мобильный UX.

## Контекст
На десктопе сайдбар всегда виден (свёрнутый или развёрнутый). Переключение его ширины перенесено в футер сайдбара ([03-sidebar-footer-collapse-toggle](./03-sidebar-footer-collapse-toggle.md)). Отдельная кнопка в шапке была дубликатом.

Но на мобиле сайдбар — это `Sheet`-дровер, который **полностью уезжает за экран**. Если его убрать, открыть меню становится невозможно.

## Решение
### `src/components/layout/TopBar.tsx`
- Импорт `SidebarTrigger` и вертикальный `Separator` после него удалены.
- Добавлен `<MobileMenuButton />`, который рендерит обычный `Button` с иконкой `Menu` **только когда `useSidebar().isMobile === true`**:

```tsx
function MobileMenuButton() {
  const { t } = useTranslation();
  const { isMobile, toggleSidebar } = useSidebar();
  if (!isMobile) return null;
  return (
    <Button variant="ghost" size="icon" className="-ml-1 shrink-0" onClick={toggleSidebar} aria-label={t("common.openMenu")}>
      <Menu className="h-5 w-5" />
    </Button>
  );
}
```

- `useSidebar()` уже определяет mobile через хук `useIsMobile()` внутри `SidebarProvider`.
- На десктопе шапка начинается сразу с хлебных крошек.

## Принципы
- Десктоп и мобильный UX часто требуют разной плотности кнопок. Не лепи одну кнопку «на все случаи» — проверь `isMobile` и рендери условно.
- На мобиле кнопка-открывалка Sheet'а — это не «свернуть» (там нет двух состояний шириной), это «открыть/закрыть». Иконка `Menu` (☰) понятнее, чем `PanelLeft`.
- Используй `useSidebar()` хук, а не отдельный `useUiStore.sidebarCollapsed` — состояние Sheet'а на мобиле управляется внутри `SidebarProvider`, не дублируй.

## Чего не делать
- Не удаляй мобильную кнопку «потому что хочется чище» — без неё пользователь не сможет открыть навигацию.
- Не используй `useUiStore().toggleSidebar` для мобильного Sheet'а: это десктопное состояние ширины, оно никак не связано с открытием Sheet.
