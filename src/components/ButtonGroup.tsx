import { BUTTON_GROUP } from "@/lib/constants";
import { Button } from "./ui/button";

function ButtonGroup() {
  return (
    <div className="rounded  max-w-fit ">
      <div className="space-x-1 bg-muted px-2 py-1 rounded ">
        {BUTTON_GROUP.map((option) => (
          <Button
            size="sm"
            className="h-7 bg-muted hover:bg-background text-foreground hover:sha"
            key={option.title}
          >
            {option.title}
          </Button>
        ))}
      </div>
    </div>
  );
}

export default ButtonGroup;
