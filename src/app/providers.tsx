"use client";

import { TimelineProvider } from "./globe/timeline/TimelineContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return <TimelineProvider>{children}</TimelineProvider>;
}
