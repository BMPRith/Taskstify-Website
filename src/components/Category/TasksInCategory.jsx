import React, { useEffect, useState } from 'react';
import TaskCard from '../Task/TaskCard';
import axios from '../../axiosConfig';
import Sidebar from '../Sidebar';
import { useParams } from 'react-router-dom';

const formatDate = (isoString) => {
  const date = new Date(isoString);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
};

const TasksInCategory = () => {
  const { category_id } = useParams();
  const [tasks, setTasks] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasksAndCategory = async () => {
      try {
        const tasksResponse = await axios.get(`/user/tasks/category/${category_id}`, {
          withCredentials: true,
        });
        if (tasksResponse.data.success) {
          setTasks(tasksResponse.data.payload);
        } else {
          setError('Failed to fetch tasks.');
        }
        const categoryResponse = await axios.get(`/user/categories/${category_id}`, {
          withCredentials: true,
        });
        if (categoryResponse.data.success) {
          setCategoryName(categoryResponse.data.payload.name);
        } else {
          setError('Failed to fetch category details.');
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching tasks and category:', error);
        setError('Error fetching tasks and category.');
        setLoading(false);
      }
    };
    fetchTasksAndCategory();
  }, [category_id]);

  return (
    <div className="min-h-screen bg-white font-rubik flex">
      <Sidebar />
      <div className="flex-grow ml-80">
        <p className="text-2xl font-bold text-start text-gray-800 mb-4 mt-5">Category/{categoryName}</p>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">{error}</div>
        ) : tasks.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {tasks.map(task => (
              <div key={task.id} className="max-w-xs mx-auto md:mx-0 shadow-lg rounded-xl hover:transform hover:scale-105 transition duration-300 ease-in-out">
                <TaskCard task={task} onDelete={() => {}} />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex justify-center items-center min-h-screen">
            <p className="text-4xl font-semibold text-gray-800">No Tasks Availble.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TasksInCategory;
