import './settings.css'
import Sidebar from '../../components/sidebar/Sidebar'
import axios from 'axios'
import { Context } from '../../context/Context'
import { useContext } from 'react'
import { useState } from 'react'
const Settings = () => {

    const [file, setFile] = useState(null);
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
  
    const { user, dispatch } = useContext(Context);
    const PF = "http://localhost:5000/images/"
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      dispatch({ type: "UPDATE_START" });
      const updatedUser = {
        userId: user._id,
        username,
        email,
        password,
      };
      if (file) {
        const data = new FormData();
        const filename = Date.now() + file.name;
        data.append("name", filename);
        data.append("file", file);
        updatedUser.profilePic = filename;
        try {
          await axios.post("http://localhost:5000/api/upload", data);
        } catch (err) {}
      }
      try {
        console.log("HI3");
        const res = await axios.put("http://localhost:5000/api/users/" + user._id, updatedUser);
        setSuccess(true);
        console.log("HI4");
        dispatch({ type: "UPDATE_SUCCESS", payload: res.data });
        console.log("HI2");
      } catch (err) {
        dispatch({ type: "UPDATE_FAILURE" });
        setSuccess(false);
        setError(true);
        
      }
    };
    return (

        <div className='settings'>
            <div className="settingsWrapper">
                <div className="settingsTitle">
                    <span className="updateTitle">Update Title</span>
                </div>
                <form className="setForm" onSubmit={handleSubmit}>
                    <label className="settingLabel">Your Profile Picture</label>
                    <div className="setProfile">
                        <img src={file ? URL.createObjectURL(file) : PF+user.profilePic} alt="" className="setProfileImg" />
                        <label htmlFor="setFileInput" >
                            <i className="setIcon fa-regular fa-user" />
                        </label>
                        <input type='file' id='setFileInput' style={{ display: 'none' }}  onChange={(e) => setFile(e.target.files[0])}/>
                    </div>
                    <label >UserName</label>
                    <input type='text' placeholder={user.username} onChange={(e) => setUsername(e.target.value)} />
                    <label >Email Here</label>
                    <input type='email' placeholder={user.email} onChange={(e) => setEmail(e.target.value)} />
                    <label >Password</label>
                    <input type='password' onChange={(e) => setPassword(e.target.value)} />
                    <button className="setUpdate" type="submit">Update(Double Click)</button>
                    {success && (
                        <span
                            style={{ color: "green", textAlign: "center", marginTop: "20px" }}
                        >
                            Profile has been updated...
                        </span>)}
                        {!success&&error && (
                        <span
                            style={{ color: "red", textAlign: "center", marginTop: "20px" }}
                        >
                           Please check the credentials again...
                        </span>)}    
                </form>
            </div>
            <Sidebar />
        </div>
    )
}

export default Settings
