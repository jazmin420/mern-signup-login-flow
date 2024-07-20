import React from 'react';
import { useParams } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

function UserProfile() {
  const { _id } = useParams();
  const { user, loading, error } = useUserData(_id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='bg-gray-300 min-h-screen flex items-center justify-center'>
      <div className='text-center flex flex-col justify-center items-center rounded border-2 p-6 w-full max-w-md bg-white'>
        <h1 className='text-center text-2xl font-bold my-3'>User Profile Details</h1>
        {user && (
          <>
            {user.profilePicture && (
              <div className='flex justify-center items-center'>
                <img className='w-20 h-20 rounded-full object-cover border-4' src={user.profilePicture} alt="Profile" />
              </div>
            )}
            {user.username && <h2 className='font-bold'>{user.username}</h2>}
            {user.email && <p className='font-semibold text-blue-500'>{user.email}</p>}
            {user.phoneNumber && <p><span className='font-semibold'>Mobile: </span>{user.phoneNumber}</p>}
            {user.gender && <p><span className='font-semibold'>Gender: </span>{user.gender}</p>}
            {user.educationLevel && <p><span className='font-semibold'>Education Level: </span>{user.educationLevel}</p>}
          </>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
