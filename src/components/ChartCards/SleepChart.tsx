"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { XAxis, CartesianGrid, Tooltip, Bar, BarChart, YAxis } from "recharts";
import { Clock8 } from "lucide-react";
import { format, subDays, addDays, startOfMonth, addMonths } from "date-fns";
import { CustomCard } from "@/components/CustomCard";
import { SleepChartTooltip } from "@/components/ChartCards/SleepChartTooltip";

interface DataPoint {
  date: Date;
  value: number;
}

const generateDailyData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();
  for (let i = 0; i < 365; i++) {
    const date = subDays(now, i);
    data.push({
      date: date,
      value: Math.random() * 4 + 4,
    });
  }
  return data.reverse();
};

const groupByDays = (data: DataPoint[], daysCount: number): DataPoint[] => {
  return data.slice(-daysCount);
};

const groupByMonth = (data: DataPoint[]): DataPoint[] => {
  return data.slice(-30);
};

const groupByYear = (data: DataPoint[]): DataPoint[] => {
  const months: DataPoint[] = [];
  for (let i = 0; i < 12; i++) {
    const monthStart = startOfMonth(subDays(new Date(), i * 30));
    const monthData = data.filter(
      (d) => d.date >= monthStart && d.date < addMonths(monthStart, 1),
    );
    const averageValue =
      monthData.reduce((acc, cur) => acc + cur.value, 0) / monthData.length;
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

  const averageValue =
    chartData.reduce((acc, cur) => acc + cur.value, 0) / chartData.length;

  const getDateRange = () => {
    const endDate = {
      "7D": addDays(startDate, 7),
      "1M": addDays(startDate, 30),
      "1Y": addDays(startDate, 365),
    }[timeframe];
    return `${format(startDate, "dd.MM.yyyy")} - ${format(endDate, "dd.MM.yyyy")}`;
  };

  const handlePrevious = () => {
    setStartDate(
      subDays(
        startDate,
        timeframe === "7D" ? 7 : timeframe === "1M" ? 30 : 365,
      ),
    );
  };

  const handleNext = () => {
    setStartDate(
      addDays(
        startDate,
        timeframe === "7D" ? 7 : timeframe === "1M" ? 30 : 365,
      ),
    );
  };

  const hours = Math.floor(averageValue);
  const minutes = Math.round((averageValue % 1) * 60);

  return (
    <CustomCard title="Sen" icon={<Clock8 size={18} />}>
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center">
          <p>
            <span className="mr-1 text-2xl font-bold">{`${hours}:${minutes.toString().padStart(2, "0")}`}</span>
            <span className="text-xs text-[#929292]">h</span>
          </p>
          <p className="text-xs text-[#929292]">Średni czas</p>
        </div>
      </div>
      <div className="mt-4 font-mono">
        <div className="mb-2 flex h-4 items-center justify-center gap-2">
          <a className="cursor-pointer text-[#929292]" onClick={handlePrevious}>
            {"<"}
          </a>
          <p className="text-xs text-[#929292]">{getDateRange()}</p>
          <a className="cursor-pointer text-[#929292]" onClick={handleNext}>
            {">"}
          </a>
        </div>
<BarChart
  width={372}
  height={200}
  data={chartData}
  margin={{ top: 10, bottom: 40, left: -40 }}
>
  <CartesianGrid
    strokeDasharray="3 3"
    vertical={false}
    horizontal={false}
  />
  <XAxis
    dataKey="date"
    tickFormatter={getTickFormatter(timeframe)}
    interval={timeframe === "1M" ? 1 : 0}
    angle={-90}
    dy={10}
    textAnchor="end"
  />
  <YAxis interval={0} />
  <Tooltip content={<SleepChartTooltip />} />
  <Bar dataKey="value" fill="#3B82F6" />
</BarChart>
      </div>
      <div className="mt-4 flex h-6 w-full space-x-2 rounded-xl bg-[#343434]">
        <Button
          className={`h-full w-full rounded-xl text-xs ${
            timeframe === "7D"
              ? "bg-white text-black hover:bg-white"
              : "bg-transparent text-white hover:bg-gray-700"
          }`}
          onClick={() => setTimeframe("7D")}
        >
          Tydzień
        </Button>
        <Button
          className={`h-full w-full rounded-xl text-xs ${
            timeframe === "1M"
              ? "bg-white text-black hover:bg-white"
              : "bg-transparent text-white hover:bg-gray-700"
          }`}
          onClick={() => setTimeframe("1M")}
        >
          Miesiąc
        </Button>
        <Button
          className={`h-full w-full rounded-xl text-xs ${
            timeframe === "1Y"
              ? "bg-white text-black hover:bg-white"
              : "bg-transparent text-white hover:bg-gray-700"
          }`}
          onClick={() => setTimeframe("1Y")}
        >
          Rok
        </Button>
      </div>
    </CustomCard>
  );
};

export default SleepChart;
