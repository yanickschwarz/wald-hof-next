import Reveal from "./Reveal";

interface BigStatProps {
  number: string;
  label: string;
  variant?: "ink" | "bg";
}

export default function BigStat({ number, label, variant = "ink" }: BigStatProps) {
  const isDark = variant === "bg";
  return (
    <Reveal as="div" className={`p-8 md:p-10 ${isDark ? "bg-ink text-bg" : "bg-bg text-ink"}`}>
      <p
        className="font-display leading-[0.9] text-moss"
        style={{ fontSize: "clamp(4rem, 9vw, 9rem)", letterSpacing: "-0.04em" }}
      >
        {number}
      </p>
      <p className={`mt-4 max-w-[24ch] text-sm ${isDark ? "text-bg/70" : "text-ink/70"}`}>
        {label}
      </p>
    </Reveal>
  );
}
