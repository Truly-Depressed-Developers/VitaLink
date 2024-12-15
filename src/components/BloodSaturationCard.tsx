"use client"

import * as React from "react"

import {UnitValue} from "@/components/UnitValue";
import {CustomCard} from "@/components/CustomCard";

export function BloodSaturationCard({value}: {value: number}) {
    return <CustomCard title={"Saturacja krwi"}>
        <UnitValue value={value.toString()} unit="%"/>
        <p className="text-xs text-[#929292] mt-3 uppercase">Zrelaksowany</p>
    </CustomCard>

}


