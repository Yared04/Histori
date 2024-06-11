"use client";
import { TimelineProvider } from "./globe/timeline/TimelineContext";
import { UserContextProvider } from "./auth/UserContext";
import { ArticleProvider } from "./articles/ArticleContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserContextProvider>
      <ArticleProvider>
        <TimelineProvider>{children}</TimelineProvider>
      </ArticleProvider>
    </UserContextProvider>
  );
}
