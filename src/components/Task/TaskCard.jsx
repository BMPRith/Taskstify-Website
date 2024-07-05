import React, { useState } from 'react';
import axios from '../../axiosConfig';
import xmark from '../../assets/x-mark.png';
import { Link, useNavigate } from 'react-router-dom';

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

const TaskCard = ({ task, onDelete }) => {
  const statusMap = {
    'in_progress': 'In Progress',
    'not_yet': 'Not Yet',
    'is_completed': 'Done',
    'In Progress': 'in_progress',
    'Not Yet': 'not_yet',
    'Done': 'is_completed'
  };

  const mapStatus = (status) => statusMap[status];
  const [showDetails, setShowDetails] = useState(false);
  const [status, setStatus] = useState(task.status);
  const [error, setError] = useState(null);

  const toggleStatus = (e) => {
    e.stopPropagation();
    let newStatus;
    switch (status) {
      case 'not_yet':
        newStatus = 'in_progress';
        break;
      case 'in_progress':
        newStatus = 'is_completed';
        break;
      case 'is_completed':
        newStatus = 'not_yet';
        break;
      default:
        newStatus = 'not_yet';
        break;
    }
    setStatus(newStatus);
    updateStatusInBackend(newStatus);
  };

  const getStatusColor = () => {
    switch (status) {
      case 'not_yet':
        return 'bg-gray-400';
      case 'in_progress':
        return 'bg-blue-400';
      case 'is_completed':
        return 'bg-green-400';
      default:
        return 'bg-gray-400';
    }
  };

  const updateStatusInBackend = async (newStatus) => {
    try {
      await axios.put(`/user/tasks/${task.id}`, {
        name: task.name,
        description: task.description,
        status: newStatus,
        categoryId: task.categoryId,
      });
    } catch (error) {
      console.error('Error updating status in the backend:', error);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`/user/tasks/${task.id}`, {
        withCredentials: true,
      });
      onDelete(task.id);
      document.getElementById(`delete_modal_${task.id}`).close();
    } catch (error) {
      setError('Error deleting task.');
    }
  };

  const handleCancelDelete = (e) => {
    e.stopPropagation();
    document.getElementById(`delete_modal_${task.id}`).close();
  };

  const handleClose = (e) => {
    e.stopPropagation();
    document.getElementById(`task_details_${task.id}`).close();
  };

  return (
    <div className={`max-w-xs mx-auto md:mx-0 shadow-lg rounded-xl hover:transform hover:scale-105 transition duration-300 ease-in-out ${getStatusColor()}`} onClick={() => document.getElementById(`task_details_${task.id}`).showModal()}>
      <dialog id={`task_details_${task.id}`} className="modal modal-middle">
        <div className="modal-box bg-white">
          <div className='flex justify-between'>
            <p className="font-bold text-gray-800 text-xl mb-2">{task.name}</p>
            <p className='text-gray-800'>{formatDate(task.date)}</p>
          </div>
          <p className="text-gray-800 text-end">Status: {statusMap[status]}</p>
          <div className='border-b-2 border-gray-200'></div>
          <p className="text-gray-800">{task.description}</p>
          <div className='flex justify-end'>
            <button className='bg-yellow-500 hover:bg-yellow-800 border-none text-white px-4 py-2 shadow rounded-lg mr-2'>
              <Link to={`/home/tasks/update/${task.id}`}>Update</Link>
            </button>
            <button className='bg-gray-500 hover:bg-gray-800 border-none text-white px-4 py-2 shadow rounded-lg' onClick={handleClose}>
              Close
            </button>
          </div>
        </div>
      </dialog>
      <div className="px-6 py-4">
        <div className='flex justify-between'>
          <div className="font-bold text-gray-800 text-xl mb-2">{task.name}</div>
          <button className='pb-2 hover:transform hover:scale-105 transition duration-300 ease-in-out' onClick={(e) => { e.stopPropagation(); document.getElementById(`delete_modal_${task.id}`).showModal(); }}>
            <img src={xmark} width={25} alt="Delete" />
          </button>
          <dialog id={`delete_modal_${task.id}`} className="modal modal-middle">
            <div className="modal-box bg-white">
              <p className="font-medium text-gray-800 text-lg text-center">Are You Sure Want To Delete This Task?</p>
              <div className='flex justify-evenly'>
                <button className="py-2 text-white bg-red-500 hover:bg-red-800 mt-5 mr-5 font-medium px-6 rounded-lg shadow-lg" onClick={handleDelete}>Delete</button>
                <button className="py-2 text-white bg-gray-500 hover:bg-gray-800 mt-5 mr-5 font-medium px-6 rounded-lg shadow-lg" onClick={handleCancelDelete}>Cancel</button>
              </div>
            </div>
          </dialog>
        </div>
        <p className='text-gray-800'>{formatDate(task.date)}</p>
        <p className="text-gray-800 line-clamp-1">{task.description}</p>
      </div>
      <div className="px-6 py-4 flex justify-between items-center">
        <div>
          <button className="text-gray-800 bg-gray-100 font-medium px-10 py-1 rounded-full shadow-lg" onClick={toggleStatus}>
            {statusMap[status]}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
