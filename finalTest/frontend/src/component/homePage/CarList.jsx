import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import axios from "axios";
import CarCard from "./CarCard.jsx";
import CustomButtonGroup from "./CustomButtonGroup.jsx";
const CarList = () => {
  const [cars, setCars] = useState([]);

  const getCars = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/car/getCar", {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data.ok) {
        setCars(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  return (
    <div className="relative my-12 mx-auto px-[150px]">
      {cars.length > 0 && (
        <Carousel
          responsive={responsive}
          infinite={true}
          arrows={false}   // bỏ arrows mặc định
          showDots={false} // bỏ dots
          autoPlay={false}
          customTransition="all 0.5s"
          transitionDuration={500}
          containerClass="carousel-container"
          itemClass="px-2"
          renderButtonGroupOutside={true}
          customButtonGroup={<CustomButtonGroup />}
        >
          {cars.map((car) => (
            <CarCard key={car._id} car={car} />
          ))}
        </Carousel>
      )}
    </div>
  );
};

export default CarList;
