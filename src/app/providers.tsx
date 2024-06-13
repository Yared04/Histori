"use client";
import { TimelineProvider } from "./globe/timeline/TimelineContext";
import { UserContextProvider } from "./auth/UserContext";
import { ArticleProvider } from "./articles/ArticleContext";
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <UserContextProvider>
      <ArticleProvider>
        <TimelineProvider>
          {children}
          <ProgressBar
            height="4px"
            color="#1E88E5"
            options={{ showSpinner: false }}
            shallowRouting
          />
        </TimelineProvider>
      </ArticleProvider>
    </UserContextProvider>
  );
}
