import { Screen } from "@/components/Screen";
import PersonCard from "./PersonCard";
import { Plus } from "lucide-react";
import {HeartRateBarCard} from "@/components/HeartRateBarCard";

export default function Dashboard() {
  return (
    <Screen title="Twoi podopieczni" className="min-h-[90vh]">
      <div className="flex flex-col space-y-4">
        <HeartRateBarCard />
        {[...Array(4)].map((_, i) => (
          <PersonCard key={i} />
        ))}
      </div>
      <button className="fixed bottom-4 right-4 rounded-full bg-primary p-3">
        <Plus />
      </button>
    </Screen>
  );
}
