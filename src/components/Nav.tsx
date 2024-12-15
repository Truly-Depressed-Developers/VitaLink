"use client";

import { cn } from "@/lib/utils";
import { Home, Newspaper, Pill, Settings } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Nav = () => {
  const pathname = usePathname();
  const id = pathname.split("/")[2];

  const selectedColor = "#3B82F6";
  const color = "#929292";

  return (
    <div className="fixed bottom-0 z-40 h-[7vh] w-full">
      <div className="flex justify-evenly bg-[#1D1D1D] py-2 shadow-md">
        <Link
          href={`/person/${id}`}
          className="flex flex-col items-center space-y-0.5"
        >
          <Home
            size={22}
            color={pathname === `/person/${id}` ? selectedColor : color}
          />
          <p
            className={cn("text-[0.625rem] text-xs", {
              "text-[#3B82F6]": pathname === `/person/${id}`,
            })}
          >
            Start
          </p>
        </Link>
        <Link
          href={`/person/${id}/data`}
          className="flex flex-col items-center space-y-0.5"
        >
          <Newspaper
            size={22}
            color={pathname === `/person/${id}/data` ? selectedColor : color}
          />
          <p
            className={cn("text-[0.625rem] text-xs", {
              "text-[#3B82F6]": pathname === `/person/${id}/data`,
            })}
          >
            Dane
          </p>
        </Link>
        <Link
          href={`/person/${id}/medicine`}
          className="flex flex-col items-center space-y-0.5"
        >
          <Pill
            size={22}
            color={
              pathname === `/person/${id}/medicine` ? selectedColor : color
            }
          />
          <p
            className={cn("text-[0.625rem] text-xs", {
              "text-[#3B82F6]": pathname === `/person/${id}/medicine`,
            })}
          >
            Leki
          </p>
        </Link>
        <Link
          href={`/person/${id}/settings`}
          className="flex flex-col items-center space-y-0.5"
        >
          <Settings
            size={22}
            color={
              pathname === `/person/${id}/settings` ? selectedColor : color
            }
          />
          <p
            className={cn("text-[0.625rem] text-xs", {
              "text-[#3B82F6]": pathname === `/person/${id}/settings`,
            })}
          >
            Ustawienia
          </p>
        </Link>
      </div>
    </div>
  );
};

export default Nav;
