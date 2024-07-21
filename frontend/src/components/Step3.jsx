import React from "react";

function Step3({ formData, handleChange, handleSubmit, prevStep }) {
  return (
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
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300"
          required
        >
          <option value="">Select Education Level</option>
          <option value="High School">High School</option>
          <option value="Associate's Degree">Associate's Degree</option>
          <option value="Bachelor's Degree">Bachelor's Degree</option>
          <option value="Master's Degree">Master's Degree</option>
          <option value="Doctorate">Doctorate</option>
        </select>
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Gender</label>
        <div className="flex items-center">
          <input
            type="radio"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="mr-4 text-gray-700">Male</label>
          <input
            type="radio"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="mr-2"
          />
          <label className="text-gray-700">Female</label>
        </div>
      </div>
      <div className="flex justify-between">
        <button
          type="button"
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-700 transition duration-200"
          onClick={prevStep}
        >
          Back
        </button>
        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-400 transition duration-200"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </>
  );
}

export default Step3;
