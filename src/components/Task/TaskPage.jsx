import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import TaskCard from './TaskCard';
import { Link } from 'react-router-dom';
import axios from '../../axiosConfig';

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/user/tasks/all', {
          withCredentials: true, 
        });
        setTasks(response.data.payload);
        setLoading(false);
      } catch (error) {
        setError('Error fetching tasks.');
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  return (
    <div className="min-h-screen font-rubik">
      <Sidebar />
      <div className="flex flex-col md:flex-row justify-between items-center md:ml-80 mx-4 md:mx-0">
        <p className="text-2xl font-bold text-gray-700 mb-4 mt-5 md:mb-0">My Tasks</p>
        <Link to={"/home/tasks/add"} className="bg-yellow-500 hover:bg-yellow-800 mt-5 mr-5 text-white font-medium px-4 py-2 rounded-lg shadow-lg">
          Add Task 
        </Link>
      </div>
      {loading ? (
        <div className="ml-0 md:ml-80 mt-10">Loading...</div>
      ) : error ? (
        <div className="ml-0 md:ml-80 mt-10 text-red-500">{error}</div>
      ) : (
        <div className="ml-0 md:ml-80 mt-10 mr-0 md:mr-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} onDelete={handleDeleteTask} />
          ))}
        </div>
      )}
    </div>
  );
};

export default TaskPage;
