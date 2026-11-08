import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

// Next.js 16 renamed "middleware" to "proxy".
export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/signup'],
};
