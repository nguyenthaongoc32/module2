import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import { toast } from "react-toastify";
import { Responsive } from "../component/Reponsive.js";
const UserManage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  const API = "http://localhost:8080/admin";

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${API}/getusers`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data.data);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to disable this account?")) return;
    try {
      await axios.delete(`${API}/deleteusers/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers((prev) => prev.filter((u) => u._id !== id));
      toast.success("Account has been disabled");
    } catch (err) {
      console.error(err);
      toast.error("Disable failure");
    }
  };

  if (loading) return <div>Loading data...</div>;

  return (
    <div className="flex min-h-screen bg-gray-100" responsive={Responsive}>
      <Sidebar />
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">User Management</h1>

        <div className="bg-white p-4 rounded shadow">
          <table className="min-w-full border-collapse">
            <thead>
              <tr className="bg-gray-50 text-left text-sm font-semibold">
                <th className="p-3 border-b">User</th>
                <th className="p-3 border-b">Email</th>
                <th className="p-3 border-b">Role</th>
                <th className="p-3 border-b text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{u.firstName} {u.lastName}</td>
                  <td className="p-3 border-b">{u.email}</td>
                  <td className="p-3 border-b capitalize">{u.role}</td>
                  <td className="p-3 border-b text-center">
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                    >
                      Disable
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan="4" className="p-3 text-center text-gray-500">
                  No users
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default UserManage;
