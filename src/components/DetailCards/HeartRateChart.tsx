"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, CartesianGrid, Tooltip } from "recharts";
import { HeartPulse } from "lucide-react";
import { format, subDays } from "date-fns";
import { CustomCard } from "@/components/CustomCard";

// // Generate data for the last 365 days
// const generateDailyData = () => {
//     const data = [];
//     for (let i = 0; i < 365; i++) {
//         data.push({
//             day: format(subDays(new Date(), i), "yyyy-MM-dd"),
//             value: Math.floor(Math.random() * 100) + 50, // Random value between 50 and 150
//         });
//     }
//     return data.reverse();
// };

// const dailyData = generateDailyData();

// Group data by weeks for the month view
const groupByWeeks = (data: DailyData) => {
    const weeks = [];
    for (let i = 0; i < 4; i++) {
        const weekData = data.slice(i * 7, (i + 1) * 7);
        const averageValue = weekData.reduce((acc, cur) => acc + cur.value, 0) / weekData.length;
        weeks.push({
            date: format(subDays(new Date(), i * 7), "dd.MM"),
            value: Math.round(averageValue),
        });
    }
    return weeks;
};

// Group data by months for the year view
const groupByMonths = (data: DailyData) => {
    const months = [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    for (let i = 0; i < 12; i++) {
        const monthData = data.filter(d => new Date(d.day).getMonth() === i);
        const averageValue = monthData.reduce((acc, cur) => acc + cur.value, 0) / monthData.length;
        months.push({
            month: monthNames[i],
            value: Math.round(averageValue),
        });
    }
    return months;
};


const dayLabels = ["pn", "wt", "śr", "czw", "pt", "sob", "nd"];
const monthLabels = ["Sty", "Lut", "Mar", "Kwi", "Maj", "Cze", "Lip", "Sie", "Wrz", "Paź", "Lis", "Gru"];

const getTickFormatter = (timeframe: "W" | "M" | "Y") => {
    switch (timeframe) {
        case "W":
            return (tick: unknown, index: number) => dayLabels[index % 7];
        case "M":
            return (tick: unknown) => tick;
        case "Y":
            return (tick: unknown, index: number) => monthLabels[index];
        default:
            return (tick: unknown) => tick;
    }
};


type DailyData = { day: string, value: number }[]

export const HeartRateChart = ({ dailyData }: { dailyData: DailyData }) => {
    const [timeframe, setTimeframe] = useState<"W" | "M" | "Y">("W");

    const data = {
        W: dailyData.slice(-7),
        M: groupByWeeks(dailyData),
        Y: groupByMonths(dailyData),
    };


    const chartData = data[timeframe];

    const average = chartData.reduce((acc, cur) => acc + cur.value, 0) / chartData.length;
    const max = Math.max(...chartData.map(d => d.value));

    return (
        <CustomCard title="Tętno" icon={<HeartPulse size={18} />}>
            <div className="flex justify-around items-center">
                <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold">{average.toFixed(0)}</p>
                    <p className="text-xs text-[#929292]">Średnie</p>
                </div>
                <div className="flex flex-col items-center">
                    <p className="text-2xl font-bold">{max.toFixed(0)}</p>
                    <p className="text-xs text-[#929292]">Maksymalne</p>
                </div>
            </div>
            <div className="mt-4">
            <LineChart width={372} height={200} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey={timeframe === "Y" ? "month" : timeframe === "M" ? "date" : "day"}
                    tickFormatter={getTickFormatter(timeframe)}
                    interval={0}
                    padding={{ left: 12, right: 12 }}
                />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
                <Button variant={timeframe === "W" ? "default" : "outline"} onClick={() => setTimeframe("W")}>
                    Tydzień
                </Button>
                <Button variant={timeframe === "M" ? "default" : "outline"} onClick={() => setTimeframe("M")}>
                    Miesiąc
                </Button>
                <Button variant={timeframe === "Y" ? "default" : "outline"} onClick={() => setTimeframe("Y")}>
                    Rok
                </Button>
            </div>
        </CustomCard>
    );
};

export default HeartRateChart;