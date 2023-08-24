import React, { useEffect, useState } from 'react';

import {useHistory} from "react-router-dom"
import "./Setting.css" 
export default function SettingPage() {
    const [userData, setUserData] = useState([]); // Initialize userData state as an empty array
  const history=useHistory()
    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyA7YeTd7ZFDkf2KAhcUDB9mUbPhpalT1Kk`, {
                method: "POST",
                body: JSON.stringify({
                    idToken: token
                }),
                headers: {
                    "Content-Type": "application/json"
                },
            })
            .then((res) => {
                if (res.ok) {
                    return res.json();
                    
                } else {
                    throw new Error("Something went wrong");
                }
            })
            .then((data) => {
                console.log(data);
                setUserData(data.users); 
                
            })
            .catch((error) => {
                console.error(error);
                alert("Error fetching data");
            });
        } else {
            alert("Token not found in local storage");
        }
    }, []);
const updateUserInfo=()=>{
    history.push("./update")
}
    return (
        <div className="setting">
            <ul>
               <h1> User Detail</h1> 
               
                {userData.map((user, index) => (
                    <li key={index}>
                     
                        <h3>Email: {user.email}</h3>
                        <h3>Name:{user.displayName}</h3>
                        <h3> Github:{user.photoUrl}</h3>
                        <button onClick={updateUserInfo}>Edit</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
