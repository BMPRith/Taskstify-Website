import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from '../../axiosConfig';

const UpdateTask = () => {
    const { taskId } = useParams();
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [status, setStatus] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await axios.get(`/user/tasks/${taskId}`);
                const task = response.data.payload;
                // Format the date to match the input type="datetime-local"
                const formattedDate = new Date(task.date).toISOString().slice(0, 16);
                setDate(formattedDate);
                setCategory(task.categoryId);
                setStatus(task.status);
                setTitle(task.name);
                setDescription(task.description);
            } catch (error) {
                setError('Error fetching task.');
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get('/user/categories/all');
                setCategories(response.data.payload);
            } catch (error) {
                setError('Error fetching categories.');
            }
        };

        fetchTask();
        fetchCategories();
    }, [taskId]);

    const handleUpdate = async () => {
        try {
            await axios.put(`/user/tasks/${taskId}`, {
                name: title,
                description,
                date,
                status,
                categoryId: parseInt(category, 10)
            }, {
                withCredentials: true,
            });
            navigate('/home/tasks');
        } catch (error) {
            setError('Error updating task.');
        }
    };

    const handleCancel = () => {
        navigate('/home/tasks');
    };

    return (
        <div className="w-full h-full font-bold text-gray-800 p-20">
            <h2 className="text-4xl mb-10 text-center">Update Task</h2>
            <form>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                        <label className="block text-xl text-gray-800 mb-2">Date</label>
                        <input 
                            type='datetime-local'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-full shadow px-2 py-[5px] border bg-white border-gray-300 rounded"
                        />
                    </div>
                    <div>
                        <label className="block text-xl text-gray-800 mb-2">Category</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full shadow p-2 border bg-white border-gray-300 rounded"
                        >
                            <option value="" disabled>Choose Category</option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>{cat.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xl text-gray-800 mb-2">Status</label>
                        <select
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            className="w-full shadow p-2 border bg-white border-gray-300 rounded"
                        >
                            <option value="" disabled>Choose Status</option>
                            <option value="not_yet">Not Yet</option>
                            <option value="in_progress">In Progress</option>
                            <option value="is_completed">Done</option>
                        </select>
                    </div>
                </div>
                <div className="mb-4">
                    <label className="block text-xl text-gray-800 mb-2">Title</label>
                    <input
                        type="text"
                        placeholder={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full shadow p-2 border bg-white border-gray-300 rounded"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-xl text-gray-800 mb-2">Description</label>
                    <textarea
                        placeholder={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full shadow p-2 border bg-white border-gray-300 rounded"
                    />
                </div>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-800 text-white px-4 py-2 shadow rounded-lg"
                    >
                        Cancel
                    </button>
                    <button
                        type="button"
                        onClick={handleUpdate}
                        className="bg-yellow-500 hover:bg-yellow-800 text-white px-4 py-2 shadow rounded-lg"
                    >
                        Update
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateTask;
