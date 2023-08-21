import React,{useRef} from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './Login.css'; // Import your custom styles here

function Login() {
  const emailInput= useRef(null)
  const passwordInput=useRef(null)
  const loginButtonHandler=()=>{
fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAKS4hyLhlkxU0AVEJjyqH2PYc9LG4TXqo

`,{
  method:"POST",
  body:JSON.stringify({
    emailInput:emailInput.current.value,
    passwordInput:passwordInput.current.value,
    returnSecureToken:true
  })
})
.then((res)=>res.json())
.then((body)=>{
  alert(body)
})
.catch((error)=>error)
  }
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow">
            <h2 className="text-center mb-4">Log In</h2>
            <form>
              <div className="mb-3">
                <input type="email" className="form-control h-50" placeholder="Email" required />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control h-50" placeholder="Password" required />
              </div>
              <button type="submit" className="btn btn-primary btn-block h-50" onClick={loginButtonHandler}>Log In</button>
            </form>
            <p className="text-center mt-3">
              Don't have an account? <a href="#">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
