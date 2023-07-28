import React,{useState} from 'react';
import { useNavigate} from 'react-router-dom';

const Signup = (props) => {
  const [credentials,setCredentials]=useState({name:"",email:"",password:"",cpassword:""});
  const navigate=useNavigate();
  const handleClick=async(e)=>{
   e.preventDefault();
   const response = await fetch('http://localhost:5000/api/auth/createuser', {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({name:credentials.name,email:credentials.email, password:credentials.password }),
    });
    const json = await response.json();
    console.log(json)
    if(json.success)
    {
      localStorage.setItem('token',json.authtoken);
       navigate("/");
       props.showAlert("Account created successfully","success")

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
    <h2> Create an account to use iNotebook</h2>
<form onSubmit={handleClick}>
<div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp" minLength={3} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
</div>
  )
}

export default Signup
