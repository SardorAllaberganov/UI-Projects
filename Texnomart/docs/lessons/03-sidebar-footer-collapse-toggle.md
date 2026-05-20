# 03. Кнопка сворачивания в футере сайдбара вместо аккаунта

## Цель
Убрать карточку аккаунта (avatar + ФИО + роль + dropdown «Выйти») из футера сайдбара и поставить туда переключатель «свернуть/развернуть меню».

## Контекст
Логин и выход в этом проекте уже доступны через `<UserMenu />` в правой части TopBar (аватар → меню). Дублировать аккаунт в сайдбаре — лишний шум, особенно когда сайдбар свёрнут до иконок.

## Решение
### `src/components/layout/AppSidebar.tsx`
- Удалена секция `SidebarFooter > DropdownMenu` с аватаром и dropdown'ом.
- Удалены неиспользуемые импорты: `Avatar`, `AvatarFallback`, `DropdownMenu*`, `LogOut`, `ChevronsUpDown`, `useAuth`, `RoleBadge`.
- Добавлен компонент `<CollapseToggle />`, рендерится внутри `<SidebarFooter>`:

```tsx
function CollapseToggle({ collapsed }: { collapsed: boolean }) {
  const { t } = useTranslation();
  const { toggleSidebar } = useSidebar();
  const label = collapsed ? t("nav.expand") : t("nav.collapse");

  return (
    <SidebarMenuButton
      onClick={toggleSidebar}
      tooltip={label}
      aria-label={label}
      className="text-muted-foreground hover:text-foreground"
    >
      {collapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
      <span className={cn(collapsed && "sr-only")}>{label}</span>
    </SidebarMenuButton>
  );
}
```

### `src/i18n/locales/ru.json`
Добавлены ключи:
```json
"nav": {
  "collapse": "Свернуть меню",
  "expand": "Развернуть меню"
}
```

## Принципы
- Один источник истины на действие. Аккаунт уже есть в TopBar — в сайдбаре дублировать нельзя.
- В свёрнутом состоянии (icon-only) иконка должна сама объяснять состояние: `PanelLeftOpen` ↔ `PanelLeftClose`. Текст — `sr-only`, tooltip даёт его наведением.
- `aria-label` и `tooltip` всегда переключаются вместе с состоянием — иначе скринридер врёт.

## Чего не делать
- Не клади `toggleSidebar` в обычный `<Button>` — теряются `data-state`, `tooltip` через `SidebarMenuButton` и единый ритм футера. Используй именно `SidebarMenuButton`.
