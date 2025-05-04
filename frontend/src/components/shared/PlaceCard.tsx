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
    <Card className="rounded-4xl shadow-xl">
      <CardHeader>
        <Image
          src={pack.image}
          alt={pack.name}
          // layout="responsive"
          height={150}
          width={100}
          className=" object-cover rounded-t-2xl w-full"
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
          className="bg-gray-600 text-white cursor-pointer"
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
