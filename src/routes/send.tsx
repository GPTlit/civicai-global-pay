import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CheckCircle2, ChevronDown, UserRound } from "lucide-react";
import { useMemo, useState } from "react";
import { Card, Field, Row, inputClass } from "@/components/civic/Field";
import { PrimaryButton, ScreenHeader } from "@/components/civic/Shell";
import { AppShell } from "@/components/civic/Shell";
import { useI18n } from "@/lib/i18n";
import {
  FEES,
  RATES,
  convert,
  formatMoney,
  useStore,
  type Currency,
} from "@/lib/store";

export const Route = createFileRoute("/send")({
  head: () => ({
    meta: [
      { title: "Send money internationally — CivicAI" },
      {
        name: "description",
        content: "Send money abroad from your CivicAI balance with live rates and clear fees.",
      },
      { property: "og:title", content: "Send money internationally — CivicAI" },
      {
        property: "og:description",
        content: "Send money abroad from your CivicAI balance with live rates and clear fees.",
      },
    ],
  }),
  component: SendMoney,
});

const purposes = ["purpose.invoice", "purpose.family", "purpose.goods", "purpose.education"];

function SendMoney() {
  const { t } = useI18n();
  const navigate = useNavigate();
  const { balance, recipients, sendMoney } = useStore();

  const [step, setStep] = useState<"form" | "review" | "done">("form");
  const [amount, setAmount] = useState("100");
  const [from] = useState<Currency>("MRU");
  const [to, setTo] = useState<Currency>("USD");
  const [recipientId, setRecipientId] = useState(recipients[0]?.id ?? "");
  const [purpose, setPurpose] = useState(purposes[0]!);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [txId, setTxId] = useState("");

  const value = Number(amount) || 0;
  const recipient = recipients.find((r) => r.id === recipientId);
  const received = useMemo(() => convert(value, from, to), [value, from, to]);
  const fee = FEES.transferFlat;
  const total = value * RATES[from] + fee;

  const submit = () => {
    if (!recipient) return setError(t("send.selectRecipient"));
    if (value <= 0) return setError(t("send.insufficient"));
    if (total > balance) return setError(t("send.insufficient"));
    setError("");
    setStep("review");
  };

  const confirm = () => {
    if (!recipient) return;
    setBusy(true);
    setTimeout(() => {
      const tx = sendMoney({ amount: value, from, to, recipient, purpose: t(purpose) });
      setTxId(tx.id);
      setBusy(false);
      setStep("done");
    }, 1200);
  };

  if (step === "done") {
    return (
      <AppShell>
        <div className="flex min-h-[100dvh] flex-col items-center justify-center gap-4 px-6 text-center">
          <CheckCircle2 className="h-20 w-20 text-success" strokeWidth={1.5} />
          <h1 className="text-xl font-bold text-foreground">{t("send.success")}</h1>
          <p dir="ltr" className="text-[24px] font-bold text-navy">
            {formatMoney(received, to)}
          </p>
          <p className="text-[13px] text-muted-foreground">{recipient?.name}</p>
          <div className="mt-6 w-full space-y-3">
            <PrimaryButton onClick={() => navigate({ to: "/history/$id", params: { id: txId } })}>
              {t("receipt.title")}
            </PrimaryButton>
            <button
              onClick={() => navigate({ to: "/home" })}
              className="w-full rounded-xl border border-border bg-card px-5 py-3.5 text-[15px] font-semibold text-foreground"
            >
              {t("done")}
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <ScreenHeader
        title={step === "form" ? t("send.title") : t("send.review")}
        onBack={() => (step === "review" ? setStep("form") : navigate({ to: "/home" }))}
      />

      <div className="space-y-4 p-4 pb-10">
        {step === "form" ? (
          <>
            <Card>
              <span className="text-[13px] text-muted-foreground">{t("send.you")}</span>
              <div dir="ltr" className="mt-2 flex items-center gap-2">
                <input
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value.replace(/[^\d.]/g, ""))}
                  className="w-full bg-transparent text-[32px] font-bold text-navy outline-none"
                />
                <span className="rounded-lg bg-secondary px-3 py-1.5 text-[13px] font-bold text-foreground">
                  {from}
                </span>
              </div>
              <p className="mt-1 text-[12px] text-muted-foreground">
                {t("send.available")}: {formatMoney(balance, "MRU")}
              </p>
            </Card>

            <Card>
              <span className="text-[13px] text-muted-foreground">{t("send.recipientGets")}</span>
              <div dir="ltr" className="mt-2 flex items-center justify-between gap-2">
                <span className="text-[32px] font-bold text-primary">
                  {received.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                </span>
                <div className="relative">
                  <select
                    aria-label="currency"
                    value={to}
                    onChange={(e) => setTo(e.target.value as Currency)}
                    className="appearance-none rounded-lg bg-secondary py-1.5 pl-3 pr-8 text-[13px] font-bold text-foreground outline-none"
                  >
                    {(["USD", "EUR", "GBP", "MRU"] as Currency[]).map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute right-2 top-2 h-4 w-4 text-muted-foreground" />
                </div>
              </div>
            </Card>

            <Card>
              <Row
                label={t("send.rate")}
                value={`1 ${to} = ${(RATES[to] / RATES[from]).toFixed(2)} ${from}`}
              />
              <Row label={t("send.fee")} value={formatMoney(fee, "MRU")} />
              <div className="my-1 h-px bg-border" />
              <Row label={t("send.total")} value={formatMoney(total, "MRU")} strong />
            </Card>

            <Field label={t("send.recipient")}>
              <select
                value={recipientId}
                onChange={(e) => setRecipientId(e.target.value)}
                className={inputClass}
              >
                <option value="">{t("send.selectRecipient")}</option>
                {recipients.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} — {r.country}
                  </option>
                ))}
              </select>
            </Field>

            <Field label={t("send.purpose")}>
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className={inputClass}
              >
                {purposes.map((p) => (
                  <option key={p} value={p}>
                    {t(p)}
                  </option>
                ))}
              </select>
            </Field>

            {error && <p className="text-sm text-destructive">{error}</p>}
            <PrimaryButton onClick={submit}>{t("send.review")}</PrimaryButton>
          </>
        ) : (
          <>
            <Card className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-primary">
                <UserRound className="h-6 w-6" />
              </span>
              <div>
                <p className="text-[15px] font-semibold text-foreground">{recipient?.name}</p>
                <p className="text-[12px] text-muted-foreground">{recipient?.contact}</p>
              </div>
            </Card>

            <Card>
              <Row label={t("send.you")} value={formatMoney(value, from)} />
              <Row label={t("send.recipientGets")} value={formatMoney(received, to)} />
              <Row
                label={t("send.rate")}
                value={`1 ${to} = ${(RATES[to] / RATES[from]).toFixed(2)} ${from}`}
              />
              <Row label={t("send.fee")} value={formatMoney(fee, "MRU")} />
              <Row label={t("send.purpose")} value={t(purpose)} />
              <div className="my-1 h-px bg-border" />
              <Row label={t("send.total")} value={formatMoney(total, "MRU")} strong />
            </Card>

            <p className="text-[11px] leading-relaxed text-muted-foreground">{t("common.mock")}</p>
            <PrimaryButton loading={busy} onClick={confirm}>
              {busy ? t("send.processing") : t("send.confirm")}
            </PrimaryButton>
          </>
        )}
      </div>
    </AppShell>
  );
}
