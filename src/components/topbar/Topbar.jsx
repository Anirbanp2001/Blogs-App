import './topbar.css'
import {Link} from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../../context/Context';
export const Topbar = () => {
  const {user,dispatch}=useContext(Context);
  const handleClick=()=>{
    dispatch({type:"LOGOUT"})
  }
  const PF = "http://localhost:5000/images/"
  return (
    <div className='top'>
        <div className="topleft">
        <i className="topicon fa-brands fa-facebook"/>
        <i className="topicon fa-brands fa-instagram"/>
        <i className="topicon fa-brands fa-whatsapp"/>
        <i className="topicon fa-brands fa-snapchat"/>
        <i className="topicon fa-brands fa-twitter"/>
        </div>
        <div className="topcenter">
            <ul className="toplist">
                <li className="toplistitem"><Link to="/" className='link'>HOME</Link></li>
                <li className="toplistitem"><Link to="/" className='link'>ABOUT</Link></li>
                <li className="toplistitem"><Link to="/" className='link'>CONTACT</Link></li>
                <li className="toplistitem"><Link to="/write" className='link'>WRITE</Link></li>
                <li className="toplistitem" onClick={handleClick}>{user&& "LOGOUT"}</li>
            </ul>
        </div>
        <div className="topright">
          {
            user?(
            <><Link className='link' to="/settings"><img className='topimg' src={user.profilePic ?PF+user.profilePic :"https://i.pinimg.com/236x/62/61/40/626140915d33a199a0a6e43a76f74493.jpg"} alt=''/></Link>
            <i className="topsearch fa-sharp fa-solid fa-magnifying-glass"/>
            </>
            ):(
              <ul className="toplist">
                <li className="toplistitem"><Link className="link" to="/login">SIGN IN</Link></li>
                <li className="toplistitem"><Link className="link" to="/register">REGISTER</Link></li>
              </ul>
            )
          }
            
        </div>
    </div>
  )
}
export default Topbar;