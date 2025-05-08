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
import { PACKAGES } from "@/services/Options";

function CreateOwnPackageModal() {
  const [PackageName, setPackageName] = useState("");
  const [PackageDays, setPackageDays] = useState(1);
  return (
    <Dialog onOpenChange={() => {
      setPackageName("");
      setPackageDays(1);
    }}>
      <DialogTrigger asChild className="my-4 flex items-center w-full">
        <Button
          variant={"secondary"}
          className="w-1/2 mx-auto bg-gradient-to-r from-emerald-500 to-teal-400 cursor-pointer"
        >
          Create your Own Package
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] w-full">
        <DialogHeader>
          <DialogTitle>Create your Own Package</DialogTitle>
          <DialogDescription>
            Fill basic details and create your own package
          </DialogDescription>
        </DialogHeader>
        <Select value={PackageName} onValueChange={(e) => setPackageName(e)}>
          <SelectTrigger className="w-full max-w-[450px] line-clamp-1">
            <SelectValue placeholder="Select Package" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Packages</SelectLabel>
              {PACKAGES.map((pack, idx) => (
                <SelectItem key={idx} value={pack.name}>
                  {pack.name}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {PackageName && (
          <BookingCard
            props={{ PackageName: PackageName, PackageDays: PackageDays }}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default CreateOwnPackageModal;
