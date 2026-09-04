import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight, Globe } from "lucide-react";
import type { ReactNode } from "react";
import { LANGS, langLabel, useI18n } from "@/lib/i18n";

/**
 * Mobile-first app surface. On phones it fills the viewport; on tablet/desktop
 * it is centred in a device-proportioned column so the prototype's composition
 * and proportions are preserved instead of being stretched.
 */
export function AppShell({
  children,
  bottomNav,
}: {
  children: ReactNode;
  bottomNav?: ReactNode;
}) {
  const { dir } = useI18n();
  return (
    <div dir={dir} className="min-h-[100dvh] w-full bg-[#eef2f9] md:py-8">
      <div className="mx-auto flex min-h-[100dvh] w-full max-w-[430px] flex-col bg-background shadow-none md:min-h-[860px] md:rounded-[2.5rem] md:border md:border-border md:shadow-card">
        <div className="relative flex flex-1 flex-col overflow-hidden md:rounded-[2.5rem]">
          <div className="no-scrollbar flex-1 overflow-y-auto">{children}</div>
          {bottomNav}
        </div>
      </div>
    </div>
  );
}

export function ScreenHeader({
  title,
  right,
  onBack,
  variant = "light",
}: {
  title: string;
  right?: ReactNode;
  onBack?: () => void;
  variant?: "light" | "navy";
}) {
  const navigate = useNavigate();
  const { dir } = useI18n();
  const Back = dir === "rtl" ? ChevronRight : ChevronLeft;
  const navy = variant === "navy";
  return (
    <header
      className={`sticky top-0 z-20 flex items-center justify-between gap-2 px-4 py-3.5 ${
        navy ? "bg-navy text-navy-foreground" : "border-b border-border bg-card text-foreground"
      }`}
    >
      <button
        aria-label="back"
        onClick={() => (onBack ? onBack() : navigate({ to: "/home" }))}
        className={`grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors ${
          navy ? "hover:bg-white/10" : "hover:bg-secondary"
        }`}
      >
        <Back className="h-5 w-5" />
      </button>
      <h1 className="min-w-0 truncate text-base font-semibold">{title}</h1>
      <div className="flex h-9 min-w-9 shrink-0 items-center justify-end">{right}</div>
    </header>
  );
}

export function LanguageSelector({ tone = "navy" }: { tone?: "navy" | "light" }) {
  const { lang, setLang } = useI18n();
  return (
    <label
      className={`flex items-center gap-1.5 rounded-full px-2 py-1 text-xs font-medium ${
        tone === "light" ? "text-white/80" : "text-muted-foreground"
      }`}
    >
      <Globe className="h-4 w-4" />
      <select
        aria-label="language"
        value={lang}
        onChange={(e) => setLang(e.target.value as (typeof LANGS)[number])}
        className="cursor-pointer bg-transparent outline-none"
      >
        {LANGS.map((l) => (
          <option key={l} value={l} className="text-foreground">
            {langLabel[l]}
          </option>
        ))}
      </select>
    </label>
  );
}

export function PrimaryButton({
  children,
  onClick,
  disabled,
  type = "button",
  loading,
}: {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit";
  loading?: boolean;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className="flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-[15px] font-semibold text-primary-foreground shadow-soft transition-all active:scale-[0.985] disabled:opacity-50"
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-primary-foreground/40 border-t-primary-foreground" />
      )}
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center justify-center rounded-xl border border-border bg-card px-5 py-3.5 text-[15px] font-semibold text-foreground transition-colors active:bg-secondary"
    >
      {children}
    </button>
  );
}

export function EmptyState({ title, icon }: { title: string; icon?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-3 px-6 py-14 text-center">
      <div className="grid h-14 w-14 place-items-center rounded-full bg-secondary text-muted-foreground">
        {icon}
      </div>
      <p className="text-sm text-muted-foreground">{title}</p>
    </div>
  );
}

export function BackLink({ to, label }: { to: string; label: string }) {
  return (
    <Link to={to} className="text-sm font-medium text-primary">
      {label}
    </Link>
  );
}

export function useCurrentPath() {
  return useRouterState({ select: (s) => s.location.pathname });
}
