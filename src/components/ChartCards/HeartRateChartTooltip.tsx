import React from "react";
import { TooltipProps } from "recharts";
import { format } from "date-fns";

export const HeartRateChartTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
    if (active && payload && payload.length) {
        const formattedDate = format(new Date(label), "dd.MM.yyyy HH:mm");
        return (
            <div className="custom-tooltip bg-[#1D1D1D] p-2 border border-gray-600 rounded shadow-lg text-white">
                <p className="label font-bold">{formattedDate}</p>
                <p className="intro">{payload[0].value} BPM</p>
            </div>
        );
    }

    return null;
};