import React,{useState} from 'react'
import { useHistory } from 'react-router-dom';
import "./Forgot.css"

import "./Login.css"
export default function ForgotPassword() {
  const [emailInputA,setEmailInputA]=useState("")


const history=useHistory()
  const emailHandler=(e)=>{
    setEmailInputA(e.target.value)
  }






const forgotPassword = (e) => {
  e.preventDefault()

  fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA7YeTd7ZFDkf2KAhcUDB9mUbPhpalT1Kk`, {
    method: "POST",
    body: JSON.stringify({
      email: emailInputA,
      requestType: "PASSWORD_RESET"
    }),
    headers: {
      "Content-Type": "application/json"
    }
  })
  .then(response => {
    if (response.ok) {
      alert("Password reset link sent. Please check your email.");
    } else {
      throw new Error("Error sending password reset link");
    }
  })
  .catch(error => {
    console.error(error);
    alert("Error sending password reset link");
  });
}


  return (
    <div  className="forgot-password-container">
          

        <form onSubmit={forgotPassword}>
         <h1 className="height text">     Type-new Password</h1>
            <input type="email" placeholder="email"  className="height" value={emailInputA} onChange={emailHandler}></input>
            <br></br>
         
            
            

            <button className="height" type='"submit'>Submit</button>
        
      
            
           
        </form>
    </div>
  )
}
