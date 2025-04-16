import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useStore } from './store';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Jobs from './pages/Jobs';
import PostJob from "./pages/PostJob"
import JobDetails from './pages/JobDetails';
import EmployerDashboard from './pages/EmployerDashboard';
import JobSeekerDashboard from './pages/JobSeekerDashboard';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const isDarkMode = useStore((state) => state.isDarkMode);
  const currentUser = useStore((state) => state.currentUser);

  const loadUsersFromStorage = useStore((state) => state.loadUsersFromStorage);

  useEffect(() => {
    loadUsersFromStorage(); // Load saved users on initial render
  }, [loadUsersFromStorage]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-50'}`}>
      <BrowserRouter>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/jobs/:id" element={<JobDetails />} />
            <Route
              path="/employer/dashboard"
              element={currentUser?.role === 'employer' ? <EmployerDashboard /> : <Login />}
            />
            <Route
              path="/jobseeker/dashboard"
              element={currentUser?.role === 'jobseeker' ? <JobSeekerDashboard /> : <Login />}
            />
            <Route path="/post-job" element={< PostJob/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;
