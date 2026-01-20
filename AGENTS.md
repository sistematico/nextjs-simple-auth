# AGENTS.md

This file contains guidelines and commands for agentic coding agents working in this Next.js authentication project.

## Development Commands

### Core Commands
- `bun run dev` - Start development server (http://localhost:3000)
- `bun run build` - Build production version
- `bun run start` - Start production server
- `bun run lint` - Run Biome linter and formatter checks
- `bun run format` - Format code with Biome
- `bun run push` - Push Drizzle database schema changes

### Database Commands
- `bunx drizzle-kit push` - Push schema changes to database
- `bunx drizzle-kit generate` - Generate migrations
- `bunx drizzle-kit studio` - Open Drizzle Studio

### Testing
This project does not currently have tests configured. When adding tests:
- Use Jest or Vitest for unit/integration tests
- Use Playwright for E2E tests
- Place test files in `__tests__/` or `*.test.ts` alongside source files

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── (auth)/         # Auth route group
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # Reusable React components
│   └── auth/          # Authentication components
├── actions/           # Server actions
├── schemas/           # Zod validation schemas
└── db/               # Database configuration and schema
```

## Code Style Guidelines

### General Principles
- Use TypeScript for all new code
- Keep components small and focused
- Prefer server components over client components
- Use server actions for form submissions and mutations

### Import Style
- Use absolute imports with `@/` prefix for internal modules
- Group imports: external libraries first, then internal modules
- Use `type` imports for types only: `import type { Metadata } from "next"`
- Example:
```typescript
import Link from 'next/link';
import { signup } from "@/actions/auth";
import type { FormState } from "@/schemas/auth";
```

### Component Guidelines
- Use PascalCase for component names
- Client components must start with `"use client";`
- Use function declarations with proper typing:
```typescript
export default function SignupForm() {
  // component logic
}
```

- Props interface should be Readonly:
```typescript
interface Props {
  children: React.ReactNode;
}

export default function Component({
  children,
}: Readonly<Props>) {
  return <div>{children}</div>;
}
```

### Server Actions
- Place in `src/actions/` directory
- Use proper TypeScript typing with FormState
- Return validation errors in consistent format:
```typescript
export async function signup(state: FormState, formData: FormData) {
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Business logic here
}
```

### Schema Validation
- Use Zod for all validation
- Place schemas in `src/schemas/`
- Export types for FormState:
```typescript
export const SignupFormSchema = z.object({
  name: z.string().min(2).trim(),
  email: z.email().trim(),
  password: z.string().min(8).regex(/[a-zA-Z]/),
});

export type FormState = {
  errors?: {
    name?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
} | undefined;
```

### Database
- Use Drizzle ORM with SQLite
- Schema definitions in `src/db/schema.ts`
- Use proper column types and constraints
- Export table definitions for use in queries

### Styling
- Use Tailwind CSS classes
- Prefer utility classes over custom CSS
- Use responsive design patterns
- Follow BEM-like naming for custom CSS classes if needed

### Error Handling
- Use consistent error return format in server actions
- Display validation errors inline with form fields
- Use proper error boundaries in React components
- Handle async errors properly with try/catch

### File Naming
- Use PascalCase for components: `SignupForm.tsx`
- Use camelCase for utilities: `authUtils.ts`
- Use kebab-case for pages: `cadastro/page.tsx`
- Keep file names descriptive but concise

### TypeScript Configuration
- Strict mode enabled
- Use proper type annotations
- Avoid `any` type - use proper typing or `unknown`
- Use interface for object shapes, type for primitives/unions

### Linting and Formatting
- Use Biome for linting and formatting
- 2-space indentation
- Single quotes for strings
- No semicolons (Biome preference)
- Run `bun run lint` before committing

## Environment Variables
- Database file: `DB_FILE_NAME`
- Use `.env` for local development
- Use `.env.production` for production
- Never commit secrets to repository

## Authentication Flow
- Use Next.js App Router for auth routes
- Implement proper form validation with Zod
- Use server actions for form processing
- Store JWT tokens securely (httpOnly cookies recommended)
- Implement proper error handling and user feedback

## Adding New Features
1. Create/update Zod schemas in `src/schemas/`
2. Add server actions in `src/actions/`
3. Create components in `src/components/`
4. Add pages in `src/app/`
5. Update database schema if needed
6. Test thoroughly before committing