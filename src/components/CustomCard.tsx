import * as React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  titleClassName?: string;
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
};

export function CustomCard(props: Props) {
  return (
    <Card className={cn("border-none bg-[#1D1D1D] p-3 pb-0", props.className)}>
      <CardHeader className="p-0">
        <CardTitle className={cn("text-sm font-normal", props.titleClassName)}>
          {props.title}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-3">{props.children}</CardContent>
    </Card>
  );
}
