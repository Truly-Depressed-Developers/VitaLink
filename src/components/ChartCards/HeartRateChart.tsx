"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  XAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  YAxis,
} from "recharts";
import { HeartPulse } from "lucide-react";
import {
  format,
  subMinutes,
  subHours,
  subDays,
  startOfHour,
  startOfMinute,
  addMinutes,
  addDays,
  addHours,
} from "date-fns";
import { CustomCard } from "@/components/CustomCard";
import { HeartRateChartTooltip } from "@/components/ChartCards/HeartRateChartTooltip";

interface DataPoint {
  date: Date;
  value: number;
}

// Generate data for the last 30 days every 15 minutes
const generateQuarterHourlyData = (): DataPoint[] => {
  const data: DataPoint[] = [];
  const now = new Date();
  const start = startOfMinute(addMinutes(now, -now.getMinutes() % 15)); // Align to the nearest 15-minute mark
  for (let i = 0; i < 30 * 24 * 4; i++) {
    // 30 days * 24 hours * 4 (15-minute intervals per hour)
    const date = subMinutes(start, i * 15);
    data.push({
      date: date,
      value: Math.floor(Math.random() * 100) + 50, // Random value between 50 and 150
    });
  }
  return data.reverse();
};

// Group data by hour for the last day
const groupByHours = (data: DataPoint[]): DataPoint[] => {
  const hours: DataPoint[] = [];
  for (let i = 0; i < 24; i++) {
    const hourStart = startOfHour(subHours(new Date(), i));
    const hourData = data.filter(
      (d) => d.date >= hourStart && d.date < subHours(hourStart, -1),
    );
    const averageValue =
      hourData.reduce((acc, cur) => acc + cur.value, 0) / hourData.length;
    hours.push({
      date: hourStart,
      value: Math.round(averageValue),
    });
  }
  return hours.reverse();
};

// Group data by day for the last 30 days
const groupByDays = (
  data: DataPoint[],
  daysCount: number,
  pointsPerDay: number,
): DataPoint[] => {
  const days: DataPoint[] = [];
  const interval = Math.floor((24 * 60) / pointsPerDay); // Interval in minutes

  for (let i = 0; i < daysCount; i++) {
    const dayStart = subDays(new Date(), i);
    for (let j = 0; j < pointsPerDay; j++) {
      const pointTime = subMinutes(startOfHour(dayStart), j * interval);
      const pointData = data.filter(
        (d) => d.date >= pointTime && d.date < subMinutes(pointTime, -interval),
      );
      const averageValue =
        pointData.reduce((acc, cur) => acc + cur.value, 0) / pointData.length;
      days.push({
        date: pointTime,
        value: Math.round(averageValue),
      });
    }
  }
  return days.reverse();
};

const dayLabels = ["pon", "wto", "śro", "czw", "pią", "sob", "nie"];

const getTickFormatter = (timeframe: "6H" | "1D" | "7D" | "1M") => {
  switch (timeframe) {
    case "6H":
    case "1D":
      return (tick: Date) => format(tick, "HH:mm");
    case "7D":
      return (tick: Date, index: number) =>
        index % 4 === 0 ? dayLabels[(index / 4) % 7] : "";
    case "1M":
      return (tick: Date) => format(tick, "dd.MM");
    default:
      return (tick: Date) => format(tick, "HH:mm");
  }
};

export const HeartRateChart = () => {
  const [timeframe, setTimeframe] = useState<"6H" | "1D" | "7D" | "1M">("1D");
  const [startDate, setStartDate] = useState(new Date());

  const data = generateQuarterHourlyData();

  const chartData = {
    "6H": data.slice(-24), // Last 6 hours every 15 minutes
    "1D": groupByHours(data),
    "7D": groupByDays(data, 7, 4), // Last 7 days
    "1M": groupByDays(data, 30, 1), // Last 30 days
  }[timeframe];

  const average =
    chartData.reduce((acc, cur) => acc + cur.value, 0) / chartData.length;
  const max = Math.max(...chartData.map((d) => d.value));

  const getDateRange = () => {
    const endDate = {
      "6H": addHours(startDate, 6),
      "1D": addDays(startDate, 1),
      "7D": addDays(startDate, 7),
      "1M": addDays(startDate, 30),
    }[timeframe];
    return `${format(startDate, "dd.MM.yyyy")} - ${format(endDate, "dd.MM.yyyy")}`;
  };

  const handlePrevious = () => {
    setStartDate(
      subDays(
        startDate,
        timeframe === "6H"
          ? 1
          : timeframe === "1D"
            ? 1
            : timeframe === "7D"
              ? 7
              : 30,
      ),
    );
  };

  const handleNext = () => {
    setStartDate(
      addDays(
        startDate,
        timeframe === "6H"
          ? 1
          : timeframe === "1D"
            ? 1
            : timeframe === "7D"
              ? 7
              : 30,
      ),
    );
  };

  return (
    <CustomCard title="Tętno" icon={<HeartPulse size={18} />}>
      <div className="flex items-center justify-around">
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">{average.toFixed(0)}</p>
          <p className="text-xs text-[#929292]">Średnie</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-2xl font-bold">{max.toFixed(0)}</p>
          <p className="text-xs text-[#929292]">Maksymalne</p>
        </div>
      </div>
      <div className="mt-4 font-mono">
        <div className="mb-2 flex h-4 items-center justify-center gap-2">
          {timeframe != "6H" && (
            <>
              <a
                className="cursor-pointer text-[#929292]"
                onClick={handlePrevious}
              >
                {"<"}
              </a>
              <p className="text-xs text-[#929292]">{getDateRange()}</p>
              <a className="cursor-pointer text-[#929292]" onClick={handleNext}>
                {">"}
              </a>
            </>
          )}
        </div>
        <AreaChart
          width={372}
          height={200}
          data={chartData}
          margin={{ top: 10, bottom: 40, left: -25 }}
        >
          <defs>
            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#bf2c48" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#bf2c48" stopOpacity={0.1} />
            </linearGradient>
          </defs>
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
          <YAxis interval={0} domain={[40, "auto"]} />
          <Tooltip content={<HeartRateChartTooltip />} />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#bf2c48"
            fill="url(#colorValue)"
            dot={false}
          />
        </AreaChart>
      </div>
      <div className="mt-4 flex h-6 w-full space-x-2 rounded-xl bg-[#343434]">
        <Button
          className={`h-full w-full rounded-xl text-xs ${
            timeframe === "6H"
              ? "bg-white text-black hover:bg-white"
              : "bg-transparent text-white hover:bg-gray-700"
          }`}
          onClick={() => setTimeframe("6H")}
        >
          6 godzin
        </Button>
        <Button
          className={`h-full w-full rounded-xl text-xs ${
            timeframe === "1D"
              ? "bg-white text-black hover:bg-white"
              : "bg-transparent text-white hover:bg-gray-700"
          }`}
          onClick={() => setTimeframe("1D")}
        >
          Dzień
        </Button>
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
      </div>
    </CustomCard>
  );
};

export default HeartRateChart;
