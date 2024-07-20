import React from 'react';
import QRCode from 'react-qr-code';
import { Link, useParams } from 'react-router-dom';
import useUserData from '../hooks/useUserData';

function ConfirmQR() {
  const { _id } = useParams();
  const { user, loading, error } = useUserData(_id);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='flex items-center justify-center flex-col min-h-screen bg-gray-100'>
      <div className='rounded border-2 p-6 w-full max-w-md bg-white flex flex-col justify-center items-center'>
        <h2 className='text-xl mb-5 text-center font-semibold'>
        Hi {user.username} , You can Scan this QR code to view your profile page
        </h2>
        {user?.profileUrl ? (
          <QRCode
            size={200}
            bgColor='white'
            fgColor='black'
            value={user.profileUrl}
          />
        ) : (
          <div>No profile URL available</div>
        )}

        <div className='mt-9 underline text-blue-600'><Link to={`/profile/${_id}`}>View Profile Details</Link></div>
      </div>
    </div>
  );
}

export default ConfirmQR;
