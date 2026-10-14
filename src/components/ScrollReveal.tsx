"use client";

import {
  useEffect,
  useRef,
  useMemo,
  type ElementType,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const toPlainText = (node: ReactNode): string => {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join("");
  if (typeof node === "object" && "props" in node) {
    const props = (node as { props?: { children?: ReactNode } }).props;
    return toPlainText(props?.children);
  }
  return "";
};

type ScrollRevealProps = {
  /** Preferred when used from Astro islands — children text often does not hydrate. */
  text?: string;
  children?: ReactNode;
  enableBlur?: boolean;
  baseOpacity?: number;
  baseRotation?: number;
  blurStrength?: number;
  containerClassName?: string;
  textClassName?: string;
  as?: ElementType;
  id?: string;
  accentWords?: readonly string[];
  accentClassName?: string;
  /** ScrollTrigger start (default keeps a long, smooth scrub range). */
  start?: string;
  /** ScrollTrigger end for word reveal. */
  end?: string;
  /** Scrub lag in seconds — higher = smoother / less abrupt. */
  scrub?: boolean | number;
};

const ScrollReveal = ({
  text,
  children,
  enableBlur = true,
  baseOpacity = 0.28,
  baseRotation = 1,
  blurStrength = 6,
  containerClassName = "",
  textClassName = "",
  as: Tag = "div",
  id,
  accentWords = [],
  accentClassName = "text-accent",
  // Reveal earlier: starts as soon as the line enters, finishes while still mid-viewport
  start = "top 98%",
  end = "top 62%",
  scrub = 1.2,
}: ScrollRevealProps) => {
  const containerRef = useRef<HTMLElement | null>(null);

  const accentSet = useMemo(
    () => new Set(accentWords.map((word) => word.trim())),
    [accentWords],
  );

  const content = useMemo(() => {
    const fromProp = typeof text === "string" ? text : "";
    const fromChildren = toPlainText(children);
    return (fromProp || fromChildren).trim();
  }, [text, children]);

  const words = useMemo(() => {
    if (!content) return [];
    return content.split(/(\s+)/);
  }, [content]);

  useEffect(() => {
    const el = containerRef.current;
    if (!el || !content) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const wordElements = el.querySelectorAll<HTMLElement>(".scroll-reveal__word");

    if (prefersReducedMotion) {
      gsap.set(el, { clearProps: "transform" });
      gsap.set(wordElements, { opacity: 1, filter: "none", clearProps: "transform" });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { transformOrigin: "0% 50%", rotate: baseRotation },
        {
          ease: "none",
          rotate: 0,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
          },
        },
      );

      if (wordElements.length === 0) return;

      gsap.fromTo(
        wordElements,
        {
          opacity: baseOpacity,
          ...(enableBlur ? { filter: `blur(${blurStrength}px)` } : {}),
        },
        {
          ease: "none",
          opacity: 1,
          ...(enableBlur ? { filter: "blur(0px)" } : {}),
          stagger: 0.06,
          scrollTrigger: {
            trigger: el,
            start,
            end,
            scrub,
          },
        },
      );
    }, el);

    // Recalculate after layout / fonts so scrub ranges stay accurate
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      ctx.revert();
    };
  }, [
    content,
    enableBlur,
    baseRotation,
    baseOpacity,
    blurStrength,
    start,
    end,
    scrub,
  ]);

  return (
    <Tag
      ref={containerRef}
      id={id}
      className={[
        "scroll-reveal",
        containerClassName,
        textClassName,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {words.map((token, index) => {
        if (/^\s+$/.test(token)) return token;

        const isAccent = accentSet.has(token);
        return (
          <span
            className={`scroll-reveal__word${isAccent ? ` ${accentClassName}` : ""}`}
            key={index}
          >
            {token}
          </span>
        );
      })}
    </Tag>
  );
};

export default ScrollReveal;
