import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { PACKAGETYPE } from "@/services/types";
import { Button } from "../ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

function PlaceCard({ pack }: { pack: PACKAGETYPE }) {
  const navigate = useRouter();
  return (
    <Card>
      <CardHeader>
        <Image
          src={pack.image}
          alt={pack.name}
          height={100}
          width={100}
          className="w-full h-90 object-cover rounded-lg"
        />
      </CardHeader>
      <CardContent>
        <CardTitle className="text-2xl font-bold text-center">
          {pack.name}
        </CardTitle>
        <CardDescription className="text-center font-bold font-mono text-xl">
          {pack.days} days / {pack.nights} nights
        </CardDescription>
      </CardContent>
      <CardFooter className="mt-auto flex justify-center ">
        <Button
          size={"lg"}
          variant={"default"}
          className="font-mono text-lg cursor-pointer"
          onClick={() => {
            navigate.push(`/packages/${pack.__id}`);
          }}
        >
          View Package
        </Button>
      </CardFooter>
    </Card>
  );
}

export default PlaceCard;
