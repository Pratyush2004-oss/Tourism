"use client";
import { Landing } from "@/components/shared/Landing";
import { SERVICES } from "@/services/Options";
import { ServiceType } from "@/services/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function ServiceDetails() {
  const { service } = useParams();
  const [selectedService, setselectedService] = useState<ServiceType | null>(
    null
  );

  useEffect(() => {
    SERVICES.filter((item) => {
      if (item.__id === service) {
        setselectedService(item);
      }
    });
  }, [service]);

  return (
    selectedService && (
      <>
        <Landing IMAGES={selectedService.image} />
        <div className="p-7">
          <h1 className="text-3xl font-bold text-center font-serif my-5">
            {selectedService.name}
          </h1>
          <div className="border rounded-lg shadow-md p-4">
            <Image
              src={selectedService.image[0].image}
              alt={selectedService.name}
              width={500}
              height={500}
              className="w-full h-60 md:h-80 xl:h-[500px] object-cover rounded-t-lg mb-4"
            />
            <p className="p-3 text-sm font-medium text-gray-500 text-justify">{selectedService.Overview}</p>
          </div>
        </div>
      </>
    )
  );
}

export default ServiceDetails;
