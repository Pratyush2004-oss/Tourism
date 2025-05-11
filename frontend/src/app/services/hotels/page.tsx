"use client";

import React from "react";
import { Landing } from "@/components/shared/Landing";
import { MapPin, Bed, Calendar, Star } from "lucide-react";
import { HOTELSDATA } from "@/services/Options";
import CitySearchBar from "@/components/shared/Searchbar";

const HOTELSERVICES = [
  { name: "Luxury Hotels in Jaipur" },
  { name: "Budget Hotels in Udaipur" },
  { name: "Heritage Properties in Jodhpur" },
  { name: "Resorts in Jaisalmer" },
  { name: "Homestays in Pushkar" },
  { name: "Boutique Hotels in Mount Abu" },
];

function Hotels() {
  const affiliateBaseUrl =
    "https://linksredirect.com/?cid=230828&source=linkkit&url=https%3A%2F%2Fwww.makemytrip.com%2Fhotels";

  const handleRedirect = (destination: string) => {
    const encodedDestination = encodeURIComponent(destination);
    const redirectUrl = `${affiliateBaseUrl}?destination=${encodedDestination}`;
    window.open(redirectUrl, "_blank");
  };

  return (
    <>
      {/* Landing Section */}
      <Landing IMAGES={HOTELSDATA.images} />

      {/* Header */}
      <div className="p-5">
        <h1 className="text-3xl md:text-5xl mb-8 font-bold text-center font-serif text-purple-600 border-b-4 border-purple-500">
          Hotel Services
        </h1>
        <p className="text-center text-gray-600 text-lg md:text-xl">
          Explore our top hotel services for a luxurious and comfortable stay.
          Book your favorite hotels with ease!
        </p>
      </div>

      {/* Search bar section */}
      <CitySearchBar doubleSearch={false} />

      {/* Hotel Services Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 px-5 md:px-10">
        {HOTELSERVICES.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-lg shadow-lg bg-white hover:shadow-2xl hover:scale-105 transition-all duration-300 cursor-pointer"
            onClick={() => handleRedirect(item.name)}
          >
            <div className="flex items-center justify-center mb-4">
              <Bed className="w-10 h-10 text-purple-500" />
            </div>
            <h1 className="text-center font-semibold text-xl text-gray-800 mb-2">
              {item.name}
            </h1>
            <p className="text-center text-gray-600">
              Book your stay at {item.name.split(" in ")[1]} with the best deals
              and comfort.
            </p>
          </div>
        ))}
      </div>

      {/* Additional Information Section */}
      <div className="mt-10 px-5 md:px-20 py-10 bg-purple-50 rounded-lg shadow-lg">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-purple-600 mb-6">
          Why Choose Our Hotel Services?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center">
            <MapPin className="w-12 h-12 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              Prime Locations
            </h3>
            <p className="text-gray-600">
              Stay at hotels located in the heart of the city or near popular
              attractions.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Calendar className="w-12 h-12 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              Flexible Bookings
            </h3>
            <p className="text-gray-600">
              Enjoy flexible booking options to suit your travel plans.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Star className="w-12 h-12 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              Top-Rated Hotels
            </h3>
            <p className="text-gray-600">
              Choose from a selection of highly-rated hotels for a premium
              experience.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <Bed className="w-12 h-12 text-purple-500 mb-3" />
            <h3 className="text-lg font-semibold text-gray-800">
              Comfortable Stays
            </h3>
            <p className="text-gray-600">
              Enjoy luxurious amenities and comfortable accommodations.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Hotels;
