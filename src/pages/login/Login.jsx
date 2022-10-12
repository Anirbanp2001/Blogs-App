import './login.css'
import {useRef,useContext} from "react"
import {Link} from "react-router-dom";
import {Context} from "../../context/Context"
import axios from 'axios';
const Login = () => {
  const userRef=useRef();
  const passwordRef=useRef();
  const {dispatch,isFetching}=useContext(Context)
  const handleSubmit=async(e)=>{
    e.preventDefault();
    dispatch({type:"LOGIN_START"});
    try{
      const res=await axios.post("http://localhost:5000/api/auth/login",{
        username:userRef.current.value,
        password:passwordRef.current.value,
      });
      dispatch({type:"LOGIN_SUCCESS",
    payload:res.data});
    console.log(res.data);
    }catch(err){
      dispatch({type:"LOGIN_FAILURE"})
      return;
    }

  }
  return (
    <div className='login'>
      <span className="loginTitle">Login</span>
      <form className="loginForm" onSubmit={handleSubmit}>
        
        <label >Username Here</label>
        <input type='text' className='loginInput' placeholder='Username' ref={userRef}/>
        <label >Password</label>
        <input type='password' className='loginInput'placeholder='Password' ref={passwordRef}/>

        <button className="formLogin" type='submit'>Login</button>
      </form>
      <span className="registerText">If you dont have an account : </span>
      <Link className='link' to='/register'><button className="registerlogin2" disabled={isFetching}>REGISTER</button></Link>
    </div>
  )
}

export default Login
