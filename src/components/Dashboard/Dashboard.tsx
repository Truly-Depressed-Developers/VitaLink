import Link from "next/link";
import { Screen } from "@/components/Screen";
import AddButton from "../AddButton";
import PersonCard from "./PersonCard";
import { Person } from "@/lib/utils";

export default function Dashboard({ people }: { people: Person[] }) {
  return (
    <Screen title="Twoi podopieczni" className="min-h-[90vh]">
      <div className="flex flex-col space-y-4">
        {people.map((person) => (
          <Link href={`/person/${person.id}`} key={person.id} prefetch>
            <PersonCard {...person} />
          </Link>
        ))}
      </div>
      <AddButton />
    </Screen>
  );
}
