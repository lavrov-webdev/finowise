/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as IndexImport } from './routes/index'
import { Route as TransactionsCreateIndexImport } from './routes/transactions/create/index'
import { Route as SprintsCurrentIndexImport } from './routes/sprints/current/index'
import { Route as SprintsSprintIdIndexImport } from './routes/sprints/$sprintId/index'

// Create Virtual Routes

const SprintsIndexLazyImport = createFileRoute('/sprints/')()
const CategoriesIndexLazyImport = createFileRoute('/categories/')()
const SprintsCreateIndexLazyImport = createFileRoute('/sprints/create/')()

// Create/Update Routes

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const SprintsIndexLazyRoute = SprintsIndexLazyImport.update({
  path: '/sprints/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/sprints/index.lazy').then((d) => d.Route))

const CategoriesIndexLazyRoute = CategoriesIndexLazyImport.update({
  path: '/categories/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/categories/index.lazy').then((d) => d.Route),
)

const SprintsCreateIndexLazyRoute = SprintsCreateIndexLazyImport.update({
  path: '/sprints/create/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/sprints/create/index.lazy').then((d) => d.Route),
)

const TransactionsCreateIndexRoute = TransactionsCreateIndexImport.update({
  path: '/transactions/create/',
  getParentRoute: () => rootRoute,
} as any)

const SprintsCurrentIndexRoute = SprintsCurrentIndexImport.update({
  path: '/sprints/current/',
  getParentRoute: () => rootRoute,
} as any)

const SprintsSprintIdIndexRoute = SprintsSprintIdIndexImport.update({
  path: '/sprints/$sprintId/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/categories/': {
      id: '/categories/'
      path: '/categories'
      fullPath: '/categories'
      preLoaderRoute: typeof CategoriesIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/sprints/': {
      id: '/sprints/'
      path: '/sprints'
      fullPath: '/sprints'
      preLoaderRoute: typeof SprintsIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/sprints/$sprintId/': {
      id: '/sprints/$sprintId/'
      path: '/sprints/$sprintId'
      fullPath: '/sprints/$sprintId'
      preLoaderRoute: typeof SprintsSprintIdIndexImport
      parentRoute: typeof rootRoute
    }
    '/sprints/current/': {
      id: '/sprints/current/'
      path: '/sprints/current'
      fullPath: '/sprints/current'
      preLoaderRoute: typeof SprintsCurrentIndexImport
      parentRoute: typeof rootRoute
    }
    '/transactions/create/': {
      id: '/transactions/create/'
      path: '/transactions/create'
      fullPath: '/transactions/create'
      preLoaderRoute: typeof TransactionsCreateIndexImport
      parentRoute: typeof rootRoute
    }
    '/sprints/create/': {
      id: '/sprints/create/'
      path: '/sprints/create'
      fullPath: '/sprints/create'
      preLoaderRoute: typeof SprintsCreateIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren({
  IndexRoute,
  CategoriesIndexLazyRoute,
  SprintsIndexLazyRoute,
  SprintsSprintIdIndexRoute,
  SprintsCurrentIndexRoute,
  TransactionsCreateIndexRoute,
  SprintsCreateIndexLazyRoute,
})

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/categories/",
        "/sprints/",
        "/sprints/$sprintId/",
        "/sprints/current/",
        "/transactions/create/",
        "/sprints/create/"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/categories/": {
      "filePath": "categories/index.lazy.tsx"
    },
    "/sprints/": {
      "filePath": "sprints/index.lazy.tsx"
    },
    "/sprints/$sprintId/": {
      "filePath": "sprints/$sprintId/index.tsx"
    },
    "/sprints/current/": {
      "filePath": "sprints/current/index.tsx"
    },
    "/transactions/create/": {
      "filePath": "transactions/create/index.tsx"
    },
    "/sprints/create/": {
      "filePath": "sprints/create/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
