"use client"

import AddButton from "@/components/AddButton";
import MedicineCard from "@/components/DetailCards/MedicineCard";
import { Screen } from "@/components/Screen";
import { useState, useEffect } from "react";
import { Reminder } from "@/lib/utils";
import { NewMedicine } from "@/app/person/[personId]/medicine/NewMedicine";
import { getMedicines, getDoctors } from "@/lib/actions";

export default function Page({ params }: { params: { personId: string } }) {
  const [medicines, setMedicines] = useState<Reminder[]>([]);
  const [doctors, setDoctors] = useState<Reminder[]>([]);
  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState<Reminder[]>([]);

  useEffect(() => {
    async function fetchData() {
      const fetchedMedicines = await getMedicines(params.personId);
      const fetchedDoctors = await getDoctors(params.personId);
      setMedicines(fetchedMedicines);
      setDoctors(fetchedDoctors);
    }
    fetchData();
  }, [params.personId]);

  const data = [...medicines, ...doctors];

  return (
    <Screen title={!adding ? "Zaplanowane Leczenie" : ""}>
      {adding ? (
        <NewMedicine
          onPicked={(reminder) => {
            if (reminder) {
              setAdded((prevAdded) => prevAdded.concat(reminder));
              console.log(added.concat(reminder));
              setAdding(false);
            }
          }}
        />
      ) : (
        <>
          <div className="flex flex-col space-y-4">
            {data.concat(added).map((el) => (
              <MedicineCard key={el.name} data={el} />
            ))}
          </div>
          <AddButton
            className="bottom-[4.5rem]"
            onClick={() => setAdding(true)}
          />
        </>
      )}
    </Screen>
  );
}