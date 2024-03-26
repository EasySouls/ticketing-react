import { createRootRouteWithContext, Outlet } from '@tanstack/react-router';
import Header from '../components/Header';
import React, { Suspense } from 'react';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

const TanStackRouterDevtools =
  import.meta.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: () => (
      <>
        <Header />
        <Outlet />
        <Suspense>
          <TanStackRouterDevtools />
          <ReactQueryDevtools />
        </Suspense>
        <Toaster />
      </>
    ),
  },
);
