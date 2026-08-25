"use client";

import { useEffect } from "react";

/**
 * Adds the `revealed` class to every `.reveal` element once it enters the
 * viewport. Pairs with the `.reveal` / `.reveal.revealed` rules in
 * `src/styles/redesign.css` — this is the project's single reveal system.
 *
 * `deps` re-runs the sweep when the observed markup changes (e.g. a locale
 * switch that remounts sections).
 */
export default function useScrollReveal(deps = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll(".reveal"));
    if (!els.length) return;

    // With reduced motion the transition is already zeroed globally
    // (style_0.css). Reveal everything up front so nothing depends on a
    // scroll event to become visible.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      els.forEach((el) => el.classList.add("revealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("revealed");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
