# FiltersContext - Generic Filters Context

Універсальний контекст для фільтрації будь-яких даних у вашому додатку.

## Особливості

- ✅ **Generic** - працює з будь-якими типами даних (продукти, користувачі, категорії і т.д.)
- ✅ **Type-safe** - повна підтримка TypeScript з generic типами
- ✅ **Flexible metadata** - можна додавати будь-які додаткові дані (бренди, ціновий діапазон, категорії)
- ✅ **No prop drilling** - дані доступні через контекст в будь-якому місці
- ✅ **Reusable** - один контекст для різних сутностей

## Використання

### 1. Базове використання з продуктами

```tsx
import { FiltersProvider, useFiltersContext } from '@/contexts/filters-context';
import { useProductFilters, ProductFilters } from '@/hooks/use-product-filters';
import { useProductMetadata, ProductMetadata } from '@/hooks/use-product-metadata';
import { Product } from '@/types/product';

// У батьківському компоненті
export function ProductsList({ products }: { products: Product[] }) {
  const { products: filteredProducts, ...filtersResult } = useProductFilters(products);
  const metadata = useProductMetadata(products);

  return (
    <FiltersProvider value={{ ...filtersResult, data: filteredProducts, metadata }}>
      <ProductsContent />
    </FiltersProvider>
  );
}

// У дочірніх компонентах
function ProductsContent() {
  const { data, filters, onFilterChange, metadata } = useFiltersContext<
    Product,
    ProductFilters,
    ProductMetadata
  >();

  return (
    <div>
      <SearchInput
        value={filters.search}
        onChange={(value) => onFilterChange('search', value)}
      />
      <ProductList products={data} />
    </div>
  );
}
```

### 2. Використання для інших сутностей (наприклад, користувачів)

```tsx
import { FiltersProvider, useFiltersContext } from '@/contexts/filters-context';
import { useUserFilters, UserFilters } from '@/hooks/use-user-filters';

interface User {
  id: string;
  name: string;
  role: string;
}

interface UserMetadata {
  roles: string[];
  departments: string[];
}

export function UsersList({ users }: { users: User[] }) {
  const { users: filteredUsers, ...filtersResult } = useUserFilters(users);
  const metadata = useUserMetadata(users);

  return (
    <FiltersProvider value={{ ...filtersResult, data: filteredUsers, metadata }}>
      <UsersContent />
    </FiltersProvider>
  );
}

function UsersContent() {
  const { data, filters, metadata } = useFiltersContext<User, UserFilters, UserMetadata>();

  return (
    <div>
      {/* Використовуйте data, filters, metadata */}
    </div>
  );
}
```

## API

### FiltersContextValue<TData, TFilters, TMetadata>

```typescript
interface FiltersContextValue<TData = any, TFilters = any, TMetadata = any> {
  // Основні поля фільтрації
  filters: TFilters;            // Поточні фільтри
  data: TData[];                // Відфільтровані дані
  total: number;                // Кількість відфільтрованих елементів

  // Функції управління
  onFilterChange: (key: string, value: any) => void;  // Зміна фільтра
  reset: () => void;                                   // Скидання всіх фільтрів
  hasActiveFilters: boolean;                          // Чи є активні фільтри

  // Додаткові метадані (опціонально)
  metadata?: TMetadata;         // Додаткові дані (бренди, категорії і т.д.)
}
```

### FiltersProvider

```typescript
interface FiltersProviderProps<TData, TFilters, TMetadata> {
  value: FiltersContextValue<TData, TFilters, TMetadata>;
  children: ReactNode;
}
```

### useFiltersContext

```typescript
function useFiltersContext<TData, TFilters, TMetadata>():
  FiltersContextValue<TData, TFilters, TMetadata>
```

## Переваги

1. **Немає дублювання коду** - один контекст для всіх типів фільтрів
2. **Type-safe** - TypeScript автоматично виводить типи
3. **Легко розширювати** - просто додайте нові поля в metadata
4. **Тестується** - легко тестувати компоненти, які використовують контекст
5. **Продуктивність** - не потрібно передавати props через багато рівнів компонентів
