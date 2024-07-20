import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import done from '../assets/done.png';
import progress from '../assets/progress.png';
import notyet from '../assets/notyet.png';
import task from '../assets/task.png';
import userprofile from '../assets/user.png';
import userlogout from '../assets/user-logout.png';
import categories from '../assets/category.png';
import left from '../assets/sidebar-left.png';
import right from '../assets/sidebar-right.png';
import admin from '../assets/administrator.png';
import feedback from '../assets/feedback.png';
const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex font-rubik">
      <div className={`fixed inset-y-0 left-0 transform ${isOpen ? 'w-60' : 'w-20'} transition-width duration-700 ease-in-out bg-yellow-500 border-gray-800 text-white shadow-lg z-25`}>
        <div className="p-4 flex flex-col items-start">
          <button onClick={toggleSidebar} className="absolute top-4 left-4">
            {isOpen ? <img src={left} width={25} /> : <img src={right} width={25} />}
          </button>
          <ul className="w-full mt-10">
            <Link to={"/home/profile"} className="mb-6 flex items-center">
              <img src={userprofile} width={25} />
              {isOpen && <span className="text-lg text-gray-800 font-semibold ml-3 hover:text-gray-100">{user?.name}</span>}
            </Link>
            <Link to={"/home/tasks"} className="mb-6 flex items-center">
              <img src={task} width={25} />
              {isOpen && <span className="text-lg text-gray-800 font-semibold ml-3 hover:text-gray-100">Tasks</span>}
            </Link>
            <Link to={"/home/categories"} className="mb-6 flex items-center">
              <img src={categories} width={25} />
              {isOpen && <span className="text-lg text-gray-800 font-semibold ml-3 hover:text-gray-100">Categories</span>}
            </Link>
            <Link to="/home/status/notyet" className="mb-6 flex items-center">
              <img src={notyet} width={25} />
              {isOpen && <span className="text-lg text-gray-800 font-semibold ml-3 hover:text-gray-100">Not Yet</span>}
            </Link>
            <Link to="/home/status/inprogress" className="mb-6 flex items-center">
              <img src={progress} width={25} />
              {isOpen && <span className="text-lg text-gray-800 font-semibold ml-3 hover:text-gray-100">In Progress</span>}
            </Link>
            <Link to="/home/status/done" className="mb-6 flex items-center">
              <img src={done} width={25} />
              {isOpen && <span className="text-lg text-gray-800 font-semibold ml-3 hover:text-gray-100">Done</span>}
            </Link>
            <Link to="/admin/dashboard" className="mb-6 flex items-center">
              <img src={admin} width={25} />
              {isOpen && <span className="text-lg text-gray-800 font-semibold ml-3 hover:text-gray-100">Administractor</span>}
            </Link>
            <Link to="/feedback" className="mb-6 flex items-center">
              <img src={feedback} width={25} />
              {isOpen && <span className="text-lg text-gray-800 font-semibold ml-3 hover:text-gray-100">Feedbacks</span>}
            </Link>
            <div className="flex items-center w-full" onClick={handleLogout}>
              <img src={userlogout} width={25} className='cursor-pointer'/>
              {isOpen && <button className="text-md font-semibold text-gray-800 ml-3 hover:text-gray-100">Logout</button>}
            </div>
          </ul>
        </div>
      </div>

      <div className={`transition-transform duration-700 ease-in-out ${isOpen ? 'ml-64' : 'ml-25'}`}>
         
      </div>
    </div>
  );
}

export default Sidebar;
