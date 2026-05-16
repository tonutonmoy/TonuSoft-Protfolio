"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "./theme-provider";
import { Navbar } from "./navbar";
import { SiteFooter } from "./site-footer";
import { Toaster } from "./ui/sonner";

export function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
          },
        },
      })
  );
  const pathname = usePathname();
  const isDashboard = pathname?.includes("/dashboard");

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            {!isDashboard && <Navbar />}
            <main className="flex-1">
              {children}
            </main>
            {!isDashboard && <SiteFooter />}
          </div>
          <Toaster position="bottom-right" />
        </AuthProvider>
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}