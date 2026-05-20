# 08. `Date.now()` и `new Date()` внутри `useMemo` — нарушение чистоты по правилам React Compiler

## Цель
Использовать «текущее время» в производных значениях (`useMemo`) без срабатывания правила `react-hooks/purity` от React Compiler и без скрытой нестабильности рендеров.

## Контекст / Проблема
В странице [`src/pages/Dashboard.tsx`](../../src/pages/Dashboard.tsx) часть мемоизированных значений (фильтр заявок по периоду, KPI «за 3 часа» / «сегодня», 7-дневный временной ряд для линейного графика, подпись даты в подзаголовке) зависит от текущего момента времени. Естественная реализация — вызвать `Date.now()` или `new Date()` прямо внутри коллбэка `useMemo`:

```tsx
const filteredApps = useMemo(() => {
  if (!appsQuery.data) return undefined;
  const now = Date.now();                      // ← здесь
  const fromTs = now - PERIOD_DAYS[period] * DAY;
  return appsQuery.data.filter((a) => /* ... */);
}, [appsQuery.data, period]);
```

ESLint падает с правилом `react-hooks/purity`:
> `Date.now` is an impure function. Calling an impure function can produce unstable results that update unpredictably when the component happens to re-render.

Это не косметика. Логика правила:
- `useMemo` должен быть **детерминированной функцией от своих deps**. Один и тот же набор `deps` обязан давать одинаковый результат
- `Date.now()` возвращает разное число при каждом вызове. Если React Compiler решит мемоизировать вычисление (с тем же `deps`) или повторить рендер ради concurrent-фичей, результат «прыгнет» относительно того, что компонент показывал секундой раньше
- Особенно опасно, когда от этого мемо зависят дальнейшие мемо (`kpiData`, `trendData`, `recentApps`, ...): «дрейф» текущего времени каскадно ломает идентичность объектов и инвалидирует другие мемо без видимой причины

То же самое касается `new Date()`, `Math.random()`, `crypto.randomUUID()` и любого другого внешнего источника.

## Решение
**Поднять текущий timestamp в состояние компонента, инициализировать один раз, обновлять явно по действию пользователя.**

```tsx
const [nowTs, setNowTs] = useState<number>(() => Date.now()); // ← инициализация один раз
```

Дальше каждое мемо берёт `nowTs` из деп-листа:

```tsx
const filteredApps = useMemo(() => {
  if (!appsQuery.data) return undefined;
  const fromTs = period === "today"
    ? startOfDay(nowTs)
    : nowTs - PERIOD_DAYS[period] * DAY;
  return appsQuery.data.filter((a) => new Date(a.createdAt).getTime() >= fromTs);
}, [appsQuery.data, period, nowTs]);
```

Обновление — только из явного действия пользователя (на странице это кнопка Обновить):

```tsx
const handleRefresh = () => {
  if (refreshing) return;
  setRefreshing(true);
  setNowTs(Date.now());                       // ← синхронизируем время
  void Promise.all([
    appsQuery.refetch(),
    partnersQuery.refetch(),
    clientsQuery.refetch(),
  ]);
  window.setTimeout(() => setRefreshing(false), 600);
};
```

Тот же приём для подзаголовка-даты:

```tsx
const subtitleLabel = useMemo(
  () => capitalize(formatDate(new Date(nowTs), "EEEE, d MMMM yyyy")),
  [nowTs],
);
```

`new Date(nowTs)` — это **чистый конструктор** от числа, не источник нового значения. Импурой остаётся только сам `Date.now()`, который мы вызвали один раз на инициализации и один раз в обработчике.

## Принципы
- **Внешние недетерминированные источники — это эффекты, а не вычисления.** Им место в `useState` (инициализатор), `useEffect` (подписка на тики), `useSyncExternalStore` (внешний store) или прямо в event handler — не в `useMemo` и не в теле рендера
- **Если значению нужна свежесть по таймеру (часы реального времени) — используйте `setInterval` в `useEffect` и обновляйте state.** Не пытайтесь «оживить» мемо постоянным вызовом `Date.now()`
- **Деривы по времени стабильнее, чем нативные часы.** Хранение `nowTs` снапшотом и пересчёт мемо при `setNowTs` — это контролируемый «слой времени» страницы. Кнопка Обновить становится единственной точкой управления; пользователь явно решает «зафиксировать новый снимок»
- **Тестируемость:** мемо детерминированно от `nowTs`. В тесте можно подсунуть фиксированное число и проверять выходы

## Чего не делать
- ❌ Подавлять правило `// eslint-disable-next-line react-hooks/purity`. Это снимает предупреждение, но не чинит источник нестабильности — мемо так и будет выдавать разные результаты на одинаковых deps
- ❌ Втыкать `Date.now()` в зависимости (`}, [appsQuery.data, period, Date.now()])`) — React всё равно перепроверит deps по `Object.is`, два разных числа = всегда «изменилось» = `useMemo` бесполезен (превращается в обычный вызов на каждый рендер)
- ❌ Хранить `now` в `useRef` и читать в мемо. `useRef.current` не входит в deps, React не пересчитает мемо при изменении рефа — получится stale-замыкание
- ❌ Использовать `Date.now()` в инициализаторе ВНУТРИ модуля (на верхнем уровне `.tsx`-файла). Это «зафиксирует» время **первой загрузки модуля** для всех инстансов страницы. Должно быть инициализатором `useState`, который выполняется per-mount
- ❌ Тот же грех с `Math.random()`/`crypto.randomUUID()` для генерации ключей внутри `useMemo`/рендера. Стабильные id должны приходить от данных (`item.id`) или генерироваться один раз в `useState`
