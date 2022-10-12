import Post from '../post/Post'
import './posts.css'

const Posts = (props) => {
  const { posts }=props;
  return (

    <div className='posts'>
      {posts.map(p=>(
        <Post post={p} key={p._id}/>
      ))}

    </div>
  )
}

export default Posts
