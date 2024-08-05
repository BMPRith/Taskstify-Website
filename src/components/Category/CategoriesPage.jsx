import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import CategoryCard from './CategoryCard';
import axios from '../../axiosConfig';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('/user/categories/all', {
          withCredentials: true,
        });
        setCategories(response.data.payload);
        setLoading(false);
      } catch (error) {
        setError('Error fetching categories.');
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  return (
    <div className='h-screen font-rubik'>
      <Sidebar />
      <div className="flex flex-col md:flex-row justify-between items-center md:ml-80 mx-4 md:mx-0">
        <p className="text-2xl font-bold text-gray-800 mb-4 mt-5 md:mb-0">Categories</p>
      </div>
      {loading ? (
        <div className='ml-0 md:ml-80 mt-10'>Loading...</div>
      ) : error ? (
        <div className='ml-0 md:ml-80 mt-10 text-red-500'>{error}</div>
      ) : (
        <div className='ml-80 mt-10 flex flex-wrap'>
          <CategoryCard key='create' category={{ isCreateCard: true }} />

          {categories.map(category => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage;
