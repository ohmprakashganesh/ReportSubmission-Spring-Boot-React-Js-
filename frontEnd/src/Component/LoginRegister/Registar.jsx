import React from "react";
import { Link } from "react-router-dom";

const Registar = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-2xl p-8 bg-white rounded-2xl shadow-md">
        <div className="mb-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Create Your Account</h2>
          <p className="text-gray-500 mt-1">Get started with Smart Report Submission</p>
        </div>

        <form className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="first-name" className="block text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="first-name"
                placeholder="John"
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="last-name" className="block text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="last-name"
                placeholder="Doe"
                className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              placeholder="your.email@example.com"
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Create a password"
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <div className="flex items-center gap-1 mt-2 text-sm text-gray-500">
              <span className="h-2 w-8 rounded-full bg-red-400"></span>
              <span className="h-2 w-8 rounded-full bg-yellow-400"></span>
              <span className="h-2 w-8 rounded-full bg-green-500"></span>
              <span className="ml-2">Password strength</span>
            </div>
          </div>

          <div>
            <label htmlFor="confirm-password" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              type="password"
              id="confirm-password"
              placeholder="Confirm your password"
              className="mt-1 block w-full border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex items-start">
            <input
              type="checkbox"
              id="terms"
              className="mt-1 mr-2"
            />
            <label htmlFor="terms" className="text-sm text-gray-600">
              I agree to the <a href="#" className="text-indigo-600 underline">Terms of Service</a> and <a href="#" className="text-indigo-600 underline">Privacy Policy</a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300"
          >
            Create Account
          </button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 underline">
              Log in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registar;
