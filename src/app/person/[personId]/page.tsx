import { notFound } from "next/navigation";
import { HeartRateCard } from "@/components/DetailCards/HeartRateCard";
import { SleepTimeCard } from "@/components/DetailCards/SleepTimeCard";
import { BloodSaturationCard } from "@/components/DetailCards/BloodSaturationCard";
import { BloodPressureCard } from "@/components/DetailCards/BloodPressureCard";
import { StepsCard } from "@/components/DetailCards/StepsCard";
import { DeepSleepCard } from "@/components/DetailCards/DeepSleepCard";
import { getPerson, getHealthData } from "@/lib/actions";


const formatTimeToHHMM = (date: Date) => {
    return date.toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

export default async function Page({
  params,
}: {
  params: { personId: string };
}) {
  try {
    const [person, healthData] = await Promise.all([
      getPerson(params.personId),
      getHealthData(params.personId),
    ]);

    if (!person) {
      notFound();
    }

    const latestData = healthData[0];

    if (!latestData) {
      return (
        <div className="flex justify-center items-center h-full">
          <p>No health data available</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col space-y-4">
        <HeartRateCard value={latestData.heartRate} />
        <div className="grid grid-cols-2 gap-4">
          <BloodSaturationCard value={latestData.bloodOxygen} />
          <BloodPressureCard 
            value={`${latestData.bloodPressure}/90`} 
          />
        </div>
        <SleepTimeCard 
            from={formatTimeToHHMM(new Date(latestData.sleepStart))} 
            to={formatTimeToHHMM(new Date(latestData.sleepEnd))} 
        />
        <DeepSleepCard 
          value={latestData.deepSleep.toString()} 
          total={latestData.totalSleep} 
        />
        <StepsCard steps={latestData.steps} />
      </div>
    );
  } catch (error) {
    console.error('Error loading health data:', error);
    return (
      <div className="flex justify-center items-center h-full">
        <p>Error loading health data</p>
      </div>
    );
  }
}