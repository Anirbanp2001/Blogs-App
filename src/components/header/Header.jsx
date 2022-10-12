import './header.css'

const Header = () => {
  return (
    <div className='header'>
      <div className="headertitle">
        <span className="headerTitleUp">React&Node</span>
        <span className="headerTitleDown">Your Blogs</span>
      </div>
      <img  className='headerimg' src='https://c.tenor.com/0ufKblKdp5gAAAAC/japan-scenery.gif' alt=''/>
    </div>
  )
}

export default Header
