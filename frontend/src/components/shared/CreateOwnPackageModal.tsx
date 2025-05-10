import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";
import BookingCard from "./BookingCard";
import { RAJASTHANDISTRICTS } from "@/services/Options";

function CreateOwnPackageModal() {
  const [PlaceList, setPlaceList] = useState<string[]>([]);
  const [onDone, setonDone] = useState(false);

  const OnCitySelect = (city: string) => {
    if (PlaceList.includes(city)) {
      return;
    }
    if (!PlaceList.includes(city)) {
      setPlaceList([...PlaceList, city]);
    }
  };

  const onDeleteCity = (city: string) => {
    setPlaceList(PlaceList.filter((place) => place !== city));
  };
  return (
    <Dialog
      onOpenChange={() => {
        setPlaceList([]);
      }}
    >
      <DialogTrigger asChild className="my-4 flex items-center w-full">
        <Button
          variant={"secondary"}
          className="w-1/2 mx-auto bg-gradient-to-r from-emerald-500 to-teal-400 cursor-pointer"
        >
          Create your Own Package
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] max-h-[calc(100vh-8rem)] overflow-auto w-full overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create your Own Package</DialogTitle>
          <DialogDescription>
            Fill basic details and create your own package
          </DialogDescription>
        </DialogHeader>
        {!onDone ? (
          <>
            <Select onValueChange={(e) => OnCitySelect(e)}>
              <SelectTrigger className="w-full max-w-[450px] line-clamp-1">
                <SelectValue placeholder="Select Cities to visit" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Cities</SelectLabel>
                  {RAJASTHANDISTRICTS.map((pack, idx) => (
                    <SelectItem key={idx} value={pack}>
                      {pack}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex flex-wrap gap-3">
              {PlaceList.map((city, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 cursor-pointer relative p-1.5 rounded-md text-white text-sm font-semibold"
                  onClick={() => onDeleteCity(city)}
                >
                  <span className="absolute -top-2 -right-2 bg-white text-red-600 rounded-full w-5 h-5 flex items-center justify-center ">
                    x
                  </span>
                  {city}
                </div>
              ))}
            </div>
            <Button
              onClick={() => setonDone(true)}
              disabled={PlaceList.length < 1}
              variant={"secondary"}
              className="w-full bg-gradient-to-r from-green-500 via-teal-400 to-emerald-400"
            >
              Done
            </Button>
          </>
        ) : (
          <>
            <div className="flex flex-wrap gap-3">
              {PlaceList.map((city, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-r from-emerald-500 to-teal-400 p-1.5 rounded-md text-white text-sm font-semibold"
                >
                  {city}
                </div>
              ))}
            </div>
            <BookingCard
              props={{
                PackageName: "Custom Package",
                PackageDays: PlaceList.length,
                PlaceList: PlaceList,
              }}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CreateOwnPackageModal;
