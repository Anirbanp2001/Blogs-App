import axios from 'axios';
import { useContext,useState } from 'react';
import { Context } from '../../context/Context';
import './write.css'

export const Write = () => {
  const [title,setTitle]=useState("");
  const [desc,setDesc]=useState("");
  const [file,setFile]=useState("");
  const {user}=useContext(Context);
  const handleSubmit=async(e)=>{
    e.preventDefault();
    const newPost={
      username:user.username,
      title,
      desc,
    };
    if(file)
    {
      const data=new FormData();
      const filename=Date.now()+file.name;
      data.append("name",filename);
      data.append("file",file);
      newPost.photo=filename;
      try{
        await axios.post("http://localhost:5000/api/upload",data)
      }catch(err){}
      try{
        const res=await axios.post("http://localhost:5000/api/posts",newPost);
        window.location.replace("/post/"+res.data._id);
      }catch(err){}

    }
  }
  return (
    <div className='write'>
      {file && (
        <img className="writeImg" src={URL.createObjectURL(file)} alt="" />
      )}
        <form className="writeForm" onSubmit={handleSubmit}>
          <div className="writeform1">
            <label htmlFor='fileInput'>
            <i className="writeIcon fa-solid fa-plus"/>
            </label>
            <input type='file' id='fileInput' style={{display:'none'}} onChange={(e)=>setFile(e.target.files[0])}/>
            <input id='title' type='text' className='userInput' placeholder='Title here....' autoFocus={true} onChange={(e)=>setTitle(e.target.value)}/>
          </div>
          <div className="writeform1">
            <textarea placeholder='Tell us your experience' className='userInput userText' onChange={(e)=>setDesc(e.target.value)}/>
          </div>
          <button className="inputPublish" type="submit">Publish</button>
        </form>
    </div>
  )
}
export default Write;