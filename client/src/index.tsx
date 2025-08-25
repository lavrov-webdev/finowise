import {
  ThemeProvider,
  Toaster,
  ToasterComponent,
  ToasterProvider,
} from "@gravity-ui/uikit";
import "@gravity-ui/uikit/styles/fonts.css";
import "@gravity-ui/uikit/styles/styles.css";
import { QueryProvider } from "@system/queryClient";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { routeTree } from "./routeTree.gen";
import "./styles.scss";
import "./zodConfig";
import './system/axiosConfig'

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: string;
    }
  }
}

const router = createRouter({ routeTree });
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

const toaster = new Toaster();

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <ThemeProvider theme="light">
      <QueryProvider>
        <ToasterProvider toaster={toaster}>
          <RouterProvider router={router} />
          <ToasterComponent />
        </ToasterProvider>
        <ReactQueryDevtools />
      </QueryProvider>
    </ThemeProvider>
  </React.StrictMode>,
);
