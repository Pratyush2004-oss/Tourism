"use client";
import React, { useState } from "react";
import { Label } from "../ui/label";
import { CalendarIcon, Loader2, MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";

interface Props {
  PackageName: string;
  PackageDays: number;
}

type BookingInput = {
  PackageName: string;
  PackageDays: number;
  packagePrice: number;
  people: number;
  startDate: Date;
};

function BookingCard({ props }: { props: Props }) {
  const { user } = useAuthStore();
  const [input, setInput] = useState<BookingInput>({
    PackageName: props.PackageName,
    PackageDays: props.PackageDays,
    packagePrice: 0,
    people: 1,
    startDate: new Date(),
  });
  const [loading, setloading] = useState(false);
  const router = useRouter();

  const handleBooking = async () => {
    console.log(input);
  };
  return (
    <div className="w-full mt-5 border rounded-lg shadow-md p-4 md:sticky md:top-10">
      <h1 className="text-xl font-bold text-center font-serif my-2">
        {props.PackageName}
      </h1>
      <h1 className="text-xl mb-5 font-bold text-center font-serif border-b-2 my-2">
        {input.PackageDays} {input.PackageDays > 1 ? "days " : "day "}
      </h1>
      <div className="flex flex-col gap-6 mt-5">
        {/* Number of people */}
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <Label className="text-xl font-bold sm:justify-center">People</Label>
          <div className="flex items-center gap-5 justify-center">
            <Button
              disabled={input.people <= 1}
              size={"icon"}
              variant={"ghost"}
              className="cursor-pointer"
              onClick={() => {
                if (input.people <= 1) return;
                setInput({ ...input, people: input.people - 1 });
              }}
            >
              <MinusCircle className="size-7" strokeWidth={1} />
            </Button>
            <span className="text-xl lg:text-2xl font-bold border px-5 py-2 rounded-lg">
              {input.people}
            </span>
            <Button
              disabled={input.people >= 10}
              size={"icon"}
              variant={"ghost"}
              className="cursor-pointer"
              onClick={() => {
                if (input.people >= 10) return;
                setInput({ ...input, people: input.people + 1 });
              }}
            >
              <PlusCircle className="size-7" strokeWidth={1} />
            </Button>
          </div>
        </div>

        {/* Days */}
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <Label className="text-xl font-bold sm:justify-center ">Days</Label>
          <div className="flex items-center gap-5 justify-center">
            <Button
              disabled={input.PackageDays <= props.PackageDays}
              size={"icon"}
              variant={"ghost"}
              className="cursor-pointer"
              onClick={() => {
                if (input.PackageDays <= 1) return;
                setInput({ ...input, PackageDays: input.PackageDays - 1 });
              }}
            >
              <MinusCircle className="size-7" strokeWidth={1} />
            </Button>
            <span className="text-xl lg:text-2xl font-bold border px-5 py-2 rounded-lg">
              {input.PackageDays}
            </span>
            <Button
              size={"icon"}
              variant={"ghost"}
              className="cursor-pointer"
              onClick={() => {
                setInput({ ...input, PackageDays: input.PackageDays + 1 });
              }}
            >
              <PlusCircle className="size-7" strokeWidth={1} />
            </Button>
          </div>
        </div>

        {/* Date Picker */}
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
          <Label className="text-xl font-bold justify-center">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                size={"lg"}
                className={cn(
                  "justify-start font-medium",
                  !input.startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {input.startDate ? (
                  format(input.startDate, "PPP")
                ) : (
                  <span>Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={input.startDate}
                onSelect={(date: any) => {
                  if (!date) return;
                  setInput({ ...input, startDate: date });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Button */}
        {user ? (
          <Button
            disabled={loading || !user}
            onClick={handleBooking}
            variant={"outline"}
            className="w-full text-white max-w-96 mx-auto bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 cursor-pointer"
            size={"lg"}
          >
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              "Book Your Trip"
            )}
          </Button>
        ) : (
          <>
            <Button
              variant={"outline"}
              size={"lg"}
              className="w-full max-w-96 mx-auto bg-gradient-to-r from-green-500 via-emerald-500 to-emerald-600 cursor-pointer"
              onClick={() => router.push("/login")}
            >
              Login
            </Button>
            <p className="text-center text-red-500 -mt-4">
              Please login to book your trip
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default BookingCard;
