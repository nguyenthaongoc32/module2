import React from 'react'
import Header from '../Header'
import Footer from '../footer'
const UpfrontBooking = () => {
  return (
    <>
    <Header/>
    <div className="px-40 lg:px-40 py-16 ">
      {/* Title */}
      <h1 className="text-7xl font-bold mb-8">
      DriveNow's  <span className="text-red-500">Upfront Booking</span> Service
      </h1>
      <p className="text-gray-500 text-lg ">DriveNow Upfront Booking - Secure Your Ride in Advance
</p>
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
        Upfront Booking - Best Prices
        </p>
</div>
<div className="space-y-7  leading-relaxed max-w-10xl mx-auto text-justify ">
        <p className="text-gray-800 text-4xl font-bold">
        Plan Ahead with Confidence: DriveNow's Upfront Booking Service

        </p>
        <p className="text-gray-600 text-2xl font-semibold ">
        Welcome to DriveNow, where we understand the importance 
        of planning and certainty in your travels. Our Upfront 
        Booking service is designed for those who prefer to organize
         their car rentals well in advance. Whether you're planning a 
         vacation, a business trip, or need a reliable vehicle for a
          special event, our Upfront Booking option ensures that your 
        desired car is reserved and ready when you are.
        </p>
</div>
<div className="space-y-7 leading-relaxed max-w-10xl mx-auto text-justify ">
        <p  className="text-gray-800 text-4xl font-bold mt-8">
        Why Choose DriveNow's Upfront Booking?
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'> Guaranteed Reservations: </span> 
       Book your car in advance and rest assured that the vehicle 
       you want will be available when you need it. No more concerns 
       about availability during peak seasons or special events.
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>Competitive Pricing:   
       </span> Benefit from our competitive rates when you book 
       in advance. Enjoy the best deals and full transparency with
        no hidden fees.

        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>Wide Selection of Vehicles:   
       </span> Need to make changes to your booking? Our flexible policies allow you to adjust your reservation without hassle.
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>Flexible Booking Options: 
       </span>Avoid the long-term commitment and hefty down payments of leasing or buying a car. Our long-term rental service offers the perfect middle ground.
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>Dedicated Customer Service:
       </span>Our team is here to assist you throughout the booking process, ensuring a smooth and personalized experience.

        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>Book Early and Travel Worry-Free:
       </span>Start planning your next journey today with DriveNow's Upfront Booking. Secure your preferred vehicle and enjoy a hassle-free rental experience. Contact us to make your reservation and take the first step towards a worry-free travel experience.
        </p>
      </div>
      
    </div>
    <Footer/>
    </>
  )
}

export default UpfrontBooking
