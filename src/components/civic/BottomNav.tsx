import { Link } from "@tanstack/react-router";
import { CreditCard, Home, QrCode, User, Users } from "lucide-react";
import { useI18n } from "@/lib/i18n";
import { useCurrentPath } from "./Shell";

const items = [
  { to: "/home", key: "nav.home", Icon: Home },
  { to: "/cards", key: "nav.cards", Icon: CreditCard },
  { to: "/scan", key: "nav.scan", Icon: QrCode, center: true },
  { to: "/recipients", key: "nav.recipients", Icon: Users },
  { to: "/profile", key: "nav.profile", Icon: User },
] as const;

export function BottomNav() {
  const { t } = useI18n();
  const path = useCurrentPath();

  return (
    <nav className="relative z-30 border-t border-border bg-card px-2 pb-[max(env(safe-area-inset-bottom),0.5rem)] pt-2">
      <ul className="grid grid-cols-5 items-end">
        {items.map(({ to, key, Icon, center }) => {
          const active = path === to;
          if (center) {
            return (
              <li key={to} className="flex justify-center">
                <Link to={to} className="-mt-8 flex flex-col items-center gap-1">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-float transition-transform active:scale-95">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="text-[10px] font-medium text-primary">{t(key)}</span>
                </Link>
              </li>
            );
          }
          return (
            <li key={to}>
              <Link
                to={to}
                className={`flex flex-col items-center gap-1 py-1.5 ${
                  active ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className={`h-[22px] w-[22px] ${active ? "stroke-[2.4]" : ""}`} />
                <span className={`text-[10px] ${active ? "font-semibold" : "font-medium"}`}>
                  {t(key)}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
