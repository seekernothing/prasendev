"use client"

import React, { useEffect, useState } from "react";
import Meteors from "@/components/ui/meteors";
import { AnimatePresence } from "framer-motion";

// Cloud/Spirit/Leaf decorations removed per request. This file now only renders star/meteor animations.

export function GhibliSkyBackground() {
  const [isVisible, setIsVisible] = useState(true);
  const CLOUD_COUNT = 4; //cloud count

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(document.visibilityState === 'visible');
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Keep star/meteor animations */}
      <AnimatePresence>
        {isVisible && <Meteors className="-z-10" number={20} />}
      </AnimatePresence>
    </div>
  );
}