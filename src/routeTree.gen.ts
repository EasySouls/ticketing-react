/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const IndexLazyImport = createFileRoute('/')()
const TicketsIndexLazyImport = createFileRoute('/tickets/')()
const BoardsIndexLazyImport = createFileRoute('/boards/')()

// Create/Update Routes

const IndexLazyRoute = IndexLazyImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const TicketsIndexLazyRoute = TicketsIndexLazyImport.update({
  path: '/tickets/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/tickets/index.lazy').then((d) => d.Route))

const BoardsIndexLazyRoute = BoardsIndexLazyImport.update({
  path: '/boards/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/boards/index.lazy').then((d) => d.Route))

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/boards/': {
      preLoaderRoute: typeof BoardsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/tickets/': {
      preLoaderRoute: typeof TicketsIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexLazyRoute,
  BoardsIndexLazyRoute,
  TicketsIndexLazyRoute,
])

/* prettier-ignore-end */