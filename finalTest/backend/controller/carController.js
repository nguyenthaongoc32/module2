import CarModel from "../model/Car.js";


export const getCar = async (req, res, next) => {
    try {
        const cars = await CarModel.find();
        res.status(200).json({
            ok: true,
            data: cars,
            message: "Cars retrieved successfully !",
        });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};


export const getCarId = async (req, res) => {
    try {
      const { id } = req.params;
      const car = await CarModel.findById(id);
  
      if (!car) {
        return res.status(404).json({
          success: false,
          message: "Car not found",
        });
      }
  
      res.status(200).json({
        success: true,
        data: car,
      });
    } catch (err) {
      console.error("❌ Error in getCarById:", err);
      res.status(500).json({
        success: false,
        message: err.message,
      });
    }
  };