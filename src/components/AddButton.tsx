import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function AddButton({ className }: { className?: string }) {
  return (
    <button
      className={cn(
        "fixed bottom-4 right-4 z-50 rounded-full bg-primary p-3",
        className,
      )}
    >
      <Plus />
    </button>
  );
}
