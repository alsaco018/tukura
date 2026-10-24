import { useCallback, useState } from "react";
import {
  legalFooterItems,
  type LegalDocId,
} from "../data/legal";
import { LegalOverlay } from "./LegalOverlay";

export const LegalLinks = () => {
  const [openDoc, setOpenDoc] = useState<LegalDocId | null>(null);

  const handleClose = useCallback(() => {
    setOpenDoc(null);
  }, []);

  const handleOpenDoc = (id: LegalDocId) => {
    setOpenDoc(id);
  };

  return (
    <>
      <nav
        aria-label="Información legal"
        className="mx-auto flex max-w-lg flex-wrap items-center justify-center gap-6 text-base font-semibold leading-7 md:max-w-2xl"
      >
        {legalFooterItems.map((item) => (
          <button
            key={item.id}
            type="button"
            className="py-2.5 transition-opacity hover:opacity-80 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-lighter"
            onClick={() => handleOpenDoc(item.id)}
            aria-haspopup="dialog"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <LegalOverlay docId={openDoc} onClose={handleClose} />
    </>
  );
};
