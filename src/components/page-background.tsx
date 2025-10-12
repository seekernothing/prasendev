// components/page-background.tsx
"use client";

import { usePathname } from "next/navigation";
import { MeteorsBackground } from "./meteors-background";
import AnimatedGridPattern from "./ui/animated-grid-pattern";
import GridPattern from "./ui/grid-pattern";
import { InteractiveGridPattern } from "./ui/interactive-grid-pattern";

export function PageBackground() {
  const pathname = usePathname();
  const isBlogPage = pathname?.includes("/blog");
  // Show meteors on blog and other pages
  return <MeteorsBackground />;
}
