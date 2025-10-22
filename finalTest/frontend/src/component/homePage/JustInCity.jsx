import React from "react";
import Header from "../Header";
import Footer from "../footer";

const JustInCity= () => {
  return (
    <>
    <Header/>
    <div className="px-40 lg:px-40 py-16 ">
      {/* Title */}
      <h1 className="text-7xl font-bold mb-8">
      Explore the City with  <span className="text-red-500">Savings!</span>
      </h1>
      <p className="text-gray-500 text-lg ">DriveNow – Your key to unlocking urban adventures!</p>
      {/* Image */}
      <div className="flex justify-center mb-8">
        <img
          src="/city_drive.jpg"
          alt="Car Rental Service"
          className="w-full max-w-10xl rounded-lg shadow-md"
        />
      </div>

      {/* Text dưới ảnh */}
      <div className="space-y-7 text-gray-500 leading-relaxed max-w-10xl mx-auto text-justify text-6xl font-semibold">
        <p>
        Enjoy the city with the car rental from DriveNow
        </p>
</div>
<div className="space-y-7  leading-relaxed max-w-10xl mx-auto text-justify ">
        <p className="text-gray-800 text-2xl font-bold">
        Explore the City with Ease and Savings!
        </p>
        <p className="text-gray-600 text-xl font-semibold ">
        Discover the heartbeat of the city with DriveNow latest exclusive offer – a generous 10% 
        discount on all City Drive rentals. 
        Designed for urban explorers and city slickers alike, 
        City Drive not only offers the convenience you crave but 
        now comes with an unbeatable discount to elevate your experience.
        </p>
</div>
<div className="space-y-7 leading-relaxed max-w-10xl mx-auto text-justify ">
        <p  className="text-gray-800 text-2xl font-bold mt-8">
        Modern Comforts, Extra Savings:
        </p>

        <p className="text-gray-600 text-xl font-semibold ">
        City Drive isn't just about getting from point A to B; 
        it's about embracing the journey. Our vehicles boast modern
         features for your comfort and convenience, making every drive 
         an enjoyable experience. And now, with a 10% discount, your urban 
         exploration comes with extra savings.
        </p>
      </div>
      <div className="space-y-7 leading-relaxed max-w-10xl mx-auto text-justify ">
        <p  className="text-gray-800 text-2xl font-bold mt-8">
        Terms and Conditions:
        </p>

        <p className="text-gray-600 text-xl font-semibold ">
        This exclusive offer is valid for a limited time, 
        so don't miss out on the chance to enhance your city 
        experience with DriveNow. Visit our website for complete details 
        and book your City Drive today.
        </p>
      </div>
      <div className="space-y-7 leading-relaxed max-w-10xl mx-auto text-justify ">
        <p className="text-gray-600 text-xl font-semibold mt-8">
        Hit the city streets with confidence, style, and extra savings. DriveNow – Your key to unlocking urban adventures!
        </p>
        <p className="text-gray-600 text-xl font-semibold font-style: italic"><span className="text-red-500 text-xl font-semibold" >Note:</span> Terms and conditions apply. Promotion subject to availability and may be subject to change without notice.</p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default JustInCity;
