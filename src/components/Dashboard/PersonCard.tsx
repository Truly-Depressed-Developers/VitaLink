import Stat from "./Stat";
import { CustomCard } from "@/components/CustomCard";
import { DetermineColor } from "./utils";

export default function PersonCard() {
  return (
    <CustomCard title="Babcia Krysia" titleClassName="text-base">
      <div className="mb-[1.125px] flex justify-around text-center">
        <Stat
          state={DetermineColor(65, "heartRate")}
          value="65"
          label="Śr. tętno"
        />
        <Stat
          state={DetermineColor(155, "pressure")}
          value="155/90"
          label="Śr. ciśnienie"
        />
        <Stat state={DetermineColor(45, "sleepTime")} value="45" label="Sen" />
      </div>
    </CustomCard>
  );
}
