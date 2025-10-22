import React from "react";
import { Link } from "react-router-dom";

const Offers = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 px-6 lg:px-40 py-20 bg-gray-100">
            <div className="flex flex-col justify-start">
                <h1 className="text-5xl font-bold text-red-500">
                    <span className=" text-gray-900">DriveNow</span> TOP offers
                </h1>
                <p className="text-gray-800 mt-6 mb-6 text-2xl">
                    With our extensive fleet of vehicles, impeccable customer service,
                    and competitive rates, we ensure you have a seamless and enjoyable
                    journey wherever your adventures take you.
                </p>
            </div>


            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">

                <div className="relative overflow-hidden rounded-lg cursor-pointer group ">
                    <Link
                        to="/offers/city"
                        className="relative overflow-hidden rounded-lg cursor-pointer group block">

                        <img
                            src="/just in City.jpg"
                            alt="Just in City"
                            className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />

                        <div className="absolute top-1 right-3 bg-red-500 text-white px-4 py-2 font-bold text-xs rounded shadow-md leading-tight text-center">
                            UP TO <br /> -10% <br /> OFF
                        </div>
                        <div className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-lg">
                            Just in City
                        </div>
                    </Link>
                </div>

                {/* Card 2 */}
                <div className="relative overflow-hidden rounded-lg cursor-pointer group">
                    <Link
                        to="/offers/drive"
                        className="relative overflow-hidden rounded-lg cursor-pointer group block">
                        <img
                            src="/driver included.jpg"
                            alt="Driver Included"
                            className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-1 right-3 bg-red-500 text-white px-4 py-2 font-bold text-xs rounded shadow-md leading-tight text-center">
                            PRICE <br /> +600K <br /> VND/DAY
                        </div>
                        <div className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-lg">
                            Driver Included
                        </div>
                    </Link>
                </div>

                {/* Card 3 */}
                <div className="relative overflow-hidden rounded-lg cursor-pointer group">
                    <Link to="/offers/longTerm"
                        className="relative overflow-hidden rounded-lg cursor-pointer group block">
                        <img
                            src="/Long tern rent.jpg"
                            alt="Long Term Rent"
                            className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-1 right-3 bg-red-500 text-white px-4 py-2 font-bold text-xs rounded shadow-md leading-tight text-center">
                            UP TO <br /> -30% <br /> OFF
                        </div>
                        <div className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-lg">
                            Long Term Rent
                        </div>
                    </Link>
                </div>

                {/* Card 4 */}
                <div className="relative overflow-hidden rounded-lg cursor-pointer group">
                    <Link to="/offers/booking"
                        className="relative overflow-hidden rounded-lg cursor-pointer group block">
                        <img
                            src="/upfront booking.jpg"
                            alt="Upfront Booking"
                            className="w-full h-[300px] object-cover transform transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3 bg-red-500 text-white px-4 py-2 font-bold text-xs rounded shadow-md leading-tight text-center">
                            UP TO <br /> -10% <br /> OFF
                        </div>
                        <div className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-lg">
                            Upfront Booking
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Offers;
