"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SELECTOR = "[data-scroll-fade]";

/**
 * Scroll-linked fade for any [data-scroll-fade] element on the page.
 * Opacity only — no translateY — so section layout stays fixed.
 * Progress reverses when scrolling up so content does not pop in/out.
 *
 * Optional attributes:
 * - data-scroll-fade-start / data-scroll-fade-end: ScrollTrigger positions
 * - data-scroll-fade-scrub: scrub lag in seconds (default 1.2)
 */
const PageScrollFade = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) return;

    document.documentElement.classList.add("scroll-fade-ready");

    const ctx = gsap.context(() => {
      const elements = gsap.utils.toArray<HTMLElement>(SELECTOR);

      elements.forEach((el) => {
        // Avoid double-tweening nested fades (parent owns the motion)
        if (el.parentElement?.closest(SELECTOR)) return;

        const start = el.dataset.scrollFadeStart ?? "top 98%";
        const end = el.dataset.scrollFadeEnd ?? "top 62%";
        const scrub = Number(el.dataset.scrollFadeScrub ?? 1.2);

        gsap.fromTo(
          el,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            ease: "none",
            immediateRender: false,
            scrollTrigger: {
              trigger: el,
              start,
              end,
              scrub,
              invalidateOnRefresh: true,
            },
          },
        );
      });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("load", refresh);
    const t1 = window.setTimeout(refresh, 250);

    return () => {
      window.clearTimeout(t1);
      window.removeEventListener("load", refresh);
      document.documentElement.classList.remove("scroll-fade-ready");
      ctx.revert();
    };
  }, []);

  return null;
};

export default PageScrollFade;
