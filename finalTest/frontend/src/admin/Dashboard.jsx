import axios from "axios";
import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Responsive } from "../component/Reponsive.js";
const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:8080/admin/dashboard", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setStats(res.data.data);
      } catch (error) {
        console.error("Error fetching dashboard:", error);
      }
    };
    fetchDashboard();
  }, []);

  if (!stats) return <p>Đang tải dữ liệu...</p>;

  return (
    <div className="flex min-h-screen bg-gray-100" responsive={Responsive}>
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-3 rounded shadow">
            <div className="text-sm text-gray-500">Total Users</div>
            <div className="text-2xl font-semibold">{stats.totalUsers}</div>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <div className="text-sm text-gray-500">Total Bookings</div>
            <div className="text-2xl font-semibold">{stats.totalBookings}</div>
          </div>
          <div className="bg-white p-3 rounded shadow">
            <div className="text-sm text-gray-500">Total Cars</div>
            <div className="text-2xl font-semibold">{stats.totalCars}</div>
          </div>
        </div>
        
    </main>
    </div>
  );
};

export default Dashboard;
