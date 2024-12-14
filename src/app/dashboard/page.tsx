import { Screen } from "@/components/Screen";
import PersonCard from "./PersonCard";
import { Plus } from "lucide-react";

export default function Dashboard() {
  return (
    <Screen>
      <div className="flex flex-col space-y-4 p-4">
        {[...Array(3)].map((_, i) => (
          <PersonCard key={i} />
        ))}
      </div>
      <button className="float-right mr-4 rounded-full bg-primary p-3">
        <Plus />
      </button>
    </Screen>
  );
}
