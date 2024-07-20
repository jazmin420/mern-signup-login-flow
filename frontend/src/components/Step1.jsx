import React from "react";
import { FaCameraRetro } from "react-icons/fa6";
import userIcon from "../assets/userIcon.png";

function Step1({
  formData,
  handleChange,
  handleImageChange,
  nextStep,
  prevStep,
}) {
  return (
    <>
      <h2 className="text-2xl text-center font-bold mb-4">Personal Details</h2>
      <div className="relative">
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
            {!formData.coverPhoto && <FaCameraRetro />}
          </label>
          <input
            type="file"
            id="coverPhoto"
            name="coverPhoto"
            onChange={(e) => handleImageChange(e, "coverPhoto")}
            className="hidden"
            accept="image/*"
          />
        </div>

        <div className="flex items-center justify-center mb-4">
          <label htmlFor="profilePicture" className="cursor-pointer">
            <div className="rounded-full bg-gray-300 border-2 absolute bottom-16 left-0">
              {formData.profilePicture ? (
                <img
                  src={formData.profilePicture}
                  alt="Profile"
                  className="w-20 h-20 rounded-full object-cover"
                />
              ) : (
                <img
                  src={userIcon}
                  alt="Profile"
                  className="w-20 h-20 object-cover"
                />
              )}
              <input
                type="file"
                id="profilePicture"
                name="profilePicture"
                onChange={(e) => handleImageChange(e, "profilePicture")}
                className="hidden"
                accept="image/*"
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
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
          onClick={prevStep}
          disabled
        >
          Back
        </button>
        <button
          type="button"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200"
          onClick={nextStep}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default Step1;
