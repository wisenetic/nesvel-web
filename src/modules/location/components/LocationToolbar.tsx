import { SearchIcon } from "lucide-react";

import { Input } from "@/core/components/ui/input";

interface LocationToolbarProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function LocationToolbar({
  search,
  onSearchChange,
}: LocationToolbarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border bg-card/60 p-3">
      <div className="flex w-full items-center gap-2">
        <div className="relative w-full md:w-72">
          <SearchIcon className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search locations by name or ID..."
            className="pl-8 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
