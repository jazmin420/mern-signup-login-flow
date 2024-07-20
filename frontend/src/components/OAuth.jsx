import React from "react";
import { FcGoogle } from "react-icons/fc";
import { app } from "../firebase";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function OAuth() {
  const auth = getAuth(app);
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFromGoogle = await signInWithPopup(auth, provider);
      const user = resultsFromGoogle.user;
      const idToken = await user.getIdToken();
      console.log(resultsFromGoogle);
      const res = await fetch("/api/googleauth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify({
          name: resultsFromGoogle.user.displayName,
          email: resultsFromGoogle.user.email,
          googlePhotoUrl: resultsFromGoogle.user.photoURL,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        navigate(`/qrcode/${data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="mb-4">
        <button
          type="button"
          onClick={handleGoogleClick}
          className="flex items-center gap-2 justify-center w-full border-2 border-blue-500 py-2 px-4 rounded-md mb-2 hover:bg-blue-500 transition duration-200"
        >
          Continue with Google
          <FcGoogle />
        </button>
      </div>
    </>
  );
}

export default OAuth;
