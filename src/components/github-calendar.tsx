"use client";

import React from "react";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { BorderBeam } from "@/components/magicui/border-beam";

export function GithubContributions() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const theme = {
    light: ["#ebedf0", "#9be9a8", "#40c463", "#30a14e", "#216e39"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  if (!mounted) {
    return (
      <div className="w-full h-[160px] rounded-xl bg-muted animate-pulse" />
    );
  }

  return (
    <div className="relative overflow-hidden rounded-xl">
      <BorderBeam
        duration={6}
        size={400}
        className="from-transparent via-purple-500 to-transparent"
      />
      <BorderBeam
        duration={6}
        delay={3}
        size={400}
        className="from-transparent via-pink-500 to-transparent"
      />
      <motion.div
        className="w-full overflow-hidden rounded-xl bg-card hover:shadow-lg transition-shadow duration-300 p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 hover:scale-[1.02] transition-transform duration-300">
          <GitHubCalendarErrorBoundary
            username="seekernothing"
            resolvedTheme={resolvedTheme}
          />
        </div>
      </motion.div>
    </div>
  );
}

// Simple Error Boundary wrapper that renders GitHubCalendar and falls back on error
function GitHubCalendarErrorBoundary({
  username,
  resolvedTheme,
}: {
  username: string;
  resolvedTheme: string | undefined;
}) {
  const [hasError, setHasError] = React.useState(false);
  const [retryKey, setRetryKey] = React.useState(0);

  React.useEffect(() => {
    // Reset error state after some time to allow retries
    const timer = setTimeout(() => {
      if (hasError) {
        setHasError(false);
        setRetryKey((k) => k + 1);
      }
    }, 5000);
    return () => clearTimeout(timer);
  }, [hasError]);

  React.useEffect(() => {
    // Listen for unhandled errors in the calendar
    const handleError = () => {
      // eslint-disable-next-line no-console
      console.log("GitHub Calendar: Attempting to load...");
    };
    window.addEventListener("error", handleError);
    return () => window.removeEventListener("error", handleError);
  }, []);

  if (hasError) {
    return (
      <div className="rounded-md border border-muted p-4 text-sm bg-muted/50">
        <div className="font-medium">GitHub Contributions</div>
        <div className="text-muted-foreground mt-2">
          Could not load contribution data for "{username}".
          <br />
          <span className="text-xs">
            Rate limits or network issues. Check GitHub is accessible.
          </span>
        </div>
        <div className="mt-3 flex gap-2">
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm underline"
          >
            Open GitHub Profile
          </a>
          <button
            onClick={() => {
              setHasError(false);
              setRetryKey((k) => k + 1);
            }}
            className="text-sm underline"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Render inside try/catch using a key to re-mount on retry
  try {
    return (
      <div key={retryKey}>
        <GitHubCalendar
          username={username}
          colorScheme={resolvedTheme as "light" | "dark"}
          fontSize={12}
          blockSize={12}
          blockMargin={4}
        />
      </div>
    );
  } catch (e) {
    // If the library throws synchronously, catch and show fallback
    // Log error for debugging
    // eslint-disable-next-line no-console
    console.error("GitHubCalendar render error:", e);
    setHasError(true);
    return null;
  }
}
