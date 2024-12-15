import HeartRateChart from "@/components/DetailCards/HeartRateChart";

export default async function Page({
  params,
}: {
  params: Promise<{ personId: string }>;
}) {
  const personId = (await params).personId;

  console.log(personId);

  return <div>
    <HeartRateChart />
  </div>;
}
