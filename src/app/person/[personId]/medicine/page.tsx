"use client"

import AddButton from "@/components/AddButton";
import MedicineCard from "@/components/DetailCards/MedicineCard";
import { Screen } from "@/components/Screen";
import { doctors, medicines } from "@/lib/data";
import {useState} from "react";
import {Reminder} from "@/lib/utils";
import {NewMedicine} from "@/app/person/[personId]/medicine/NewMedicine";

export default function Page() {
  const data = medicines.concat(doctors);

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState<Reminder[]>([]);

  return (
    <Screen title={!adding ? "Zaplanowane Leczenie" : ""}>
      {adding ?
        <NewMedicine
            onPicked={reminder => {
              if (reminder) {
                setAdded(added.concat(reminder))
                console.log(added.concat(reminder))
                setAdding(false)
              }
            }}
        />
        :
        <>
          <div className="flex flex-col space-y-4">
            {data.concat(added).map((el) => (
              <MedicineCard key={el.name} data={el}/>
            ))}
          </div>
          <AddButton
            className="bottom-[4.5rem]"
            onClick={() => setAdding(true)}
          />
        </>
      }
    </Screen>
  );
}
