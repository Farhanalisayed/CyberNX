// src/pages/PostJob.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store';

function PostJob() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const addJob = useStore((state) => state.addJob); // custom function
  const currentUser = useStore((state) => state.currentUser);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newJob = {
      id: Date.now(),
      title,
      category,
      location,
      description,
      company: currentUser?.company || 'Unknown Company',
    };

    addJob(newJob);
    navigate('/employer/dashboard'); // or wherever EmployerDashboard is
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white shadow-md rounded">
      <h2 className="text-2xl font-bold mb-6">Post a Job</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Job Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <textarea
          placeholder="Job Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default PostJob;
