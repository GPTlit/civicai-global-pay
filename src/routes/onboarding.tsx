import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CreditCard, Globe2, Landmark } from "lucide-react";
import { useState } from "react";
import { LanguageSelector, PrimaryButton } from "@/components/civic/Shell";
import { LogoWordmark } from "@/components/civic/Logo";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/onboarding")({
  head: () => ({
    meta: [
      { title: "Get started with CivicAI" },
      {
        name: "description",
        content: "Discover global payments, virtual cards and bank-backed infrastructure.",
      },
      { property: "og:title", content: "Get started with CivicAI" },
      {
        property: "og:description",
        content: "Discover global payments, virtual cards and bank-backed infrastructure.",
      },
    ],
  }),
  component: Onboarding,
});

const slides = [
  { key: "ob1", Icon: Globe2 },
  { key: "ob2", Icon: CreditCard },
  { key: "ob3", Icon: Landmark },
];

function Onboarding() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { finishOnboarding } = useStore();
  const [i, setI] = useState(0);
  const { Icon, key } = slides[i];

  const finish = () => {
    finishOnboarding();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <div className="flex min-h-[100dvh] w-full justify-center bg-navy">
      <div className="flex w-full max-w-[430px] flex-col px-6 pb-10 pt-6 text-navy-foreground">
        <div className="flex items-center justify-between">
          <LogoWordmark size="sm" tone="light" tagline={false} />
          <div className="flex items-center gap-1">
            <LanguageSelector tone="light" />
            <button onClick={finish} className="px-2 py-1 text-sm font-medium text-white/70">
              {t("skip")}
            </button>
          </div>
        </div>

        <div key={key} className="fade-up flex flex-1 flex-col items-center justify-center gap-6 text-center">
          <div className="grid h-32 w-32 place-items-center rounded-full bg-white/8 ring-1 ring-white/15">
            <Icon className="h-14 w-14 text-[#79B0FF]" strokeWidth={1.5} />
          </div>
          <div className="space-y-2">
            <h1 className="text-[26px] font-bold leading-tight">{t(`${key}.title`)}</h1>
            {t(`${key}.sub`) && (
              <p className="text-[15px] font-medium text-[#79B0FF]">{t(`${key}.sub`)}</p>
            )}
            <p className="mx-auto max-w-[300px] text-[14px] leading-relaxed text-white/70">
              {t(`${key}.desc`)}
            </p>
          </div>
        </div>

        <div className="mb-6 flex justify-center gap-2">
          {slides.map((s, idx) => (
            <span
              key={s.key}
              className={`h-2 rounded-full transition-all ${
                idx === i ? "w-6 bg-[#79B0FF]" : "w-2 bg-white/25"
              }`}
            />
          ))}
        </div>

        <PrimaryButton onClick={() => (i === slides.length - 1 ? finish() : setI(i + 1))}>
          {i === slides.length - 1 ? t("start") : t("next")}
        </PrimaryButton>
      </div>
    </div>
  );
}
