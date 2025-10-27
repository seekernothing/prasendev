"use client";

import { useEffect, useRef, useState } from "react";

interface Position {
  x: number;
  y: number;
}

interface SpriteSet {
  [key: string]: [number, number][];
}

const SPRITE_SETS: SpriteSet = {
  idle: [[-3, -3]],
  alert: [[-7, -3]],
  scratchSelf: [
    [-5, 0],
    [-6, 0],
    [-7, 0],
  ],
  scratchWallN: [
    [0, 0],
    [0, -1],
  ],
  scratchWallS: [
    [-7, -1],
    [-6, -2],
  ],
  scratchWallE: [
    [-2, -2],
    [-2, -3],
  ],
  scratchWallW: [
    [-4, 0],
    [-4, -1],
  ],
  tired: [[-3, -2]],
  sleeping: [
    [-2, 0],
    [-2, -1],
  ],
  N: [
    [-1, -2],
    [-1, -3],
  ],
  NE: [
    [0, -2],
    [0, -3],
  ],
  E: [
    [-3, 0],
    [-3, -1],
  ],
  SE: [
    [-5, -1],
    [-5, -2],
  ],
  S: [
    [-6, -3],
    [-7, -2],
  ],
  SW: [
    [-5, -3],
    [-6, -1],
  ],
  W: [
    [-4, -2],
    [-4, -3],
  ],
  NW: [
    [-1, 0],
    [-1, -1],
  ],
};

const NEKO_SPEED = 10;

export default function OnekoCat() {
  const nekoRef = useRef<HTMLDivElement>(null);
  const nekoPos = useRef({ x: 32, y: 32 });
  const mousePos = useRef({ x: 0, y: 0 });
  const frameCount = useRef(0);
  const idleTime = useRef(0);
  const idleAnimation = useRef<string | null>(null);
  const idleAnimationFrame = useRef(0);
  const lastFrameTimestamp = useRef<number | null>(null);
  const animationFrameId = useRef<number | null>(null);

  const [, forceUpdate] = useState(0);

  const setSprite = (name: string, frame: number) => {
    if (!nekoRef.current) return;
    const sprite = SPRITE_SETS[name][frame % SPRITE_SETS[name].length];
    nekoRef.current.style.backgroundPosition = `${sprite[0] * 32}px ${
      sprite[1] * 32
    }px`;
  };

  const resetIdleAnimation = () => {
    idleAnimation.current = null;
    idleAnimationFrame.current = 0;
  };

  const handleIdle = () => {
    idleTime.current += 1;

    if (
      idleTime.current > 10 &&
      Math.floor(Math.random() * 200) === 0 &&
      idleAnimation.current === null
    ) {
      const availableIdleAnimations = ["sleeping", "scratchSelf"];
      if (nekoPos.current.x < 32) availableIdleAnimations.push("scratchWallW");
      if (nekoPos.current.y < 32) availableIdleAnimations.push("scratchWallN");
      if (nekoPos.current.x > window.innerWidth - 32)
        availableIdleAnimations.push("scratchWallE");
      if (nekoPos.current.y > window.innerHeight - 32)
        availableIdleAnimations.push("scratchWallS");

      idleAnimation.current =
        availableIdleAnimations[
          Math.floor(Math.random() * availableIdleAnimations.length)
        ];
    }

    switch (idleAnimation.current) {
      case "sleeping":
        if (idleAnimationFrame.current < 8) {
          setSprite("tired", 0);
          break;
        }
        setSprite("sleeping", Math.floor(idleAnimationFrame.current / 4));
        if (idleAnimationFrame.current > 192) {
          resetIdleAnimation();
        }
        break;
      case "scratchWallN":
      case "scratchWallS":
      case "scratchWallE":
      case "scratchWallW":
      case "scratchSelf":
        setSprite(idleAnimation.current, idleAnimationFrame.current);
        if (idleAnimationFrame.current > 9) {
          resetIdleAnimation();
        }
        break;
      default:
        setSprite("idle", 0);
        return;
    }
    idleAnimationFrame.current += 1;
  };

  useEffect(() => {
    // Check for reduced motion preference
    const isReducedMotion = window.matchMedia(
      `(prefers-reduced-motion: reduce)`
    ).matches;

    if (isReducedMotion) return;

    const handleFrame = () => {
      if (!nekoRef.current) return;

      frameCount.current += 1;
      const diffX = nekoPos.current.x - mousePos.current.x;
      const diffY = nekoPos.current.y - mousePos.current.y;
      const distance = Math.sqrt(diffX ** 2 + diffY ** 2);

      if (distance < NEKO_SPEED || distance < 48) {
        handleIdle();
        return;
      }

      idleAnimation.current = null;
      idleAnimationFrame.current = 0;

      if (idleTime.current > 1) {
        setSprite("alert", 0);
        idleTime.current = Math.min(idleTime.current, 7);
        idleTime.current -= 1;
        return;
      }

      let direction = "";
      direction += diffY / distance > 0.5 ? "N" : "";
      direction += diffY / distance < -0.5 ? "S" : "";
      direction += diffX / distance > 0.5 ? "W" : "";
      direction += diffX / distance < -0.5 ? "E" : "";
      setSprite(direction, frameCount.current);

      nekoPos.current.x -= (diffX / distance) * NEKO_SPEED;
      nekoPos.current.y -= (diffY / distance) * NEKO_SPEED;

      nekoPos.current.x = Math.min(
        Math.max(16, nekoPos.current.x),
        window.innerWidth - 16
      );
      nekoPos.current.y = Math.min(
        Math.max(16, nekoPos.current.y),
        window.innerHeight - 16
      );

      // Update position for rendering
      forceUpdate((prev) => prev + 1);
    };

    const handleMouseMove = (event: MouseEvent) => {
      mousePos.current.x = event.clientX;
      mousePos.current.y = event.clientY;
    };

    const animate = (timestamp: number) => {
      if (!nekoRef.current?.isConnected) {
        return;
      }
      if (!lastFrameTimestamp.current) {
        lastFrameTimestamp.current = timestamp;
      }

      if (timestamp - lastFrameTimestamp.current > 100) {
        lastFrameTimestamp.current = timestamp;
        handleFrame();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", handleMouseMove);
    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const nekoStyle = {
    width: "32px",
    height: "32px",
    position: "fixed" as const,
    pointerEvents: "none" as const,
    imageRendering: "pixelated" as const,
    left: `${nekoPos.current.x - 16}px`,
    top: `${nekoPos.current.y - 16}px`,
    zIndex: 2147483647,
    backgroundImage: "url(/images/products/oneko.gif)",
  };

  // Don't render if reduced motion is preferred
  const isReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia(`(prefers-reduced-motion: reduce)`).matches;

  if (isReducedMotion) {
    return null;
  }

  return <div id="oneko" ref={nekoRef} aria-hidden="true" style={nekoStyle} />;
}
