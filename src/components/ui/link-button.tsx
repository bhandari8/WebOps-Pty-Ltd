import Link from "next/link";
import type { ComponentProps } from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button";
import { cn } from "@/lib/utils";

type LinkButtonProps = ComponentProps<typeof Link> &
  VariantProps<typeof buttonVariants> & {
    /** Marketing-site buttons need a taller, more touch-friendly target than
     * the compact dashboard-style shadcn defaults (h-8/h-9). Set false for
     * dense admin contexts where the default sizing is appropriate. */
    marketing?: boolean;
  };

/**
 * A shadcn Button-styled `<Link>`, for CTAs that navigate rather than
 * submit/act. shadcn's Button primitive doesn't expose Radix-style asChild
 * polymorphism here, so this pairs `buttonVariants()` with next/link
 * directly — the same pattern shadcn's own docs recommend.
 */
export function LinkButton({
  variant,
  size,
  marketing = true,
  className,
  ...props
}: LinkButtonProps) {
  return (
    <Link
      className={cn(
        buttonVariants({ variant, size, className }),
        marketing && "h-11 px-6 text-sm rounded-md"
      )}
      {...props}
    />
  );
}
