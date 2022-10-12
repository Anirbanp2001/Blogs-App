import './singlePost.css'
import { useContext, useEffect, useState } from 'react';
import axios from "axios";
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import { Context } from '../../context/Context';


const SinglePost = () => {
    const location = useLocation();
    const path = location.pathname.split("/")[2];
    const [post, setPost] = useState({});
    const { user } = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [updateMode, setUpdateMode] = useState(false);
    const PF = "http://localhost:5000/images/"
    useEffect(() => {
        const getPost = async () => {
            const res = await axios.get("http://localhost:5000/api/posts/" + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.desc);
        }
        getPost();
    }, [path])
    const handleDel = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${post._id}`,
                {
                    data: {
                        username: user.username,
                    }
                }
            )
            window.location.replace("/");
        } catch (err) { }

    }
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/posts/${post._id}`,
                {
                    username: user.username,
                    title,
                    desc,
                }
            )
            setUpdateMode(false);
        } catch (err) { }
    }
    return (
        <div className='singlePost'>
            <div className="singlePostWrapper">
                {post.photo && (<img src={PF + post.photo} alt="" className="singlePostImg" />)}
                {updateMode ? <input type="text" value={title} className="singlePostInputTitle" onChange={(e) => setTitle(e.target.value)} /> : (<h1 className="singlePostTitle">{title}
                    {post.username === user?.username && (<div className="singlePostEdit">
                        <i className="singlePostIcon fa-regular fa-pen-to-square" onClick={() => setUpdateMode(true)} />
                        <i className="singlePostIcon fa-sharp fa-solid fa-trash" onClick={handleDel} />
                    </div>)}
                </h1>)}
                <div className="singlepostInfo">
                    <span className="singlePostWriter">
                        <Link className='link' to={`/?user=${post.username}`}><b>Author:{post.username}</b></Link>
                    </span>
                    <span className="singlePostTime">{new Date(post.createdAt).toString()}</span>
                </div>
                {updateMode ? <textarea value={desc} className="singlePostInputDesc" onChange={(e) => setDesc(e.target.value)} /> : (<p className="singlePostDesc">
                    {desc}
                </p>)}
                {updateMode && <button onClick={handleUpdate} className="singlePostUpdateSubmit">Update</button>}
            </div>
        </div>
    )
}

export default SinglePost
