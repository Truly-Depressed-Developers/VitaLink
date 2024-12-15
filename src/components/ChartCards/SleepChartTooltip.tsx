import React from "react";
import { TooltipProps } from "recharts";
import { format } from "date-fns";

export const SleepChartTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        const formattedDate = format(new Date(label), "dd.MM.yyyy");
        const formattedValue = `${Math.floor(payload[0].value!)}:${Math.round((payload[0].value! % 1) * 60).toString().padStart(2, '0')}`;
        return (
            <div className="custom-tooltip bg-[#1D1D1D] p-2 border border-gray-600 rounded shadow-lg text-white">
                <p className="label font-bold">{formattedDate}</p>
                <p className="intro">{formattedValue}h</p>
            </div>
        );
    }

    return null;
};