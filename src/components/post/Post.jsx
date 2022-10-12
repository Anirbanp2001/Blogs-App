import './post.css'
import { Link } from "react-router-dom";
const Post = (props) => {
  const { post } = props;
  const PF="http://localhost:5000/images/"
  return (
    <div className='post'>
      {
        post.photo && (<img className='postimg' src={PF+post.photo} alt='' />)}
      <div className="postInfo">
        <div className="postcats">

          {post.categories.map((c) => {
            <span className="postCat">{c.name}</span>
          })}
        </div>
        <Link className="link" to={`/post/${post._id}`}>
          <span className="postTitle">
            {post.title}
          </span>
        </Link>
        <span className="postTime">{new Date(post.createdAt).toString()}</span>
        <hr />
      </div>
      <p className="postDesc">
        {post.des}
      </p>
    </div>
  )
}
export default Post
