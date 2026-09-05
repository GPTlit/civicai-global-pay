import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Repeat,
  Store,
  Wallet,
} from "lucide-react";

const brandStyles: Record<string, { bg: string; fg: string; label: string }> = {
  netflix: { bg: "#000000", fg: "#E50914", label: "N" },
  amazon: { bg: "#131921", fg: "#FF9900", label: "a" },
  apple: { bg: "#111111", fg: "#FFFFFF", label: "" },
  spotify: { bg: "#1DB954", fg: "#FFFFFF", label: "S" },
  microsoft: { bg: "#0F172A", fg: "#00A4EF", label: "M" },
};

/** Square logo tile used in transaction and subscription rows. */
export function BrandMark({
  brand,
  name,
  size = 44,
}: {
  brand?: string | undefined;
  name: string;
  size?: number;
}) {
  const style = brand ? brandStyles[brand] : undefined;
  const box = { width: size, height: size };

  if (style) {
    return (
      <div
        className="grid shrink-0 place-items-center rounded-xl text-lg font-bold"
        style={{ ...box, backgroundColor: style.bg, color: style.fg }}
      >
        {style.label || name.slice(0, 1)}
      </div>
    );
  }

  const Icon =
    brand === "topup"
      ? ArrowDownLeft
      : brand === "transfer"
        ? ArrowUpRight
        : brand === "merchant"
          ? Store
          : brand === "card"
            ? CreditCard
            : brand === "subscription"
              ? Repeat
              : Wallet;

  return (
    <div
      className="grid shrink-0 place-items-center rounded-xl bg-secondary text-foreground"
      style={box}
    >
      <Icon className="h-5 w-5" />
    </div>
  );
}
