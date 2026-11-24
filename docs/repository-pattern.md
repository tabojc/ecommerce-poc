# Patrón Repositorio para E-commerce PoC

## ¿Por qué usamos repositorios sin ORM?

En esta PoC, **no usamos un ORM** (Drizzle, Prisma, etc.) y, en cambio, **implementamos el patrón repositorio**.

### Beneficios clave

1. **Abstracción del data source**: Nuestra lógica de negocio solo depende de interfaces, no de Cloudflare D1.
2. **Testabilidad**: Podemos inyectar mocks en las pruebas unitarias.
3. **Fácil intercambio de backend**: Si el cliente pide migrar a PostgreSQL, solo cambiamos la implementación.
4. **Control total del SQL**: Usamos prepared statements de SQLite/D1 sin capa extra.

---

## Estructura actual

```
src/lib/db/
├── interfaces.ts   → Contratos (ProductRepository, OrderRepository)
└── d1.ts           → Implementaciones con D1
```

### interfaces.ts (Contratos)

```typescript
export interface ProductRepository {
  getAll(): Promise<Product[]>;
  getById(id: number): Promise<Product | null>;
  getByCategory(category: string): Promise<Product[]>;
}

export interface OrderRepository {
  create(data: {...}): Promise<Order>;
  getItemsByOrderId(orderId: number): Promise<OrderItem[]>;
}
```

### d1.ts (Implementaciones Cloudflare D1)

```typescript
export class D1ProductRepository implements ProductRepository {
  constructor(private db: D1Database) {}
  // ...
}

export class D1OrderRepository implements OrderRepository {
  constructor(private db: D1Database) {}
  // ...
}
```

---

## Cómo se inyecta

En los endpoints de API, usamos un helper para obtener los repositorios desde el entorno Cloudflare:

```typescript
import { env } from 'cloudflare:workers';
import { D1ProductRepository, D1OrderRepository } from '@/lib/db/d1';

const productRepo = new D1ProductRepository(env.DB);
const orderRepo = new D1OrderRepository(env.DB);
```

Esto mantiene el código limpio y permite testear con mocks.

---

## Reglas para mantener este patrón

1. **Nunca** importar `D1Database` en componentes o páginas directamente.
2. **Siempre** usar interfaces para acceder a datos.
3. Si se necesita un nuevo query complejo, implementarlo dentro del repositorio correspondiente.
4. Si el backend cambia, solo se cambia la implementación.

---

## Resumen

El patrón repositorio es fundamental para:
- ✅ Cambiar de D1 a otro backend sin tocar la lógica de negocio.
- ✅ Testear con mocks (TDD).
- ✅ Mantener el código limpio y enfocado.