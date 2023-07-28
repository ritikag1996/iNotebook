import React,{useState} from 'react';
import {useNavigate} from 'react-router-dom';


const Login = (props) => {
    let navigate= useNavigate();
    const [credentials,setCredentials]=useState({email:"",password:""})
    const handleClick=async(e)=>{
     e.preventDefault();
     const response = await fetch('http://localhost:5000/api/auth/login', {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({email:credentials.email, password:credentials.password }),
      });
      const json = await response.json();
      console.log(json)
      if(json.success)
      {
        localStorage.setItem('token',json.authtoken);
         props.showAlert("Logged in successfully","success");
         navigate("/");

      }
      else{
        props.showAlert("Invalid credentials","danger")
      }

    };
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
        
        
    };
  return (
    <div className="mt-3">
    <h2> Login to use iNotebook</h2>
    <form className="my-3" onSubmit={handleClick}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} aria-describedby="emailHelp" onChange={onChange} required/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default Login
