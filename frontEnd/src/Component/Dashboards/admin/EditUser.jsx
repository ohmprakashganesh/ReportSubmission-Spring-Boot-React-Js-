import React, { useEffect, useState } from 'react'
import { getUser, updateUser } from '../../services/AdminSer'
import { useNavigate } from 'react-router-dom';
import { httpClient } from '../../services/Config/Config';

const EditUser = ({uid,updateState,setUpdateId,setUpdateState}) => {
    const [formData, setFormData] = useState({
        name: '',
        email:'',
        role: '',
        password:''
      });
      
  const [user, setUser]=useState('');
//  const nav= useNavigate();
 
useEffect(() => {
  const fetchUser = async () => {
    try {
      const temp = await getUser(uid);
      setUser(temp);

      setFormData({
        name: temp.name || '',
        email: temp.email || '',
        role: temp.role || '',
        password: '' // Do not prefill password
      });
    } catch (error) {
      console.log(error);
    }
  };

  fetchUser();
}, [uid]);

    

      // State to hold form data, initialized with empty strings
      
   
    
      // State to hold validation errors for each field
      const [errors, setErrors] = useState({});
      // State to hold messages after form submission (success or failure)
      const [submissionMessage, setSubmissionMessage] = useState('');
      // State to indicate if the form is currently being submitted (kept for visual feedback, though no actual async operation)
      const [isSubmitting, setIsSubmitting] = useState(false);
    
      // Handle form input changes
      const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the formData state with the new value for the changed input
        setFormData(prevData => ({
          ...prevData,
          [name]: value
        }));
        // Clear any existing error message for the current field as the user types
        if (errors[name]) {
          setErrors(prevErrors => ({
            ...prevErrors,
            [name]: ''
          }));
        }
      };
    
      // Validate form fields
      const validateForm = () => {
        let newErrors = {}; // Object to store new validation errors
        // Validate Name field
        if (!formData.name.trim()) {
          newErrors.name = 'Name is required';
        }
        // Validate Email field
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) { // Regex for basic email format validation
          newErrors.email = 'Email is invalid';
        }
        // Validate Role field
        if (!formData.role) {
          newErrors.role = 'Role is required';
        }
        // Validate Password field
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (formData.password.length < 6) {
          newErrors.password = 'Password must be at least 6 characters';
        }
        // Update the errors state with the new validation errors
        setErrors(newErrors);
        // Return true if there are no errors, false otherwise
        return Object.keys(newErrors).length === 0;
      };
    
      // Handle form submission
      const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent the default form submission behavior (page reload)
        setSubmissionMessage(''); // Clear any previous submission messages
    
        // Validate the form before attempting submission
        if (!validateForm()) {
          setSubmissionMessage('Please correct the errors in the form.');
          return; // Stop the submission if validation fails
        }
    
        setIsSubmitting(true); // Set submitting state to true (for visual feedback)
        try {

          const resp = await updateUser(uid,formData);
          setUpdateState(!updateState);
      
           if (!resp) throw new Error("Failed to create assignment");

           // Display success message
          // Simulate a delay for the "Creating User..." button state
          await new Promise(resolve => setTimeout(resolve, 1000));
          // Clear the form data after successful submission
          setFormData({
            name: '',
            email: '',
            role: '',
            password: ''
          });
        } catch (error) {
          // This catch block might not be strictly necessary without an API call,
          // but it's good practice for potential future async operations.
          console.error('Error during form processing:', error);
          setSubmissionMessage(`An error occurred: ${error.message || 'Unknown error.'}`);
        } finally {
          setIsSubmitting(false); // Reset submitting state to false
        }
      };

    
  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-xl shadow-lg border border-gray-200 mb-8">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">Edit Details</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`mt-1 block w-full p-3 border ${errors.name ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="John Doe"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`mt-1 block w-full p-3 border ${errors.email ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="john.doe@example.com"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <select
              id="role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`mt-1 block w-full p-3 border ${errors.role ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
            >
              <option value="">Select Role</option>
              <option value="STUDENT">STUDENT</option>
              <option value="SUPERVISER">SUPERVISOR</option>
            </select>
            {errors.role && <p className="text-red-500 text-xs mt-1">{errors.role}</p>}
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`mt-1 block w-full p-3 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              placeholder="********"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="md:col-span-2 flex mt-4 justify-between" >
            <button onClick={()=>setUpdateId("") }  className="inline-flex items-center px-10 py-3 border border-transparent  font-medium rounded-md shadow-sm text-black bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 text-2xl focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"> close</button>
            <button
              type="submit"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Processing...' : 'Update User'}
            </button>
          </div>
        </form>
        {submissionMessage && (
          <p className={`mt-4 text-center ${submissionMessage.includes('successfully') ? 'text-green-600' : 'text-red-600'}`}>
            {submissionMessage}
          </p>
        )}
      </div>
  )
}

export default EditUser
