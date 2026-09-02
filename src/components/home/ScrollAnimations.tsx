"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

/**
 * Initialises AOS (Animate On Scroll) for `data-aos` attributes on the
 * landing page. Kept subtle (fade-up only) per the site's minimal design
 * direction, and disabled entirely for prefers-reduced-motion.
 */
export function ScrollAnimations() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-out-cubic",
      once: true,
      offset: 40,
      disable: () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    });
  }, []);

  return null;
}
