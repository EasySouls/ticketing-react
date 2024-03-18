import { createRootRoute, Outlet } from '@tanstack/react-router';
import Header from '../components/Header';
import React, { Suspense } from 'react';

const TanStackRouterDevtools =
  import.meta.env.NODE_ENV === 'production'
    ? () => null
    : React.lazy(() =>
        import('@tanstack/router-devtools').then((res) => ({
          default: res.TanStackRouterDevtools,
        })),
      );

export const Route = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <Suspense>
        <TanStackRouterDevtools />
      </Suspense>
    </>
  ),
});
