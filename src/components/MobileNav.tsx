import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent as ReactMouseEvent,
} from "react";
import { StaggeredMenu } from "./StaggeredMenu";

type NavItem = {
  label: string;
  href: string;
};

type MobileNavProps = {
  nav: readonly NavItem[];
  ctaLabel: string;
  ctaHref: string;
  homeHref?: string;
  wordmarkSrc?: string;
  menuIconSrc?: string;
  closeIconSrc?: string;
};

const getSamePageHashId = (href: string): string | null => {
  try {
    const url = new URL(href, window.location.href);
    const samePage =
      url.origin === window.location.origin &&
      url.pathname === window.location.pathname;
    if (!samePage || url.hash.length <= 1) return null;
    return decodeURIComponent(url.hash.slice(1));
  } catch {
    return null;
  }
};

const getScrollPaddingTop = (): number => {
  const raw = getComputedStyle(document.documentElement).scrollPaddingTop;
  const value = Number.parseFloat(raw);
  return Number.isFinite(value) ? value : 0;
};

/** Absolute document Y for an element (stable before sticky scroll starts). */
const getDocumentTop = (el: HTMLElement): number =>
  el.getBoundingClientRect().top + window.scrollY;

/**
 * Manual scroll that keeps driving toward the target each frame.
 * Native smooth scrollIntoView aborts mid-way across sticky ScrollStack sections.
 */
const animateScrollTo = (top: number, onDone?: () => void): (() => void) => {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const start = window.scrollY;
  const distance = top - start;

  if (reduced || Math.abs(distance) < 2) {
    window.scrollTo({ top, behavior: "instant" });
    onDone?.();
    return () => undefined;
  }

  const durationMs = Math.min(1400, Math.max(450, Math.abs(distance) * 0.35));
  const startedAt = performance.now();
  let frame = 0;

  const easeOutCubic = (t: number) => 1 - (1 - t) ** 3;

  const tick = (now: number) => {
    const progress = Math.min(1, (now - startedAt) / durationMs);
    window.scrollTo({
      top: start + distance * easeOutCubic(progress),
      behavior: "instant",
    });
    if (progress < 1) {
      frame = window.requestAnimationFrame(tick);
      return;
    }
    window.scrollTo({ top, behavior: "instant" });
    onDone?.();
  };

  frame = window.requestAnimationFrame(tick);
  return () => window.cancelAnimationFrame(frame);
};

export const MobileNav = ({
  nav,
  ctaLabel,
  ctaHref,
  homeHref = "/inicio",
  wordmarkSrc = "/icons/logo-wordmark.svg",
  menuIconSrc = "/icons/menu.svg",
  closeIconSrc = "/icons/close.svg",
}: MobileNavProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const pendingScrollIdRef = useRef<string | null>(null);
  const skipFocusRef = useRef(false);
  const cancelScrollRef = useRef<(() => void) | null>(null);
  const isOpenRef = useRef(isOpen);

  isOpenRef.current = isOpen;

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleToggle();
    }
  };

  const scrollToSection = useCallback((targetId: string) => {
    const el = document.getElementById(targetId);
    if (!el) return;

    const nextHash = `#${targetId}`;
    if (window.location.hash !== nextHash) {
      history.pushState(null, "", nextHash);
    }

    const padding = getScrollPaddingTop();
    const top = Math.max(0, getDocumentTop(el) - padding);

    cancelScrollRef.current?.();
    cancelScrollRef.current = animateScrollTo(top, () => {
      // Correct for any layout shift after sticky sections settle.
      const settled = Math.max(0, getDocumentTop(el) - padding);
      if (Math.abs(window.scrollY - settled) > 4) {
        window.scrollTo({ top: settled, behavior: "instant" });
      }
      cancelScrollRef.current = null;
    });
  }, []);

  const handleHashNavigate = (
    event: ReactMouseEvent<HTMLAnchorElement>,
  ): boolean => {
    const href = event.currentTarget.getAttribute("href");
    if (!href) return false;

    const targetId = getSamePageHashId(href);
    if (!targetId) return false;

    // Own same-page hash navigation; sticky stacks break native smooth scroll.
    event.preventDefault();
    document.body.style.overflow = "";

    if (isOpenRef.current) {
      pendingScrollIdRef.current = targetId;
      skipFocusRef.current = true;
      setIsOpen(false);
      return true;
    }

    scrollToSection(targetId);
    return true;
  };

  const handleItemClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    handleHashNavigate(event);
  };

  const handleCtaClick = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    handleHashNavigate(event);
  };

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleEscape);
      if (!skipFocusRef.current) {
        openButtonRef.current?.focus({ preventScroll: true });
      }
      skipFocusRef.current = false;
    };
  }, [isOpen]);

  // Scroll after the drawer has closed and body overflow is restored.
  useEffect(() => {
    if (isOpen) return;

    const targetId = pendingScrollIdRef.current;
    if (!targetId) return;
    pendingScrollIdRef.current = null;

    scrollToSection(targetId);

    return () => {
      cancelScrollRef.current?.();
      cancelScrollRef.current = null;
    };
  }, [isOpen, scrollToSection]);

  useEffect(
    () => () => {
      cancelScrollRef.current?.();
    },
    [],
  );

  const menuItems = nav.map((item) => ({
    label: item.label,
    ariaLabel: item.label,
    link: item.href,
  }));

  const ctaIsExternal = ctaHref.startsWith("http");

  return (
    <>
      <header className="pointer-events-none fixed inset-x-0 top-0 z-[60] px-2 pt-2">
        <div className="pointer-events-auto mx-auto flex w-full max-w-lg items-center justify-between rounded-[40px] bg-theme-white/70 px-5 py-2 backdrop-blur-[4px]">
          <a href={homeHref} className="shrink-0" aria-label="TUKURA inicio">
            <img
              src={wordmarkSrc}
              alt="TUKURA"
              width={94}
              height={22}
              className="h-[22px] w-[94px]"
            />
          </a>

          <div className="flex items-center gap-6">
            <a
              href={ctaHref}
              className="inline-flex items-center justify-center rounded-full bg-accent px-8 py-2 text-base font-semibold leading-6 text-theme-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-lighter"
              target={ctaIsExternal ? "_blank" : undefined}
              rel={ctaIsExternal ? "noopener noreferrer" : undefined}
              onClick={handleCtaClick}
            >
              {ctaLabel}
            </a>

            <button
              ref={openButtonRef}
              type="button"
              className="inline-flex size-6 items-center justify-center"
              aria-label={isOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isOpen}
              aria-controls={panelId}
              data-staggered-menu-toggle=""
              onClick={handleToggle}
              onKeyDown={handleKeyDown}
              tabIndex={0}
            >
              <img
                src={isOpen ? closeIconSrc : menuIconSrc}
                alt=""
                width={24}
                height={24}
                className="size-6"
              />
            </button>
          </div>
        </div>
      </header>

      <StaggeredMenu
        isFixed
        hideHeader
        open={isOpen}
        panelId={panelId}
        position="right"
        colors={["#e198aa", "#c26d82"]}
        accentColor="#c26d82"
        items={menuItems}
        displaySocials={false}
        displayItemNumbering
        closeOnClickAway
        onMenuClose={handleClose}
        onItemClick={handleItemClick}
      />
    </>
  );
};
