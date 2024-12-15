import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn, Reminder} from "@/lib/utils";
import {CalendarIcon, Check, ChevronRight} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {ChangeEvent, useState} from "react";
import {Checkbox} from "@/components/ui/checkbox";

export const dayNames = ["Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"];

export const DaysSelect = ({ days, onPicked } : { days: number[], onPicked: (days: number[]) => void }) => {
    const empty = days === undefined || days.length === 0;

    const onCheckboxChange = (checked: boolean, id: string) => {
        const day = dayNames.indexOf(id);
        if (days.includes(day)) {
            onPicked(days.filter(d => d !== day));
        } else {
            onPicked([...days, day]);
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-between text-left font-normal",
                        !empty && "bg-[#092C49] text-primary",
                    )}
                >
                    <div className="flex gap-2 items-center">
                        <div className="w-4">
                            { !empty && <Check /> }
                        </div>
                        <p>Konkretne dni</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        {dayNames.filter((_, i) => days.includes(i)).map(name => name.slice(0, 3)).join(", ")}
                        <ChevronRight />
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div>Wybierz dni</div>
                <div>
                    {dayNames.map((name, i) => (
                        <div key={i} className="flex items-center justify-between space-x-2">
                            <label
                                htmlFor={name}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {name}
                            </label>
                            <Checkbox id={name} onCheckedChange={(checked: boolean) => onCheckboxChange(checked, name)}/>
                        </div>
                    ))}
                </div>
            </PopoverContent>
        </Popover>
    );
}