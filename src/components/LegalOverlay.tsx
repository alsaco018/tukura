import { useEffect, useId, useRef, type KeyboardEvent } from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import { legalDocuments, type LegalDocId } from "../data/legal";

type LegalOverlayProps = {
  docId: LegalDocId | null;
  onClose: () => void;
};

export const LegalOverlay = ({ docId, onClose }: LegalOverlayProps) => {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const doc = docId ? legalDocuments[docId] : null;
  const isCookiesDoc = docId === "cookies";

  useEffect(() => {
    if (!doc) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const handleKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [doc, onClose]);

  if (!doc) return null;

  const handleBackdropClick = () => {
    onClose();
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !dialogRef.current) return;

    const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-theme-black/55 p-0 sm:items-center sm:p-6"
      role="presentation"
      onClick={handleBackdropClick}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="flex max-h-[92dvh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-brand-light text-theme-black shadow-xl sm:rounded-3xl"
        onClick={(event) => event.stopPropagation()}
        onKeyDown={handleDialogKeyDown}
      >
        <header className="flex items-start justify-between gap-4 border-b border-accent-light/60 px-5 py-4 sm:px-6">
          <div className="flex min-w-0 flex-col gap-1">
            <p className="kicker text-theme-black/70">Información legal</p>
            <h2
              id={titleId}
              className="font-display text-3xl leading-tight sm:text-4xl"
            >
              {doc.title}
            </h2>
            <p className="text-sm text-theme-black/65">
              Última actualización: {doc.lastUpdated}
            </p>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="inline-flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-theme-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            aria-label="Cerrar"
          >
            <span aria-hidden="true" className="text-2xl leading-none">
              ×
            </span>
          </button>
        </header>

        <div className="overflow-y-auto px-5 py-5 sm:px-6 sm:py-6">
          {isCookiesDoc && (
            <div className="mb-6 flex flex-col gap-3 rounded-2xl bg-brand-medium px-4 py-4">
              <p className="text-sm leading-6 text-theme-black/85">
                Puedes aceptar, rechazar o configurar las cookies no necesarias
                en cualquier momento.
              </p>
              <button
                type="button"
                onClick={() => {
                  onClose();
                  CookieConsent.showPreferences();
                }}
                className="inline-flex w-fit items-center justify-center rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-theme-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              >
                Gestionar preferencias
              </button>
            </div>
          )}

          <div className="flex flex-col gap-6">
            {doc.sections.map((section) => (
              <section key={section.heading} className="flex flex-col gap-3">
                <h3 className="text-base font-semibold leading-6">
                  {section.heading}
                </h3>
                {section.paragraphs
                  .filter((paragraph) => paragraph.trim().length > 0)
                  .map((paragraph) => (
                    <p
                      key={paragraph.slice(0, 48)}
                      className="text-sm font-normal leading-6 text-theme-black/85"
                    >
                      {paragraph}
                    </p>
                  ))}
                {section.list && section.list.length > 0 && (
                  <ul className="list-disc space-y-1.5 pl-5 text-sm leading-6 text-theme-black/85">
                    {section.list.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
