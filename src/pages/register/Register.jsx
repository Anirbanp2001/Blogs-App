import './register.css'
import {Link} from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [error,seterror]=useState(false);
    const handleClick=async(e)=>{
        seterror(false);
        try{e.preventDefault();
        const res=await axios.post("http://localhost:5000/api/auth/register",{
            username,
            email,
            password
        })
        res.data && window.location.replace("/login");
        console.log(res);}catch(err)
        {
            seterror(true);
        }
    }
    return (
        <div className='register'>
            <span className="registerTitle">Register</span>
            <form className="registerForm"  onSubmit={handleClick}>
                <label >UserName</label>
                <input type='text' className='registerInput' onChange={e=>setUsername(e.target.value)}/>
                <label >Email Here</label>
                <input type='email' className='registerInput' onChange={e=>setEmail(e.target.value)}/>
                <label >Password</label>
                <input type='password' className='registerInput' onChange={e=>setPassword(e.target.value)}/>

                <button className="formregister">Register</button>
            </form>
            {error&&(<span style={{color:"red", marginTop:"10px"}}>Sorry something went wrong!</span>)}
            <span className="loginText" >If you dont have an account : </span>
            <Link className='link' to='/login'><button className="loginButton" >LOG IN</button></Link>
        </div>
    )
}

export default Register
