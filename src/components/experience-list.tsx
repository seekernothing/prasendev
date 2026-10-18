"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { type Experience } from "@/data/resume";
import { ExperienceCard } from "@/components/experience-card";

interface ExperienceListProps {
  experiences: Experience[];
  // How many to show before the "Show all" button
  initialCount?: number;
}

export function ExperienceList({
  experiences,
  initialCount = 3,
}: ExperienceListProps) {
  const [showAll, setShowAll] = useState(false);

  if (experiences.length === 0) {
    return (
      <div className="py-8 text-center">
        <p className="text-muted-foreground">No work experiences found.</p>
      </div>
    );
  }

  const visible = experiences.slice(0, initialCount);
  const hidden = experiences.slice(initialCount);

  return (
    <div className="flex flex-col gap-6">
      {visible.map((experience, index) => (
        <ExperienceCard
          key={`${experience.company}-${experience.startDate}-${index}`}
          experience={experience}
        />
      ))}

      <AnimatePresence initial={false}>
        {showAll &&
          hidden.map((experience, index) => (
            <motion.div
              key={`${experience.company}-${experience.startDate}-hidden-${index}`}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, delay: index * 0.05 }}
            >
              <ExperienceCard experience={experience} />
            </motion.div>
          ))}
      </AnimatePresence>

      {hidden.length > 0 && (
        <div className="flex justify-center pt-2">
          <button
            type="button"
            onClick={() => setShowAll((prev) => !prev)}
            aria-expanded={showAll}
            className="rounded-lg border border-border bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            {showAll ? "Show less" : "Show all work experiences"}
          </button>
        </div>
      )}
    </div>
  );
}