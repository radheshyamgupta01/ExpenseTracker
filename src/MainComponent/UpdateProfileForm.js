import React, { useState } from 'react';
import "./UpdateProfileForm.css";

import SettingPage from './SettingPage';
export default function UpdateProfileForm() {
  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");
  const tokenId = localStorage.getItem("token");

  const updateButtonHandler = (e) => {
    e.preventDefault()
    fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA7YeTd7ZFDkf2KAhcUDB9mUbPhpalT1Kk", {
      method: "POST",
      body: JSON.stringify({
        idToken: tokenId,
        displayName: userName,
        photoUrl: userPhoto,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        setUserName("")
        setUserPhoto("")
    
    alert("Profile updated successfully");
      } else {
        throw new Error("Profile update failed");
      }
    })
    .catch(error => {
      setUserName("")
      setUserPhoto("")
  
      alert("Error updating profile:", error);
    
    });
  }

  return (
    <div className="profile">
      
        <form onSubmit={updateButtonHandler}>
        <h3>Update Your Profile</h3>
        <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
        <input type="text" placeholder="Profile photo URL" className="img" onChange={(e) => setUserPhoto(e.target.value)} />
        <button type="submit">Update</button>
        </form>
    
    </div>
  );
}
