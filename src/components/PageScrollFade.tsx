"use client";

import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SELECTOR = "[data-scroll-fade]";

/**
 * Scroll-linked fade/slide for any [data-scroll-fade] element on the page.
 * Progress reverses when scrolling up so content does not pop in/out.
 *
 * Optional attributes:
 * - data-scroll-fade-y: vertical offset in px (default 28)
 * - data-scroll-fade-start / data-scroll-fade-end: ScrollTrigger positions
 * - data-scroll-fade-scrub: scrub lag in seconds (default 1.35)
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

        const y = Number(el.dataset.scrollFadeY ?? 24);
        const start = el.dataset.scrollFadeStart ?? "top 98%";
        const end = el.dataset.scrollFadeEnd ?? "top 62%";
        const scrub = Number(el.dataset.scrollFadeScrub ?? 1.2);

        gsap.fromTo(
          el,
          { autoAlpha: 0, y, force3D: true },
          {
            autoAlpha: 1,
            y: 0,
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
    const t2 = window.setTimeout(refresh, 900);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener("load", refresh);
      document.documentElement.classList.remove("scroll-fade-ready");
      ctx.revert();
    };
  }, []);

  return null;
};

export default PageScrollFade;
