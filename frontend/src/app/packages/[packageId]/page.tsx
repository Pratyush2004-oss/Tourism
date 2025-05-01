"use client";
import { PACKAGES } from "@/services/Options";
import { PACKAGETYPE } from "@/services/types";
import { Star } from "lucide-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import DOMPurify from 'dompurify';
function PackageDetail() {
  const { packageId } = useParams();
  const [Package, setPackage] = useState<PACKAGETYPE | null>(null);
  useEffect(() => {
    PACKAGES.filter((pack) => pack.__id === packageId).map((pack) => {
      return setPackage(pack);
    });
  }, [packageId]);

  return (
    Package && (
      <div className="p-6 md:p-10">
        <div className="flex flex-col gap-6 ">
          <div className="w-full relative">
            <img
              src={Package.image}
              alt={Package.name}
              className="w-full h-96 object-cover rounded-lg"
            />
            <h1 className="text-3xl font-bold absolute top-4/6 ml-3 text-white  p-2 rounded-lg">
              {Package.name}
            </h1>
          </div>
          <div className="w-full flex flex-col justify-center px-2 lg:w-3/4">
            {/* Overview  section*/}
            {Package.Overview && Package.Overview.length > 0 && (
              <>
                <h1 className="text-xl mt-5 font-bold">OverView</h1>
                <div className="flex flex-col gap-3 mt-4">
                  {Package.Overview?.map((item, idx) => (
                    <p key={idx} className="text-justify camelCase font-medium text-sm text-gray-500">
                      {item}
                    </p>
                  ))}
                </div>
              </>
            )}

            {/* Highlights section */}
            {Package.Highlights && Package.Highlights.length > 0 && (
              <>
                <h1 className="text-xl mt-5 font-bold">Highlights</h1>
                <div className="flex flex-col gap-3 mt-4 camelCase">
                  {Package?.Highlights?.map((item, idx) => (
                    <div className="flex items-center gap-2" key={idx}>
                      <Star className="ml-2 size-4 text-purple-700 fill-purple-600" />
                      <p
                        key={idx}
                        className="text-justify list-decimal list-inside text-sm font-medium text-gray-500 "
                      >
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Itinerary Section */}
            {Package.Itinerary && Package.Itinerary.length > 0 && (
              <>
                <h1 className="text-xl mt-5 font-bold">Itinerary</h1>
                <div className="flex flex-col gap-3 mt-4">
                  {Package?.Itinerary?.map((item, idx) => {
                    const sanitizedContent = () => {
                        return {__html: DOMPurify.sanitize(item.description || "")}
                    }
                    return (
                      <div key={idx} className=" mb-3">
                        <div className="flex items-center gap-2">
                          <Star className="ml-2 size-4 text-purple-700 fill-purple-600" />
                          <h2 className="text-lg font-bold camelCase w-4/5">{item.name}</h2>
                        </div>
                        <p key={idx} className="text-justify px-2 ml-5 camelCase font-medium text-sm text-gray-500" dangerouslySetInnerHTML={sanitizedContent()}></p>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* Inclusions Section */}
            {Package.Inclusion && Package.Inclusion.length > 0 && (
              <>
                <h1 className="text-xl mt-5 font-bold">Inclusions</h1>
                <div className="flex flex-col gap-3 mt-4 px-2">
                  {Package?.Inclusion?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Star className="size-4 fill-purple-600 text-purple-700" />
                      <p key={idx} className="max-md:text-justify line-clamp-1 camelCase w-4/5 font-medium text-sm text-gray-500">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Exclusion Section */}
            {Package.Exclusion && Package.Exclusion.length > 0 && (
              <>
                <h1 className="text-xl mt-5 font-bold">Exclusions</h1>
                <div className="flex flex-col gap-3 mt-4 px-2">
                  {Package?.Exclusion?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <Star className="size-4 fill-purple-600 text-purple-700" />
                      <p key={idx} className="text-justify line-clamp-1 camelCase w-4/5 font-medium text-sm text-gray-500">
                        {item}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* FAQs section */}
            {Package.FAQs && Package.FAQs.length > 0 && (
              <>
                <h1 className="text-xl mt-5 font-bold">FAQs</h1>
                <div className="flex flex-col gap-3 mt-4">
                  {Package?.FAQs?.map((item, idx) => (
                    <div key={idx} className="px-2">
                      <div className="inline-flex items-center gap-2">
                        <Star className=" size-4 text-purple-700 fill-purple-600" />
                        <h2 className="text-lg font-bold camelCase">{item.name}</h2>
                      </div>
                      <p key={idx} className="text-justify px-2 ml-3 font-medium text-sm text-gray-500">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    )
  );
}

export default PackageDetail;
