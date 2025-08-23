import { useState } from "react";
import axios from "axios";

import {
  FiUser,
  FiMail,
  FiKey,
  FiCheckCircle,
  FiAlertTriangle,
} from "react-icons/fi";

export default function AccountSettings({ user, setUser }) {
  const [editingField, setEditingField] = useState(null);
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const saveNameEmail = async () => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API}/users/profile`,
        { name: form.name, email: form.email },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setUser(res.data);
      setEditingField(null);
      setSuccess(true);
      setMessage("Profile updated successfully!");
    } catch (error) {
      setSuccess(false);
      setMessage("Error updating profile.");
      console.log(error);
    }
  };

  const savePassword = async (e) => {
    e.preventDefault();
    if (form.newPassword !== form.confirmPassword) {
      setSuccess(false);
      setMessage("New passwords do not match");
      return;
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API}/users/update-password`,
        {
          currentPassword: form.currentPassword,
          newPassword: form.newPassword,
        },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      setSuccess(true);
      setMessage(res.data.message || "Password updated successfully!");
      setForm({
        ...form,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setEditingField(null);
    } catch (err) {
      setSuccess(false);
      setMessage(err.response?.data?.message || "Error updating password");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-6 space-y-6">
      <h3 className="text-xl font-semibold mb-4">Account Settings</h3>

      {message && (
        <div
          className={`flex items-center gap-2 rounded-lg px-4 py-3 text-sm font-medium ${
            success
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {success ? (
            <FiCheckCircle size={18} />
          ) : (
            <FiAlertTriangle size={18} />
          )}
          {message}
        </div>
      )}

      {/* Editable Name */}
      <div className="flex items-center justify-between border-b py-3">
        <div className="flex items-center gap-3">
          <FiUser className="h-5 w-5 text-indigo-500" />
          <span className="font-medium">Name</span>
        </div>
        {editingField === "name" ? (
          <div className="flex gap-2">
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="border rounded-lg px-3 py-1"
            />
            <button
              onClick={saveNameEmail}
              className="px-3 py-1 bg-indigo-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        ) : (
          <span
            className="text-gray-600 cursor-pointer hover:text-indigo-600"
            onClick={() => setEditingField("name")}
          >
            {form.name}
          </span>
        )}
      </div>

      {/* Editable Email */}
      <div className="flex items-center justify-between border-b py-3">
        <div className="flex items-center gap-3">
          <FiMail className="h-5 w-5 text-indigo-500" />
          <span className="font-medium">Email</span>
        </div>
        {editingField === "email" ? (
          <div className="flex gap-2">
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="border rounded-lg px-3 py-1"
            />
            <button
              onClick={saveNameEmail}
              className="px-3 py-1 bg-indigo-500 text-white rounded-lg"
            >
              Save
            </button>
          </div>
        ) : (
          <span
            className="text-gray-600 cursor-pointer hover:text-indigo-600"
            onClick={() => setEditingField("email")}
          >
            {form.email}
          </span>
        )}
      </div>

      {/* To change Password */}
      <div className="space-y-3 pt-2">
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() =>
            setEditingField(editingField === "password" ? null : "password")
          }
        >
          <FiKey className="h-5 w-5 text-indigo-500" />
          <span className="font-medium">Change Password</span>
        </div>

        {editingField === "password" && (
          <form onSubmit={savePassword} className="space-y-3 mt-2">
            <input
              type="password"
              name="currentPassword"
              placeholder="Current Password"
              value={form.currentPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
              value={form.newPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />
            <button
              type="submit"
              className="w-full bg-indigo-500 text-white py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              Update Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
