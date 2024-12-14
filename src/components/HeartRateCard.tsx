"use client"

import * as React from "react"

import {UnitValue} from "@/components/UnitValue";
import {CustomCard} from "@/components/CustomCard";

const colors = [
  "#3F92FF",
  "#2F66DC",
  "#2CB154",
  "#FCFC53",
  "#EE8721",
  "#C02E2E",
]

const minValue = 40;
const maxValue = 200;

export function HeartRateCard({value}: { value: number }) {
  const percent = Math.min(Math.max(((value - minValue) / (maxValue - minValue)) * 100, 0), 100);

  return <CustomCard title={"Tętno"}>
    <UnitValue value={value.toString()} unit="BPM"/>
    <div className="relative">
      <div className="flex w-full gap-1">
        {colors.map((color, i) => (
          <div key={i} className="w-full h-2" style={{backgroundColor: color}}/>
        ))}
      </div>
      <div className="w-1 h-2 bg-white absolute top-0" style={{left: `${percent}%`}}></div>
      <div className="h-2 bg-[#000000BF] absolute top-0 right-0" style={{ left: `calc(${percent}% + 0.25rem)` }}></div>
    </div>
    <p className="text-xs text-[#929292] mt-3 uppercase">Zrelaksowany</p>
  </CustomCard>

}
