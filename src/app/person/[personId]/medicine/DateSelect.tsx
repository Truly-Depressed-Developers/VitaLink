import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Check, ChevronRight} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";


export const DateSelect = ({ date, onPicked } : { date: Date | undefined, onPicked: (date: Date | undefined) => void }) => {
    return <Popover>
        <PopoverTrigger asChild>
            <Button
                variant={"outline"}
                className={cn(
                    "w-full justify-between text-left font-normal",
                    date && "bg-[#092C49] text-primary",
                )}
            >
                <div className="flex gap-2 items-center">
                    <div className="w-4">
                    { date && <Check /> }
                    </div>
                    <p>Konkretna data</p>
                </div>
                <div className="flex gap-1 items-center">
                    {date && format(date, "dd.MM.yyyy")}
                    <ChevronRight />
                </div>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
            <Calendar
                mode="single"
                selected={date}
                onSelect={onPicked}
                initialFocus
            />
        </PopoverContent>
    </Popover>
}