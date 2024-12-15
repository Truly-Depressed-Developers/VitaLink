"use client";

import Link from "next/link";
import { Avatar, AvatarImage } from "./ui/avatar";
import { ArrowLeft } from "lucide-react";
import { usePathname } from "next/navigation";
import { people } from "@/lib/data";

export default function Header({ isHomePage }: { isHomePage: boolean }) {
  const id = usePathname().split("/")[2];
  const name = people.find((person) => person.id === id)?.name;

  console.log(id);

  return (
    <div className="h-[10vh] p-4">
      {isHomePage ? (
        <>
          <h1 className="text-center text-xl font-bold">VitaLink</h1>
        </>
      ) : (
        <>
          <Link href="/" className="absolute left-4 top-4 flex items-center">
            <ArrowLeft size={14} className="mb-0.5 mr-1" />
            Powrót
          </Link>

          <h1 className="absolute left-1/2 top-10 -translate-x-1/2">{name}</h1>
          <h1 className="text-center text-xs font-bold">VitaLink</h1>
        </>
      )}
      <Avatar className="absolute right-4 top-4 h-5 w-5">
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      </Avatar>
    </div>
  );
}
