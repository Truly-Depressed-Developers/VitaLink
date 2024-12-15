import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {ChangeEvent} from "react";

export const NameInput = ({ name, onPicked } : { name: string, onPicked: (name: string) => void }) => {
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onPicked(e.target.value);
    };

    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "w-full justify-between text-left font-normal",
                    )}
                >
                    <div className="flex gap-2 items-center">
                        <p>Nazwa wydarzenia</p>
                    </div>
                    <div className="flex gap-1 items-center">
                        {name}
                    </div>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <div>Wprowadź nazwę</div>
                <div>
                    <div className="flex items-center justify-between space-x-2">
                        <input type="text" value={name} onChange={handleChange} className="input-class text-black" />
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    );
}