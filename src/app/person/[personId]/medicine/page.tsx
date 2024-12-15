import AddButton from "@/components/AddButton";
import MedicineCard from "@/components/DetailCards/MedicineCard";
import { Screen } from "@/components/Screen";
import { doctors, medicines } from "@/lib/data";

export default function Page() {
  const data = medicines.concat(doctors);

  return (
    <Screen title="Zaplanowane Leki">
      <div className="flex flex-col space-y-4">
        {data.map((el) => (
          <MedicineCard key={el.name} data={el} />
        ))}
      </div>
      <AddButton className="bottom-16" />
    </Screen>
  );
}
