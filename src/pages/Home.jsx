import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <Layout >
      <div className="flex flex-col min-h-screen bg-gray-100">
      

        <main className="flex-grow flex items-center justify-center">
          <div className="text-center p-6">
            <h1 className="text-4xl font-bold mb-4">Yet Another Todo App</h1>
            <p className="text-lg text-gray-600 mb-6">
              Manage your tasks effortlessly. Stay organized and be productive!
            </p>
            <button
              className="bg-gray-800 hover:bg-gray-600  text-white text-lg px-4 py-2 rounded"
              onClick={() => navigate('/signup')}
            >
              Get Started
            </button>
          </div>
        </main>

        
      </div>
    </Layout>
  );
};

export default LandingPage;
