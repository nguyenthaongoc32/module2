import React from 'react'
import Header from '../component/Header'
import Footer from '../component/footer'
import Banner from '../component/homePage/banner'
import CarList from '../component/homePage/CarList'
import Offers from '../component/homePage/Offers'
import WhyChoose from '../component/homePage/WhyChoose'
import ContactUs from '../component/homePage/ContactUs'
import { Responsive } from "../component/Reponsive.js";
const HomePage = () => {
  return (
    <>
      <Header/>
      <Banner/>
      <h1 className="font-semibold sm:text-3xl md:text-4xl lg:text-4x my-16 px-2 mx-40">Our Featured Cars</h1>
      <CarList/>
      <Offers/>
      <WhyChoose/>
      <ContactUs/>
      <Footer/>
    </>
  )
}

export default HomePage
