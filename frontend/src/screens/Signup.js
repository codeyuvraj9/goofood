import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function Signup() {

  const navigate = useNavigate();
   const [credentials,setcredentials]= useState({name:"",email:"",password:"",geolocation:""})
  
    const handleSubmit= async(e)=>{
        e.preventDefault();
        const response=await fetch(`${window.location.origin}/api/Createuser`,{
            method:'POST',
            headers:{
            'Content-Type':'application/json'
            },
            body:JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password,location:credentials.geolocation})
        });
        const json=await response.json()
        console.log(json);

        if(!json.success){
            alert('enter valid credentials')
        }

        else{
          navigate("/login")
        }
    }
        const onChange=(event)=>{
            setcredentials({...credentials,[event.target.name]:event.target.value})
        }
    
  return (
    <div style={{ backgroundImage: 'url("https://images.pexels.com/photos/1565982/pexels-photo-1565982.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")', backgroundSize: 'cover',height: '100vh' }}>
    <div>
    <Navbar />
    </div>
    <div className='container'>
        
      <form className='w-50 m-auto mt-5 border-success rounded'  onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control bg-transparent border border-success" name='name' value={credentials.name} onChange={onChange}/>
     </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control bg-transparent border border-success" name='email' value={credentials.email} onChange={onChange} id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control bg-transparent border border-success" name='password' value={credentials.password} onChange={onChange} id="exampleInputPassword1"/>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
    <input type="text" className="form-control bg-transparent border border-success" name='geolocation' value={credentials.geolocation} onChange={onChange} />
  </div>
  
  <button type="submit" className="m-3 btn btn-success">Submit</button>
  <Link to="/login" className='m-3 btn btn-danger'>Already a User</Link>
</form>
    </div>
    </div>
  )
}
