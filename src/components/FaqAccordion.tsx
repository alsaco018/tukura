import { useState, type KeyboardEvent } from "react";

type FaqItem = {
  id: string;
  question: string;
  answer: string;
};

type FaqAccordionProps = {
  items: readonly FaqItem[];
  defaultOpenId?: string;
};

export const FaqAccordion = ({
  items,
  defaultOpenId = "embarazo",
}: FaqAccordionProps) => {
  const [openId, setOpenId] = useState<string | null>(defaultOpenId);

  const handleToggle = (id: string) => {
    setOpenId((current) => (current === id ? null : id));
  };

  const handleKeyDown =
    (id: string) => (event: KeyboardEvent<HTMLButtonElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleToggle(id);
      }
    };

  return (
    <div className="flex w-full flex-col items-center gap-5">
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `faq-panel-${item.id}`;
        const buttonId = `faq-button-${item.id}`;

        return (
          <div
            key={item.id}
            className="w-full max-w-[353px] overflow-hidden rounded-[40px] bg-theme-white"
          >
            <button
              id={buttonId}
              type="button"
              className={`flex w-full items-center gap-4 px-6 text-left ${
                isOpen ? "pb-3 pt-6" : "p-6"
              }`}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => handleToggle(item.id)}
              onKeyDown={handleKeyDown(item.id)}
              tabIndex={0}
            >
              <span className="flex-1 text-lg font-normal leading-[26px] text-theme-black">
                {item.question}
              </span>
              <img
                src={isOpen ? "/icons/remove.svg" : "/icons/add.svg"}
                alt=""
                width={24}
                height={24}
                className="size-6 shrink-0"
              />
            </button>

            {isOpen && (
              <div id={panelId} role="region" aria-labelledby={buttonId} className="px-6 pb-6">
                <p className="text-base font-normal leading-6 text-theme-black">
                  {item.answer}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
