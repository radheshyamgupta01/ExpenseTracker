import React,{useState} from 'react'
import { useHistory,NavLink } from 'react-router-dom';


import "./Login.css"
export default function SignUp() {
  const [emailInput,setEmailInput]=useState("")
  const [passwordInput,setpasswordInput]=useState("")

const history=useHistory()
  const emailHandler=(e)=>{
    setEmailInput(e.target.value)
  }
  const passwordHandler=(e)=>{
    setpasswordInput(e.target.value)
  }
  const formHandler=(e)=>{
e.preventDefault()
 
  fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA7YeTd7ZFDkf2KAhcUDB9mUbPhpalT1Kk`
  ,{
method:"POST",
body:JSON.stringify({
email:emailInput,
password:passwordInput,
returnSecureToken:true,
})
  })
  .then((res)=>{
    if(res.ok){
      alert("added")

    history.push("/product")
      setEmailInput("")
      setpasswordInput("")
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
localStorage.setItem("token",body.idToken)
  })
}
const goToSignUpPage=()=>{
  history.push("/sign")
}
const changePassword=()=>{
  history.push("/changePassword")
}
const forgotPassword=()=>{
  history.push("./forgotpass")
}



  return (
    <div  className="login-container">
            <div className="curved-corner"></div>

        <form onSubmit={formHandler}>
         <h1 className="height text">Log-In</h1>
            <input type="email" placeholder="email"  className="height" onChange={emailHandler}></input>
            <br></br>
         
            <input type="password" placeholder='password'  className="height" onChange={passwordHandler}></input>
            <br></br>

            <button className="height" type='"submit'>Submit</button>
        <br></br>
            <NavLink to="/forgotpass" className="height" type='"submit' onClick={forgotPassword}> forgotPasswords</NavLink>
            <br></br> 
             <br></br>

            <button className="height" type='"submit' onClick={goToSignUpPage}>
              Don'nt Have an accounts ? <span>Sign in</span>
            </button>
        </form>
    </div>
  )
}
