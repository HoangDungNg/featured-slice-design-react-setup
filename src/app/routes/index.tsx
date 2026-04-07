import { HomePage } from "@/pages/home-page/ui/home-page.ui";
import { TodoPage } from "@/pages/todo-page/ui/todo-page.ui";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";

// Root layout
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Home route
const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

// Todo route
const todoRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/todos",
  component: TodoPage,
});

const routeTree = rootRoute.addChildren([homeRoute, todoRoute]);

export const router = createRouter({
  routeTree,
});

// Register router types (important!)
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
