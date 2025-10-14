"use client";

import { motion } from "framer-motion";
import { JetBrains_Mono } from "next/font/google";
import { useTheme } from "next-themes";

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export function CliShowcase() {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full max-w-4xl mx-auto my-16 px-4"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">
        Powerful CLI Interface
      </h2>

      <div
        className={`rounded-lg overflow-hidden border ${
          theme === "dark" ? "border-zinc-800" : "border-zinc-200"
        } shadow-2xl`}
      >
        {/* Terminal Header */}
        <div
          className={`flex items-center justify-between p-2 ${
            theme === "dark" ? "bg-zinc-800" : "bg-zinc-200"
          }`}
        >
          <div className="flex items-center space-x-2">
            <div className="h-3 w-3 rounded-full bg-red-500" />
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <div className="h-3 w-3 rounded-full bg-green-500" />
          </div>
          <div
            className={`${
              theme === "dark" ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            seekernothing.com — CLI
          </div>
          <div className="w-16" />
        </div>

        {/* Terminal Content */}
        <div
          className={`${theme === "dark" ? "bg-zinc-900" : "bg-zinc-50"} p-6 ${
            jetbrainsMono.variable
          } font-mono`}
        >
          <div className="space-y-2">
            <div className="flex items-center">
              <span
                className={`mr-2 ${
                  theme === "dark" ? "text-green-400" : "text-green-600"
                }`}
              >
                $
              </span>
              <span className="typing-animation">help</span>
            </div>
            <div className="text-sm opacity-90">
              <p>Available commands:</p>
              <br />
              <p>help (h, ?) - Show this help message</p>
              <p>about (a) - Display information about me</p>
              <p>skills (s) - List my technical skills</p>
              <p>exp (e) - Show my work experience</p>
              <p>projects (p, ls) - List my projects</p>
              <p>theme (t) - Toggle dark/light theme</p>
              <p>gui (g) - Switch to GUI mode</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-4 text-center">
        <h3 className="text-xl font-semibold">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto">
          <Feature
            title="Command History"
            description="Use ↑↓ arrows to navigate through previous commands"
          />
          <Feature
            title="Tab Completion"
            description="Press Tab to auto-complete commands"
          />
          <Feature
            title="Aliases"
            description="Short command aliases for quick access"
          />
          <Feature
            title="Copy to Clipboard"
            description="Hover and click to copy any output"
          />
          <Feature
            title="Theme Switching"
            description="Toggle between light and dark themes"
          />
          <Feature
            title="ASCII Art"
            description="Beautiful ASCII art welcome message"
          />
        </div>
      </div>

      <style jsx>{`
        .typing-animation {
          overflow: hidden;
          border-right: 2px solid;
          animation: typing 2s steps(4), blink 0.5s step-end infinite alternate;
          white-space: nowrap;
          width: 4ch;
        }

        @keyframes typing {
          from {
            width: 0;
          }
        }

        @keyframes blink {
          50% {
            border-color: transparent;
          }
        }
      `}</style>
    </motion.div>
  );
}

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="p-4 rounded-lg border border-zinc-200 dark:border-zinc-800">
      <h4 className="font-medium mb-2">{title}</h4>
      <p className="text-sm text-zinc-600 dark:text-zinc-400">{description}</p>
    </div>
  );
}
