"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Plus, Building2, Check } from "lucide-react";

const teams = [
  { id: 1, name: "Acme Inc", shortcut: "⌘1" },
  { id: 2, name: "Acme Corp.", shortcut: "⌘2" },
  { id: 3, name: "Evil Corp.", shortcut: "⌘3" },
];

export function TeamSwitcher() {
  const currentTeam = teams[2]; // e.g., Evil Corp

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-between px-4 py-2 rounded-none font-medium text-left"
        >
          <span className="flex items-center gap-2">
            <Building2 className="h-4 w-4" />
            {currentTeam.name}
          </span>
          <span className="text-xs text-muted-foreground">Free</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Teams</DropdownMenuLabel>
        {teams.map((team) => (
          <DropdownMenuItem
            key={team.id}
            className="flex justify-between items-center"
          >
            <span className="flex items-center gap-2">
              <Building2 className="h-4 w-4" />
              {team.name}
            </span>
            {team.name === currentTeam.name ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <span className="text-xs text-muted-foreground">
                {team.shortcut}
              </span>
            )}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
