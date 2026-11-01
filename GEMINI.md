# GEMINI.md

## Framework & Environment
- **Next.js Version:** Next.js 16 (`^16.2.x`) with React 19.
- **Edge Routing & Request Interception:** In Next.js 16, edge request handling and route guarding are implemented strictly via `proxy.ts` at the workspace root, exporting `export async function proxy(request: NextRequest)`.
  - **CRITICAL:** Do NOT rename `proxy.ts` to `middleware.ts`. Do NOT introduce `middleware.ts`. Next.js 16 uses `proxy.ts`.
  - All auth session cookie refreshes, edge redirects, and protected route prefixes (`/home`, `/dashboard`, `/analytics`, `/history`, `/create`, `/session`) live in `proxy.ts`.

## Engineering Architecture & First Principles
- **Server-First Reality:** `page.tsx` is always a Server Component. Data is fetched on the server in parallel using `Promise.all()`.
- **Client Components:** Pushed to the leaf edges solely for interactive state (`"use client"`).
- **Mutations:** Route strictly through Next.js Server Actions with auth checks, Zod validation, database mutations, and revalidation.
- **Zero Latency:** Perceived latency must be 0ms via `useOptimistic` for user actions.
- **No useEffect for Data Sync:** Never fetch initial data or duplicate server data inside client `useEffect`.

