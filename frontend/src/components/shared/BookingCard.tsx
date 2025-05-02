"use client";
import React, { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { CalendarIcon, Loader2, MinusCircle, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useAuthStore } from "@/store/auth.store";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { API_URL } from "@/services/API";

interface Props {
  PackageName: string;
  PackageDays: number;
}

type BookingInput = {
  PackageName: string;
  PackageDays: number;
  PackagePrice: number;
  people: number;
  startDate: Date;
};

function BookingCard({ props }: { props: Props }) {
  const { user, token } = useAuthStore();
  const [input, setInput] = useState<BookingInput>({
    PackageName: props.PackageName,
    PackageDays: props.PackageDays,
    PackagePrice: props.PackageDays * 1000,
    people: 1,
    startDate: new Date(),
  });
  const [loading, setloading] = useState(false);
  const router = useRouter();

  // Loading any scripts
  const loadScript = (src: string) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  // loading checkout script
  useEffect(() => {
    loadScript("https://checkout.razorpay.com/v1/checkout.js");
  }, []);

  // change package price
  useEffect(() => {
    setInput({
      ...input,
      PackagePrice: input.people * input.PackageDays * 1000,
    });
  }, [input.PackageDays, input.people]);

  const handleBooking = async () => {
    try {
      setloading(true);
      const response = await axios.post(
        `${API_URL}/api/v1/booking/create-tour`,
        { ...input, startDate: input.startDate.toISOString() },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.order;
      if (response.status === 400) throw new Error(response.data.message);

      const paymentObject = new (window as any).Razorpay({
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        order_id: data.id,
        ...data,
        handler: async function (response: any) {
          // verify payment
          const options2 = {
            order_id: response.razorpay_order_id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            PackageName: input.PackageName,
            PackageDays: input.PackageDays,
            PackagePrice: input.PackagePrice,
            people: input.people,
            startDate: input.startDate.toISOString(),
          };
          await axios
            .post(`${API_URL}/api/v1/booking/verify-payment`, options2, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((resp) => {
              if (resp.status === 400) throw new Error(resp.data.message);
              toast.success(resp.data.message || "Payment verified");
              router.push("/bookings");
            })
            .catch((error: any) => {
              toast.error(
                (error.resp && error.resp.data.message) ||
                  "Something went wrong"
              );
            });
        },
      });

      paymentObject.open();
    } catch (error: any) {
      toast.error(
        (error.response && error.response.data.message) ||
          "Something went wrong"
      );
    } finally {
      setloading(false);
    }
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
                setInput({
                  ...input,
                  PackageDays: input.PackageDays - 1,
                });
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
                setInput({
                  ...input,
                  PackageDays: input.PackageDays + 1,
                });
              }}
            >
              <PlusCircle className="size-7" strokeWidth={1} />
            </Button>
          </div>
        </div>

        {/* Date Picker */}
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
          <Label className="text-xl font-bold sm:justify-center">Start Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "justify-start font-medium p-4 md:p-5",
                  !input.startDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="h-3 w-3" />
                {input.startDate ? (
                  <span className="text-sm md:text-base">{new Date(input.startDate).toDateString()}</span>
                ) : (
                  <span className="text-muted-foreground text-sm md:text-base">Pick a date</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={input.startDate}
                onSelect={(date) => {
                  date && setInput({ ...input, startDate: new Date(date) });
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Price */}
        <div className="grid grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-6">
          <Label className="text-xl font-bold sm:justify-center">Price</Label>
          <span className="text-xl lg:text-2xl font-bold border px-5 py-2 rounded-lg">
            ₹ {input.PackagePrice}
          </span>
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
