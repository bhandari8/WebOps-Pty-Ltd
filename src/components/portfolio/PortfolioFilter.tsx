"use client";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PORTFOLIO_CATEGORIES } from "@/types/portfolio";

const OPTIONS = ["All", ...PORTFOLIO_CATEGORIES];

export function PortfolioFilter({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Tabs
      value={value}
      onValueChange={(v) => onChange(String(v))}
      aria-label="Filter portfolio by category"
    >
      <TabsList className="h-auto flex-wrap gap-1 bg-surface-muted p-1">
        {OPTIONS.map((option) => (
          <TabsTrigger key={option} value={option} className="px-3.5 py-1.5">
            {option}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
}
