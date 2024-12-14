import Stat from "./Stat";
import { CustomCard } from "@/components/CustomCard";

export default function PersonCard() {
  return (
    <CustomCard title="Babcia Krysia" titleClassName="text-base">
      <div className="mb-[1.125px] flex justify-around text-center">
        <Stat state="good" value="65" label="Śr. tętno" />
        <Stat state="mediocre" value="140/90" label="Śr. ciśnienie" />
        <Stat state="bad" value="45" label="Sen" />
      </div>
    </CustomCard>
  );
}
