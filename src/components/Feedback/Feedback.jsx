import React, { useEffect, useState } from 'react';
import axios from '../../axiosConfig';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const StarRating = ({ rating, setFieldValue }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <svg
        key={i}
        className={`w-6 h-6 cursor-pointer ${i < rating ? 'text-yellow-500' : 'text-gray-300'}`}
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
        onClick={() => setFieldValue('rating', i + 1)}
      >
        <path d="M9.049.665L7.073 6.393H.931l4.715 3.66L3.69 17.27 9.05 13.227l5.36 4.043-1.957-7.216 4.716-3.66h-6.141L9.05.665z" />
      </svg>
    );
  }
  return <div className="flex">{stars}</div>;
};

const FeedbackForm = ({ fetchMessages }) => {
  const initialValues = {
    name: '',
    message: '',
    rating: 0,
  };

  const validationSchema = Yup.object({
    message: Yup.string().required('Message is required'),
    rating: Yup.number().min(1, 'Rating is required').required('Rating is required'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('/messages', values);
      resetForm();
      fetchMessages();
    } catch (error) {
      console.error('Error submitting feedback:', error);
    }
  };

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
      {({ setFieldValue }) => (
        <Form className="bg-white p-4 rounded-lg shadow-md">
          <div className="mb-8">
              <label htmlFor="message" className="block text-gray-700 text-sm font-semibold mb-2">
                  Message
                </label>
                <Field
                  as="textarea"
                  id="message"
                  name="message"
                  className="shadow border bg-white rounded w-full py-2 px-3 text-gray-700"
                />
                <ErrorMessage name="message" component="div" className="text-red-500 font-medium text-sm mt-1" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Rating</label>
            <Field name="rating">
              {({ field }) => <StarRating rating={field.value} setFieldValue={setFieldValue} />}
            </Field>
            <ErrorMessage name="rating" component="div" className="text-red-600 text-sm mt-1" />
          </div>
          <div className="text-right">
            <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-lg text-gray-100 bg-yellow-500 hover:bg-gray-500">
              Submit
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get('/messages/all');
      setFeedbacks(response.data.payload);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="bg-gray-200 py-6 sm:py-8 lg:py-12">
      <div className="max-w-screen-xl px-4 md:px-8 mx-auto">
        <FeedbackForm fetchMessages={fetchMessages} />
        <p className='text-center text-2xl font-semibold text-gray-700 mt-5'>Top Feedbacks</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12 mt-8">
          {feedbacks.map((feedback, index) => (
            <div key={index} className="border rounded-lg p-4">
              <p className="text-gray-700 text-sm mb-3"><strong>Name:</strong> {feedback.name}</p>
              <p className="text-gray-700 text-sm mb-3"><strong>Message:</strong> {feedback.message}</p>
              <StarRating rating={feedback.rating} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Feedback;
