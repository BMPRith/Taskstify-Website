import React, { useEffect, useState } from "react";
import axios from '../../axiosConfig';
import trash from '../../assets/delete.png';
import Popup from '../Popup';

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [popupContent, setPopupContent] = useState(null);
  const [popupTitle, setPopupTitle] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("/admin/users/all");
      setUsers(response.data.payload);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const openPopup = (title, content) => {
    setPopupTitle(title);
    setPopupContent(content);
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setPopupContent(null);
    setPopupTitle('');
  };

  const deleteUser = async (userId) => {
    openPopup(
      "Delete User",
      <div>
        <p>Are you sure you want to delete this user?</p>
        <div className="flex justify-evenly mt-4">
          <button
            onClick={() => {
              closePopup();
              handleDeleteUser(userId);
            }}
            className="bg-red-500 text-gray-100 px-4 py-2 rounded-lg hover:bg-red-800 transition-colors duration-300 ease-in-out mr-2"
          >
            Delete
          </button>
          <button
            onClick={closePopup}
            className="bg-gray-500 text-gray-100 px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-300 ease-in-out"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };

  const handleDeleteUser = async (userId) => {
    try {
      await axios.delete(`/admin/users/${userId}`);
      fetchUsers(); 
    } catch (error) {
      setError(error.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="border-b">
      {/* <Sidebar /> */}
      <p className="text-2xl font-bold text-center text-gray-800 mb-4">Admin Dashboard</p>
      <table className="min-w-full bg-white shadow rounded-lg">
        <thead>
          <tr>
            <th className="py-2 px-4 text-gray-800 text-left font-medium border-b">Name</th>
            <th className="py-2 px-4 text-gray-800 text-left font-medium border-b">Email</th>
            <th className="py-2 px-4 text-gray-800 text-left font-medium border-b">Role</th>
            <th className="py-2 px-4 text-gray-800 text-left font-medium border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="py-2 px-4 text-gray-800 text-left border-b">{user.name}</td>
              <td className="py-2 px-4 text-gray-800 text-left border-b">{user.email}</td>
              <td className="py-2 px-4 text-gray-800 text-left border-b">{user.role}</td>
              <td className="py-2 px-4 text-gray-800 flex justify-start border-b">
                <button className="pl-4 focus:outline-none"
                  onClick={() => deleteUser(user.id)}
                >
                  <img src={trash} width={25} alt="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Popup isOpen={isPopupOpen} onClose={closePopup} title={popupTitle}>
        {popupContent}
      </Popup>
    </div>
  );
};

export default Dashboard;
