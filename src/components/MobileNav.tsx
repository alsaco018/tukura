import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
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

  useEffect(() => {
    if (!isOpen) {
      return;
    }

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
      openButtonRef.current?.focus();
    };
  }, [isOpen]);

  const menuItems = nav.map((item) => ({
    label: item.label,
    ariaLabel: item.label,
    link: item.href,
  }));

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
              target={ctaHref.startsWith("http") ? "_blank" : undefined}
              rel={ctaHref.startsWith("http") ? "noopener noreferrer" : undefined}
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
      />
    </>
  );
};
