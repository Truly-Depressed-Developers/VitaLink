import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

export default function AddButton({ className, onClick }: { className?: string, onClick?: () => void }) {
  return (
    <button
      className={cn(
        "fixed bottom-4 right-4 z-50 rounded-full bg-primary p-3",
        className,
      )}
      onClick={onClick}
    >
      <Plus />
    </button>
  );
}
