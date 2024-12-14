import { cn } from "@/lib/utils";
import { State } from "./utils";

type Stat = {
  value: string;
  label: string;
  state: State;
};

export default function Stat({ value, label, state }: Stat) {
  return (
    <div>
      <p
        className={cn("text-2xl", {
          "text-green-600": state === "good",
          "text-red-500": state === "bad",
          "text-yellow-300": state === "mediocre",
        })}
      >
        {value}
      </p>
      <p className="text-xs text-[#929292]">{label}</p>
    </div>
  );
}
