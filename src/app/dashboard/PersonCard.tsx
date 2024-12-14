import { Card } from "@/components/ui/card";
import Stat from "./Stat";

export default function PersonCard() {
  return (
    <Card className="border-none bg-[#1D1D1D] p-3 pb-0">
      <h1 className="mb-3">Babcia Krysia</h1>
      <div className="mb-[1.125rem] flex justify-around text-center">
        <Stat state="good" value="65" label="Śr. tętno" />
        <Stat state="mediocre" value="140/90" label="Śr. ciśnienie" />
        <Stat state="bad" value="45" label="Sen" />
      </div>
    </Card>
  );
}
