import React, { useEffect, useState } from 'react';
import TaskCard from '../Task/TaskCard';
import axios from '../../axiosConfig';
import Sidebar from '../Sidebar';

const Inprogress = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('/user/tasks/all', {
          withCredentials: true, 
        });
        const inProgressTasks = response.data.payload.filter(task => task.status === 'in_progress');
        setTasks(inProgressTasks);
        setLoading(false);
      } catch (error) {
        setError('Error fetching tasks.');
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-white font-rubik flex">
      <Sidebar />
      <div className="flex-grow">
        <div className="ml-80 mt-10">
          {loading ? (
            <div>Loading...</div>
          ) : error ? (
            <div className="text-red-500">{error}</div>
          ) : (
            <div className="grid grid-cols-3 gap-4">
              {tasks.map(task => (
                <TaskCard key={task.id} task={task} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Inprogress;
