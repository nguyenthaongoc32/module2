import React from 'react'
import Header from '../Header'
import Footer from '../footer'
import { Responsive } from "../Reponsive.js";
const DriverInclude = () => {
  return (
    <>
    <Header/>
    <div className="px-40 lg:px-40 py-16 " responsive={Responsive}>
      {/* Title */}
      <h1 className="text-7xl font-bold mb-8">
      DriveNow's  <span className="text-red-500">'Driver Included'</span>Service 
      </h1>
      <p className="text-gray-500 text-lg ">DriveNow's Premium 'Driver Included' Service<br /> - Hassle-Free, Luxury Car Rentals</p>
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
        Traveling with the driver - is luxury option
        </p>
</div>
<div className="space-y-7  leading-relaxed max-w-10xl mx-auto text-justify ">
        <p className="text-gray-800 text-4xl font-bold">
        Discover the Luxury of DriveNow's 'Driver Included' Service

        </p>
        <p className="text-gray-600 text-2xl font-semibold ">
        Welcome to DriveNow, where we redefine your travel experience 
        with our exclusive 'Driver Included' service. Immerse yourself 
        in the epitome of luxury and convenience, tailor-made for discerning 
        clients who value comfort, safety, and elegance. Whether you're on a business 
        trip, attending a special event, or exploring the city, our professional 
        drivers and premium vehicles ensure a journey like no other.
        </p>
        <p className="text-gray-600 text-2xl font-semibold ">
        Our service is designed for those who desire more than just
         a car rental. We provide a seamless, personalized travel experience, 
         ensuring that every journey is memorable,
         safe, and conducted in utmost style.
        </p>
</div>
<div className="space-y-7 leading-relaxed max-w-10xl mx-auto text-justify ">
        <p  className="text-gray-800 text-4xl font-bold mt-8">
        Why Choose 'Driver Included' Service?
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'> Professional and Experienced </span> Drivers: Our drivers are 
        not just chauffeurs; they are your personal concierges 
        on the road. With extensive training, a stellar safety record, 
        and deep knowledge of the locale, 
        they ensure your journey is smooth and enjoyable.
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>Wide Selection of Premium Vehicles:  
       </span> Select from our diverse fleet of luxury cars,
        each impeccably maintained and equipped with 
       top-of-the-line features for your comfort and security.
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>Flexible Booking and Customizable Itineraries:  
       </span> We understand that every journey is unique. Our service offers the flexibility to customize your itinerary to suit your schedule and preferences.
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>Complimentary Amenities for Your Comfort:
       </span> Enjoy onboard amenities like Wi-Fi, bottled water, and other comforts that make your journey more pleasant.

        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>24/7 Customer Support and Assistance:
       </span> Our team is always on hand to assist you, ensuring peace of mind throughout your rental experience.

        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>Ready to Experience the Ultimate in Luxury Travel?
       </span> Book your 'Driver Included' experience with DriveNow today
        and discover where luxury meets convenience. Our team is ready to
         assist you in crafting a journey that exceeds your expectations.
        </p>
      </div>
      
    </div>
    <Footer/>
    </>
  )
}

export default DriverInclude
