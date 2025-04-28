"use client";
import { SERVICES } from "@/services/Options";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

function Services() {
  const router = useRouter();
  return (
    <div>
      {SERVICES.length > 0 && (
        <div className="p-5">
          <h1 className="text-2xl md:text-4xl mb-5 font-bold text-center font-serif border-b-4">
            Services
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {SERVICES.map((service, idx) => (
              <div
                key={idx}
                className="p-4 border rounded-lg shadow-md"
                onClick={() => router.push(`/services/${service.__id}`)}
              >
                <Image
                  src={service.image[0].image}
                  alt={service.name}
                  width={500}
                  height={500}
                  className="w-full h-48 md:h-72 object-cover rounded-lg mb-4"
                />
                <h2 className="text-xl font-bold">{service.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Services;
