"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import {Card} from "@/components/ui/card";
import {UnitValue} from "@/components/UnitValue";
import {CustomCard} from "@/components/CustomCard";

export function HeartRateBarCard() {
  const [value, setValue] = React.useState(67)

  return <CustomCard title={"Tętno"}>
    <UnitValue value={value.toString()} unit="BPM"/>
    <Progress value={value} className="w-full h-2"/>
    <p className="text-xs text-[#929292] mt-3 uppercase">Zrelaksowany</p>
  </CustomCard>

}
