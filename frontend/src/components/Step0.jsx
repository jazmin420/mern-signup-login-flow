import React from "react";
import { Link } from "react-router-dom";
import InteractiveImage from "./Animation/InteractiveImage";
import OAuth from "../components/OAuth";

function Step0({ handleCustomEmailSignup }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-4 text-center">Welcome!</h2>
      <div className="flex items-center justify-center flex-wrap lg:flex-nowrap">
        <InteractiveImage />
        <div className="mb-4">
          <OAuth />
          <button
            onClick={handleCustomEmailSignup}
            className="w-full bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-500 transition duration-200"
          >
            Signup with Custom Email
          </button>
          <p className="text-sm text-end">
            Already have an account?
            <Link to="/login">
              <span className="text-blue-400 underline"> login here</span>
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Step0;
