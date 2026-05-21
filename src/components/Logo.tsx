import logoSrc from "@/assets/logo-waldhof.webp";

interface LogoProps {
  className?: string;
  variant?: "ink" | "bg";
  withWordmark?: boolean;
  ariaLabel?: string;
}

/**
 * Brand logo. The provided SVG ships as a single colored asset, so we control
 * tinting via a CSS mask — stays sharp on every screen and keeps a single source.
 */
export default function Logo({
  className = "h-9 w-9",
  variant = "ink",
  withWordmark = false,
  ariaLabel = "Rasen vom Waldhof",
}: LogoProps) {
  const tint = variant === "bg" ? "bg-bg" : "bg-ink";
  return (
    <span aria-label={ariaLabel} role="img" className="inline-flex items-center gap-3">
      <span
        aria-hidden
        className={`${tint} ${className} block`}
        style={{
          WebkitMaskImage: `url(${logoSrc.src})`,
          maskImage: `url(${logoSrc.src})`,
          WebkitMaskRepeat: "no-repeat",
          maskRepeat: "no-repeat",
          WebkitMaskPosition: "center",
          maskPosition: "center",
          WebkitMaskSize: "contain",
          maskSize: "contain",
        }}
      />
      {withWordmark && (
        <span className="font-display text-2xl leading-none tracking-tight">Waldhof</span>
      )}
    </span>
  );
}
