"use client"

import * as React from "react"

import {UnitValue} from "@/components/UnitValue";
import {CustomCard} from "@/components/CustomCard";

export function BloodPressureCard({value}: {value: string}) {
    return <CustomCard title={"Ciśnienie krwi"}>
        <UnitValue value={value} unit="mmHg"/>
        <p className="text-xs text-[#929292] mt-3 uppercase">Poprawne</p>
    </CustomCard>

}


