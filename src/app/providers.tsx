"use client";
import { TimelineProvider } from "./globe/timeline/TimelineContext";
import { UserContextProvider } from "./auth/UserContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserContextProvider>
      <TimelineProvider>{children}</TimelineProvider>
    </UserContextProvider>
  );
}
