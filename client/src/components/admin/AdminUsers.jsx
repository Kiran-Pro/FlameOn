import { useEffect, useState } from "react";
import api from "../../services/authService.js";

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await api.get("/admin/users");
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const makeAdmin = async (id) => {
    try {
      await api.put(`/admin/users/${id}/make-admin`);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isAdmin: true } : u))
      );
      setMessage("User promoted to admin");
    } catch {
      setMessage("Failed to promote user");
    }
    hideMessage();
  };

  const removeAdmin = async (id) => {
    try {
      await api.put(`/admin/users/${id}/remove-admin`);
      setUsers((prev) =>
        prev.map((u) => (u._id === id ? { ...u, isAdmin: false } : u))
      );
      setMessage("Admin rights removed");
    } catch {
      setMessage("Failed to remove admin");
    }
    hideMessage();
  };

  const hideMessage = () => setTimeout(() => setMessage(""), 3000);

  return (
    <div className="space-y-6 py-16">
      <h2 className="text-2xl font-extrabold text-gray-800">Manage Users</h2>

      {message && (
        <div className="p-3 rounded-lg bg-yellow-100 text-yellow-800 shadow text-center font-medium">
          {message}
        </div>
      )}

      {/* Desktop Table */}
      <div className="overflow-hidden rounded-xl shadow-lg hidden md:block">
        <table className="w-full border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="text-left">Email</th>
              <th className="text-center">Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr
                key={user._id}
                className={`${
                  idx % 2 === 0 ? "bg-white" : "bg-gray-50"
                } hover:bg-gray-100`}
              >
                <td className="p-3 font-medium text-gray-800">{user.name}</td>
                <td className="text-gray-600">{user.email}</td>
                <td className="text-center">
                  {user.isAdmin ? (
                    <span className="px-3 py-1 text-xs font-bold bg-green-100 text-green-700 rounded-full">
                      Admin
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-bold bg-gray-200 text-gray-600 rounded-full">
                      User
                    </span>
                  )}
                </td>
                <td className="text-center">
                  {!user.isAdmin ? (
                    <button
                      onClick={() => makeAdmin(user._id)}
                      className="bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-yellow-600 transition"
                    >
                      Make Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => removeAdmin(user._id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-red-600 transition"
                    >
                      Remove Admin
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr>
                <td colSpan="4" className="p-4 text-center text-gray-500">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile / Tablet Cards */}
      <div className="md:hidden space-y-4">
        {users.map((user) => (
          <div
            key={user._id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"
          >
            {/* Header */}
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-semibold text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              {user.isAdmin ? (
                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  Admin
                </span>
              ) : (
                <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">
                  User
                </span>
              )}
            </div>

            {/* Action Button */}
            <div className="mt-3">
              <button
                onClick={() =>
                  user.isAdmin ? removeAdmin(user._id) : makeAdmin(user._id)
                }
                className={`w-full py-2 rounded-lg text-sm font-medium transition shadow-sm ${
                  user.isAdmin
                    ? "bg-red-500 text-white hover:bg-red-600"
                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                }`}
              >
                {user.isAdmin ? "Remove Admin" : "Make Admin"}
              </button>
            </div>
          </div>
        ))}
        {users.length === 0 && (
          <p className="text-center text-gray-500">No users found</p>
        )}
      </div>
    </div>
  );
}
