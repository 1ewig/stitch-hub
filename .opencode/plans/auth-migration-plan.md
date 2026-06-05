# Auth Migration Plan: NextAuth → Supabase Auth

## Overview

Replace NextAuth v5 beta (Credentials provider, JWT sessions, Drizzle adapter) with Supabase's built-in auth (email/password). The database already runs on Supabase PostgreSQL.

---

## Files to Touch

| File | Action | Why |
|------|--------|-----|
| `package.json` | Edit deps | Remove `next-auth`, `@auth/drizzle-adapter`, `bcryptjs`. Add `@supabase/supabase-js`, `@supabase/ssr` |
| `.env` | Edit | Remove `AUTH_SECRET`. Add `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY` |
| `src/app/auth/auth.ts` | **Delete** | Core NextAuth config — no longer needed |
| `src/app/api/auth/[...nextauth]/route.ts` | **Delete** | NextAuth API route — no longer needed |
| `src/app/auth/signup/register.ts` | **Delete** | Server action that hashes passwords with bcrypt — Supabase handles this |
| `src/app/auth/login/page.tsx` | Edit | Remove useAuth, use new Supabase-based auth hook |
| `src/app/layout.tsx` | Edit | Replace `<SessionProvider>` with `<SupabaseProvider>` |
| `src/app/api/agent/route.ts` | Edit | Replace `auth()` wrapper with Supabase server client |
| `src/proxy.ts` | Edit | Replace NextAuth `auth()` middleware with Supabase server client |
| `src/hooks/useAuth.ts` | **Rewrite** | Replace NextAuth `signIn` with `supabase.auth.signInWithPassword()` and `signUp()` |
| `src/hooks/useNavbar.ts` | Edit | Replace `useSession()`/`signOut()` with Supabase equivalent |
| `src/db/schema.ts` | Edit | Remove `password` from users table, add auth_users_id reference, drop `accounts`/`sessions` tables |
| `src/db/index.ts` | No change | Already connects to Supabase PG — stays as is |
| `src/components/auth/AuthForm.tsx` | No change | Pure UI — no auth logic |
| `src/components/auth/AuthInput.tsx` | No change | Pure UI |
| `src/components/auth/AuthAlert.tsx` | No change | Pure UI |
| `src/components/auth/AuthBrandHeader.tsx` | No change | Pure UI |
| `src/components/Navbar.tsx` | No change | Already uses `useNavbar` hook — swap is internal |

### New files to create

| File | Purpose |
|------|---------|
| `src/utils/supabase/client.ts` | Supabase browser client (singleton) |
| `src/utils/supabase/server.ts` | Supabase server client (per-request, cookie-based) |
| `src/utils/supabase/middleware.ts` | Supabase client for middleware use |
| `src/providers/SupabaseProvider.tsx` | Client provider wrapping the app for session reactivity |
| `src/hooks/useSupabaseSession.ts` | Hook returning session + user, replacing `useSession()` |
| `src/db/migrations/0001_supabase_auth.sql` | SQL migration for schema changes |

---

## Detailed Steps

### 1. Install / Remove Dependencies
```bash
npm uninstall next-auth @auth/drizzle-adapter bcryptjs @types/bcryptjs
npm install @supabase/supabase-js @supabase/ssr
```

### 2. Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://yqsnerhfucwebmaweudf.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key-from-supabase-dashboard>
```
Remove `AUTH_SECRET`. Keep `DATABASE_URL` (still needed for Drizzle direct DB access).

### 3. Supabase Client Files
**`src/utils/supabase/client.ts`** — Browser client singleton used in client components and hooks.
**`src/utils/supabase/server.ts`** — Server client used in Server Components, Server Actions, Route Handlers. Reads cookies to get session.
**`src/utils/supabase/middleware.ts`** — Client specialized for middleware.ts (refreshes session cookie on every request).

### 4. Client Provider
**`src/providers/SupabaseProvider.tsx`** — wraps the app, subscribes to `supabase.auth.onAuthStateChange`, provides session to React context.

### 5. Hooks
**`src/hooks/useSupabaseSession.ts`** — returns `{ session, user, isLoading, signOut }` using the Supabase context. Replaces `next-auth/react`'s `useSession`.

**`src/hooks/useAuth.ts`** — rewrite to use:
- `supabase.auth.signInWithPassword({ email, password })` for login
- `supabase.auth.signUp({ email, password, options: { data: { name } } })` for registration
- `supabase.auth.signOut()` for logout

**`src/hooks/useNavbar.ts`** — swap imports from `next-auth/react` to `useSupabaseSession`.

### 6. Route Protection (Middleware)
The current `src/proxy.ts` uses NextAuth's `auth()` wrapper. Replace with `createServerClient` from `@supabase/ssr` that checks for session cookie.

Since Next.js docs recommend `proxy.ts` (not `middleware.ts`) for auth, we keep the file and swap the implementation.

### 7. API Route Protection
`src/app/api/agent/route.ts` — wrap with Supabase server client instead of NextAuth `auth()`:
```ts
const supabase = createServerClient(...)
const { data: { user } } = await supabase.auth.getUser()
if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
```

### 8. Database Schema Migration
**Drop tables:**
- `account` (NextAuth adapter table, unused)
- `session` (NextAuth adapter table, unused — Supabase Auth manages its own sessions)

**Modify `user` table:**
- Remove `password` column (Supabase Auth stores passwords securely in `auth.users`)
- Keep `id` as UUID (will match `auth.users.id`)
- Keep `name`, `email`, `image`, `role`, `createdAt`
- The `email` column can stay for quick lookups, or be removed and sourced from `auth.users`

**Create a DB trigger** (via Supabase SQL editor or migration):
```sql
-- Automatically create a public.user row when someone signs up via Supabase Auth
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public."user" (id, name, email, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'role', 'client')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```

### 9. Existing User Migration
Existing users with bcrypt passwords in the public `user` table cannot be directly imported into Supabase Auth (different hashing). Two options:

**Option A (Recommended):** Write a one-shot migration script that reads existing users and calls Supabase Admin API (`supabase.auth.admin.createUser()`) to recreate each user. This triggers the trigger above to populate the public user table.

**Option B:** Require all existing users to reset passwords (simpler but worse UX).

**Option C:** Import users with a preset password using the Admin API, then force a password change on first login.

### 10. Cleanup
- Delete `src/app/auth/auth.ts`
- Delete `src/app/api/auth/[...nextauth]/`
- Delete `src/app/auth/signup/register.ts`
- Update `src/app/auth/login/page.tsx` to use the new `useAuth` hook

---

## Order of Operations

| Step | Description | Risk |
|------|-------------|------|
| 1 | Install supabase packages | None |
| 2 | Add env vars | None |
| 3 | Create Supabase client files | None |
| 4 | Create SupabaseProvider + useSupabaseSession hook | None |
| 5 | Rewrite useAuth hook | Low (new code, unused until wired) |
| 6 | Update layout.tsx to use SupabaseProvider | Low |
| 7 | Update useNavbar.ts imports | Low |
| 8 | Update proxy.ts | Medium (auth gating) |
| 9 | Update API route agent/route.ts | Medium |
| 10 | Run DB migration (schema changes) | **High** (data-altering) |
| 11 | Delete old NextAuth files | None |
| 12 | Run user migration script | **High** |
| 13 | Remove old deps | Low |
| 14 | Test: sign up, sign in, protected routes, API | Critical |

---

## Rollback Plan
- Keep `AUTH_SECRET` in .env but commented out during transition
- Keep NextAuth files in place (don't delete until confident)
- DB migration is additive first (add trigger, THEN drop old columns/tables once verified)
- If something breaks, swap back to NextAuth by reverting layout, proxy, hooks, and API route
