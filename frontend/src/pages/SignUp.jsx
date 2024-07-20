import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, storage } from '../firebase';
import { ref, getDownloadURL, uploadBytes} from 'firebase/storage';
import { deleteUser } from 'firebase/auth';
import Step0 from '../components/Step0';
import Step1 from '../components/Step1';
import Step2 from '../components/Step2';
import Step3 from '../components/Step3';

function Signup (){

  const apiUrl = import.meta.env.VITE_API_URL
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
    
    try {

     const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);

      const response = await fetch(`${apiUrl}/api/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        alert('User created successfully!!')
        navigate('/login');
      } 
    } catch (error) {
      console.error('Error during sign-up:', error.message);
      if (auth.currentUser) {
        try {
          await deleteUser(auth.currentUser);
        } catch (deleteError) {
          console.error('Error deleting Firebase user:', deleteError.message);
        }
      }
  
      alert('Failed to create account. Please try again.');
    }
  };

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-lg lg:max-w-2xl">
        <form className="bg-white p-6 rounded shadow-md w-full max-w-md lg:max-w-2xl" onSubmit={handleSubmit}>
          {step === 0 && <Step0 handleCustomEmailSignup={() => setStep(1)} />}
          {step === 1 && <Step1 formData={formData} handleChange={handleChange} handleImageChange={handleImageChange} nextStep={nextStep} prevStep={prevStep} />}
          {step === 2 && <Step2 formData={formData} handleChange={handleChange} nextStep={nextStep} prevStep={prevStep} />}
          {step === 3 && <Step3 formData={formData} handleChange={handleChange} handleSubmit={handleSubmit} prevStep={prevStep} />}
        </form>
      </div>
    </div>
  );
};

export default Signup;




