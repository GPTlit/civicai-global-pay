import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { LogoWordmark } from "@/components/civic/Logo";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CivicAI — International payments for Mauritanian banks" },
      {
        name: "description",
        content:
          "CivicAI lets you pay globally from your Mauritanian bank account with virtual cards, transfers and top-ups.",
      },
      { property: "og:title", content: "CivicAI — Pay from your bank, anywhere" },
      {
        property: "og:description",
        content:
          "International payment infrastructure for Mauritanian banks: virtual cards, transfers, top-ups.",
      },
    ],
  }),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const { t } = useI18n();
  const { ready, session, onboarded } = useStore();

  useEffect(() => {
    if (!ready) return;
    const id = setTimeout(() => {
      if (session) navigate({ to: "/home", replace: true });
      else if (onboarded) navigate({ to: "/auth", replace: true });
      else navigate({ to: "/onboarding", replace: true });
    }, 1500);
    return () => clearTimeout(id);
  }, [ready, session, onboarded, navigate]);

  return (
    <div className="grid min-h-[100dvh] w-full place-items-center bg-navy px-8 text-center">
      <div className="fade-up flex flex-col items-center gap-6">
        <LogoWordmark size="lg" tone="light" tagline />
        <p className="max-w-[280px] text-[11px] font-medium uppercase leading-relaxed tracking-[0.14em] text-white/60">
          {t("app.subtitle")}
        </p>
        <span className="mt-4 h-5 w-5 animate-spin rounded-full border-2 border-white/25 border-t-white" />
      </div>
    </div>
  );
}
