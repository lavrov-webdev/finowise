# План реализации метода findTransactions

## Описание задачи
Необходимо создать универсальный endpoint и метод `findTransactions` для получения списка транзакций с гибкой системой фильтрации. В дальнейшем этот метод заменит существующие методы `findBySprint` и `findAll`.

## План реализации

### 1. Создание DTO для фильтрации

Создать файл `server/src/transactions/dto/filter-transactions.dto.ts`:

#### Поля DTO:
- `sprintId?: number` - фильтр по спринту
- `categoryId?: number` - фильтр по категории
- `envelopeId?: number` - фильтр по конверту
- `dateFrom?: Date` - начальная дата диапазона
- `dateTo?: Date` - конечная дата диапазона
- `amountMin?: number` - минимальная сумма
- `amountMax?: number` - максимальная сумма
- `comment?: string` - поиск по комментарию (частичное совпадение)
- `orderBy?: string` - поле для сортировки (date, amount, id и т.д.)
- `orderDirection?: 'asc' | 'desc'` - направление сортировки
- `limit?: number` - количество записей на страницу
- `offset?: number` - смещение для пагинации

### 2. Создание метода в сервисе

В файле `server/src/transactions/transactions.service.ts` добавить:

```typescript
async findTransactions(
  filterDto: FilterTransactionsDto,
  userId: number
): Promise<TransactionDetailedResponseDto[]>
```

#### Функциональность метода:
- Динамическое построение объекта `where` на основе переданных фильтров
- Обязательная фильтрация по `userId` для безопасности
- Поддержка диапазонов для дат и сумм
- Поиск по подстроке в комментариях (LIKE)
- Динамическая сортировка
- Пагинация через limit/offset
- Include для связанных данных (category, envelope)

### 3. Создание endpoint в контроллере

В файле `server/src/transactions/transactions.controller.ts`:

#### Варианты реализации:
- **GET /transactions/search** - параметры через query string
- **POST /transactions/search** - параметры через body (предпочтительно для сложных фильтров)

#### Особенности:
- Использовать декоратор `@UseGuards(JwtAuthGuard)` для авторизации
- Автоматически извлекать `userId` из JWT токена
- Валидация входных данных через class-validator

### 4. Рефакторинг существующих методов

#### Метод `findBySprint`:
```typescript
findBySprint(userId: number, sprintId: number) {
  return this.findTransactions(
    { 
      sprintId, 
      orderBy: 'date', 
      orderDirection: 'desc' 
    }, 
    userId
  );
}
```

#### Метод `findAll`:
```typescript
findAll(userId: number) {
  return this.findTransactions(
    { 
      orderBy: 'date', 
      orderDirection: 'desc' 
    }, 
    userId
  );
}
```

### 5. Дополнительные улучшения

#### 5.1 Расширенные возможности:
- Параметр `include` для выбора включаемых связей
- Полнотекстовый поиск по комментариям
- Группировка результатов (по категориям, датам)
- Агрегация (сумма, среднее, количество)

#### 5.2 Оптимизация:
- Индексы в БД для часто используемых фильтров
- Кеширование результатов
- Ограничение максимального limit для защиты от перегрузки

### 6. Тестирование

#### Unit-тесты:
- Тест каждого типа фильтра отдельно
- Тест комбинаций фильтров
- Тест граничных случаев
- Тест безопасности (доступ только к своим транзакциям)

#### Интеграционные тесты:
- Тест полного flow через API
- Тест производительности с большим объемом данных
- Тест пагинации

## Примеры использования

### Получить транзакции за период:
```json
POST /transactions/search
{
  "dateFrom": "2024-01-01",
  "dateTo": "2024-01-31",
  "orderBy": "amount",
  "orderDirection": "desc"
}
```

### Получить транзакции по категории с пагинацией:
```json
POST /transactions/search
{
  "categoryId": 5,
  "limit": 20,
  "offset": 40
}
```

### Поиск по комментарию:
```json
POST /transactions/search
{
  "comment": "продукты",
  "amountMin": 1000
}
```

## Преимущества решения

1. **Универсальность** - один метод для всех видов фильтрации
2. **Расширяемость** - легко добавить новые фильтры
3. **Производительность** - оптимизированные запросы к БД
4. **Безопасность** - автоматическая фильтрация по userId
5. **Совместимость** - существующие endpoints продолжат работать 