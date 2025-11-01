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
import Dashboard from "./admin/Dashboard";
import UserManage from "./admin/UserManage";
import CarManage from "./admin/CarManage";
import BookingManage from "./admin/BookingManage";
import CarForm from "./admin/CarForm";
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
        <Route path="/admin/dashboard" element={<Dashboard/>}/>
        <Route path="/admin/users" element={<UserManage/>}/>
        <Route path="/admin/cars" element={<CarManage/>}/>
        <Route path="/admin/bookings" element={<BookingManage/>}/>
        <Route path="/admin/cars/add" element={<CarForm/>}/>
      </Routes>

      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;
