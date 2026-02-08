import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // 1. Refresh session if exists
  const { data: { session } } = await supabase.auth.getSession();

  const url = req.nextUrl.clone();

  // 2. Check if we have a code but are NOT on the callback route
  if (url.searchParams.has('code') && url.pathname !== '/auth/callback') {
    const code = url.searchParams.get('code');
    const next = url.pathname;
    const callbackUrl = new URL('/auth/callback', req.url);
    callbackUrl.searchParams.set('code', code!);
    callbackUrl.searchParams.set('next', next);
    return NextResponse.redirect(callbackUrl);
  }

  // 3. Route Protection (Server-Side)
  const isProtectedRoute = url.pathname.startsWith('/dashboard') || url.pathname.startsWith('/onboarding');
  const isApiRoute = url.pathname.startsWith('/api') && !url.pathname.startsWith('/api/public');
  const isAuthRoute = url.pathname.startsWith('/auth');
  const isCallbackRoute = url.pathname === '/auth/callback';

  if (!session) {
    if (isProtectedRoute) {
      const loginUrl = new URL('/auth/login', req.url);
      loginUrl.searchParams.set('next', url.pathname);
      return NextResponse.redirect(loginUrl);
    }
    if (isApiRoute) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
  } else {
    // Session exists - fetch profile if accessing dashboard
    if (url.pathname.startsWith('/dashboard')) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarded, org_id')
        .eq('id', session.user.id)
        .maybeSingle();

      if (!profile || !profile.onboarded || !profile.org_id) {
        console.log('Middleware: Redirecting to onboarding from dashboard');
        return NextResponse.redirect(new URL('/onboarding', req.url));
      }
    }

    // If logged in and trying to access non-callback auth pages (login/signup)
    if (isAuthRoute && !isCallbackRoute) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('onboarded, org_id')
        .eq('id', session.user.id)
        .maybeSingle();

      if (!profile || !profile.onboarded || !profile.org_id) {
        return NextResponse.redirect(new URL('/onboarding', req.url));
      } else {
        return NextResponse.redirect(new URL('/dashboard/overview', req.url));
      }
    }
  }

  return res;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
