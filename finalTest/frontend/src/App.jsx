import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/HomePage";
import JustInCity from "./component/homePage/JustInCity";
import DriverInclude from "./component/homePage/DriverInclude";
import LongTermRent from "./component/homePage/LongTermRent";
import UpfrontBooking from "./component/homePage/UpfrontBooking";
import CarSearch from "./pages/CarSearch";
import ReserveCar from "./pages/ReserveCar";
import Booking from "./pages/Booking";
import MyProfile from "./pages/MyProfile";

function App() {
  return (
    <>
      {/* <HomePage/> */}
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/offers/city" element={<JustInCity />} />
        <Route path="/offers/drive" element={<DriverInclude />} />
        <Route path="/offers/longTerm" element={<LongTermRent/>} />
        <Route path="/offers/booking" element={<UpfrontBooking/>} />
        <Route path="/search-results" element={<CarSearch />} />
        <Route path="/getCar/:id" element={<ReserveCar/>}/>
        <Route path="/booking" element={<Booking/>}/>
        <Route path="/account" element={<MyProfile />} />

      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
