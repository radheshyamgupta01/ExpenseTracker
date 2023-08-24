import React,{useEffect, useState} from 'react'
import { useHistory } from 'react-router-dom';

import "./SignUp.css"
export default function SignUp() {
  const [emailInput,setEmailInput]=useState("")
  const [passwordInput,setpasswordInput]=useState("")
  const history = useHistory();
  const emailHandler=(e)=>{
    setEmailInput(e.target.value)
  }
  const passwordHandler=(e)=>{
    setpasswordInput(e.target.value)
  }
  const sendEmailVerification = (tokenId) => {
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyA7YeTd7ZFDkf2KAhcUDB9mUbPhpalT1Kk`, {
      method: "POST",
      body: JSON.stringify({
        requestType: "VERIFY_EMAIL",
        idToken: tokenId,
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(response => {
      if (response.ok) {
        alert("Email verification link sent. Please check your email.");
      } else {
        throw new Error("Error sending email verification");
      }
    })
    .catch(error => {
      console.error(error);
      alert("Error sending email verification");
    });
  }

// cheking user varified or not 
const checkEmailVerificationStatus = () => {
  const token = localStorage.getItem("token");
  if (token) {
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=YOUR_FIREBASE_API_KEY`, {
      method: "POST",
      body: JSON.stringify({
        idToken: token
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      } else {
        throw new Error("Error fetching user data");
      }
    })
    .then(data => {
      setIsEmailVerified(data.users[0].emailVerified);
      setConfirmationCode(data.users[0].validSince);
    })
    .catch(error => {
      console.error(error);
    });
  }
};
useEffect(()=>{
  checkEmailVerificationStatus()
},[])
  const formHandler=(e)=>{
e.preventDefault()
 
  fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA7YeTd7ZFDkf2KAhcUDB9mUbPhpalT1Kk
  `,{
method:"POST",
body:JSON.stringify({
email:emailInput,
password:passwordInput,
returnSecureToken:true,
})
  })
  .then((res)=>{
    if(res.ok){
      
      setEmailInput("")
      setpasswordInput("")
      history.push("/login")
      return res.json()

    }
    else{
    return res.json().then((body)=>{
     
      alert(body.error.message)
      setEmailInput("")
      setpasswordInput("")
    })
    }
  })
  .then((body)=>{
    alert(" succesfully Sign up")
 sendEmailVerification(body.idToken)
  })
  .catch((error)=>{
console.log(error)
  })
}
  return (
    <div  className="sign-up-container">
        <form onSubmit={formHandler}>
         <h1 className="height text">Sign-Up</h1>
            <input type="email" placeholder="Email" required className="height" onChange={emailHandler}></input>
            <br></br>
         
            <input type="password" placeholder='Password' required className="height" onChange={passwordHandler}></input>
            <br></br>
            <button className="height" type='"submit'>Submit</button>
        </form>
    </div>
  )
}
