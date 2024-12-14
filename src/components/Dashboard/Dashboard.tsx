import { Screen } from "@/components/Screen";
import PersonCard from "./PersonCard";
import { Plus } from "lucide-react";
import { HeartRateCard } from "@/components/HeartRateCard";
import { SleepTimeCard } from "@/components/SleepTimeCard";
import Link from "next/link";

export default function Dashboard() {
  return (
    <Screen title="Twoi podopieczni" className="min-h-[90vh]">
      <div className="flex flex-col space-y-4">
        <HeartRateCard value={67} />
        <SleepTimeCard from="23:45" to="7:25" />
        {[...Array(4)].map((_, i) => (
          <Link href={`/person/${i}`} key={i} prefetch>
            <PersonCard />
          </Link>
        ))}
      </div>
      <button className="fixed bottom-4 right-4 rounded-full bg-primary p-3">
        <Plus />
      </button>
    </Screen>
  );
}
