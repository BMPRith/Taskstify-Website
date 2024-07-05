import React, { useState } from 'react';
import plus from '../../assets/plus.png';
import menu from '../../assets/menu.png';
import trash from '../../assets/trash-can.png';
import note from '../../assets/notes.png';
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosConfig';

const CategoryCard = ({ category }) => {
    const [name, setName] = useState('');
    const [updateName, setUpdateName] = useState(category.name);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

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

    const handleCreate = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/user/categories', {
                name: name,
            }, {
                withCredentials: true,
            });
            document.getElementById('create_modal').close();
        } catch (error) {
            setError('Error creating category.');
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`/user/categories/${category.id}`, {
                name: updateName,
            }, {
                withCredentials: true,
            });
            document.getElementById(`update_modal_${category.id}`).close();
        } catch (error) {
            setError('Error updating category.');
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`/user/categories/${category.id}`, {
                withCredentials: true,
            });
            document.getElementById(`delete_modal_${category.id}`).close();
        } catch (error) {
            setError('Error deleting category.');
        }
    };

    const handleCancelCreate = (e) => {
        e.stopPropagation();
        setName('');
        document.getElementById('create_modal').close();
    };

    const handleCancelUpdate = (e) => {
        e.stopPropagation();
        document.getElementById(`update_modal_${category.id}`).close();
    };

    const handleCancelDelete = (e) => {
        e.stopPropagation();
        document.getElementById(`delete_modal_${category.id}`).close();
    };

    const handleNavigate = () => {
        if (!category.isCreateCard) {
            navigate(`/home/tasks/category/${category.id}`);
        }
    };

    return (
        <div
            className={`w-64 shadow-lg rounded-xl mr-4 mb-4 flex flex-col justify-between ${
                !category.isCreateCard ? 'cursor-pointer' : ''
            }`}
            onClick={handleNavigate}
        >
            <div className='px-6 py-6 relative'>
                {category.isCreateCard ? (
                    <>
                        <div className='absolute inset-y-0 left-1 top-1 bottom-1 pl-4 bg-yellow-500 rounded-full'></div>
                        <div className='pl-4'>
                            <p className='font-bold text-xl text-gray-800 text-center mb-2'>
                                Create Category
                            </p>
                            <div className='flex justify-center'>
                                <button
                                    className='rounded-full bg-yellow-500 hover:bg-yellow-800 px-2 py-2'
                                    onClick={() => document.getElementById('create_modal').showModal()}
                                >
                                    <img src={plus} width={20} />
                                </button>
                                <dialog id='create_modal' className="modal modal-middle">
                                    <div className="modal-box bg-white">
                                        <p className="font-bold text-lg text-gray-800 mb-2">Create Category</p>
                                        <div className='border-b-2 border-gray-200'></div>
                                        <form onSubmit={handleCreate}>
                                            <div className="my-4">
                                                <label className="block text-gray-800 font-bold mb-2">Name</label>
                                                <input
                                                    type="text"
                                                    value={name}
                                                    onChange={(e) => setName(e.target.value)}
                                                    className="shadow border bg-white rounded w-full py-2 px-3 text-gray-800"
                                                    required
                                                />
                                            </div>
                                            <div className="flex justify-between">
                                                <button
                                                    type="submit"
                                                    className="py-2 text-white bg-yellow-500 hover:bg-yellow-800 font-medium px-6 rounded-lg shadow-lg"
                                                >
                                                    Create
                                                </button>
                                                <button
                                                    type="button"
                                                    className="py-2 text-white bg-gray-500 hover:bg-gray-800 font-medium px-6 rounded-lg shadow-lg"
                                                    onClick={handleCancelCreate}
                                                >
                                                    Cancel
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </dialog>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <div className='absolute inset-y-0 left-1 top-1 bottom-1 pl-4 bg-yellow-500 rounded-full'></div>
                        <div className='pl-4'>
                            <div className='flex justify-between'>
                                <p className='font-bold text-xl text-gray-800 mb-2'>{category.name}</p>
                                <div className="dropdown">
                                    <div tabIndex={0} role="button" className="text-gray-800" onClick={(e) => e.stopPropagation()}>
                                        <img src={menu} width={20} />
                                    </div>
                                    <ul tabIndex={0} className="dropdown-content menu bg-white rounded-box z-[1] w-52 p-2 shadow">
                                        <button
                                            className='btn border-none hover:bg-yellow-800 bg-yellow-500 text-white'
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                document.getElementById(`update_modal_${category.id}`).showModal();
                                            }}
                                        >
                                            <img src={note} width={18} />
                                            <a>Update</a>
                                        </button>
                                        <dialog id={`update_modal_${category.id}`} className="modal modal-middle">
                                            <div className="modal-box bg-white">
                                                <p className="font-bold text-lg text-gray-800 mb-2">Update Category</p>
                                                <div className='border-b-2 border-gray-200'></div>
                                                <form onSubmit={handleUpdate}>
                                                    <div className="my-4">
                                                        <label className="block text-gray-800 font-bold mb-2">Name</label>
                                                        <input
                                                            type="text"
                                                            placeholder={updateName}
                                                            onChange={(e) => setUpdateName(e.target.value)}
                                                            className="shadow border bg-white rounded w-full py-2 px-3 text-gray-800"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <button
                                                            type="submit"
                                                            className="py-2 text-white bg-yellow-500 hover:bg-yellow-800 font-medium px-6 rounded-lg shadow-lg"
                                                        >
                                                            Update
                                                        </button>
                                                        <button
                                                            type="button"
                                                            className="py-2 text-white bg-gray-500 hover:bg-gray-800 font-medium px-6 rounded-lg shadow-lg"
                                                            onClick={handleCancelUpdate}
                                                        >
                                                            Cancel
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        </dialog>
                                        <button
                                            className="btn mt-1 border-none hover:bg-red-800 bg-red-500 text-white"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                document.getElementById(`delete_modal_${category.id}`).showModal();
                                            }}
                                        >
                                            <img src={trash} width={18} />
                                            <p className='pr-1'>Delete</p>
                                        </button>
                                        <dialog id={`delete_modal_${category.id}`} className="modal modal-middle">
                                            <div className="modal-box bg-white">
                                                <p className="font-medium text-gray-800 text-lg text-center">Are You Sure Want To Delete This Category?</p>
                                                <div className='flex justify-evenly'>
                                                    <button
                                                        className="py-2 text-white bg-red-500 hover:bg-red-800 mt-5 mr-5 font-medium px-6 rounded-lg shadow-lg"
                                                        onClick={handleDelete}
                                                    >
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="py-2 text-white bg-gray-500 hover:bg-gray-800 mt-5 mr-5 font-medium px-6 rounded-lg shadow-lg"
                                                        onClick={handleCancelDelete}
                                                    >
                                                        Cancel
                                                    </button>
                                                </div>
                                            </div>
                                        </dialog>
                                    </ul>
                                </div>
                            </div>
                            <p className='text-sm font-medium text-gray-800'>Created: {formatDate(category.date)}</p>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default CategoryCard;
