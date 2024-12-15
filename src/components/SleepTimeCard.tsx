"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import {UnitValue} from "@/components/UnitValue";
import {CustomCard} from "@/components/CustomCard";
import {Clock8} from "lucide-react";

export function SleepTimeCard({from, to}: {from: string, to: string}) {
  return <CustomCard title={"Czas snu"} icon={<Clock8 size={18}/>}>
    <UnitValue value={calculateTimeDifference(from, to)} unit="h"/>
    <Progress value={100} className="w-full h-2"/>
    <div className="flex justify-between">
      <p className="text-xs text-[#929292] mt-3">{from}</p>
      <p className="text-xs text-[#929292] mt-3">{to}</p>
    </div>
  </CustomCard>

}


function calculateTimeDifference(from: string, to: string): string {
  const [fromHours, fromMinutes] = from.split(":").map(Number);
  const [toHours, toMinutes] = to.split(":").map(Number);

  const fromDate = new Date(0, 0, 0, fromHours, fromMinutes);
  const toDate = new Date(0, 0, 0, toHours, toMinutes);

  let diff = toDate.getTime() - fromDate.getTime();
  if (diff < 0) {
    diff += 24 * 60 * 60 * 1000; // add 24 hours if the difference is negative
  }

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  return `${hours}:${minutes.toString().padStart(2, "0")}`;
}

