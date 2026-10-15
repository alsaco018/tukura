import {
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type MouseEvent,
} from "react";
import { services } from "../data/services";
import {
  buildBookingWhatsAppMessage,
  buildWhatsAppUrl,
} from "../lib/whatsapp";
import Stepper, { Step } from "./Stepper";

type FormState = {
  massageIds: string[];
  objections: string;
  firstName: string;
  lastName: string;
};

type MassageOption = {
  id: string;
  chipLabel: string;
  title: string;
};

type BookingFormProps = {
  /** When set, locks the form to this massage and hides the type selector. */
  preselectedServiceId?: string;
};

const TOTAL_STEPS = 2;

const CHIP_LABELS: Record<string, string> = {
  personalizado: "M. personalizado",
  ritual: "Ritual",
  vertebral: "M. vertebral",
  craneofacial: "Craneofacial",
  kobido: "Kobido facial",
  prenatal: "M. prenatal",
  informacion: "Información",
};

const massageOptions: MassageOption[] = [
  ...services.map((service) => ({
    id: service.id,
    chipLabel: CHIP_LABELS[service.id] ?? service.title,
    title: service.title,
  })),
  {
    id: "informacion",
    chipLabel: CHIP_LABELS.informacion,
    title: "Información",
  },
];

const initialForm: FormState = {
  massageIds: [],
  objections: "",
  firstName: "",
  lastName: "",
};

const inputClassName =
  "w-full rounded-lg border border-accent-light/80 bg-theme-white px-4 py-2.5 text-base leading-6 text-theme-black outline-none transition-colors placeholder:text-theme-black/55 focus:border-accent focus-visible:ring-2 focus-visible:ring-accent/30";

const labelClassName = "text-base font-semibold leading-6 text-theme-black";

const ACCENT = "#c26d82";

export const BookingForm = ({ preselectedServiceId }: BookingFormProps) => {
  const lockedServiceId =
    preselectedServiceId &&
    massageOptions.some((option) => option.id === preselectedServiceId)
      ? preselectedServiceId
      : undefined;
  const hideMassageSelect = Boolean(lockedServiceId);

  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(() =>
    lockedServiceId
      ? { ...initialForm, massageIds: [lockedServiceId] }
      : initialForm,
  );
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>(
    {},
  );
  const dropdownRef = useRef<HTMLDivElement>(null);
  const formId = useId();

  const selectedMassages = massageOptions.filter((option) =>
    form.massageIds.includes(option.id),
  );

  const handleToggleMassage = (id: string) => {
    setForm((prev) => {
      const isSelected = prev.massageIds.includes(id);
      return {
        ...prev,
        massageIds: isSelected
          ? prev.massageIds.filter((item) => item !== id)
          : [...prev.massageIds, id],
      };
    });
    setErrors((prev) => ({ ...prev, massageIds: undefined }));
  };

  const handleRemoveMassage = (id: string) => {
    setForm((prev) => ({
      ...prev,
      massageIds: prev.massageIds.filter((item) => item !== id),
    }));
  };

  const handleFieldChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const validateStep1 = (): boolean => {
    if (!hideMassageSelect && form.massageIds.length === 0) {
      setErrors({ massageIds: "Elige al menos un masaje" });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep2 = (): boolean => {
    const nextErrors: Partial<Record<keyof FormState, string>> = {};

    if (!form.firstName.trim()) {
      nextErrors.firstName = "Indica tu nombre";
    }
    if (!form.lastName.trim()) {
      nextErrors.lastName = "Indica tus apellidos";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const openWhatsAppWithForm = () => {
    const message = buildBookingWhatsAppMessage({
      massages: selectedMassages.map((item) => item.title),
      objections: form.objections,
      firstName: form.firstName,
      lastName: form.lastName,
    });
    window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
  };

  const handleNextClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (step === 1 && !validateStep1()) {
      event.preventDefault();
      return;
    }

    if (step === 2 && !validateStep2()) {
      event.preventDefault();
    }
  };

  const handleStepChange = (nextStep: number) => {
    setStep(nextStep);
    setIsDropdownOpen(false);
  };

  const handleFinalStepCompleted = () => {
    openWhatsAppWithForm();
    setStep(TOTAL_STEPS + 1);
  };

  useEffect(() => {
    const handlePointerDown = (event: globalThis.MouseEvent) => {
      if (!dropdownRef.current?.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  return (
    <div className="flex w-full flex-col items-center font-sans text-theme-black">
      <Stepper
        step={step}
        onStepChange={handleStepChange}
        onFinalStepCompleted={handleFinalStepCompleted}
        theme="light"
        accentColor={ACCENT}
        frame={false}
        linear
        width="100%"
        radius={16}
        nextButtonText="Continuar"
        backButtonText="Atrás"
        completeButtonText="Continuar"
        nextButtonProps={{
          className:
            "h-auto min-h-10 rounded-full px-8 py-2 text-base font-semibold leading-6 shadow-none",
          onClick: handleNextClick,
          "aria-label":
            step === 2
              ? "Continuar y enviar por WhatsApp"
              : "Continuar al siguiente paso",
        }}
        backButtonProps={{
          className:
            "h-auto min-h-10 rounded-full px-6 py-2 text-base font-semibold leading-6",
        }}
        className="max-w-full font-sans"
        contentClassName={[
          "font-sans text-base text-theme-black",
          isDropdownOpen ? "!overflow-visible" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        footerClassName="pt-8"
        style={
          {
            "--stepper-ink": "#4d3114",
            "--stepper-muted": "rgba(77, 49, 20, 0.55)",
            "--stepper-faint": "rgba(194, 109, 130, 0.35)",
            "--stepper-well": "rgba(255, 255, 255, 0.55)",
            "--stepper-track": "rgba(194, 109, 130, 0.25)",
            "--stepper-tile":
              "linear-gradient(180deg, #ffffff 0%, #fff5f8 100%)",
            "--stepper-tile-edge": "rgba(194, 109, 130, 0.18)",
            "--stepper-tile-shadow":
              "0 4px 12px -6px rgba(194, 109, 130, 0.35)",
            "--stepper-hover-fill": "rgba(255, 255, 255, 0.45)",
            "--stepper-ring": "rgba(194, 109, 130, 0.4)",
            "--stepper-solid-hover": "brightness(1.08)",
          } as CSSProperties
        }
        completedContent={
          <div className="flex w-full flex-col gap-5 py-2 text-theme-black">
            <p className="text-4xl font-semibold leading-[44px]">¡Listo!</p>
            <p className="text-2xl font-semibold leading-8">
              En breve te contactaremos para fijar una fecha
            </p>
            <button
              type="button"
              className="mt-2 inline-flex w-full max-w-[353px] items-center justify-center rounded-full bg-accent px-8 py-2 text-base font-semibold leading-6 text-theme-white transition-colors hover:bg-accent-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
              aria-label="Abrir WhatsApp con tu solicitud"
              tabIndex={0}
              onClick={openWhatsAppWithForm}
            >
              Abrir WhatsApp
            </button>
          </div>
        }
      >
        <Step title="Tu masaje">
          <div className="flex w-full flex-col gap-6 py-2">
            {!hideMassageSelect && (
              <div
                className="relative flex w-full flex-col gap-2"
                ref={dropdownRef}
              >
                <label className={labelClassName} htmlFor={`${formId}-massages`}>
                  ¿Qué necesitas?
                </label>
                <div
                  id={`${formId}-massages`}
                  className={[
                    "flex min-h-12 w-full items-center gap-3 rounded-lg border bg-theme-white px-4 py-2.5",
                    errors.massageIds
                      ? "border-accent"
                      : "border-accent-light/80",
                  ].join(" ")}
                >
                  <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 overflow-hidden">
                    {selectedMassages.length === 0 ? (
                      <button
                        type="button"
                        className="text-left text-base text-theme-black/55"
                        aria-expanded={isDropdownOpen}
                        aria-controls={`${formId}-massage-list`}
                        aria-haspopup="listbox"
                        tabIndex={0}
                        onClick={() => setIsDropdownOpen(true)}
                        onKeyDown={(event) => {
                          if (event.key === "Enter" || event.key === " ") {
                            event.preventDefault();
                            setIsDropdownOpen(true);
                          }
                        }}
                      >
                        Selecciona uno o varios
                      </button>
                    ) : (
                      selectedMassages.map((massage) => (
                        <span
                          key={massage.id}
                          className="inline-flex items-center gap-2.5 rounded-lg bg-accent-light px-2.5 py-1 text-sm font-semibold uppercase leading-5 tracking-[1px] text-theme-black"
                        >
                          {massage.chipLabel}
                          <button
                            type="button"
                            className="inline-flex size-[7.5px] items-center justify-center"
                            aria-label={`Quitar ${massage.title}`}
                            tabIndex={0}
                            onClick={() => handleRemoveMassage(massage.id)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                handleRemoveMassage(massage.id);
                              }
                            }}
                          >
                            <img
                              src="/icons/form/chip-close.svg"
                              alt=""
                              width={8}
                              height={8}
                              className="size-[7.5px]"
                            />
                          </button>
                        </span>
                      ))
                    )}
                  </div>

                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      className="inline-flex size-6 items-center justify-center"
                      aria-expanded={isDropdownOpen}
                      aria-controls={`${formId}-massage-list`}
                      aria-haspopup="listbox"
                      aria-label={
                        isDropdownOpen ? "Cerrar lista" : "Abrir lista"
                      }
                      tabIndex={0}
                      onClick={() => setIsDropdownOpen((open) => !open)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setIsDropdownOpen((open) => !open);
                        }
                        if (event.key === "Escape") {
                          setIsDropdownOpen(false);
                        }
                      }}
                    >
                      <img
                        src="/icons/form/chevron-down.svg"
                        alt=""
                        width={24}
                        height={24}
                        className={[
                          "size-6 transition-transform",
                          isDropdownOpen ? "rotate-180" : "",
                        ].join(" ")}
                      />
                    </button>
                  </div>
                </div>

                {isDropdownOpen && (
                  <ul
                    id={`${formId}-massage-list`}
                    role="listbox"
                    aria-multiselectable="true"
                    aria-label="Masajes disponibles"
                    className="absolute top-[calc(100%+4px)] z-30 max-h-none w-full overflow-visible rounded-lg border border-accent-light/80 bg-theme-white py-2 shadow-sm"
                  >
                    {massageOptions.map((option) => {
                      const isSelected = form.massageIds.includes(option.id);
                      return (
                        <li
                          key={option.id}
                          role="option"
                          aria-selected={isSelected}
                        >
                          <button
                            type="button"
                            className={[
                              "flex w-full items-center justify-between px-4 py-2.5 text-left text-base transition-colors hover:bg-accent-lighter",
                              isSelected
                                ? "bg-accent-light font-semibold"
                                : "",
                            ].join(" ")}
                            tabIndex={0}
                            onClick={() => handleToggleMassage(option.id)}
                            onKeyDown={(event) => {
                              if (event.key === "Enter" || event.key === " ") {
                                event.preventDefault();
                                handleToggleMassage(option.id);
                              }
                            }}
                          >
                            <span>{option.title}</span>
                            {isSelected && (
                              <img
                                src="/icons/form/check.svg"
                                alt=""
                                width={16}
                                height={16}
                                className="size-4"
                              />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                )}

                {errors.massageIds && (
                  <p className="text-sm text-accent" role="alert">
                    {errors.massageIds}
                  </p>
                )}
              </div>
            )}

            <div className="flex w-full flex-col gap-2">
              <label
                className={labelClassName}
                htmlFor={`${formId}-objections`}
              >
                Comentarios
              </label>
              <textarea
                id={`${formId}-objections`}
                name="objections"
                rows={5}
                value={form.objections}
                placeholder="Alergias, molestias, preferencias…"
                className={`${inputClassName} min-h-40 resize-y`}
                onChange={(event) =>
                  handleFieldChange("objections", event.target.value)
                }
              />
            </div>
          </div>
        </Step>

        <Step title="Contacto">
          <div className="flex w-full flex-col gap-6 py-2">
            <div className="flex w-full flex-col gap-2">
              <label
                className={labelClassName}
                htmlFor={`${formId}-firstName`}
              >
                Nombre
              </label>
              <input
                id={`${formId}-firstName`}
                name="firstName"
                type="text"
                autoComplete="given-name"
                value={form.firstName}
                className={inputClassName}
                aria-invalid={Boolean(errors.firstName)}
                onChange={(event) =>
                  handleFieldChange("firstName", event.target.value)
                }
              />
              {errors.firstName && (
                <p className="text-sm text-accent" role="alert">
                  {errors.firstName}
                </p>
              )}
            </div>

            <div className="flex w-full flex-col gap-2">
              <label className={labelClassName} htmlFor={`${formId}-lastName`}>
                Apellidos
              </label>
              <input
                id={`${formId}-lastName`}
                name="lastName"
                type="text"
                autoComplete="family-name"
                value={form.lastName}
                className={inputClassName}
                aria-invalid={Boolean(errors.lastName)}
                onChange={(event) =>
                  handleFieldChange("lastName", event.target.value)
                }
              />
              {errors.lastName && (
                <p className="text-sm text-accent" role="alert">
                  {errors.lastName}
                </p>
              )}
            </div>
          </div>
        </Step>
      </Stepper>
    </div>
  );
};
