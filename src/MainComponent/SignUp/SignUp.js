import React, { useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './SignUp.css'; // Import your custom styles here

function SignUp() {
  const emailInput = useRef(null)
  const nameInput = useRef(null)
  const passwordInput = useRef(null)
  const confirmpasswordInput = useRef(null)

  
  const buttonHandler = (e) => {

    e.preventDefault();
    console.log(emailInput.current.value)
    console.log(nameInput.current.value)



 
  
    fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=AIzaSyAKS4hyLhlkxU0AVEJjyqH2PYc9LG4TXqo`, {
      method: "POST",
      body:JSON.stringify({
        email:emailInput.current.value,
        password:passwordInput.current.value,
       
        returnSecureToken: true,

      }),
      
      headers:{
        "Content-Type":"application/json"
      }
      
    })
    .then((res)=>{
      if(res.ok){

      }
      else{
   return res.json().then((body )=>{
    alert(body)

})
      }
    })
    .then((body)=>{
     
    alert(body)
    
    nameInput.current.value=""
    passwordInput.current.value=""
    emailInput.current.value=""
    confirmpasswordInput.current.value=""

    })
    .catch((err)=>{
      alert(err)
      nameInput.current.value=""
      passwordInput.current.value=""
      emailInput.current.value=""
      confirmpasswordInput.current.value=""
    })
  
  }
  return (
    <div className="container col-9 mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Sign Up</h2>
            <form >
              <div className="mb-3 ">
                <input type="text" className="form-control h-50" placeholder="Username" ref={nameInput} required />
              </div>
              <div className="mb-3">
                <input type="email " className="form-control h-50" placeholder="Email" ref={emailInput} required />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control h-50" placeholder="Password" ref={passwordInput} required />
              </div>
              <div className="mb-4">
                <input type="password" className="form-control h-50" placeholder="Confirm Password" ref={confirmpasswordInput} required />
              </div>
              <button type="submit"  onClick ={buttonHandler} className="btn btn-primary btn-block h-50">Sign Up</button>
            </form>
            <p className="text-center mt-3">
              Already have an account? <a href="#">Log In</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
