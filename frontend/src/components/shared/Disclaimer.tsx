import React from "react";
import './Disclaimer.css';
function Disclaimer() {
  const text = `Discover the Royal Heritage of Rajasthan with ExploreIndiaView
  Embark on an unforgettable journey through the land of kings with ExploreIndiaView's expertly curated Rajasthan tours. From the golden sands of the Thar Desert to the majestic palaces of Jaipur, Udaipur, Jodhpur, and beyond, experience the rich culture, vibrant festivals, and architectural wonders that define this royal state. Whether you're seeking luxury, adventure, or cultural immersion, our Rajasthan packages offer personalized itineraries, local insights, and seamless travel services to make your trip truly exceptional.
  Let ExploreIndiaView bring the magic of Rajasthan to life—book your royal escape today`;
  return (
    <div className="relative overflow-hidden bg-blue-50 p-5">
      <h1 className="text-2xl md:text-4xl mb-5 font-bold text-center font-serif border-b-4">
        Disclaimer
      </h1>
      <div className="marquee">
        <p className="marquee-text">{text}</p>
      </div>
    </div>
  );
}

export default Disclaimer;
