"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { XAxis, CartesianGrid, Tooltip, Bar, BarChart } from "recharts";
import { Clock8 } from "lucide-react";
import { format, subDays, addDays, startOfMonth, addMonths } from "date-fns";
import { CustomCard } from "@/components/CustomCard";
import { SleepChartTooltip } from "@/components/ChartCards/SleepChartTooltip";

interface DataPoint {
    date: Date;
    value: number;
}

// Generate data for the last 365 days
const generateDailyData = (): DataPoint[] => {
    const data: DataPoint[] = [];
    const now = new Date();
    for (let i = 0; i < 365; i++) {
        const date = subDays(now, i);
        data.push({
            date: date,
            value: Math.random() * 4 + 4, // Random value between 6 and 10 hours
        });
    }
    return data.reverse();
};

// Group data by day for the last 7 days
const groupByDays = (data: DataPoint[], daysCount: number): DataPoint[] => {
    return data.slice(-daysCount);
};

// Group data by month for the last 30 days
const groupByMonth = (data: DataPoint[]): DataPoint[] => {
    return data.slice(-30);
};

// Group data by year for the last 365 days, showing average sleep for each month
const groupByYear = (data: DataPoint[]): DataPoint[] => {
    const months: DataPoint[] = [];
    for (let i = 0; i < 12; i++) {
        const monthStart = startOfMonth(subDays(new Date(), i * 30));
        const monthData = data.filter(d => d.date >= monthStart && d.date < addMonths(monthStart, 1));
        const averageValue = monthData.reduce((acc, cur) => acc + cur.value, 0) / monthData.length;
        months.push({
            date: monthStart,
            value: averageValue,
        });
    }
    return months.reverse();
};

const dayLabels = ["pon", "wto", "śro", "czw", "pią", "sob", "nie"];

const getTickFormatter = (timeframe: "7D" | "1M" | "1Y") => {
    switch (timeframe) {
        case "7D":
            return (tick: Date) => dayLabels[tick.getDay()];
        case "1M":
            return (tick: Date) => format(tick, "dd.MM");
        case "1Y":
            return (tick: Date) => format(tick, "MMM");
        default:
            return (tick: Date) => format(tick, "dd.MM");
    }
};

export const SleepChart = () => {
    const [timeframe, setTimeframe] = useState<"7D" | "1M" | "1Y">("7D");
    const [startDate, setStartDate] = useState(new Date());

    const data = generateDailyData();

    const chartData = {
        "7D": groupByDays(data, 7),
        "1M": groupByMonth(data),
        "1Y": groupByYear(data),
    }[timeframe];

    const averageValue = chartData.reduce((acc, cur) => acc + cur.value, 0) / chartData.length;

    const getDateRange = () => {
        const endDate = {
            "7D": addDays(startDate, 7),
            "1M": addDays(startDate, 30),
            "1Y": addDays(startDate, 365),
        }[timeframe];
        return `${format(startDate, "dd.MM.yyyy")} - ${format(endDate, "dd.MM.yyyy")}`;
    };

    const handlePrevious = () => {
        setStartDate(subDays(startDate, timeframe === "7D" ? 7 : timeframe === "1M" ? 30 : 365));
    };

    const handleNext = () => {
        setStartDate(addDays(startDate, timeframe === "7D" ? 7 : timeframe === "1M" ? 30 : 365));
    };

    const hours = Math.floor(averageValue);
    const minutes = Math.round((averageValue % 1) * 60);

    return (
        <CustomCard title="Sen" icon={<Clock8 size={18} />}>
            <div className="flex justify-around items-center">
                <div className="flex flex-col items-center">
                    <p>
                        <span className="text-2xl mr-1">{`${hours}:${minutes.toString().padStart(2, '0')}`}</span>
                        <span className="text-xs text-[#929292]">h</span>
                    </p>
                    <p className="text-xs text-[#929292]">Średni czas</p>
                </div>
            </div>
            <div className="mt-4 font-mono">
                <div className="flex justify-center items-center mb-2 h-4 gap-2">
                    <a className="text-[#929292] cursor-pointer" onClick={handlePrevious}>{"<"}</a>
                    <p className="text-xs text-[#929292]">{getDateRange()}</p>
                    <a className="text-[#929292] cursor-pointer" onClick={handleNext}>{">"}</a>
                </div>
                <BarChart width={372} height={200} data={chartData} margin={{top: 10, bottom: 40}}>
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis
                        dataKey="date"
                        tickFormatter={getTickFormatter(timeframe)}
                        interval={timeframe === "1Y" ? 0 : 0}
                        angle={-90}
                        dy={10}
                        textAnchor="end"
                    />
                    <Tooltip content={<SleepChartTooltip />} />
                    <Bar dataKey="value" fill="#bf2c48" />
                </BarChart>
            </div>
            <div className="mt-4 flex justify-center space-x-2">
                <Button variant={timeframe === "7D" ? "default" : "outline"} onClick={() => setTimeframe("7D")}>
                    Tydzień
                </Button>
                <Button variant={timeframe === "1M" ? "default" : "outline"} onClick={() => setTimeframe("1M")}>
                    Miesiąc
                </Button>
                <Button variant={timeframe === "1Y" ? "default" : "outline"} onClick={() => setTimeframe("1Y")}>
                    Rok
                </Button>
            </div>
        </CustomCard>
    );
};

export default SleepChart;