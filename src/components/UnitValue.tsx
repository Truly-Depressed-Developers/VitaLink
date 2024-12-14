import * as React from "react";

export function UnitValue({value, unit}: { value: string; unit: string }) {
  return (
    <p>
      <span className="text-2xl mr-2">{value}</span>
      <span className="text-xs text-[#929292]">{unit}</span>
    </p>
  );
}
