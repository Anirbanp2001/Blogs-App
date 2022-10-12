import './sidebar.css'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';


const Sidebar = () => {
    const [cat, setCat] = useState([]);
    useEffect(() => {
        const getCat = async () => {
            const res = await axios.get("http://localhost:5000/api/categories");
            console.log(res.data)
            setCat(res.data);
        }
        getCat();
    }, [])

    return (
        <div className='sidebar'>
            <div className="sidebarItem">
                <span className="sidebarTitle">ABOUT ME</span>
                <img src="https://miro.medium.com/max/1400/0*Wm808PK2cH8h_v1o" alt="" className="sidebarImg" />
                <p className="sidebarAboutMe">Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis veniam veritatis iusto ut, et consequatur!</p>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">CATEGORY</span>
                <ul className="category">
                    {

                        cat.map((c) => (
                            <Link className="link" to={`/?cat=${c.name}`} key={`${c.name}._id`}>
                                <li className="categoryItem" >{c.name} </li>
                            </Link>
                        ))
                    }

                </ul>
            </div>
            <div className="sidebarItem">
                <span className="sidebarTitle">FOLLOW US</span>
                <div className="sidebarSocial">
                    <i className="sidebaricon fa-brands fa-facebook" />
                    <i className="sidebaricon fa-brands fa-instagram" />
                    <i className="sidebaricon fa-brands fa-whatsapp" />
                    <i className="sidebaricon fa-brands fa-snapchat" />
                    <i className="sidebaricon fa-brands fa-twitter" />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
