import React, { useState } from "react";
import { Link, useNavigate, useNavigation } from "react-router-dom";

const Login = () => {
  const nav= useNavigate();
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
    } else if (formData.password.length < 6) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate API call
      setTimeout(() => {
        console.log("Form submitted:", formData);
        alert("Login successful!");
        console.log(formData.password)
       if (formData.password.trim() === "123456") {
  console.log("Navigating to Admin");
  nav("/admin");
} else if (formData.password.trim() === "1234567") {
  console.log("Navigating to Supervisor");
  nav("/dashboardSup");
} else {
  console.log("Navigating to Student");
  nav("/dashboardStd");
}

        setIsSubmitting(false);
      }, 1500);
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
              className={`mt-1 block w-full border ${
                errors.email ? "border-red-500" : "border-gray-300"
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
              className={`mt-1 block w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
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
            className={`w-full py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-300 ${
              isSubmitting ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          <div className="text-center text-gray-500 text-sm mt-4">
            <p className="mb-2">Or login with</p>
            <div className="flex justify-center space-x-4">
              <button
                type="button"
                className="p-2 rounded-full bg-red-500 hover:bg-red-600 text-white shadow"
                title="Google login"
              >
                <i className="fab fa-google"></i>
              </button>
              <button
                type="button"
                className="p-2 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow"
                title="Microsoft login"
              >
                <i className="fab fa-microsoft"></i>
              </button>
            </div>
          </div>

          <div className="text-center text-sm text-gray-600 mt-6">
            Don't have an account?{" "}
            <Link to="/signup" className="text-indigo-600 underline">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;