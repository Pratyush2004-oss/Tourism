"use client";
import { PACKAGES } from "@/services/Options";
import { Button } from "../ui/button";
import PlaceCard from "./PlaceCard";

function Packages() {
  return (
    <div>
      {PACKAGES.length > 0 && (
        <div className="p-5">
          <h1 className="text-2xl md:text-4xl mb-5 font-bold text-center font-serif border-b-4">
            Packages
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PACKAGES.map(
              (pack, idx) => idx < 6 && <PlaceCard key={idx} pack={pack} />
            )}
          </div>
          <div className="flex justify-end">
            <Button
              variant={"default"}
              size={"lg"}
              className="mt-5 bg-gray-600 text-white cursor-pointer"
            >
              Show More
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Packages;
