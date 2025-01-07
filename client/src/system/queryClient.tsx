import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AxiosError } from "axios";
import React from "react";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: false,
      retry(_, error) {
        return (error as AxiosError)?.status !== 401
      },
    },
  },
});

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
