This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Configuración del Proyecto - CifraClub Clone

## 1️⃣ Variables de Entorno

### Frontend: `.env.local`

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Redis (Upstash o local)
REDIS_URL=redis://localhost:6379
# O para Upstash:
# UPSTASH_REDIS_REST_URL=your_upstash_url
# UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Stripe (opcional)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_key
STRIPE_SECRET_KEY=your_stripe_secret
STRIPE_WEBHOOK_SECRET=your_webhook_secret

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Backend: `.env`

```bash
# Supabase
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Redis
REDIS_URL=redis://localhost:6379

# Server
PORT=3001
NODE_ENV=development

# CORS
ALLOWED_ORIGINS=http://localhost:3000
```

## 2️⃣ Configuración de Next.js

### `next.config.js`

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.supabase.co",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },
};

module.exports = nextConfig;
```

### `tailwind.config.ts`

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        chord: {
          background: "#fef3c7",
          text: "#92400e",
        },
      },
      fontFamily: {
        mono: ["var(--font-mono)"],
      },
    },
  },
  plugins: [],
};
export default config;
```

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "paths": {
      "@/*": ["./*"],
      "@/components/*": ["./components/*"],
      "@/lib/*": ["./lib/*"],
      "@/types/*": ["./types/*"],
      "@/styles/*": ["./styles/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

## 3️⃣ Configuración de Supabase

### `lib/supabase/client.ts` (Client-side)

```typescript
import { createBrowserClient } from "@supabase/ssr";
import { Database } from "@/types/database.types";

export const createClient = () =>
  createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
```

### `lib/supabase/server.ts` (Server-side)

```typescript
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { cookies } from "next/headers";
import { Database } from "@/types/database.types";

export const createClient = () => {
  const cookieStore = cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options });
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: "", ...options });
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );
};
```

### `middleware.ts` (Auth Middleware)

```typescript
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    }
  );

  await supabase.auth.getUser();

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

## 4️⃣ Configuración de Redis

### `lib/redis.ts`

```typescript
import { Redis } from "@upstash/redis";

// Para Upstash Redis
export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

// O para Redis local (usando ioredis)
// import Redis from 'ioredis'
// export const redis = new Redis(process.env.REDIS_URL!)

// Utilidades de caché
export const CACHE_KEYS = {
  cifra: (id: string) => `cifra:${id}`,
  artist: (slug: string) => `artist:${slug}`,
  search: (query: string) => `search:${query}`,
  trending: () => "trending:cifras",
  popular: () => "popular:artists",
};

export const CACHE_TTL = {
  cifra: 60 * 60, // 1 hora
  artist: 60 * 60 * 24, // 1 día
  search: 60 * 5, // 5 minutos
  trending: 60 * 15, // 15 minutos
};
```

## 5️⃣ Tipos de TypeScript

### `types/database.types.ts` (Generar con Supabase CLI)

```typescript
// Este archivo se genera automáticamente con:
// npx supabase gen types typescript --project-id your-project-id > types/database.types.ts

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          username: string;
          full_name: string | null;
          avatar_url: string | null;
          bio: string | null;
          instrument: string | null;
          skill_level: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          username: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          instrument?: string | null;
          skill_level?: string | null;
        };
        Update: {
          username?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          bio?: string | null;
          instrument?: string | null;
          skill_level?: string | null;
        };
      };
      // ... otros tipos
    };
  };
}
```

### `types/cifra.ts`

```typescript
export interface Cifra {
  id: string;
  artist_id: string;
  title: string;
  slug: string;
  content: string;
  original_key: string;
  difficulty: "facil" | "intermedio" | "dificil";
  views_count: number;
  favorites_count: number;
  rating: number;
  has_video: boolean;
  video_url: string | null;
  created_by: string;
  status: "draft" | "published" | "rejected";
  created_at: string;
  updated_at: string;
  artist?: Artist;
}

export interface Artist {
  id: string;
  name: string;
  slug: string;
  bio: string | null;
  image_url: string | null;
  country: string | null;
  genre: string[];
  verified: boolean;
  cifras_count: number;
  created_at: string;
}

export interface ChordLine {
  chords: string[];
  lyrics: string;
  positions: number[];
}

export interface ParsedCifra {
  lines: ChordLine[];
  chords: string[];
  key: string;
}
```

## 6️⃣ Configuración de Zustand Stores

### `lib/stores/player-store.ts`

```typescript
import { create } from "zustand";

interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  speed: number;
  autoScroll: boolean;
  scrollSpeed: number;

  setIsPlaying: (isPlaying: boolean) => void;
  setCurrentTime: (time: number) => void;
  setDuration: (duration: number) => void;
  setVolume: (volume: number) => void;
  setSpeed: (speed: number) => void;
  toggleAutoScroll: () => void;
  setScrollSpeed: (speed: number) => void;
  reset: () => void;
}

export const usePlayerStore = create<PlayerState>((set) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 0.8,
  speed: 1.0,
  autoScroll: false,
  scrollSpeed: 1,

  setIsPlaying: (isPlaying) => set({ isPlaying }),
  setCurrentTime: (currentTime) => set({ currentTime }),
  setDuration: (duration) => set({ duration }),
  setVolume: (volume) => set({ volume }),
  setSpeed: (speed) => set({ speed }),
  toggleAutoScroll: () => set((state) => ({ autoScroll: !state.autoScroll })),
  setScrollSpeed: (scrollSpeed) => set({ scrollSpeed }),
  reset: () =>
    set({
      isPlaying: false,
      currentTime: 0,
      duration: 0,
      autoScroll: false,
    }),
}));
```

### `lib/stores/cifra-store.ts`

```typescript
import { create } from "zustand";
import { Cifra } from "@/types/cifra";

interface CifraState {
  currentCifra: Cifra | null;
  transpose: number;
  fontSize: number;
  showChords: boolean;

  setCurrentCifra: (cifra: Cifra) => void;
  setTranspose: (transpose: number) => void;
  resetTranspose: () => void;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  toggleChords: () => void;
}

export const useCifraStore = create<CifraState>((set) => ({
  currentCifra: null,
  transpose: 0,
  fontSize: 16,
  showChords: true,

  setCurrentCifra: (currentCifra) => set({ currentCifra, transpose: 0 }),
  setTranspose: (transpose) => set({ transpose }),
  resetTranspose: () => set({ transpose: 0 }),
  increaseFontSize: () =>
    set((state) => ({
      fontSize: Math.min(state.fontSize + 2, 24),
    })),
  decreaseFontSize: () =>
    set((state) => ({
      fontSize: Math.max(state.fontSize - 2, 12),
    })),
  toggleChords: () => set((state) => ({ showChords: !state.showChords })),
}));
```

### `lib/stores/user-store.ts`

```typescript
import { create } from "zustand";
import { User } from "@supabase/supabase-js";

interface UserState {
  user: User | null;
  profile: any | null;
  favorites: string[];

  setUser: (user: User | null) => void;
  setProfile: (profile: any) => void;
  addFavorite: (cifraId: string) => void;
  removeFavorite: (cifraId: string) => void;
  setFavorites: (favorites: string[]) => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: null,
  profile: null,
  favorites: [],

  setUser: (user) => set({ user }),
  setProfile: (profile) => set({ profile }),
  addFavorite: (cifraId) =>
    set((state) => ({
      favorites: [...state.favorites, cifraId],
    })),
  removeFavorite: (cifraId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== cifraId),
    })),
  setFavorites: (favorites) => set({ favorites }),
}));
```

## 7️⃣ Configuración del Backend (Express)

### `backend/src/index.ts`

```typescript
import express from "express";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";
import Redis from "ioredis";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Redis client
export const redis = new Redis(process.env.REDIS_URL!);

// Supabase client
export const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Middleware
app.use(helmet());
app.use(
  cors({
    origin: process.env.ALLOWED_ORIGINS?.split(",") || [
      "http://localhost:3000",
    ],
    credentials: true,
  })
);
app.use(express.json());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // limit each IP to 100 requests per windowMs
});
app.use("/api/", limiter);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Routes
app.use("/api/cifras", require("./routes/cifras"));
app.use("/api/artists", require("./routes/artists"));
app.use("/api/search", require("./routes/search"));

// Error handler
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  }
);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

## 8️⃣ Scripts útiles

### `package.json` scripts

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "supabase:types": "npx supabase gen types typescript --project-id your-project-id > types/database.types.ts",
    "db:migrate": "node scripts/migrate.ts",
    "db:seed": "node scripts/seed-db.ts"
  }
}
```

## 9️⃣ Docker Compose (para desarrollo local)

### `docker-compose.yml`

```yaml
version: "3.8"

services:
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis_data:/data
    command: redis-server --appendonly yes

volumes:
  redis_data:
```

## 🚀 Siguientes pasos

1. Crear la base de datos en Supabase
2. Ejecutar migraciones
3. Configurar autenticación
4. Crear componentes base UI
5. Implementar visor de cifras

¿Listo para empezar con la base de datos?
