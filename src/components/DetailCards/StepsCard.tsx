"use client"

import * as React from "react"

import { Progress } from "@/components/ui/progress"
import {UnitValue} from "@/components/UnitValue";
import {CustomCard} from "@/components/CustomCard";
import {Footprints} from "lucide-react";

const goal = 5000;

export function StepsCard({ steps }: {steps: number}) {
    const kilometers = steps * 0.000762;
    const goalPercent = steps / goal * 100

    return <CustomCard title={"Kroki"} icon={<Footprints size={18}/>}>
        <UnitValue value={steps.toString()} unit=""/>
        <Progress value={goalPercent} className="w-full h-2"/>
        <p>
            <span className="text-xs mr-1.5">{kilometers.toFixed(2)} km</span>
            <span className="text-xs text-[#929292]">DYSTANS</span>
        </p>
    </CustomCard>

}