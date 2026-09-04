type Props = { className?: string; tone?: "navy" | "light" };

/** CivicAI mark: pillared bank building, three connected nodes, orbital swoosh. */
export function LogoMark({ className = "h-8 w-8", tone = "navy" }: Props) {
  const main = tone === "light" ? "#FFFFFF" : "#132A53";
  const blue = tone === "light" ? "#79B0FF" : "#1F6BF0";
  return (
    <svg viewBox="0 0 64 64" className={className} fill="none" aria-hidden="true">
      <path d="M6 40c6 8 20 13 32 13s21-4 24-10" stroke={blue} strokeWidth="4" strokeLinecap="round" />
      <circle cx="32" cy="9" r="4" fill={blue} />
      <circle cx="17" cy="17" r="4" fill={blue} />
      <circle cx="47" cy="17" r="4" fill={blue} />
      <path d="M32 9 17 17M32 9l15 8" stroke={blue} strokeWidth="1.8" />
      <path d="M32 17 12 30h40L32 17Z" fill={main} />
      <rect x="16" y="32" width="5" height="17" rx="1" fill={main} />
      <rect x="25" y="32" width="5" height="17" rx="1" fill={main} />
      <rect x="34" y="32" width="5" height="17" rx="1" fill={main} />
      <rect x="43" y="32" width="5" height="17" rx="1" fill={main} />
      <rect x="12" y="50" width="40" height="4" rx="1.5" fill={main} />
    </svg>
  );
}

export function LogoWordmark({
  size = "md",
  tone = "navy",
  tagline = true,
}: {
  size?: "sm" | "md" | "lg";
  tone?: "navy" | "light";
  tagline?: boolean;
}) {
  const text = tone === "light" ? "text-white" : "text-navy";
  const accent = tone === "light" ? "text-[#79B0FF]" : "text-primary";
  const sizes = { sm: "text-lg", md: "text-2xl", lg: "text-4xl" }[size];
  const marks = { sm: "h-6 w-6", md: "h-9 w-9", lg: "h-16 w-16" }[size];
  return (
    <div className="flex items-center gap-2">
      <LogoMark className={marks} tone={tone} />
      <div dir="ltr" className="leading-none">
        <div className={`font-bold tracking-tight ${sizes} ${text}`}>
          Civic<span className={accent}>AI</span>
        </div>
        {tagline && (
          <div
            className={`mt-0.5 text-[9px] ${
              tone === "light" ? "text-white/70" : "text-muted-foreground"
            }`}
          >
            pay from your bank, anywhere
          </div>
        )}
      </div>
    </div>
  );
}
