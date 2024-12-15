"use client";

import { CustomCard } from "@/components/CustomCard";
import { Switch } from "@/components/ui/switch";
import { cn, type Doctors, type Medicine } from "@/lib/utils";
import { useState } from "react";

export default function MedicineCard({ data }: { data: Medicine | Doctors }) {
  const [active, setActive] = useState(data.active);

  return (
    <CustomCard
      title={data.name}
      titleClassName="text-base -mb-1"
      titleConditionalStyles={{ "text-[#929292]": !active }}
    >
      <div className="flex justify-between">
        <h1 className={cn("mb-2 text-2xl", { "text-[#929292]": !active })}>
          {data.time}
        </h1>
        <Switch checked={active} onCheckedChange={setActive} className="mt-1" />
      </div>
      <p className="text-xs text-[#929292]">{data.days}</p>
    </CustomCard>
  );
}
