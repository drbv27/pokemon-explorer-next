import { Button } from "@/components/ui/button";
import { View, Grid, List } from "lucide-react";

interface ViewToggleProps {
  view: "grid" | "table";
  setView: (view: "grid" | "table") => void;
}

export function ViewToggle({ view, setView }: ViewToggleProps) {
  return (
    <div className="flex justify-center my-4 gap-2">
      <Button
        variant={view === "grid" ? "default" : "outline"}
        onClick={() => setView("grid")}
      >
        <Grid className="h-4 w-4 mr-2" />
        Grid
      </Button>
      <Button
        variant={view === "table" ? "default" : "outline"}
        onClick={() => setView("table")}
      >
        <List className="h-4 w-4 mr-2" />
        Table
      </Button>
    </div>
  );
}
