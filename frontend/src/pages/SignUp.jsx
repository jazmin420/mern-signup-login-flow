import React, { useState } from 'react';
import userIcon from '../assets/userIcon.png'
import { FaCameraRetro } from "react-icons/fa6";
import {Link, useNavigate} from 'react-router-dom'
import InteractiveImage from '../components/InteractiveImage';
import OAuth from '../components/OAuth';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';

const Signup = () => {

  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    educationLevel: '',
    gender: '',
    profilePicture: '',
    coverPhoto: '',
  });



  const handleCustomEmailSignup = () => {
    setStep(1);
  };

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const fileName = new Date().getTime() + '-' + file.name;
        const storageRef = ref(storage, fileName);

        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);
        setFormData({
          ...formData,
          [type]: downloadURL, // Update form data with the download URL
        });
        console.log(downloadURL);
       
      } catch (error) {
        console.error('Error uploading image:', error.message);
      }
    }
  };
  

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.email || !formData.password) {
      alert('Please fill out all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    console.log('Form Data:', formData);

    try {

      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      console.log('User created successfully:', userCredential);

      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        console.log('User data saved to MongoDB successfully!', response.statusText);
        navigate('/login');
      } 
    } catch (error) {
      console.error('Error signing up:', error.message);
      alert('Failed to create account. Please try again.');
    }
  };
  //console.log(formData);

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg lg:max-w-2xl">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md lg:max-w-2xl" onSubmit={handleSubmit}>
      {step === 0 && (
          <>
            <h2 className="text-2xl font-bold mb-4 text-center">Welcome!</h2>
<div className='flex items-center justify-center flex-wrap lg:flex-nowrap'>
              <InteractiveImage/>
              <div className="mb-4">
                <OAuth/>
                <button
                  onClick={handleCustomEmailSignup}
                  className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition duration-200"
                >
                  Signup with Custom Email
                </button>
                <p className='text-sm text-end'>Already have an account?
                  <Link to='/login'> <span className='text-blue-400 underline'>login here</span>
                  </Link>
                  </p>
                </div>
</div>
          </>
        )}

        {step === 1 && (
          <>
            <h2 className="text-2xl text-center font-bold mb-4">Personal Details</h2>
           <div className='relative'>
              <div className="mb-6 relative overflow-hidden bg-gray-300 min-h-[150px]">
              {formData.coverPhoto && (
                <img
                  src={formData.coverPhoto}
                  alt="Cover Photo"
                  className="object-cover w-full h-full max-h-[200px]"
                />
              )}
              <label
                htmlFor="coverPhoto"
                className="absolute top-0 right-0 text-gray-800 py-2 px-4 rounded-md cursor-pointer"
              >
                {!formData.coverPhoto && <FaCameraRetro/>}
              </label>
              <input
                type="file"
                id="coverPhoto"
                name="coverPhoto"
                onChange={(e) => handleImageChange(e, 'coverPhoto')}
                className="hidden"
                accept='image/*'
              />
            </div>
  
            <div className="flex items-center justify-center mb-4">
      
      <label htmlFor="profilePicture" className="cursor-pointer">
        <div className="rounded-full bg-gray-300 border-2 absolute bottom-16 left-0">
          {formData.profilePicture ? (
            <img
              src={formData.profilePicture }
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
          ) : (
            <img
              src={userIcon }
              alt="Profile"
              className="w-20 h-20 object-cover"
            />
          )}
          <input
            type="file"
            id="profilePicture"
            name="profilePicture"
            onChange={(e) => handleImageChange(e, 'profilePicture')}
            className="hidden"
            accept='image/*'
          />
        </div>
      </label>
    </div>

              <div className="mb-4">
                <label className="block text-gray-700">Username</label>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="required w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                  required
                />
              </div>
           </div>    
            <div className="flex justify-between">
              <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200" onClick={prevStep} disabled>
                Back
              </button>
              <button type="button" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200" onClick={nextStep}>
                Next
              </button>
            </div>
          </>
        )}

        {step === 2 && (
          <>
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
            <div className="mb-4">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="flex justify-between">
              <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200" onClick={prevStep}>
                Back
              </button>
              <button type="button" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200" onClick={nextStep}>
                Next
              </button>
            </div>
          </>
        )}

        {step === 3 && (
            <>
            <div className="mb-4">
              <label className="block text-gray-700">Phone Number</label>
              <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
                required
              />
            </div>
            <div className="mb-4">
            <label className="block text-gray-700">Education Level</label>
            <select
              name="educationLevel"
              value={formData.educationLevel}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
              required
            >
              <option value="">Select Education Level</option>
              <option value="High School">High School</option>
              <option value="Associate's Degree">Associate's Degree</option>
              <option value="Bachelor's Degree">Bachelor's Degree</option>
              <option value="Master's Degree">Master's Degree</option>
              <option value="Doctorate or Professional Degree">Doctorate or Professional Degree</option>
            </select>
          </div>
            <div className="mb-4">
              <label className="block text-gray-700">Gender</label>
              <div className="flex items-center">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="mr-4 text-gray-700">Male</label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  onChange={handleChange}
                  className="mr-2"
                />
                <label className="text-gray-700">Female</label>
              </div>
            </div>
            <div className="flex justify-between">
              <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200" onClick={prevStep}>
                Back
              </button>
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-300 transition duration-200">
                Submit
              </button>
            </div>
</>
        )
        }
      </form>
    </div>
    </div>
  );
};

export default Signup;




