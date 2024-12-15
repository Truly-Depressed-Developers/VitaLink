"use client"

import * as React from "react"

import {UnitValue} from "@/components/UnitValue";
import {CustomCard} from "@/components/CustomCard";
import {Bed} from "lucide-react";

export function DeepSleepCard({value, total}: {value: string, total: number}) {
    const percent = Math.round(parseInt(value) / total * 100);

    const isSelected = (index: number) => {
        if (index === 0 && percent < 10) return true;
        if (index === 1 && percent >= 10 && percent <= 35) return true;
        if (index === 2 && percent > 35) return true;
        return false;
    };

    const getPercentageText = (index: number) => {
        if (index === 0) return "<10%";
        if (index === 1) return "10-35%";
        if (index === 2) return ">35%";
        return "";
    };

    return <CustomCard title={"Głęboki sen"} icon={<Bed size={18}/>}>
        <UnitValue value={value.toString()} unit={`min (${percent}%)`}/>
        <div className="flex w-full gap-1">
            {[0, 1, 2].map((index) => (
                <div key={index} className="flex flex-col items-center w-full relative">
                    <div className="w-full h-2" style={{backgroundColor: isSelected(index) ? "#3B82F6" : "#FFFFFF1A"}}/>
                    <span className="text-xs text-[#929292] mt-1">{getPercentageText(index)}</span>
                    {isSelected(index) &&
                        <div className="w-1 h-2 bg-white absolute top-0 m-auto"></div>
                    }
                </div>
            ))}
        </div>
    </CustomCard>
}