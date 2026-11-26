# Development Roadmap — High-Level Software Factory

> Modelo de negocio: **SaaS multi-tenant** (una instancia, muchos clientes, setup + mensualidad, sin entregar código fuente).
> Objetivo actual: PoC de landing + demo para validar con stakeholder antes de construir el flujo SaaS completo.

## Current Status (PoC Objective 1)

- ✅ Landing page con hero, demo CTAs, y pitch de valor
- ✅ Build pasa (`npm run build`)
- ✅ Dev server inicia limpio (`npm run dev`)
- ✅ Esqueleto e-commerce: productos CRUD, carrito client-side, esquema de órdenes en D1, campos de pago, soft-delete
- ⏳ Esperando aprobación explícita del stakeholder (Jesus David) antes de construir flujos SaaS profundos

## Modelo de Negocio Confirmado

- **Tipo:** SaaS multi-tenant (no white-label, no se entrega código)
- **Cobro:** Setup único + mensualidad recurrente por cliente
- **Infraestructura:** Una sola instancia en Cloudflare (D1 + R2 + Astro SSR)
- **Aislamiento:** Cada cliente es un "tenant" con sus propios productos, órdenes, clientes y pagos
- **Paneles:** Admin maestro (vos) + panel por cliente (dueño de restaurante/tienda)

## Quality Pillars Required for High-Level Software Factory

1. **Testing**
   - Unit: Vitest/Jest para libs, repositorios, API handlers (mock D1/R2).
   - Integration: flujos checkout/órdenes con BD de test.
   - E2E: Playwright/Cypress para flujos críticos de usuario.
   - Cobertura mínima: 80% por módulo; reporte en CI.

2. **CI/CD**
   - GitHub Actions: build + lint + typecheck en PR; bloquear merge si falla.
   - Deploy automático: Cloudflare Pages/Workers en merge a main.
   - Release: versionado semver, changelog, tag.

3. **Code Quality**
   - ESLint + Prettier + Husky pre-commit.
   - Reglas de complejidad, `no-unused-vars`, orden de imports.
   - Escaneo de seguridad (npm audit, secret scanning).

4. **Architecture & Contracts**
   - Manejo centralizado de errores + tipos de error personalizados.
   - Capa de validación (Zod/yup) en cada frontera de entrada.
   - Service layer + DI abstraction.
   - Contrato OpenAPI para APIs; docs generadas.

5. **Documentation**
   - ADRs para decisiones clave (Cloudflare Free Tier, Repository pattern, multi-tenancy).
   - Documentación de endpoints API + runbook de onboarding.

6. **Observability**
   - Logging estructurado + Sentry/error tracking.
   - Health check con conectividad D1/R2 + métricas.

7. **Security**
   - Rate limiting en endpoints de escritura/costosos.
   - Sanitización de inputs, políticas CORS, secret hygiene.
   - Aislamiento estricto de datos por tenant (RLS o tenant_id en todas las tablas).

8. **DevX & Change Management**
   - Automatización de setup D1/R2.
   - Plantilla de PR + enforcement de conventional commits.
   - Feature flags.

## Incremental Quick Wins (Bajo Riesgo de Regresión, Alto Valor)

| # | Quick Win | Por qué | Cuándo |
|---|-----------|---------|--------|
| 1 | **ESLint + Prettier + Husky** | Evita patrones inválidos como `this.shadowRoot?.innerHTML = ...` | Hacer ahora |
| 2 | **Vitest unit tests** | Para `src/lib/cart.ts` y métodos del repo de productos con D1 mock | Siguiente |
| 3 | **GitHub Actions CI** | Build + lint + typecheck en PR; bloquear merge si falla | Siguiente |
| 4 | **ADR + API doc** | Capturar decisiones Cloudflare/Repository; listar endpoints en README | Siguiente |
| 5 | **Multi-tenancy schema** | Agregar `tenant_id` a tablas críticas (products, orders, etc.) | Después de aprobar PO |

## Regression Guardrails (Mientras Espera Aprobación del Cliente)

- Mantener páginas/componentes existentes verdes: `npm run build` y `npm run dev` smoke check deben pasar tras cualquier cambio.
- Nunca reportar "OK/listo" sin resultados observados de verificación (build + tests + dev smoke check).
- Implementar quick wins libremente; evitar tocar flujos core (checkout, órdenes, pagos) hasta autorización del cliente.
- Documentar cada cambio en mensajes de commit con formato convencional (`feat`, `fix`, `docs`, `refactor`, `test`, `chore`).

## Next Steps

1. Implementar Quick Win #1: ESLint + Prettier + Husky.
2. Ejecutar `npm run build` + smoke check en dev.
3. Commit con mensaje convencional.
4. Esperar aprobación del cliente antes de profundizar en flujos SaaS (multi-tenancy, auth, billing).

---

*Última actualización: 2026-11-25 — Ajustado a modelo SaaS multi-tenant (setup + mensualidad, sin entrega de código).*