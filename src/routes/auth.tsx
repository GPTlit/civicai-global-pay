import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Apple, ChevronLeft, Mail, ShieldCheck, Smartphone } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { LogoWordmark } from "@/components/civic/Logo";
import { LanguageSelector, PrimaryButton } from "@/components/civic/Shell";
import { useI18n } from "@/lib/i18n";
import { useStore } from "@/lib/store";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Sign in to CivicAI" },
      {
        name: "description",
        content: "Log in or create a CivicAI account with your Mauritanian phone number.",
      },
      { property: "og:title", content: "Sign in to CivicAI" },
      {
        property: "og:description",
        content: "Log in or create a CivicAI account with your Mauritanian phone number.",
      },
    ],
  }),
  component: Auth,
});

type Step = "welcome" | "phone" | "otp";

function Auth() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { login, session, ready } = useStore();
  const [step, setStep] = useState<Step>("welcome");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [busy, setBusy] = useState(false);
  const inputs = useRef<Array<HTMLInputElement | null>>([]);

  useEffect(() => {
    if (ready && session) navigate({ to: "/home", replace: true });
  }, [ready, session, navigate]);

  const submitPhone = () => {
    const digits = phone.replace(/\D/g, "");
    if (digits.length !== 8) return setError(t("auth.invalidPhone"));
    setError("");
    setStep("otp");
  };

  const setDigit = (i: number, v: string) => {
    const d = v.replace(/\D/g, "").slice(-1);
    const next = [...code];
    next[i] = d;
    setCode(next);
    if (d && i < 5) inputs.current[i + 1]?.focus();
    if (next.every((x) => x)) verify(next.join(""));
  };

  const verify = (value: string) => {
    if (value !== "123456") {
      setError(t("auth.invalidOtp"));
      setCode(["", "", "", "", "", ""]);
      inputs.current[0]?.focus();
      return;
    }
    setError("");
    setBusy(true);
    setTimeout(() => {
      login(`+222 ${phone.replace(/\D/g, "")}`);
      navigate({ to: "/home", replace: true });
    }, 900);
  };

  return (
    <div className="flex min-h-[100dvh] w-full justify-center bg-navy">
      <div className="flex w-full max-w-[430px] flex-col text-navy-foreground">
        <div className="flex items-center justify-between px-4 pt-4">
          {step === "welcome" ? (
            <span className="h-9 w-9" />
          ) : (
            <button
              aria-label="back"
              onClick={() => setStep(step === "otp" ? "phone" : "welcome")}
              className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10"
            >
              <ChevronLeft className="h-5 w-5 flip-rtl" />
            </button>
          )}
          <LanguageSelector tone="light" />
        </div>

        {step === "welcome" && (
          <div className="fade-up flex flex-1 flex-col px-6 pb-10">
            <div className="flex flex-1 flex-col items-center justify-center gap-5 text-center">
              <LogoWordmark size="lg" tone="light" tagline />
              <h1 className="text-2xl font-bold">{t("auth.welcome")}</h1>
              <p className="max-w-[300px] text-[14px] leading-relaxed text-white/70">
                {t("auth.welcomeSub")}
              </p>
            </div>
            <div className="space-y-3">
              <PrimaryButton onClick={() => setStep("phone")}>{t("auth.login")}</PrimaryButton>
              <button
                onClick={() => setStep("phone")}
                className="h-13 w-full rounded-xl border border-white/25 bg-transparent px-5 py-3.5 text-[15px] font-semibold text-white transition-colors active:bg-white/10"
              >
                {t("auth.signup")}
              </button>
              <div className="flex items-center gap-3 py-1 text-xs text-white/50">
                <span className="h-px flex-1 bg-white/15" />
                {t("auth.or")}
                <span className="h-px flex-1 bg-white/15" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 text-sm font-medium text-white">
                  <Mail className="h-4 w-4" /> Google
                </button>
                <button className="flex h-12 items-center justify-center gap-2 rounded-xl bg-white/10 text-sm font-medium text-white">
                  <Apple className="h-4 w-4" /> Apple
                </button>
              </div>
              <p className="pt-2 text-center text-[11px] leading-relaxed text-white/45">
                {t("auth.terms")}{" "}
                <span className="text-[#79B0FF]">{t("auth.termsLink")}</span> ·{" "}
                <span className="text-[#79B0FF]">{t("auth.privacyLink")}</span>
              </p>
            </div>
          </div>
        )}

        {step === "phone" && (
          <div className="fade-up flex flex-1 flex-col px-6 pb-10 pt-6">
            <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
              <Smartphone className="h-7 w-7 text-[#79B0FF]" />
            </div>
            <h1 className="text-[22px] font-bold">{t("auth.phoneTitle")}</h1>
            <p className="mt-2 text-[14px] text-white/65">{t("auth.phoneDesc")}</p>

            <div className="mt-8">
              <span className="mb-1.5 block text-[13px] font-medium text-white/60">
                {t("auth.phoneLabel")}
              </span>
              <div dir="ltr" className="flex h-13 items-center gap-2 rounded-xl bg-white/10 px-3.5">
                <span className="text-[15px] font-semibold text-white/80">+222</span>
                <span className="h-6 w-px bg-white/20" />
                <input
                  inputMode="numeric"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  placeholder="44 55 66 77"
                  className="h-full flex-1 bg-transparent text-[16px] tracking-wide text-white outline-none placeholder:text-white/35"
                />
              </div>
              {error && <p className="mt-2 text-xs text-red-300">{error}</p>}
            </div>

            <div className="mt-auto pt-8">
              <PrimaryButton onClick={submitPhone}>{t("auth.sendCode")}</PrimaryButton>
            </div>
          </div>
        )}

        {step === "otp" && (
          <div className="fade-up flex flex-1 flex-col px-6 pb-10 pt-6">
            <div className="mb-8 grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
              <ShieldCheck className="h-7 w-7 text-[#79B0FF]" />
            </div>
            <h1 className="text-[22px] font-bold">{t("auth.otpTitle")}</h1>
            <p className="mt-2 text-[14px] text-white/65">
              {t("auth.otpDesc")}{" "}
              <span dir="ltr" className="font-semibold text-white">
                +222 {phone}
              </span>
            </p>

            <div dir="ltr" className="mt-8 flex justify-between gap-2">
              {code.map((d, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputs.current[i] = el;
                  }}
                  inputMode="numeric"
                  value={d}
                  onChange={(e) => setDigit(i, e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Backspace" && !code[i] && i > 0) inputs.current[i - 1]?.focus();
                  }}
                  className="h-14 w-12 rounded-xl bg-white/10 text-center text-xl font-bold text-white outline-none focus:ring-2 focus:ring-[#79B0FF]"
                />
              ))}
            </div>
            {error && <p className="mt-3 text-xs text-red-300">{error}</p>}
            <p className="mt-3 text-xs text-white/45">{t("auth.hint")}</p>

            <div className="mt-6 text-center text-[13px] text-white/60">
              {t("auth.noCode")}{" "}
              <button className="font-semibold text-[#79B0FF]">{t("auth.resend")}</button>
            </div>

            <div className="mt-auto pt-8">
              <PrimaryButton loading={busy} onClick={() => verify(code.join(""))}>
                {busy ? t("auth.verifying") : t("continue")}
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

