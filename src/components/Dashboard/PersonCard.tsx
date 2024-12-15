import Stat from "./Stat";
import { CustomCard } from "@/components/CustomCard";
import { DetermineColor } from "./utils";
import { Person } from "@/lib/utils";

export default function PersonCard({
  name,
  heartRate,
  bloodPressure,
  sleepScore,
}: Person) {
  return (
    <CustomCard title={name} titleClassName="text-base">
      <div className="mb-[1.125px] flex justify-around text-center">
        <Stat
          state={DetermineColor(heartRate, "heartRate")}
          value={heartRate.toString()}
          label="Śr. tętno"
        />
        <Stat
          state={DetermineColor(bloodPressure, "pressure")}
          value={bloodPressure.toString() + "/90"}
          label="Śr. ciśnienie"
        />
        <Stat
          state={DetermineColor(sleepScore, "sleepTime")}
          value={sleepScore.toString()}
          label="Sen"
        />
      </div>
    </CustomCard>
  );
}
