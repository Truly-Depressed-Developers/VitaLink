import HeartRateChart from "@/components/DetailCards/HeartRateChart";
import {format, subDays} from "date-fns";

const generateDailyData = () => {
  const data = [];
  for (let i = 0; i < 365; i++) {
    data.push({
      day: format(subDays(new Date(), i), "yyyy-MM-dd"),
      value: Math.floor(Math.random() * 100) + 50, // Random value between 50 and 150
    });
  }
  return data.reverse();
};

export default async function Page({
  params,
}: {
  params: Promise<{ personId: string }>;
}) {
  const personId = (await params).personId;

  console.log(personId);

  return <div>
    <HeartRateChart dailyData={generateDailyData()}/>
  </div>;
}
