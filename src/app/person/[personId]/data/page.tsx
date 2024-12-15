import HeartRateChart from "@/components/ChartCards/HeartRateChart";
import SleepChart from "@/components/ChartCards/SleepChart";

export default async function Page({
  params,
}: {
  params: Promise<{ personId: string }>;
}) {
  const personId = (await params).personId;

  console.log(personId);

  return <div className="flex flex-col space-y-4">
    <HeartRateChart/>
    <SleepChart/>
  </div>;
}
