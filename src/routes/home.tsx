import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowDownToLine,
  Bell,
  Clock,
  Eye,
  EyeOff,
  Gift,
  Globe2,
  Plus,
  Repeat,
  Send,
  Store,
} from "lucide-react";
import { useEffect, useState } from "react";
import { BottomNav } from "@/components/civic/BottomNav";
import { BrandMark } from "@/components/civic/Brand";
import { AppShell } from "@/components/civic/Shell";
import { LogoMark } from "@/components/civic/Logo";
import { useI18n } from "@/lib/i18n";
import { formatMoney, useStore } from "@/lib/store";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Your CivicAI dashboard" },
      {
        name: "description",
        content: "See your balance, send money, top up and track recent transactions.",
      },
      { property: "og:title", content: "Your CivicAI dashboard" },
      {
        property: "og:description",
        content: "See your balance, send money, top up and track recent transactions.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t, lang } = useI18n();
  const navigate = useNavigate();
  const { ready, session, balance, transactions, notifications } = useStore();
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (ready && !session) navigate({ to: "/auth", replace: true });
  }, [ready, session, navigate]);

  const unread = notifications.filter((n) => !n.read).length;

  const actions = [
    { to: "/send" as const, key: "send", Icon: Send },
    { to: "/pay" as const, key: "pay", Icon: Store },
    { to: "/topup" as const, key: "topup", Icon: ArrowDownToLine },
    { to: "/history" as const, key: "history", Icon: Clock },
  ];

  const quick = [
    { to: "/send" as const, key: "international", Icon: Globe2 },
    { to: "/pay" as const, key: "merchants", Icon: Store },
    { to: "/subscriptions" as const, key: "subscriptions", Icon: Repeat },
    { to: "/pay" as const, key: "donations", Icon: Gift },
  ];

  return (
    <AppShell bottomNav={<BottomNav />}>
      <div className="bg-navy pb-16 pt-4 text-navy-foreground">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-white/10">
              <LogoMark className="h-6 w-6" tone="light" />
            </span>
            <div>
              <p className="text-[11px] text-white/55">CivicAI</p>
              <p className="text-[14px] font-semibold">{session?.name ?? "—"}</p>
            </div>
          </div>
          <Link
            to="/notifications"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-white/10"
          >
            <Bell className="h-5 w-5" />
            {unread > 0 && (
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#FF6B6B]" />
            )}
          </Link>
        </div>
      </div>

      <div className="-mt-12 px-4">
        <div className="rounded-2xl bg-card p-5 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-[13px] text-muted-foreground">{t("home.balance")}</span>
            <button
              aria-label="toggle balance"
              onClick={() => setHidden((v) => !v)}
              className="text-muted-foreground"
            >
              {hidden ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          <p dir="ltr" className="mt-1.5 text-[30px] font-bold tracking-tight text-navy">
            {hidden ? "•••••• MRU" : formatMoney(balance, "MRU")}
          </p>
          <Link
            to="/topup"
            className="mt-4 inline-flex h-10 items-center gap-1.5 rounded-xl bg-primary px-4 text-[13px] font-semibold text-primary-foreground shadow-soft"
          >
            <Plus className="h-4 w-4" /> {t("topup")}
          </Link>
        </div>
      </div>

      <div className="mt-5 grid grid-cols-4 gap-2 px-4">
        {actions.map(({ to, key, Icon }) => (
          <Link key={key} to={to} className="flex flex-col items-center gap-2">
            <span className="grid h-14 w-14 place-items-center rounded-2xl bg-accent text-primary">
              <Icon className="h-6 w-6" />
            </span>
            <span className="text-[11px] font-medium text-foreground">{t(key)}</span>
          </Link>
        ))}
      </div>

      <section className="mt-6 px-4">
        <h2 className="mb-3 text-[15px] font-bold text-foreground">{t("home.quickPay")}</h2>
        <div className="grid grid-cols-2 gap-3">
          {quick.map(({ to, key, Icon }) => (
            <Link
              key={key}
              to={to}
              className="flex items-center gap-3 rounded-2xl border border-border bg-card p-3.5 shadow-soft"
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-secondary text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <span className="text-[13px] font-semibold text-foreground">{t(key)}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 px-4 pb-6">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-[15px] font-bold text-foreground">{t("home.recent")}</h2>
          <Link to="/history" className="text-[13px] font-semibold text-primary">
            {t("home.seeAll")}
          </Link>
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-soft">
          {transactions.slice(0, 5).map((tx, i) => (
            <Link
              key={tx.id}
              to="/history/$id"
              params={{ id: tx.id }}
              className={`flex items-center gap-3 px-4 py-3 ${i > 0 ? "border-t border-border" : ""}`}
            >
              <BrandMark brand={tx.brand} name={tx.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-semibold text-foreground">{tx.name}</p>
                <p className="truncate text-[12px] text-muted-foreground">
                  {new Date(tx.date).toLocaleDateString(lang === "ar" ? "ar-MA" : lang, {
                    day: "numeric",
                    month: "short",
                  })}{" "}
                  · {tx.subtitle}
                </p>
              </div>
              <span
                dir="ltr"
                className={`shrink-0 text-[14px] font-bold ${
                  tx.amount < 0 ? "text-foreground" : "text-success"
                }`}
              >
                {tx.amount < 0 ? "-" : "+"}
                {formatMoney(Math.abs(tx.amount), tx.currency)}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </AppShell>
  );
}
