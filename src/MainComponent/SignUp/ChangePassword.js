import React, { useState } from 'react';
import "./ChangePassword.css";
import { useHistory } from 'react-router-dom';

export default function ChangePassword() {
  const [passwordInput, setPasswordInput] = useState(""); // Renamed state variable for clarity
const history=useHistory()
  const changePasswordHandler = () => {
    // Check if password input is empty
    if (!passwordInput) {
      alert("Password field cannot be empty");
      return;
    }

    const idToken = localStorage.getItem("token")

    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyA7YeTd7ZFDkf2KAhcUDB9mUbPhpalT1Kk`, {
      method: "POST",
      body: JSON.stringify({
        idToken: idToken,
        password: passwordInput,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if (res.ok) {
        alert("Password successfully changed");
        history.push("./login")
      
      } else {
        res.json().then((body) => {
          alert(body.error.message);
        });
      }
    })
    .catch(error => {
      console.error("Error changing password:", error);
    });
  }

  return (
    <div className="password-container">
      <div className="container">
        <h3 className="text">Change Password</h3>
        <form>
          <input
            type="password"
            className="height inputT"
            placeholder="New Password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
          />
          <button className="height input" type="button" onClick={changePasswordHandler}>
            Done
          </button>
        </form>
      </div>
    </div>
  );
}
