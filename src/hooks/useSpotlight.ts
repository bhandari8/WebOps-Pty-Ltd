"use client";

import { useCallback, useRef } from "react";

/**
 * Powers the `.spotlight` hover effect (see globals.css): tracks the
 * pointer position and writes it straight to CSS custom properties via a
 * ref, so the glow follows the cursor without triggering React re-renders.
 */
export function useSpotlight<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = useCallback((e: React.MouseEvent<T>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spotlight-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--spotlight-y", `${e.clientY - rect.top}px`);
  }, []);

  return { ref, onMouseMove };
}
