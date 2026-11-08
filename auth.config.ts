import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
  // Needed for `next start` / self-hosting; Vercel and `next dev` trust the
  // host automatically.
  trustHost: true,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    // Runs in proxy.ts for every matched request.
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        // Returning false sends visitors to /login?callbackUrl=...
        return isLoggedIn;
      }
      if (
        isLoggedIn &&
        (nextUrl.pathname === '/login' || nextUrl.pathname === '/signup')
      ) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  // Providers are added in auth.ts (they need Node-only modules).
  providers: [],
} satisfies NextAuthConfig;
