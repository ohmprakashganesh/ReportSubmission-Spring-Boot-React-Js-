import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";
 



 


const Login = () => {

  const nav = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [errors, setErrors] = useState({
    email: "",
    password: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: "", password: "" };

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
      isValid = false;
    }
    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 4) {
      newErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));

    // Clear error when user starts typing
    if (errors[id]) {
      setErrors(prev => ({
        ...prev,
        [id]: ""
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    setIsSubmitting(true);
    

  

    try {
     const  response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
    

      localStorage.setItem("accessToken",data.accessToken);
     
      if(response ){
        console.log(data.accessToken);
      }

      console.log("Server response:", data.accessToken);
      

      alert("Login successful! Role: " + data.role);

      if (data.role?.trim() === "STUDENT") {
        nav("/student");
      } else if (data.role?.trim() === "SUPERVISER") {  // <-- match backend spelling
        nav("/supervisor");
      } else {
        nav("/admin");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert("Login failed!");
    } finally {
      setIsSubmitting(false);
    }
  }
};

return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-md">
      <div className="mb-6 text-center">
        <h2 className="text-3xl font-bold text-gray-800">Welcome Back</h2>
        <p className="text-gray-500 mt-1">Login to access your report dashboard</p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`mt-1 block w-full border ${errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            className={`mt-1 block w-full border ${errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500`}
          />
          <div className="flex justify-between mt-1">
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
            <a href="#" className="text-sm text-indigo-600 hover:underline ml-auto">
              Forgot password?
            </a>
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
        >
          {isSubmitting ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  </div>
);
};

export default Login;