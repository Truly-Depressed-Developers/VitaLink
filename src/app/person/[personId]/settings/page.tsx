import { CustomCard } from "@/components/CustomCard";
import { Screen } from "@/components/Screen";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import SmallInput from "./SmallInput";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function Page() {
  return (
    <Screen title="Ustawienia">
      <div className="flex flex-col space-y-4">
        <CustomCard
          title="Niebezpieczne sytuacje"
          titleClassName="text-base border-b border-[#323232] pb-2 w-full"
        >
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1" className="border-none">
              <AccordionTrigger>Problemy z ciśnieniem krwi</AccordionTrigger>
              <AccordionContent className="flex flex-col space-y-4 p-3">
                <h1>Przedziały</h1>
                <p className="flex items-center space-x-2 text-xs">
                  <span className="mr-2 text-sm text-green-600">
                    Bezpieczny
                  </span>
                  od <SmallInput defaultValue={120} /> <span>mmHg do</span>{" "}
                  <SmallInput defaultValue={150} /> <span>mmHg</span>
                </p>
                <p className="flex items-center space-x-2 text-xs">
                  <span className="mr-[5px] text-sm text-yellow-300">
                    Ostrzeżenie
                  </span>
                  od <SmallInput defaultValue={120} /> <span>mmHg do</span>{" "}
                  <SmallInput defaultValue={150} /> <span>mmHg</span>
                </p>
                <p className="flex items-center space-x-2 text-xs">
                  <span className="mr-9 text-sm text-red-500">Ryzyko</span>
                  reszta
                </p>
                <Separator />
                <Link href={"/"} className="relative pb-0 text-xs">
                  Lista osób do poinformowania
                  <ChevronRight size={16} className="absolute right-1 top-1" />
                </Link>
                <Separator />
                <div className="flex items-center justify-between">
                  <Label htmlFor="risk" className="text-xs">
                    Poinformuj służby ratownicze w przypadku ryzyka
                  </Label>
                  <Checkbox id="risk" />
                </div>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="border-none">
              <AccordionTrigger>Arytmia serca</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Eligendi, illo.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="border-none">
              <AccordionTrigger>Problemy ze snem</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro,
                saepe!
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="border-none">
              <AccordionTrigger>Ryzyko upadków i braku ruchu</AccordionTrigger>
              <AccordionContent>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod,
                quas?
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CustomCard>
        <Link href="/">
          <CustomCard title="Zarządzaj urządzeniami" className="relative pb-0">
            <ChevronRight size={16} className="absolute right-3 top-4" />
          </CustomCard>
        </Link>
        <Link href="/">
          <CustomCard title="Zaawansowane" className="relative pb-0">
            <ChevronRight size={16} className="absolute right-3 top-4" />
          </CustomCard>
        </Link>
      </div>
    </Screen>
  );
}
