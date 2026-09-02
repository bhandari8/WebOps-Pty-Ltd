import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * A simple infinite marquee: the track's children are duplicated and
 * scrolled via CSS animation (`animate-marquee`, defined in globals.css).
 * Pauses on hover/focus and respects prefers-reduced-motion.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  durationSeconds = 30,
}: {
  children: ReactNode;
  className?: string;
  reverse?: boolean;
  durationSeconds?: number;
}) {
  return (
    <div
      className={cn(
        "group flex w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className={cn(
            "flex shrink-0 items-center justify-around gap-12 pr-12 motion-safe:animate-marquee group-hover:[animation-play-state:paused]",
            reverse && "motion-safe:[animation-direction:reverse]"
          )}
          style={{ animationDuration: `${durationSeconds}s` }}
        >
          {children}
        </div>
      ))}
    </div>
  );
}
