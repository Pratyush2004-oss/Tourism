import { Landing } from "@/components/shared/Landing";
import { CAROUSELIMAGE } from "@/services/Options";
import React from "react";

function PrivacyPolicy() {
  return (
    <>
      <Landing IMAGES={CAROUSELIMAGE} />
      <div className="flex flex-col gap-5 p-5">
        <div>
          <h1 className="text-xl font-bold font-serif">Our Liabilities and Limitations</h1>
          <p className="text-sm text-justify font-medium text-gray-500">
            Please note that after the finalization of the Tour/ service Cost,
            if there are any Hike in entrance fees of monuments / museums,
            Taxes, fuel cost or guide charges – by Govt of India, the same would
            be charged as extra. <br />
            We shall not be responsible for any delays, cancellations &
            alterations in the program or expenses incurred directly or
            indirectly due to natural hazards, flight/train cancellations, and
            accident, breakdown of machinery or equipment’s, breakdown of
            transport, weather, sickness, landslides, political closures or any
            untoward incidents.
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold font-serif">Privacy Policy</h1>
          <p className="text-sm text-justify font-medium text-gray-500">
            N Cube Tour (Explore India Tour) values the trust you place in
            Incredible tour to India. This statement discloses the information
            practices for the Incredibletourtoindia, including what type of
            information is gathered and tracked, how the information is used and
            with whom the information is shared.
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold font-serif">Collection of Personally identifiable information</h1>
          <p className="text-sm text-justify font-medium text-gray-500">
            Incredible tour to India collects your personal information for the
            purpose of site security and to ensure our service remains available
            to all users. The personal information we collect from you will
            include following information:
          </p>
          <ul className="list-disc ml-4 font-medium text-sm text-gray-700 my-1 text-justify">
            <li>Name of the user</li>
            <li>Contact information including email address</li>
          </ul>
          <p className="text-sm text-justify font-medium text-gray-500">
            We require this information to understand your needs and provide you
            with a better service, and in particular for the following reasons:
          </p>
          <ul className="list-disc ml-4 font-medium text-sm text-gray-700 my-1 text-justify">
            <li>Internal record keeping.</li>
            <li>We may use the information to improve our services only.</li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-bold font-serif">Cancellation Policy</h1>
          <p className="text-sm text-justify font-medium text-gray-500">
            In the event of cancellation of tour/travel services due to any
            avoidable/unavoidable reason/s, we must be notified of the same in
            writing. Cancellation charges will be effective from the date we
            receive advice in writing, and cancellation charges would be as
            follows:–
          </p>
          <ul className="list-disc ml-4 font-medium text-sm text-gray-700 my-1 text-justify">
            <li>60 days prior to arrival: 10% of the Tour / service cost</li>
            <li>45 days prior to arrival: 20% of the Tour / service cost</li>
            <li>15 days prior to arrival: 25% of the Tour / service cost</li>
            <li>07 days prior to arrival: 50% of the Tour / service cost</li>
          </ul>
        </div>
        <div>
          <h1 className="text-xl font-bold font-serif">Less than 72 hours or No Show: No Refund </h1>
          <p className="text-sm text-justify font-medium text-gray-500">
            In the case of Special Trains Journeys and peak season hotel
            bookings a separate cancellation policy is applicable (which can be
            advised as and when required).
          </p>
        </div>
        <div>
          <h1 className="text-xl font-bold font-serif">Some cancellation and refund policies are out of our tender:</h1>
          <ul className="list-disc ml-4 font-medium text-sm text-gray-700 my-1 text-justify">
            <li>
              Refunds for hotel payments will follow the hotel’s cancellation
              policy
            </li>
            <li>
              Train tickets cancellations will follow the Railway’s policy
            </li>
            <li>
              Flight tickets cancellations will follow the airlines' company
              policy
            </li>
            <li>
              In case you cancel the trip after commencement, a refund would be
              restricted to a limited amount only which too would depend on the
              amount that we would be able to recover from the hoteliers/
              contractors we patronize. For unused hotel accommodation,
              chartered transportation & missed meals etc. we do not bear any
              responsibility to refund.
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default PrivacyPolicy;
