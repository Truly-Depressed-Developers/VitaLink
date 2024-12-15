import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export default function SmallInput({
  className,
  defaultValue,
}: {
  className?: string;
  defaultValue?: number;
}) {
  return (
    <Input
      type="number"
      className={cn(
        "h-8 w-14 border-none bg-[#343434] text-center text-xs",
        className,
      )}
      defaultValue={defaultValue}
    />
  );
}
