import React, { useState } from 'react';
import OAuth from '../components/OAuth';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {

  const navigate = useNavigate();

  const [userId, setUserId] = useState(null);

  const [token, setToken] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate form data
    if (!formData.email || !formData.password) {
      alert('Please fill out all required fields.');
      return;
    }
  
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User logged in successfully:', userCredential.user);
  
      // Get ID token
      const idToken = await userCredential.user.getIdToken();
      setToken(idToken);
  
      // Send ID token to backend and get user data
      const res = await fetch('/api/signin', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${idToken}`,
        },
        body: JSON.stringify(formData),
      });
  
      const data = await res.json();
      
      if (!res.ok) {
        // Handle error response from backend
        console.log('Sign-in error:', data.message);
        alert('Failed to sign in. Please try again.');
        return;
      }
  
      if (data.success === false) {
        // Handle specific error messages
        console.log('Backend error:', data.message);
        alert('Error: ' + data.message);
        return;
      }
  
      // Navigate to ConfirmQR with _id from backend response
      if (data.user && data.user._id) {
        //console.log('User ID:', data.user._id);
        setUserId(data.user._id);
        navigate(`/qrcode/${data.user._id}`);
      } else {
        console.log('User ID not found in backend response.');
        alert('User ID not found. Please try again.');
      }
    } catch (error) {
      console.error('Error signing in:', error.message);
      alert('Failed to sign in. Please check your credentials and try again.');
    }
  };
  


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Sign In</h2>
        
        <OAuth/>
        <div className="flex items-center justify-center w-full mb-2">
  <div className="flex-grow border-t border-gray-500"></div>
  <span className="mx-2 text-gray-700">or</span>
  <div className="flex-grow border-t border-gray-500"></div>
</div>

      <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
              required
            />
          </div>
          <div className="flex justify-between">
            <button type="submit" className="w-full bg-blue-500 text-black py-2 px-4 rounded-md hover:bg-blue-300 transition duration-200">
              Login
            </button>
          </div>
          <p className='text-end'>Don't have an account? <Link className='text-blue-600 underline' to='/'>sign up</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;
