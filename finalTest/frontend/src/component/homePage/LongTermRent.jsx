import React from 'react'
import Header from '../Header'
import Footer from '../footer'
import { Responsive } from "../Reponsive.js";
const LongTermRent = () => {
  return (
    <>
    <Header/>
    <div className="px-40 lg:px-40 py-16 " responsive={Responsive}>
      {/* Title */}
      <h1 className="text-7xl font-bold mb-8">
      DriveNow's  <span className="text-red-500">Long Term</span>Car Rental
      </h1>
      <p className="text-gray-500 text-lg ">Experience Convenience and Savings with<br /> DriveNow's Long Term Car Rental Service

img</p>
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
        Long-term car rental - the key to transportation freedom in Vietnam.
        </p>
</div>
<div className="space-y-7  leading-relaxed max-w-10xl mx-auto text-justify ">
        <p className="text-gray-800 text-4xl font-bold">
        DriveNow Long Term Rent - Your Solution for Extended Car Rentals

        </p>
        <p className="text-gray-600 text-2xl font-semibold ">
        Welcome to DriveNow,where we offer more than just short-term rentals. 
        Our Long Term Rent service is designed for individuals and businesses 
        who need a reliable vehicle for an extended period. Whether you're relocating,
         on a long-term project, or need a temporary vehicle
        ,DriveNow provides a hassle-free and cost-effective solution.
        </p>
</div>
<div className="space-y-7 leading-relaxed max-w-10xl mx-auto text-justify ">
        <p  className="text-gray-800 text-4xl font-bold mt-8">
        Why Choose DriveNow's Long Term Rent?
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'> Cost-Effective Rates:  </span> 
       Enjoy significant savings compared to traditional short-term rentals.
        Our long-term rates are designed to be budget-friendly, 
       offering more value the longer you rent.
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>Wide Range of Vehicles:  
       </span> From compact cars to SUVs, select the perfect vehicle that suits your needs and preferences. 
       All our vehicles are regularly serviced and maintained to ensure reliability and comfort.
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>Flexible Rental Terms:  
       </span> We understand that plans can change. Our flexible rental terms allow you to extend or shorten your rental period as needed, without hefty penalties.
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>No Long-Term Commitment: 
       </span>Avoid the long-term commitment and hefty down payments of leasing or buying a car. Our long-term rental service offers the perfect middle ground.
        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>24/7 Customer Support and Roadside Assistance:
       </span> Rest easy knowing that our team is always here to help, with round-the-clock customer support and roadside assistance.

        </p>

        <p className="text-gray-600 text-2xl font-semibold ">
       <span className='font-bold text-gray-800'>Get Started with Your Long-Term Rental Today:
       </span>Ready to enjoy the benefits of long-term car rental? Contact DriveNow today, and let us
        provide you with a seamless and affordable car rental experience for as long as you need it.
        </p>
      </div>
      
    </div>
    <Footer/>
    </>
  )
}

export default LongTermRent
