# Confesión Bautista de Fe de 1689 — Next.js Monolito (Base)

Este PR migra la base a Next.js (App Router) con TypeScript estricto, Biome y CI básico.

## Requisitos
- Node.js 20+
- npm 10+

## Scripts
- `npm run dev`: Inicia el servidor de desarrollo (http://localhost:3000)
- `npm run build`: Compila para producción
- `npm start`: Sirve la build de producción
- `npm run typecheck`: TypeScript estricto sin emitir
- `npm run lint`: Linter/formateo con Biome
- `npm run cli -- validate-content`: Valida el contenido Markdown inicial

## Estructura
- `src/app`: Rutas (App Router)
- `content/confession/es`: Contenido Markdown (ejemplo)
- `scripts/confesion-cli.ts`: CLI simple para tareas operativas
- `prisma/schema.prisma`: Esquema de datos base (futuro)
- `.github/workflows/ci.yml`: CI de typecheck/lint/build

## Variables de entorno
Ver `.env.example` para los placeholders. Aún no son necesarias para ejecutar el entorno local básico.

## Próximos pasos
- Añadir PWA y búsqueda
- Integrar Auth.js + Prisma
- Panel de administración básico
