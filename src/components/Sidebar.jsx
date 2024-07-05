import React, { useContext, useEffect, useState } from 'react';
import done from '../assets/done.png';
import progress from '../assets/progress.png';
import notyet from '../assets/notyet.png';
import task from '../assets/task.png';
import userprofile from '../assets/user.png';
import userlogout from '../assets/user-logout.png';
import categories from '../assets/category.png';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const [isStatusVisible, setIsStatusVisible] = useState(true);
  const toggleStatusVisibility = () => {
    setIsStatusVisible(!isStatusVisible);
  };
    const navigate = useNavigate();
    const handleLogout = () => {
    logout();
    navigate('/');
  };
  return (
    <div className="fixed h-full w-60 font-rubik bg-yellow-500 text-gray-800">
      <div className="p-6 font-semibold">
        <ul>
        <Link to={"/home/profile"} className="mb-4 flex items-center">
            <img src={userprofile} width={20}/>
            <a href="#" className="text-lg pl-2 hover:text-gray-100">{user?.name}</a>
        </Link>
        <Link to={"/home/tasks"} className="mb-4 flex items-center">
            <img src={task} width={20}/>
            <a href="#" className="text-lg pl-2 hover:text-gray-100">Tasks</a>
        </Link>
        <Link to={"/home/categories"} className="mb-4 flex items-center">
            <img src={categories} width={20}/>
            <a href="#" className="text-lg pl-2 hover:text-gray-100">Categories</a>
        </Link>
          <li className="mb-4">
            <button
              onClick={toggleStatusVisibility}
              className="text-lg focus:outline-none flex items-center"
            >
              Status
              <span className="pl-2 text-xs">{isStatusVisible ? '▲' : '▼'}</span>
            </button>
            {isStatusVisible && (
              <ul className="pl-4 mt-2">
                <Link to="/home/status/notyet" className="mb-2 flex items-center">
                  <img src={notyet} width={20} />
                  <span className="text-md pl-2 hover:text-gray-100">Not Yet</span>
                </Link>
                <Link to="/home/status/inprogress" className="mb-2 flex items-center">
                  <img src={progress} width={20} />
                  <span className="text-md pl-2 hover:text-gray-100">In Progress</span>
                </Link>
                <Link to="/home/status/done" className="mb-2 flex items-center">
                  <img src={done} width={20} />
                  <span className="text-md pl-2 hover:text-gray-100">Done</span>
                </Link>
              </ul>
            )}
          </li >
          <div className='flex items-center'>
            <img src={userlogout} width={20} />
            <button onClick={handleLogout} className="text-md pl-2 hover:text-gray-100">
                  Logout
            </button>
          </div>
        </ul> 
      </div>
      </div>
  );
}

export default Sidebar;
