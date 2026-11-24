# E-commerce PoC — Cloudflare Free Tier

Un Proof of Concept de e-commerce 100% en Cloudflare ($0/mes).

## Stack

- **Framework:** Astro (SSR, `@astrojs/cloudflare`)
- **UI:** Tailwind CSS + Vanilla TypeScript + Web Components
- **Database:** Cloudflare D1 (SQLite)
- **Storage:** Cloudflare R2 (imágenes de productos)
- **Cart:** Client-side (`localStorage`) + Nano Stores (sin writes al servidor hasta checkout)
- **TypeScript:** Estricto
- **ORM:** No (raw SQL con prepared statements)
- **Arquitectura:** Patrón Repositorio (interfaces + implementaciones)

## Propósito

Demostrar una arquitectura limpia y desacoplada para un e-commerce que:
- Corre en el tier gratuito de Cloudflare
- Es fácil de intercambiar backends (D1 → PostgreSQL, R2 → S3)
- Es testable (inyección de mocks en tests unitarios)
- Tiene control de errores robusto en producción (sin leaks de stack trace al usuario)

## Estructura del Proyecto

```
src/
├── lib/
│   ├── db/
│   │   ├── interfaces.ts   → Contratos (ProductRepository, OrderRepository)
│   │   └── d1.ts           → Implementaciones con Cloudflare D1
│   ├── storage/
│   │   ├── interfaces.ts   → Contrato ImageStorage
│   │   └── r2.ts           → Implementación con R2
│   └── cart.ts             → Estado del carrito (Nano Stores + localStorage)
├── pages/
│   ├── api/
│   │   └── health.ts       → Health check (D1 + R2)
│   └── index.astro
└── components/             → Web Components (product-card, cart-drawer, etc.)
```

## Funcionalidades Planificadas

- [x] Health check endpoint (`/api/health`)
- [ ] Listado de productos (`GET /api/products`)
- [ ] Detalle de producto (`GET /api/products/:id`)
- [ ] Carrito client-side (localStorage + Nano Stores)
- [ ] Checkout endpoint (`POST /api/checkout`)
- [ ] Páginas SSR (index, shop, product, cart, checkout)
- [ ] Web Components (product-card, cart-drawer, cart-icon)
- [ ] Manejo de errores production-safe

## Setup Rápido

```bash
# Instalar dependencias
npm install

# Configurar Cloudflare
cp .env.example .dev.vars
# Editar .dev.vars con tus secrets locales

# Crear base de datos D1
wrangler d1 create ecommerce-poc

# Aplicar migración
wrangler d1 execute ecommerce-poc --file migrations/001_initial.sql

# Crear bucket R2
wrangler r2 create ecommerce-poc-images

# Ejecutar
npm run dev
```

## Health Check

```bash
curl http://localhost:4321/api/health
```

## Documentación

- [Patrón Repositorio](docs/repository-pattern.md)