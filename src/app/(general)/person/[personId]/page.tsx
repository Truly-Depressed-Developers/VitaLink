import { HeartRateCard } from "@/components/HeartRateCard";
import { SleepTimeCard } from "@/components/SleepTimeCard";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {BloodSaturationCard} from "@/components/BloodSaturationCard";
import {BloodPressureCard} from "@/components/BloodPressureCard";

export default async function Page({
  params,
}: {
  params: Promise<{ personId: string }>;
}) {
  const personId = (await params).personId;

  console.log(personId);
  return (
    <>
      <Link href="/" className="absolute left-4 top-4 flex items-center">
        <ArrowLeft size={14} className="mb-0.5 mr-1" />
        Powrót
      </Link>

      <div className="flex flex-col space-y-4">
        <HeartRateCard value={67} />
        <div className="grid grid-cols-2 gap-4">
            <BloodSaturationCard value={67} />
            <BloodPressureCard value="140/80" />
        </div>
        <SleepTimeCard from="23:45" to="7:25" />
      </div>
    </>
  );
}
