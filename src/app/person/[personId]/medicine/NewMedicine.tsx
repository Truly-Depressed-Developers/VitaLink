import {Reminder} from "@/lib/utils";
import {useState} from "react";
import {DateSelect} from "@/app/person/[personId]/medicine/DateSelect";
import {dayNames, DaysSelect} from "@/app/person/[personId]/medicine/DaysSelect";
import {NameInput} from "@/app/person/[personId]/medicine/NameInput";
import {Check, X} from "lucide-react";
import {format} from "date-fns";


export const NewMedicine = ({ onPicked } : {onPicked: (choice: Reminder | null) => void }) => {
    const [date, setDate] = useState<Date | undefined>(undefined)
    const [days, setDays] = useState<number[]>([])
    const [name, setName] = useState("")

    const onChangeDate = (date: Date | undefined) => {
        setDate(date)
        setDays([])
    }

    const onChangeDays = (days: number[]) => {
        setDays(days)
        setDate(undefined)
    }

    const defaultTime = "13:00"

    return <div className="flex flex-col gap-4">
        <div className="flex justify-between">
            <a className="cursor-pointer" onClick={() => onPicked(null)}>
                <X />
            </a>
            <span>Dodaj wydarzenie </span>
            <a className="cursor-pointer" onClick={() => onPicked(
                {
                    name,
                    time: defaultTime,
                    days: date ? `Raz, ${format(date, "dd:MM:yyyy")}` : dayNames.filter((_, i) => days.includes(i)).map((name) => name.slice(0, 3)).join(", "),
                    active: true,
                }
            )}>
                <Check/>
            </a>
        </div>
        <NameInput onPicked={setName} name={name}/>
        <DateSelect onPicked={onChangeDate} date={date}/>
        <DaysSelect onPicked={onChangeDays} days={days}/>
    </div>
}